from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


def job_code_validator(value):
    value_len = len(value)
    if value_len != 12:
        # print('length requried exact: 12')
        raise ValidationError(_('Invalid Format. Example: 123A-456BCDE. Exact 12 Characters needed.'))
    else:
        if not value[0:3] or not value[0:3].isnumeric():
            # print('invalid first 3 number')
            raise ValidationError(_('Invalid Format. Example: 123A-456BCDE'))

        if not value[3] or not value[3].isalpha():
            # print('invalid 4 char')
            raise ValidationError(_('Invalid Format. Example: 123A-456BCDE'))

        if not value[4] or value[4] != '-':
            # print('\"\-\"\ missing')
            raise ValidationError(_('Invalid Format. Example: 123A-456BCDE'))
        if not value[5:8] or not value[5:8].isnumeric():
            # print('invalid middle 3 number')
            raise ValidationError(_('Invalid Format. Example: 123A-456BCDE'))
        if not value[8:12] or not value[8:12].isalpha():
            # print('invalid middle 3 number')
            raise ValidationError(_('Invalid Format. Example: 123A-456BCDE'))
    return value
