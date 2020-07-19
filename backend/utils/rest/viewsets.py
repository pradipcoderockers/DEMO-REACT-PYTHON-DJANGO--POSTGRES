from django.core.paginator import InvalidPage
from django.db.models import Count
from django.utils import six
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from collections import OrderedDict
from utils.rest.code import code
from rest_framework.exceptions import APIException


class NotFound(APIException):
    status_code = 404
    default_detail = 'The requested resource is not found.'
    default_code = 'error'


class CustomPagination(PageNumberPagination):
    invalid_page_message = code['E_PAGINATOR_NOT_FOUND']

    def paginate_queryset(self, queryset, request, view=None):
        """
        Paginate a queryset if required, either returning a
        page object, or `None` if pagination is not configured for this view.
        """
        page_size = self.get_page_size(request)
        if not page_size:
            return None

        paginator = self.django_paginator_class(queryset, page_size)
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number in self.last_page_strings:
            page_number = paginator.num_pages

        try:
            self.page = paginator.page(page_number)
        except InvalidPage as exc:
            msg = self.invalid_page_message.format(
                page_number=page_number, message=six.text_type(exc)
            )

            raise NotFound(msg)

        if paginator.num_pages > 1 and self.template is not None:
            # The browsable API should display pagination controls.
            self.display_page_controls = True

        self.request = request
        return list(self.page)

    def get_paginated_response(self, data, combining=False):
        if not hasattr(self, 'status'):
            self.status = self.get_status
        current_page = self.page.number
        res_js = OrderedDict([
            (
                'meta',
                {
                    'page_size': int(self.page_size) if self.page_size else self.page_size,
                    'count': self.page.paginator.count,
                    'next': self.get_next_link(),
                    'previous': self.get_previous_link(),
                    'page': current_page
                }
            ),
            ('result', data,),
            ('status', 200),
            ('code', 'OK_GET'),
            ('message', code['OK_GET'])
        ])

        if hasattr(self, 'has_categorize'):
            if self.has_categorize:
                res_js.get('meta').update({'status_categorize': self.status})
                self.__class__.has_categorize = False
        return Response(res_js)

    def set_status(self, data_list):
        count_field = 'count'
        field = self.status_param
        status_list = dict()
        for data in data_list:
            status = data.values(
                self.status_param
            ).annotate(count=Count(self.status_param)).values(
                self.status_param, count_field
            )
            for s in status:
                status_text = s[field]
                status_list.setdefault(status_text, 0)
                status_list[status_text] += s[count_field]

        self.status = []
        for status_text, count in status_list.items():
            self.status.append(
                dict(
                    count=count,
                    status=status_text
                )
            )

    @property
    def get_status(self):
        list_result = []
        filter_dict = {}
        if not hasattr(self, 'has_categorize') or not getattr(self, 'has_categorize'):
            return
        status_param = self.status_param
        model = self.queryset

        if model and hasattr(model.last(), status_param):
            for i in set(model.distinct().values_list(status_param, flat=True)):
                filter_dict[status_param] = i
                list_result.append({'status': i, 'count': model.filter(**filter_dict).count()})
            return list_result
        else:
            return list_result
