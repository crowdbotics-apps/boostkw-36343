from django.apps import AppConfig


class TrackersConfig(AppConfig):
    name = 'trackers'

    def ready(self):
        try:
            import trackers.signals
        except ImportError:
            pass
