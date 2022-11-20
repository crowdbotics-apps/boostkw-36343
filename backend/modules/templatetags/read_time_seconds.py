from django import template

register = template.Library()


@register.filter(name='seconds_to_hours')
def seconds_to_hours(value):
    from trackers.utils import seconds_to_readable_time
    readable_time = seconds_to_readable_time(value)
    return round(readable_time.get('hours'))


@register.filter(name='seconds_to_minutes')
def seconds_to_minutes(value):
    from trackers.utils import seconds_to_readable_time
    readable_time = seconds_to_readable_time(value)
    return round(readable_time.get('minutes'))
