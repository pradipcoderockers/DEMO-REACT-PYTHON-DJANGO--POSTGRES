from django.urls import path
from categories import views
urlpatterns = [
    path('categories', views.CategoryList.as_view(), name='category-list'),
    path('subcategory', views.SubCategoryList.as_view(), name='sub_category-list'),
    path('segment', views.SegmentList.as_view(), name='segment-list'),
    path('subsegment', views.SubSegmentList.as_view(), name='subsegment-list'),
    path('leaftype', views.LeafTypeList.as_view(), name='leaftype-list'),
    path('vechicle', views.VechicleList.as_view(), name='vechicle-list'),
    path('leafposition', views.LeafPositionList.as_view(), name='leafposition-list'),
    path('vechiclemodel', views.VechicleModelList.as_view(), name='vechiclemodel-list'),

]
