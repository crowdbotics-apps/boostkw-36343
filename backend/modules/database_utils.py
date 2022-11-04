from django.db import models


class Epoch(models.expressions.Func):
    template = 'EXTRACT(epoch FROM %(expressions)s)::INTEGER'
    output_field = models.IntegerField()
