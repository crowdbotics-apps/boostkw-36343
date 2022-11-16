from django.contrib import admin
from trackers.utils import (seconds_to_readable_time)
from .db_utils import customer_tracker_job_process_subqs

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
                    'number_of_arrays', 'display_total_time_spent', 'display_total_job_process',
                    'is_battery', 'crew', 'location', 'number_of_workers', 'created', 'updated']
    list_select_related = ['crew', 'user', 'roof_type']
    readonly_fields = ['display_total_time_spent', 'display_total_time_spent_seconds', 'display_total_job_process',]
    autocomplete_fields = ('user',)
    search_fields = ('job_code', 'user__username', 'user__email', 'customer_name', 'crew__name')
    list_filter = ['location', 'is_battery']

    def get_queryset(self, request):
        queryset = super().get_queryset(request).annotate(
            total_time_spent_seconds=customer_tracker_job_process_subqs(),
            total_job_process=models.Count('job_processes'),
        )
        return queryset

    def display_total_time_spent_seconds(self, instance):
        return instance.total_time_spent_seconds
        # return 0
    display_total_time_spent_seconds.short_description = 'Time Spent Seconds'

    def display_total_job_process(self, instance):
        return instance.total_job_process
        # return 0

    display_total_job_process.short_description = 'Job Processes'
    display_total_job_process.admin_order_field = 'total_job_process'

    def display_total_time_spent(self, instance):
        if instance.total_time_spent_seconds:
            time_spent = seconds_to_readable_time(instance.total_time_spent_seconds)
            hours = time_spent.get("hours")
            minutes = time_spent.get("minutes")
            seconds = time_spent.get("seconds")
            return f'Hours: {hours}, Minutes: {minutes}, Seconds: {seconds}'
        return f'Hours: {0}, Minutes: {0}, Seconds: {0}'

    display_total_time_spent.short_description = 'Time Spent'
    display_total_time_spent.admin_order_field = 'total_time_spent_seconds'


@admin.register(JobProcess)
class JobProcessAdmin(admin.ModelAdmin):
    list_display = ['display_job_code', 'title', 'position', 'display_job_location', 'status', 'start_datetime',
                    'end_datetime', 'last_paused_datetime', 'created', 'updated']
    readonly_fields = ['display_time_spent_seconds', 'display_time_spent',
                       'display_paused_time', 'get_seconds_per_job']

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
