# Generated by Django 3.0.4 on 2020-07-05 11:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_auto_20200629_0712'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='sh_detail',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='suitableFor',
            field=models.CharField(max_length=200, null=True),
        ),
    ]