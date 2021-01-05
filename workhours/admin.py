from django.contrib import admin
from .models import EnterLog


@admin.register(EnterLog)
class EnterLogAdmin(admin.ModelAdmin):
    pass
