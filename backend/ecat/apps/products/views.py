from django.shortcuts import render
from django.db import transaction
from django.db.models import Q, F
from django.http import Http404
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, exceptions, pagination, status
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from utils.rest.code import code
from categories.models import *
from products.models import *
from categories.serializers import *
# Create your views here.
class ProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by('id')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    
    def get_queryset(self):
        code = self.request.query_params.get('code')
        leafPosition = LeafPosition.objects.filter(code=code)
        if leafPosition is not None:
            leafPositionObj = leafPosition.last()
            queryset = Product.objects.filter(leafposition_id=leafPositionObj.id).distinct('vechiclemodel__id')
            return queryset     