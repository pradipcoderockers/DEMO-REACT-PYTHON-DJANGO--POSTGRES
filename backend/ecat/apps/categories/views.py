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

class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all().order_by('id')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    ordering_fields = ['id', 'name']
    ordering = ['id']

    def get_queryset(self):
        queryset = Category.objects.all()
        page = self.request.query_params.get('page')
        page_size = self.request.query_params.get('page_size')
        if page is not None:
            pagination.PageNumberPagination.page = page
        if page_size is not None:
            pagination.PageNumberPagination.page_size = page_size
        return queryset

        
class SubCategoryList(generics.ListCreateAPIView):
    serializer_class = ProductSubCategorySerializer
    queryset = Product.objects.all().order_by('id')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    
    def get_queryset(self):
        code = self.request.query_params.get('code')
        category = Category.objects.filter(code=code)
        if category is not None:
            categoryObj = category.last()
            queryset = Product.objects.filter(category_id=categoryObj.id).distinct('subcategory__id')
            return queryset

class SegmentList(generics.ListCreateAPIView):
    serializer_class = ProductSegmentSerializer
    queryset = Product.objects.all().order_by('id')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    
    def get_queryset(self):
        code = self.request.query_params.get('code')
        subcategory = SubCategory.objects.filter(code=code)
        if subcategory is not None:
            subcategoryObj = subcategory.last()
            queryset = Product.objects.filter(subcategory_id=subcategoryObj.id).distinct('segment__id')
            return queryset

class SubSegmentList(generics.ListCreateAPIView):
    serializer_class = ProductSubSegmentSerializer
    queryset = Product.objects.all().order_by('id')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    
    def get_queryset(self):
        code = self.request.query_params.get('code')
        segment = Segment.objects.filter(code=code)
        if segment is not None:
            segmentObj = segment.last()
            queryset = Product.objects.filter(segment_id=segmentObj.id).distinct('subsegment__id')
            return queryset

class LeafTypeList(generics.ListCreateAPIView):
    serializer_class = ProductLeafTypeSerializer
    queryset = Product.objects.all().order_by('id')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    
    def get_queryset(self):
        code = self.request.query_params.get('code')
        subsegment = SubSegment.objects.filter(code=code)
        if subsegment is not None:
            subsegmentObj = subsegment.last()
            queryset = Product.objects.filter(subsegment_id=subsegmentObj.id).distinct('leaftype__id')
            return queryset

class VechicleList(generics.ListCreateAPIView):
    serializer_class = ProductVechicleSerializer
    queryset = Product.objects.all().order_by('id')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    
    def get_queryset(self):
        code = self.request.query_params.get('code')
        leafType = LeafType.objects.filter(code=code)
        if leafType is not None:
            leafTypeObj = leafType.last()
            queryset = Product.objects.filter(leaftype_id=leafTypeObj.id).distinct('vechicle__id')
            return queryset

class LeafPositionList(generics.ListCreateAPIView):
    serializer_class = ProductLeafPositionSerializer
    queryset = Product.objects.all().order_by('id')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    
    def get_queryset(self):
        code = self.request.query_params.get('code')
        vechicle = Vechicle.objects.filter(code=code)
        if vechicle is not None:
            vechicleObj = vechicle.last()
            queryset = Product.objects.filter(vechicle_id=vechicleObj.id).distinct('leafposition__id')
            return queryset                            

class VechicleModelList(generics.ListCreateAPIView):
    serializer_class = ProductVechicleModelSerializer
    queryset = Product.objects.all().order_by('id')
    filter_backends = (DjangoFilterBackend, OrderingFilter)
    
    def get_queryset(self):
        code = self.request.query_params.get('code')
        leafPosition = LeafPosition.objects.filter(code=code)
        if leafPosition is not None:
            leafPositionObj = leafPosition.last()
            queryset = Product.objects.filter(leafposition_id=leafPositionObj.id).distinct('vechiclemodel__id')
            return queryset

                 