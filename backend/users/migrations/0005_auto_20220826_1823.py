# Generated by Django 2.2.28 on 2022-08-26 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20220826_1624'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='job_title',
            field=models.CharField(blank=True, choices=[('installer', 'Installer'), ('lead_installer', 'Lead Installer'), ('foreman', 'Foreman'), ('electrician', 'Electrician'), ('pv_installer', 'PV Installer')], default='', max_length=20, null=True, verbose_name='Job Title'),
        ),
    ]
