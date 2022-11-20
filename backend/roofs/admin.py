from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from trackers.utils import seconds_to_readable_time
from .models import *


@admin.register(RoofType)
class RoofTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'order', 'get_hours_worked', 'get_kw_installed', 'get_installations', 'get_average_hr_kw']
    search_fields = ['name']

    def get_queryset(self, request):
        queryset = super(self.__class__, self).get_queryset(request)
        from .db_utils import roof_type_counter_subqs
        return queryset.annotate(**roof_type_counter_subqs())

    def get_hours_worked(self, instance):
        if 'seconds_worked' in instance.__dict__ and instance.seconds_worked:
            readable_time = seconds_to_readable_time(instance.seconds_worked)
            # return readable_time
            return readable_time.get('hours')
        return 0

    get_hours_worked.short_description = _('Hours Worked')

    def get_kw_installed(self, instance):
        return instance.total_customer_trackers_closed

    get_kw_installed.short_description = _('kW Installed')

    def get_installations(self, instance):
        if 'installations' in instance.__dict__ and instance.installations:
            return round(instance.installations, 1)
        return 0

    get_installations.short_description = _('Installations')

    def get_average_hr_kw(self, instance):
        if 'seconds_per_kw' in instance.__dict__ and instance.seconds_per_kw:
            readable_time = seconds_to_readable_time(instance.seconds_per_kw)
            return readable_time.get('hours')
        return 0

    get_average_hr_kw.short_description = _('Average hr/kW')
