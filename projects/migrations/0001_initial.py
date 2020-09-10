# Generated by Django 3.1 on 2020-09-11 07:55

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Assessment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('difficulty', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='난이도')),
                ('novelty', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='참신성')),
                ('sympathy', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='호감도')),
                ('integrity', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='구성력')),
                ('application', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='단원응용력')),
                ('size', models.IntegerField(choices=[(1, '소'), (2, '중'), (3, '대')], default=2, verbose_name='크기')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('answer', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, verbose_name='모의고사 명')),
                ('total_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='전체 마감기한')),
                ('design_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='설계 마감기한')),
                ('select_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='대상 선정 마감기한')),
                ('edit_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='편집 마감기한')),
                ('review_1_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='1차 피드백 마감기한')),
                ('illustration_1_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='일러 1차 마감기한')),
                ('review_2_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='2차 피드백 마감기한')),
                ('illustration_2_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='일러 2차 마감기한')),
                ('review_3_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='3차 피드백 마감기한')),
                ('illustration_3_due_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='일러 3차 마감기한')),
                ('design_complete', models.BooleanField(default=False)),
                ('select_complete', models.BooleanField(default=False)),
                ('edit_complete', models.BooleanField(default=False)),
                ('review_1_complete', models.BooleanField(default=False)),
                ('illustration_1_complete', models.BooleanField(default=False)),
                ('review_2_complete', models.BooleanField(default=False)),
                ('illustration_2_complete', models.BooleanField(default=False)),
                ('review_3_complete', models.BooleanField(default=False)),
                ('illustration_3_complete', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('curriculum', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('code', models.CharField(max_length=50)),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='units', to='projects.subject')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('file', models.ImageField(upload_to='question_images')),
                ('history', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='projects.history')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
                ('group', models.CharField(choices=[('UNDEFINED', 'Undefined'), ('TEMP', 'Temp'), ('RAQ', 'Raq'), ('QTB', 'Qtb'), ('PJD', 'Pjd')], default='UNDEFINED', max_length=10)),
                ('project', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='projects.project')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='projects.unit')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
