from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from .models import *


@admin.register(UserFeedback)
class UserFeedbackAdmin(admin.ModelAdmin):
    list_display = ['user', 'get_user_first_name', 'get_user_last_name', 'rating', 'comment', 'created', 'updated']

    search_fields = ['user__username', 'user__first_name', 'user__last_name']
    autocomplete_fields = ('user', )

    def get_user_first_name(self, instance):
        return instance.user.first_name

    get_user_first_name.short_description = _('First Name')
    get_user_first_name.admin_order_field = 'user__first_name'

    def get_user_last_name(self, instance):
        return instance.user.first_name

    get_user_last_name.short_description = _('Last Name')
    get_user_last_name.admin_order_field = 'user__last_name'
