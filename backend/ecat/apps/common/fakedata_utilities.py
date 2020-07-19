from django.conf import settings
from accounts.models import User
import os
import xlrd
import re
from django.utils import timezone
from categories.models import *
CATEGORY = [
    {
        'code': 'LEAF-SPRING',
        'name': 'LEAF SPRING'
    },
    {
        'code': 'LEAF-SPRING-ALLIED',
        'name': 'LEAF SPRING ALLIED'
    },
    
]
SUBCATEGORY = [
    {
        'code': 'BS6-VEHICLE',
        'name': 'BS6 VEHICLE'
    },
    {
        'code': 'BS6-HYBRID-Vehicles',
        'name': 'BS6 HYBRID Vehicles'
    },
    {
        'code': 'NON-BS6-VEHICLE',
        'name': 'NON BS6 VEHICLE'
    },
    {
        'code': 'WITH-AB2-BUSH',
        'name': 'WITH AB2 BUSH'
    },
]

ROLE = [
    {'name':'ADMIN'},
    {'name':'RETAILER'},
    {'name':'DISTRIBUTOR'},
    {'name':'USER'}
]

def generate_fake_data():

    admin, created = User.objects.get_or_create(first_name='Super', last_name='User', defaults={
        'email': 'admin@admin.com',
        'is_superuser': True,
        'is_staff': True,
    })
    password = 'Passw0rd!'
    admin.set_password(password)
    admin.username = 'administrator'
    admin.save()
    print('Superuser {}: {}/{}'.format('created', admin.email, password))
    
    for cat in CATEGORY:
        Category.objects.get_or_create(name=cat['name'], code=cat['code'],shortDesc=cat['name'],
                            longDesc=cat['name'])
        
    print("category created")

    for subcat in SUBCATEGORY:
        SubCategory.objects.get_or_create(name=subcat['name'], code=subcat['code'],shortDesc=subcat['name'],
                            longDesc=subcat['name'])
    print("subcategory created")   

    import_segment_master()
    print("import_segment_master created") 
    import_subsegment_master()
    print("import_subsegment_master created") 
    import_leaf_master()
    print("import_leaf_master created") 
    import_leaf_position_master()
    print("import_leaf_position_master created") 
    import_vechicle_master()
    print("import_vechicle_master created") 
    import_vechicle_model_master()
    print("import_vechicle_model_master created") 

def import_segment_master():
    cwd = os.getcwd()
    xls = os.path.join(cwd, "MSP", "unique.xlsx")
    wb = xlrd.open_workbook(xls)
    sheet = wb.sheet_by_index(1)
    keys = []

    for idx_j in range(sheet.ncols):
        keys.append(sheet.cell(1, idx_j).value)
    
    for idx_i in range(2, sheet.nrows):
        item = {}
        for idx_j in range(sheet.ncols):
            item[keys[idx_j]] = sheet.cell(idx_i, idx_j).value

        
        if item['Segment_code'] is not None:
            segment = Segment(
                            name=item['Segment_desc'],
                            code=item['Segment_code'],
                            shortDesc=item['Segment_desc'],
                            longDesc=item['Segment_desc']
                        )
            segment.save()

def import_subsegment_master():
    cwd = os.getcwd()
    xls = os.path.join(cwd, "MSP", "unique.xlsx")
    wb = xlrd.open_workbook(xls)
    sheet = wb.sheet_by_index(2)
    keys = []

    for idx_j in range(sheet.ncols):
        keys.append(sheet.cell(1, idx_j).value)
    
    for idx_i in range(2, sheet.nrows):
        item = {}
        for idx_j in range(sheet.ncols):
            item[keys[idx_j]] = sheet.cell(idx_i, idx_j).value

        
        if item['Sub Segment_code'] is not None:
            segment = SubSegment(
                            name=item['Sub Segment_desc'],
                            code=item['Sub Segment_code'],
                            shortDesc=item['Sub Segment_desc'],
                            longDesc=item['Sub Segment_desc']
                        )
            segment.save()

def import_leaf_master():
    cwd = os.getcwd()
    xls = os.path.join(cwd, "MSP", "unique.xlsx")
    wb = xlrd.open_workbook(xls)
    sheet = wb.sheet_by_index(3)
    keys = []

    for idx_j in range(sheet.ncols):
        keys.append(sheet.cell(1, idx_j).value)
    
    for idx_i in range(2, sheet.nrows):
        item = {}
        for idx_j in range(sheet.ncols):
            item[keys[idx_j]] = sheet.cell(idx_i, idx_j).value

        
        if item['Leaf Type code'] is not None:
            segment = LeafType(
                            name=item['Leaf Type Desc'],
                            code=item['Leaf Type code'],
                            shortDesc=item['Leaf Type Desc'],
                            longDesc=item['Leaf Type Desc']
                        )
            segment.save()           



 

def import_leaf_position_master():
    cwd = os.getcwd()
    xls = os.path.join(cwd, "MSP", "unique.xlsx")
    wb = xlrd.open_workbook(xls)
    sheet = wb.sheet_by_index(5)
    keys = []

    for idx_j in range(sheet.ncols):
        keys.append(sheet.cell(1, idx_j).value)
    
    for idx_i in range(2, sheet.nrows):
        item = {}
        for idx_j in range(sheet.ncols):
            item[keys[idx_j]] = sheet.cell(idx_i, idx_j).value

        
        if item['Leaf Position code'] is not None:
            segment = LeafPosition(
                            name=item['Leaf Position  Desc'],
                            code=item['Leaf Position code'],
                            shortDesc=item['Leaf Position  Desc'],
                            longDesc=item['Leaf Position  Desc']
                        )
            segment.save()                     

def import_vechicle_model_master():
    cwd = os.getcwd()
    xls = os.path.join(cwd, "MSP", "unique.xlsx")
    wb = xlrd.open_workbook(xls)
    sheet = wb.sheet_by_index(6)
    keys = []

    for idx_j in range(sheet.ncols):
        keys.append(sheet.cell(1, idx_j).value)
    
    for idx_i in range(2, sheet.nrows):
        item = {}
        for idx_j in range(sheet.ncols):
            item[keys[idx_j]] = sheet.cell(idx_i, idx_j).value

        
        if item['Vehicle Model  Desc'] is not None:
            segment = VechicleModel(
                            name=item['Vehicle Model  Desc'],
                            code=item['Vehicle Model code'],
                            shortDesc=item['Vehicle Model  Desc'],
                            longDesc=item['Vehicle Model  Desc']
                        )
            segment.save()           

def import_vechicle_master():
    cwd = os.getcwd()
    xls = os.path.join(cwd, "MSP", "unique.xlsx")
    wb = xlrd.open_workbook(xls)
    sheet = wb.sheet_by_index(4)
    keys = []

    for idx_j in range(sheet.ncols):
        keys.append(sheet.cell(1, idx_j).value)
    
    for idx_i in range(2, sheet.nrows):
        item = {}
        for idx_j in range(sheet.ncols):
            item[keys[idx_j]] = sheet.cell(idx_i, idx_j).value

        
        if item['Vehicle code'] is not None:
            segment = Vechicle(
                            name=item['VehicleDesc'],
                            code=item['Vehicle code'],
                            shortDesc=item['VehicleDesc'],
                            longDesc=item['VehicleDesc']
                        )
            segment.save()             