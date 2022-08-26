from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, viewsets

router = DefaultRouter()

app_name = 'feedbacks'
urlpatterns = [
    # path('', include(router.urls)),
    path('user-feedback/', views.UserFeedbackCreateAPIView.as_view(), name='user_feedback_create')
]
