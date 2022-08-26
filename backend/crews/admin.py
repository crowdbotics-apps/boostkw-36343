from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from .models import *


@admin.register(Crew)
class CrewAdmin(admin.ModelAdmin):
    list_display = ['name', 'get_hours_worked', 'get_kw_installed', 'get_installations', 'get_average_hr_kw']
    readonly_fields = ['slug']
    search_fields = ['name']

    def get_hours_worked(self, instance):
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
