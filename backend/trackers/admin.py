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
    list_display = ['display_job_code', 'title', 'position', 'display_job_location', 'is_active', 'display_time_spent',
                    'time_spent_seconds', 'is_completed',
                    'created', 'updated']
    readonly_fields = ['display_time_spent']

    search_fields = ['title', 'time_spent_seconds', 'customer_tracker__job_code']

    def display_time_spent(self, instance):
        if instance.time_spent_seconds:
            time_spent = instance.get_time_spent
            hours = time_spent.get('hours')
            minutes = time_spent.get('minutes')
            seconds = time_spent.get('left_seconds')
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
