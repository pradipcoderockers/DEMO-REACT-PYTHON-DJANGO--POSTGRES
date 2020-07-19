from django.db import models
from accounts.models import User
from products.models import Product

# Create your models here.
class Order(models.Model):
    user = models.ForeignKey(User, null=True,  on_delete = models.CASCADE)
    page_type  = models.CharField(default=True,null=True,max_length=200)
    product = models.ForeignKey(Product, null=True,  on_delete = models.CASCADE)
    addedon = models.CharField(default=True,null=True,max_length=200)