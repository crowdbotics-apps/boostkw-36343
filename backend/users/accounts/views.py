from allauth.account.views import PasswordResetView
from django.http import HttpResponse
from django.views import View
from django.views.generic import TemplateView

from .forms import CustomResetPasswordForm


class CustomPasswordResetView(PasswordResetView):
    form_class = CustomResetPasswordForm


def tiktok_authorize_view(request):
    code = request.GET.get('code')
    scopes = request.GET.get('scopes')
    state = request.GET.get('state')
    print(code)
    return HttpResponse(code)
