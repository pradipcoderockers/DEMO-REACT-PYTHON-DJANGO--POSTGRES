from django.contrib import admin

# Register your models here.
from .models import *
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from common.models import State
class CategoryResource(resources.ModelResource):
    class Meta:
        model = Category

class CategoryAdmin(ImportExportModelAdmin):
    list_display = ('code', 'name','shortDesc','longDesc')
    list_filter = ('code','name')
    ordering = ('name','code')
    resource_class = CategoryResource

class SubCategoryResource(resources.ModelResource):
    class Meta:
        model = SubCategory

class SubCategoryAdmin(ImportExportModelAdmin):
    list_display = ('code', 'name','shortDesc','longDesc')
    list_filter = ('code','name')
    ordering = ('name','code')
    resource_class = SubCategoryResource

class SegmentResource(resources.ModelResource):
    class Meta:
        model = Segment

class SegmentAdmin(ImportExportModelAdmin):
    list_display = ('code', 'name','shortDesc','longDesc')
    list_filter = ('code','name')
    ordering = ('name','code')
    resource_class = SegmentResource

class SubSegmentResource(resources.ModelResource):
    class Meta:
        model = SubSegment

class SubSegmentAdmin(ImportExportModelAdmin):
    list_display = ('code', 'name','shortDesc','longDesc')
    list_filter = ('code','name')
    ordering = ('name','code')
    resource_class = SubSegmentResource

class LeafPositionResource(resources.ModelResource):
    class Meta:
        model = LeafPosition

class LeafPositionAdmin(ImportExportModelAdmin):
    list_display = ('code', 'name','shortDesc','longDesc')
    list_filter = ('code','name')
    ordering = ('name','code')
    resource_class = LeafPositionResource 

class LeafTypeResource(resources.ModelResource):
    class Meta:
        model = LeafType

class LeafTypeAdmin(ImportExportModelAdmin):
    list_display = ('code', 'name','shortDesc','longDesc')
    list_filter = ('code','name')
    ordering = ('name','code')
    resource_class = LeafTypeResource     


class VechicleResource(resources.ModelResource):
    class Meta:
        model = Vechicle

class VechicleAdmin(ImportExportModelAdmin):
    list_display = ('code', 'name','shortDesc','longDesc')
    list_filter = ('code','name')
    ordering = ('name','code')
    resource_class = VechicleResource    

class VechicleModelResource(resources.ModelResource):
    class Meta:
        model = Vechicle

class VechicleModelAdmin(ImportExportModelAdmin):
    list_display = ('code', 'name','shortDesc','longDesc')
    list_filter = ('code','name')
    ordering = ('name','code')
    resource_class = VechicleModelResource   

class StateModelResource(resources.ModelResource):
    class Meta:
        model = State

class StateModelAdmin(ImportExportModelAdmin):
    list_display = ('name', 'code')
    list_filter = ('name','code')
    ordering = ('name','code')
    resource_class = StateModelResource 
    

admin.site.register(State,StateModelAdmin)

admin.site.register(Category,CategoryAdmin)
admin.site.register(SubCategory,SubCategoryAdmin)
admin.site.register(Segment,SegmentAdmin)
admin.site.register(SubSegment,SubSegmentAdmin)
admin.site.register(LeafType,LeafTypeAdmin)
admin.site.register(LeafPosition,LeafPositionAdmin)
admin.site.register(Vechicle,VechicleAdmin)
admin.site.register(VechicleModel,VechicleModelAdmin)
