# Generated by Django 4.2.1 on 2023-06-28 18:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_employee_dt_end_employee_dt_start_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='vacancy_days',
            new_name='vacation_days',
        ),
    ]
