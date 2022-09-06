from django.contrib.admin import TabularInline

from .models import Profile


class ProfileAdminInline(TabularInline):
    model = Profile
