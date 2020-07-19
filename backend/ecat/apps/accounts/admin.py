# -*- coding: utf-8 -*-
# from __future__ import unicode_literals
# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from .models import User, Role

# class CustomUserAdmin(UserAdmin):
#     list_display = ('email', 'date_joined', 'is_staff')
#     list_filter = ('is_staff', 'is_superuser', 'is_active')
#     search_fields = ('email', )
#     ordering = ('email', )
#     readonly_fields = (
#         'last_login', 'date_joined'
#     )

# admin.site.register(User, CustomUserAdmin)
# admin.site.register(Role)
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import  User, UserProfile

class ProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'UserProfile'
    fk_name = 'user'

class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline, )
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')
    readonly_fields = (
        'last_login', 'date_joined',
    )
    
    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)

admin.site.register(User, CustomUserAdmin)