from rest_framework import serializers
from categories.models import *
from django.db import transaction
from django.conf import settings
from django.http import Http404
from products.models import Product

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SubCategory
        fields = '__all__'

class SegmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Segment
        fields = '__all__'

class SubSegmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubSegment
        fields = '__all__'

class LeafTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = LeafType
        fields = '__all__'

class LeafPositionSerializer(serializers.ModelSerializer):

    class Meta:
        model = LeafPosition
        fields = '__all__'

class VechicleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vechicle
        fields = '__all__'        

class VechicleModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = VechicleModel
        fields = '__all__'
                                       
class ProductSubCategorySerializer(serializers.ModelSerializer):
    subcategory = SubCategorySerializer(read_only=True)
    class Meta:
        model = Product
        fields = ('subcategory',) 

class ProductSegmentSerializer(serializers.ModelSerializer):
    segment = SegmentSerializer(read_only=True)
    
    class Meta:
        model = Segment
        fields = ('segment',)        

class ProductSubSegmentSerializer(serializers.ModelSerializer):
    subsegment = SubSegmentSerializer(read_only=True)
    
    class Meta:
        model = SubSegment
        fields = ('subsegment',)   

class ProductLeafTypeSerializer(serializers.ModelSerializer):
    leaftype = LeafTypeSerializer(read_only=True)
    
    class Meta:
        model = LeafType
        fields = ('leaftype',)   

class ProductVechicleSerializer(serializers.ModelSerializer):
    vechicle = VechicleSerializer(read_only=True)
    
    class Meta:
        model = Vechicle
        fields = ('vechicle',)   

class ProductLeafPositionSerializer(serializers.ModelSerializer):
    leafposition = LeafPositionSerializer(read_only=True)
    
    class Meta:
        model = LeafPosition
        fields = ('leafposition',)                           

class ProductVechicleModelSerializer(serializers.ModelSerializer):
    vechiclemodel = VechicleModelSerializer(read_only=True)
    
    class Meta:
        model = VechicleModel
        fields = ('vechiclemodel',)                                   