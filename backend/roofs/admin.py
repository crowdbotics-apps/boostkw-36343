from django.contrib import admin

from .models import *


@admin.register(RoofType)
class RoofTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
