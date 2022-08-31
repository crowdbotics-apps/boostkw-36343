from import_export import fields
from import_export.resources import ModelResource


class UserAdminResource(ModelResource):
    user_id = fields.Field(
        column_name='user_id',
        attribute='user_id'
    )

    first_name = fields.Field(
        column_name='first_name',
        attribute='first_name'
    )
    last_name = fields.Field(
        column_name='last_name',
        attribute='last_name'
    )
    email = fields.Field(
        column_name='email',
        attribute='email'
    )
    username = fields.Field(
        column_name='username',
        attribute='user__username'
    )
    crew = fields.Field(
        column_name='crew',
        attribute='crew__name'
    )

    is_active = fields.Field(
        column_name='is_active',
        attribute='is_active'
    )
    is_superuser = fields.Field(
        column_name='is_superuser',
        attribute='is_superuser'
    )
    is_staff = fields.Field(
        column_name='is_staff',
        attribute='is_staff'
    )
    date_joined = fields.Field(
        column_name='date_joined',
        attribute='date_joined'
    )
    profile_picture = fields.Field(
        column_name='profile_picture',
        attribute='profile_picture'
    )

    def get_queryset(self):
        return self._meta.model.objects.select_related('crew').all()
