from django.contrib import admin
from .models import EnterLog, WorkHour


@admin.register(EnterLog)
class EnterLogAdmin(admin.ModelAdmin):
    pass


@admin.register(WorkHour)
class WorkHourAdmin(admin.ModelAdmin):
    pass
