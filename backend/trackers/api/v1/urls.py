from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, viewsets

router = DefaultRouter()

router.register('customer-tracker-inputs', viewsets.CustomerTrackerInputViewSet, basename='customer_tracker_inputs')
router.register('job-processes', viewsets.JobProcessViewSet, basename='job_processes')

app_name = 'trackers'
urlpatterns = [
    path('', include(router.urls)),
    path('input-types/', views.TrackerInputListAPI.as_view(), name='tracker_inputs'),
    # path('customer-tracker-inputs/')
]
