# Generated by Django 3.1 on 2021-01-20 12:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=300, verbose_name='제목')),
                ('contents', models.CharField(max_length=5000, verbose_name='내용')),
                ('team', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='notices', to='users.team', verbose_name='영역')),
                ('writer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL, verbose_name='글쓴이')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
