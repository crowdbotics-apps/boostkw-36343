from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, viewsets

router = DefaultRouter()

app_name = 'trackers'
urlpatterns = [
    # path('', include(router.urls)),
    path('input-types/', views.TrackerInputListAPI.as_view(), name='tracker_inputs'),
]
