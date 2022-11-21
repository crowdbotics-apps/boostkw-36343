from django import template

register = template.Library()


@register.filter(name='seconds_to_hours')
def seconds_to_hours(value):
    if int(value) >= 0:
        hours = round(int(value) / 3600)
        return hours
    return 0


@register.filter(name='seconds_to_minutes')
def seconds_to_minutes(value):
    if int(value) >= 0:
        minutes = round(int(value) / 60)
        return minutes
    return 0
