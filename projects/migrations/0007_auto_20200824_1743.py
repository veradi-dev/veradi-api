# Generated by Django 3.1 on 2020-08-24 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0006_auto_20200824_1706"),
    ]

    operations = [
        migrations.AlterField(
            model_name="questionimage",
            name="file",
            field=models.ImageField(upload_to="upload/"),
        ),
    ]
