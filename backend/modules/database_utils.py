from django.core.exceptions import FieldError
from django.db import models


class Epoch(models.expressions.Func):
    template = 'EXTRACT(epoch FROM %(expressions)s)::INTEGER'
    output_field = models.IntegerField()


class SubqueryAggregate(models.Subquery):
    template = '(SELECT %(function)s(_agg."%(column)s") FROM (%(subquery)s) _agg)'

    def __init__(self, queryset, column, output_field=None, **extra):
        if not output_field:
            # infer output_field from field type
            output_field = queryset.model._meta.get_field(column)
        super().__init__(queryset, output_field, column=column, function=self.function, **extra)


class SubqueryAvg(SubqueryAggregate):
    function = 'AVG'


# class SubquerySum(SubqueryAggregate):
#     function = 'SUM'
class SubquerySum(models.Subquery):
    template = "(SELECT COALESCE(AVG(%(field)s), %(zero_value)s) FROM (%(subquery)s) _avg)"

    def as_sql(self, compiler, connection, template=None, **extra_context):
        if 'field' not in extra_context and 'field' not in self.extra:
            if len(self.queryset._fields) > 1:
                raise FieldError('You must provide the field name, or have a single column')
            extra_context['field'] = self.queryset._fields[0]
        if 'zero_value' not in extra_context and 'zero_value' not in self.extra:
            extra_context['zero_value'] = 0
        return super().as_sql(compiler, connection, template=template, **extra_context)


class DistinctSum(models.Sum):
    function = "SUM"
    template = "%(function)s(DISTINCT %(expressions)s)"
