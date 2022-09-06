from django.conf.urls import url
from django.contrib import admin
from django.contrib.admin import AdminSite
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.shortcuts import render
from django.urls import path
from django.utils.safestring import mark_safe
from import_export.admin import ExportMixin

from users.admin_inlines import ProfileAdminInline
from users.forms import UserChangeForm, UserCreationForm
from users.model_resources import UserAdminResource

User = get_user_model()


class MyAdminSite(AdminSite):

    def get_urls(self):
        from django.urls import path
        urls = super().get_urls()
        urls += [
            path('profile/', self.admin_view(self.admin_user_profile_view))
        ]
        return urls

    def admin_user_profile_view(self, request):
        # print(pk)
        return HttpResponse("Profile")


admin_site = MyAdminSite()


@admin.register(User)
class UserAdmin(ExportMixin, auth_admin.UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (('User', {'fields': ('name', 'profile_picture', 'crew')}),) + auth_admin.UserAdmin.fieldsets
    list_display = ['username', 'first_name', 'last_name', 'email', 'crew', 'is_superuser', 'date_joined',
                    'get_view_button']
    search_fields = ['first_name', 'last_name', 'email']
    list_select_related = ['profile', 'crew']
    resource_class = UserAdminResource
    inlines = [ProfileAdminInline, ]

    # def get_branch(self, instance):
    #     if instance.get_branch:
    #         return instance.profile.branch
    #     return None
    #
    # get_branch.short_description = 'Branch'
    autocomplete_fields = ('crew',)

    def get_view_button(self, instance):
        # html = mark_safe(f'<a style="font-weight: 600" href="/admin/users/user/{instance.pk}/profile/">View</a>')
        html = mark_safe(f'<a style="font-weight: 600" href="/admin/users/user/{instance.pk}/profile/">View</a>')
        return html

    get_view_button.short_description = 'Profile'

    def admin_user_profile_view(self, request, pk):
        # print(pk)
        user = User.objects.get(pk=pk)
        data = {
            'user': user,
            'title': user.username
        }
        return render(request, 'admin/users/profile.html', data)

    def get_urls(self):
        additional_urls = [
            path('<int:pk>/profile/', self.admin_site.admin_view(self.admin_user_profile_view), name='profile')
        ]
        # append your custom URL BEFORE default ones
        return additional_urls + super().get_urls()
