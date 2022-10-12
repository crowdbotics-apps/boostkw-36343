from django.contrib import admin
from trackers.utils import (seconds_to_readable_time)

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
    search_fields = ('job_code', 'user__username', 'user__email', 'customer_name', 'crew__name')
    list_filter = ['location', 'is_battery']


@admin.register(JobProcess)
class JobProcessAdmin(admin.ModelAdmin):
    list_display = ['display_job_code', 'title', 'position', 'display_job_location', 'status', 'start_datetime',
                    'end_datetime', 'last_paused_datetime', 'created', 'updated']
    readonly_fields = ['display_time_spent_seconds', 'display_time_spent',
                       'display_paused_time']

    search_fields = ['title', 'customer_tracker__job_code']
    list_filter = ['status']

    def display_time_spent_seconds(self, instance):
        return instance.get_time_spent_seconds

    display_time_spent_seconds.short_description = 'Time Spent Seconds'

    def display_time_spent(self, instance):
        if instance.get_time_spent_seconds:
            time_spent = instance.get_time_spent
            hours = time_spent.get('hours')
            minutes = time_spent.get('minutes')
            seconds = time_spent.get('seconds')
            body = f'Hours: {hours}, Mins: {minutes}, Seconds: {seconds}'
            return body
        return f'Hours: 0, Mins: 0, Seconds: 0'

    display_time_spent.short_description = 'Time Spent'

    def display_job_code(self, instance):
        return instance.customer_tracker.job_code

    display_job_code.short_description = 'Job Code'

    def display_job_location(self, instance):
        return instance.customer_tracker.get_location_display()

    display_job_location.short_description = 'Location'

    def display_paused_time(self, instance):
        if instance.total_paused_time_seconds:
            time_spent = seconds_to_readable_time(instance.total_paused_time_seconds)
            hours = time_spent.get('hours')
            minutes = time_spent.get('minutes')
            seconds = time_spent.get('seconds')
            body = f'Hours: {hours}, Mins: {minutes}, Seconds: {seconds}'
            return body
        return f'Hours: 0, Mins: 0, Seconds: 0'

    display_paused_time.short_description = 'Paused Time'
