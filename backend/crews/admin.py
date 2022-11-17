from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from trackers.models import CustomerTracker
from .db_utils import crew_counter_subqs
from .models import *


@admin.register(Crew)
class CrewAdmin(admin.ModelAdmin):
    list_display = ['name', 'get_hours_worked', 'get_kw_installed', 'get_installations', 'get_average_hr_kw']
    readonly_fields = ['slug']
    search_fields = ['name']

    def get_queryset(self, request):
        queryset = super(self.__class__, self).get_queryset(request)
        # queryset.annotate(**crew_counter_subqs())
        queryset = queryset.annotate(installations=models.Sum('customer_trackers__system_size', filter=models.Q(
            customer_trackers__status=CustomerTracker.STATUS_CLOSED)))
        return queryset

    def get_hours_worked(self, instance):
        print(instance.__dict__)
        return 0

    get_hours_worked.short_description = _('Hours Worked')

    def get_kw_installed(self, instance):
        return 0

    get_kw_installed.short_description = _('kW Installed')

    def get_installations(self, instance):
        return 0

    get_installations.short_description = _('Installations')

    def get_average_hr_kw(self, instance):
        return 0

    get_average_hr_kw.short_description = _('Average hr/kW')
