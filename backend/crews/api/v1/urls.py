from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, viewsets

router = DefaultRouter()

app_name = 'crews'
urlpatterns = [
    # path('', include(router.urls)),
    path('', views.CrewListAPI.as_view(), name='crew_list')
]
