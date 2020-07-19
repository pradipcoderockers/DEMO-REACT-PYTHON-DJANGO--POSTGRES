from django.contrib import admin

# Register your models here.
from .models import *
from categories.models import *
from import_export import fields, resources
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ForeignKeyWidget

class ProductModelResource(resources.ModelResource):
    id = fields.Field(
        column_name='id',
        attribute='id',
        )
    name = fields.Field(
        column_name='name',
        attribute='name',
        )
    item_code = fields.Field(
        column_name='item_code',
        attribute='item_code',
        )
    variant = fields.Field(
        column_name='variant',
        attribute='variant',
        )
    item_description = fields.Field(
        column_name='item_description',
        attribute='item_description',
        )            
    category = fields.Field(
        column_name='category',
        attribute='category',
        widget=ForeignKeyWidget(Category, 'name'))
    subcategory = fields.Field(
        column_name='subcategory',
        attribute='subcategory',
        widget=ForeignKeyWidget(SubCategory, 'name'))
    segment = fields.Field(
        column_name='segment',
        attribute='segment',
        widget=ForeignKeyWidget(Segment, 'name'))
    subsegment = fields.Field(
        column_name='subsegment',
        attribute='subsegment',
        widget=ForeignKeyWidget(SubSegment, 'name')) 
    leaftype = fields.Field(
        column_name='leaftype',
        attribute='leaftype',
        widget=ForeignKeyWidget(LeafType, 'name')) 
    vechicle = fields.Field(
        column_name='vechicle',
        attribute='vechicle',
        widget=ForeignKeyWidget(Vechicle, 'name')) 
    leafposition = fields.Field(
        column_name='leafposition',
        attribute='leafposition',
        widget=ForeignKeyWidget(LeafPosition, 'name'))  
    vechiclemodel = fields.Field(
        column_name='vechiclemodel',
        attribute='vechiclemodel',
        widget=ForeignKeyWidget(VechicleModel, 'name'))                         
    class Meta:
        model = Product
        
class ProductModelAdmin(ImportExportModelAdmin):
    list_display = ('name','item_code', 'item_description','variant','drawing_refno','status')
    list_filter = ('item_code','status')
    ordering = ('item_code','status')
    resource_class = ProductModelResource 

admin.site.register(Product,ProductModelAdmin)
admin.site.register(Favourite)
admin.site.register(Cart)