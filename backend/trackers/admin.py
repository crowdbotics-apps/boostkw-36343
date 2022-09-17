from django.contrib import admin

from .models import *


@admin.register(TrackerInput)
class TrackerInputAdmin(admin.ModelAdmin):
    list_display = ['name', 'input_type', 'values']


@admin.register(InitialJobProcess)
class InitialJobProcessAdmin(admin.ModelAdmin):
    list_display = ['title', 'position', 'location', 'is_active']


@admin.register(CustomerTracker)
class CustomerTrackerAdmin(admin.ModelAdmin):
    list_display = ['job_code', 'user', 'customer_name', 'system_size', 'number_of_panels', 'roof_type',
                    'number_of_arrays',
                    'is_battery', 'crew', 'location', 'number_of_workers', 'created', 'updated']

    autocomplete_fields = ('user',)


@admin.register(JobProcess)
class JobProcessAdmin(admin.ModelAdmin):
    list_display = ['title', 'position', 'is_active', 'get_time_spent', 'created', 'updated']
