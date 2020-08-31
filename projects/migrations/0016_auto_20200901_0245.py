# Generated by Django 3.1 on 2020-09-01 02:45

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0015_auto_20200901_0216"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="editor_due_date",
            field=models.DateTimeField(
                default=django.utils.timezone.now, verbose_name="편집 마감기한"
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="illustrator_due_date",
            field=models.DateTimeField(
                default=django.utils.timezone.now, verbose_name="일러 마감기한"
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="reviewer_1_due_date",
            field=models.DateTimeField(
                default=django.utils.timezone.now, verbose_name="1차 피드백 마감기한"
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="reviewer_2_due_date",
            field=models.DateTimeField(
                default=django.utils.timezone.now, verbose_name="2차 피드백 마감기한"
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="reviewer_3_due_date",
            field=models.DateTimeField(
                default=django.utils.timezone.now, verbose_name="3차 피드백 마감기한"
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="selector_due_date",
            field=models.DateTimeField(
                default=django.utils.timezone.now, verbose_name="대상 선정 마감기한"
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="total_due_date",
            field=models.DateTimeField(
                default=django.utils.timezone.now, verbose_name="전체 마감기한"
            ),
        ),
    ]
