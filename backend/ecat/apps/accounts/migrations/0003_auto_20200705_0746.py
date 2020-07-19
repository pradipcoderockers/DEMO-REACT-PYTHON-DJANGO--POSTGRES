# Generated by Django 3.0.4 on 2020-07-05 07:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20200705_0709'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='role',
        ),
        migrations.AddField(
            model_name='userprofile',
            name='role',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Retailer'), (2, 'Distributor'), (3, 'General User')], null=True),
        ),
        migrations.DeleteModel(
            name='Role',
        ),
    ]