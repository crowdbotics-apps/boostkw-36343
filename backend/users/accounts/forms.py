from allauth.account.adapter import get_adapter
from allauth.account.forms import ResetPasswordForm, default_token_generator
from allauth.account.utils import user_pk_to_url_str, user_username
from allauth.utils import build_absolute_uri
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings


class CustomResetPasswordForm(ResetPasswordForm):
    def _send_password_reset_mail(self, request, email, users, **kwargs):
        token_generator = kwargs.get("token_generator", default_token_generator)

        for user in users:

            temp_key = token_generator.make_token(user)

            # save it to the password reset model
            # password_reset = PasswordReset(user=user, temp_key=temp_key)
            # password_reset.save()

            # send the password reset email
            path = reverse(
                "account_reset_password_from_key",
                kwargs=dict(uidb36=user_pk_to_url_str(user), key=temp_key),
            )
            url = build_absolute_uri(request, path)

            context = {
                "current_site": get_current_site(request),
                "user": user,
                "password_reset_url": url,
                "request": request,
            }

            subject_template_name = 'account/email/email_password_reset_subject.txt'

            if settings.ACCOUNT_AUTHENTICATION_METHOD != 'email':
                context["username"] = user_username(user)
            get_adapter(request).send_mail(
                "account/email/password_reset_key", email, context
            )
