from import_export import fields
from import_export.resources import ModelResource


class FeedbackAdminResource(ModelResource):
    user_id = fields.Field(
        column_name='user_id',
        attribute='user_id'
    )
    feedback_id = fields.Field(
        column_name='feedback_id',
        attribute='id'
    )
    first_name = fields.Field(
        column_name='first_name',
        attribute='user__first_name'
    )
    last_name = fields.Field(
        column_name='last_name',
        attribute='user__last_name'
    )
    email = fields.Field(
        column_name='email',
        attribute='user__email'
    )
    username = fields.Field(
        column_name='username',
        attribute='user__username'
    )
    crew = fields.Field(
        column_name='crew',
        attribute='user__crew__name'
    )

    rating = fields.Field(
        column_name='rating',
        attribute='rating'
    )

    comment = fields.Field(
        column_name='comment',
        attribute='comment'
    )

    created = fields.Field(
        column_name='created',
        attribute='created'
    )

    updated = fields.Field(
        column_name='updated',
        attribute='updated'
    )

    def get_queryset(self):
        return self._meta.model.objects.select_related('user', 'user__crew').all()
