from django.contrib import admin
from django.http import HttpResponse
from django.urls import path


class CustomAnalyticsAdminSite(admin.AdminSite):
    def get_urls(self):
        urls = super(self.__class__, self).get_urls()
        my_urls = [
            path('analytics/crew-location/', self.admin_view(self.admin_crew_graph_by_location))
        ]
        return my_urls + urls

    def admin_crew_graph_by_location(self, request):
        return HttpResponse('ok')


admin_site = CustomAnalyticsAdminSite(name='analytics_admin')  # 5.


class CrewAnalyticsAdmin(admin.ModelAdmin):
    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('analytics/crew/graph/location/', self.admin_site.admin_view(self.admin_crew_graph_by_location))
        ]
        return my_urls + urls

    def admin_crew_graph_by_location(self, request):
        return HttpResponse('ok')

# def admin_crew_graph_by_location(request):
#     return HttpResponse('ok')
#
#
# def get_admin_urls(urls):
#     def get_urls():
#         my_urls = [
#             path('analytics/crew/graph/location/', admin_crew_graph_by_location)
#         ]
#         return my_urls + urls
#
#     return get_urls
#
#
# admin.autodiscover()
#
# admin_urls = get_admin_urls(admin.site.get_urls())
# admin.site.get_urls = admin_urls
