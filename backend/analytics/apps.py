from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig


class AnalyticsConfig(AppConfig):
    name = 'analytics'
    default_site = 'analytics.admin.CustomAnalyticsAdminSite'



# class CustomAnalyticsAdminConfig(AdminConfig):
#     name = 'analytics_admin'
#     default_site = 'analytics.admin.CustomAnalyticsAdminSite'
