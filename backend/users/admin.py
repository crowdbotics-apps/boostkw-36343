from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (('User', {'fields': ('name', 'crew')}),) + auth_admin.UserAdmin.fieldsets
    list_display = ['username', 'first_name', 'last_name', 'email', 'crew', 'is_superuser', 'date_joined']
    search_fields = ['first_name', 'last_name', 'email']
    list_select_related = ['profile', 'crew']

    # def get_branch(self, instance):
    #     if instance.get_branch:
    #         return instance.profile.branch
    #     return None
    #
    # get_branch.short_description = 'Branch'
    autocomplete_fields = ('crew',)
