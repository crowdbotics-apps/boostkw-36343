from django.contrib import admin

from .models import *


@admin.register(TrackerInput)
class TrackerInputAdmin(admin.ModelAdmin):
    list_display = ['name', 'input_type', 'values']
