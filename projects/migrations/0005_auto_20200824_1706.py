# Generated by Django 3.1 on 2020-08-24 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0004_auto_20200824_1542"),
    ]

    operations = [
        migrations.AlterField(
            model_name="history",
            name="size",
            field=models.IntegerField(
                choices=[(1, "소"), (2, "중"), (3, "대")], default=2, max_length=10
            ),
        ),
    ]
