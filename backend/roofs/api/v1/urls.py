from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, viewsets

router = DefaultRouter()

app_name = 'roofs'
urlpatterns = [
    # path('', include(router.urls)),
    path('types/', views.RoofTypeListAPI.as_view(), name='roof_types')
]
