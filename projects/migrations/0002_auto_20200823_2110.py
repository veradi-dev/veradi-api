# Generated by Django 3.1 on 2020-08-23 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(model_name="question", name="curriculum",),
        migrations.AddField(
            model_name="subject",
            name="curriculum",
            field=models.IntegerField(default=0),
        ),
    ]
