# Generated by Django 3.1 on 2020-09-08 04:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0019_auto_20200908_0350"),
    ]

    operations = [
        migrations.RenameField(
            model_name="project",
            old_name="illustrate_1_complete",
            new_name="illustration_1_complete",
        ),
        migrations.RenameField(
            model_name="project",
            old_name="illustrate_1_due_date",
            new_name="illustration_1_due_date",
        ),
        migrations.RenameField(
            model_name="project",
            old_name="illustrate_2_complete",
            new_name="illustration_2_complete",
        ),
        migrations.RenameField(
            model_name="project",
            old_name="illustrate_2_due_date",
            new_name="illustration_2_due_date",
        ),
        migrations.RenameField(
            model_name="project",
            old_name="illustrate_3_complete",
            new_name="illustration_3_complete",
        ),
        migrations.RenameField(
            model_name="project",
            old_name="illustrate_3_due_date",
            new_name="illustration_3_due_date",
        ),
    ]
