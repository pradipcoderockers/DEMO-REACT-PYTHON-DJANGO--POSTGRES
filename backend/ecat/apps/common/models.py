from django.db import models

# Create your models here.

class State(models.Model):
    MRP = [
    ('mrp1', 'MRP1'),
    ('mrp2', 'MRP2'),
    ('mrp3', 'MRP3'),
    ('mrp4', 'MRP4'),
    ('mrp5', 'MRP5'),
    ]
    DBP = [
        ('dbp1', 'DBP1'),
        ('dbp2', 'DBP2'),
        ('dbp3', 'DBP3'),
        ('dbp4', 'DBP4'),
        ('dbp5', 'DBP5'),
    ]
    code  = models.CharField(default=True,null=True,max_length=200)
    name = models.CharField(default=True,null=True,max_length=200)
    mrp = models.CharField(
        max_length=4,
        choices=MRP,
        default='MRP1',
    )
    dbp = models.CharField(
        max_length=4,
        choices=DBP,
        default='DBP1',
    )