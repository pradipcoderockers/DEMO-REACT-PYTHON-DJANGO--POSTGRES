from django.db import models
from categories.models import *
from accounts.models import User
from common.models import State

class Product(models.Model):
    name = models.CharField(max_length=200)
    item_code = models.CharField(null=True,max_length=200)
    variant = models.TextField(null=True)
    item_description = models.TextField(null=True)
    category = models.ForeignKey(Category, null=True,  on_delete = models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, null=True,  on_delete = models.CASCADE)
    segment = models.ForeignKey(Segment, null=True,  on_delete = models.CASCADE)
    subsegment = models.ForeignKey(SubSegment, null=True, on_delete = models.CASCADE)
    leaftype = models.ForeignKey(LeafType, null=True,  on_delete = models.CASCADE)
    vechicle = models.ForeignKey(Vechicle, null=True,  on_delete = models.CASCADE)
    leafposition = models.ForeignKey(LeafPosition, null=True,  on_delete = models.CASCADE)
    vechiclemodel = models.ForeignKey(VechicleModel, null=True, on_delete = models.CASCADE)
    leaf_desc = models.CharField(null=True,max_length=200)
    drawing_refno = models.CharField(null=True,max_length=200)
    status = models.CharField(null=True,max_length=200)
    priority = models.CharField(null=True,max_length=200)
    substitute = models.CharField(null=True,max_length=200)
    length = models.CharField(null=True,max_length=200)
    length_unit = models.CharField(null=True,max_length=200)
    short_desc = models.CharField(null=True,max_length=200)
    long_desc = models.CharField(null=True,max_length=200)
    attribute = models.CharField(null=True,max_length=200)
    shipping_code = models.CharField(null=True,max_length=200)
    specialNotes = models.CharField(null=True,max_length=200)
    image = models.FileField(null=True)
    ch_detail = models.CharField(null=True,max_length=200)
    sh_detail = models.CharField(null=True,max_length=200)
    section = models.CharField(null=True,max_length=200)
    item_weight = models.CharField(null=True,max_length=200)
    mrp1 = models.CharField(null=True,max_length=200)
    mrp2 = models.CharField(null=True,max_length=200)
    mrp3 = models.CharField(null=True,max_length=200)
    mrp4 = models.CharField(null=True,max_length=200)
    mrp5 = models.CharField(null=True,max_length=200)
    dbp1 = models.CharField(null=True,max_length=200)
    dbp2 = models.CharField(null=True,max_length=200)
    dbp3 = models.CharField(null=True,max_length=200)
    dbp4 = models.CharField(null=True,max_length=200)
    dbp5 = models.CharField(null=True,max_length=200)
    suitableFor = models.CharField(null=True,max_length=200)

class Favourite(models.Model):
    name = models.CharField(null=True,max_length=200)
    user = models.ForeignKey(User, null=True,  on_delete = models.CASCADE)
    product = models.ForeignKey(Product, null=True,  on_delete = models.CASCADE)
    addedon = models.CharField(null=True,max_length=200)

class Cart(models.Model):
    user = models.ForeignKey(User, null=True,  on_delete = models.CASCADE)
    page_type  = models.CharField(null=True,max_length=200)
    product = models.ForeignKey(Product, null=True,  on_delete = models.CASCADE)
    addedon = models.CharField(null=True,max_length=200)