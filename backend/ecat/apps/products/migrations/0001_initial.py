# Generated by Django 3.0.4 on 2020-06-28 17:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('common', '0001_initial'),
        ('categories', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('item_code', models.CharField(default=True, max_length=200, null=True)),
                ('variant', models.TextField(default=True, null=True)),
                ('item_description', models.TextField(default=True, null=True)),
                ('drawing_refno', models.CharField(default=True, max_length=200, null=True)),
                ('status', models.CharField(default=True, max_length=200, null=True)),
                ('priority', models.CharField(default=True, max_length=200, null=True)),
                ('substitute', models.CharField(default=True, max_length=200, null=True)),
                ('length', models.CharField(default=True, max_length=200, null=True)),
                ('length_unit', models.CharField(default=True, max_length=200, null=True)),
                ('short_desc', models.CharField(default=True, max_length=200, null=True)),
                ('attribute', models.CharField(default=True, max_length=200, null=True)),
                ('shipping_code', models.CharField(default=True, max_length=200, null=True)),
                ('specialNotes', models.CharField(default=True, max_length=200, null=True)),
                ('image', models.CharField(default=True, max_length=200, null=True)),
                ('ch_detail', models.CharField(default=True, max_length=200, null=True)),
                ('section', models.CharField(default=True, max_length=200, null=True)),
                ('item_weight', models.CharField(default=True, max_length=200, null=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.Category')),
                ('leafposition', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.LeafPosition')),
                ('leaftype', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.LeafType')),
                ('segment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.Segment')),
                ('subcategory', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.SubCategory')),
                ('subsegment', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.SubSegment')),
                ('vechicle', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.Vechicle')),
                ('vechiclemodel', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.VechicleModel')),
            ],
        ),
        migrations.CreateModel(
            name='ProductPrice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.CharField(default=True, max_length=200, null=True)),
                ('pricetype', models.CharField(default=True, max_length=200, null=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='products.Product')),
                ('state', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='common.State')),
            ],
        ),
        migrations.CreateModel(
            name='Favourite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=True, max_length=200, null=True)),
                ('addedon', models.CharField(default=True, max_length=200, null=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='products.Product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page_type', models.CharField(default=True, max_length=200, null=True)),
                ('addedon', models.CharField(default=True, max_length=200, null=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='products.Product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
