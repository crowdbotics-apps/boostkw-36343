from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views, viewsets
from dj_rest_auth.registration.views import (VerifyEmailView, ResendEmailVerificationView)
from dj_rest_auth.views import (
    LogoutView, PasswordChangeView, PasswordResetConfirmView,
    PasswordResetView,
)

router = DefaultRouter()
router.register('signup', viewsets.SignupViewSet, basename='signup')
# router.register('login', viewsets.LoginViewSet, basename='login')

app_name = 'accounts'

urlpatterns = [
    path('', include(router.urls)),
    path('login/token/', views.AccountTokenLoginAPIView.as_view(), name='token_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('delete/', views.AccoutnDeleteAPIView.as_view(), name='account_delete'),
    path('profile/', views.AccountAuthUserProfileAPIView.as_view(), name='account_profile'),
    # path('dj-rest-auth/', include('dj_rest_auth.urls')),
    # path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    # password urls
    path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    # end password urls

    # verification urls
    path('registration/verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('registration/resend-email/', ResendEmailVerificationView.as_view(), name='rest_resend_email'),
    # end verification urls
]
