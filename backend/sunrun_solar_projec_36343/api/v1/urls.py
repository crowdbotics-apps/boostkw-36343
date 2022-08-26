from django.urls import path, include

app_name = 'api_v1'

urlpatterns = [
    # path('modules/', include('modules.api.v1.urls', namespace='modules')),
    path('accounts/', include('users.accounts.api.v1.urls', namespace='accounts')),
    path('users/', include('users.api.v1.urls', namespace='users')),
    # path('athletes/', include('athletes.api.v1.urls', namespace='athletes')),
    # path('companies/', include('companies.api.v1.urls', namespace='companies')),
    # path('chats/', include('chats.api.v1.urls', namespace='chats')),
    # path('subscriptions/', include('subscriptions.api.v1.urls', namespace='subscriptions')),
    # path('stripe/', include('payments.stripe.api.v1.urls', namespace='stripe')),
    # path('payments/', include('payments.api.v1.urls', namespace='payments')),
    path('feedbacks/', include('feedbacks.api.v1.urls', namespace='feedbacks')),
    path('crews/', include('crews.api.v1.urls', namespace='crews')),
    path('roofs/', include('roofs.api.v1.urls', namespace='roofs')),
    path('trackers/', include('trackers.api.v1.urls', namespace='trackers')),
]
