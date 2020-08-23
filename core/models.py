from django.db import models
from core.managers import CustomModelManager


class CoreModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomModelManager()

    class Meta:
        abstract = True
