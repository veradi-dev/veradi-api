# Generated by Django 3.1 on 2020-08-28 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0010_remove_questionimage_caption"),
    ]

    operations = [
        migrations.AddField(
            model_name="question",
            name="group",
            field=models.CharField(
                choices=[
                    ("TEMP", "Temp"),
                    ("RAQ", "Raq"),
                    ("QTB", "Qtb"),
                    ("PJD", "Pjd"),
                ],
                default="AAAA",
                max_length=10,
            ),
            preserve_default=False,
        ),
    ]
