from django.urls import path
from .views import *

app_name = 'accounts'

urlpatterns = [
    path('password/reset/', CustomPasswordResetView.as_view(), name='account_reset_password'),
]
