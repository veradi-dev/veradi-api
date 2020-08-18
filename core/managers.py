from django.db import models
from django.contrib.auth.models import UserManager


class CustomModelManager(models.Manager):
    def __init__(self):
        super().__init__()

    def get_or_none(self, **kwargs):
        try:
            return self.get(**kwargs)
        except self.model.DoesNotExist:
            return None

    def is_exist(self, **kwargs):
        try:
            self.get(**kwargs)
            return True
        except self.model.DoesNotExist:
            return False


class CustomUserManager(CustomModelManager, UserManager):
    pass
