from django.db import models

# Create your models here.
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(null=True,max_length=200)
    shortDesc = models.TextField(null=True)
    longDesc = models.TextField(null=True)
    image = models.FileField(null=True)
    shortby = models.CharField(null=True,max_length=200)
    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(null=True,max_length=200)
    shortDesc = models.TextField(null=True)
    longDesc = models.TextField(null=True)
    image = models.FileField(null=True)
    shortby = models.CharField(null=True,max_length=200)
    def __str__(self):
        return self.name

class Segment(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(null=True,max_length=200)
    shortDesc = models.TextField(null=True)
    longDesc = models.TextField(null=True)
    image = models.FileField(null=True)
    shortby = models.CharField(null=True,max_length=200)
    def __str__(self):
        return self.name

class SubSegment(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(null=True,max_length=200)
    shortDesc = models.TextField(null=True)
    longDesc = models.TextField(null=True)
    image = models.FileField(null=True)
    shortby = models.CharField(null=True,max_length=200)
    def __str__(self):
        return self.name   

class LeafType(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(null=True,max_length=200)
    shortDesc = models.TextField(null=True)
    longDesc = models.TextField(null=True)
    image = models.FileField(null=True)
    shortby = models.CharField(null=True,max_length=200)
    def __str__(self):
        return self.name

class Vechicle(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(null=True,max_length=200)
    shortDesc = models.TextField(null=True)
    longDesc = models.TextField(null=True)
    image = models.FileField(null=True)
    shortby = models.CharField(null=True,max_length=200)
    def __str__(self):
        return self.name

class LeafPosition(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(null=True,max_length=200)
    shortDesc = models.TextField(null=True)
    longDesc = models.TextField(null=True)
    image = models.FileField(null=True)
    shortby = models.CharField(null=True,max_length=200)
    def __str__(self):
        return self.name

class VechicleModel(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(null=True,max_length=200)
    shortDesc = models.TextField(null=True)
    longDesc = models.TextField(null=True)
    image = models.FileField(null=True)
    shortby = models.CharField(null=True,max_length=200)
    def __str__(self):
        return self.name