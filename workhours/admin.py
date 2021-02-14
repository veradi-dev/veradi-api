from django.contrib import admin
from .models import EnterLog, WorkHour, WorkHourCorrectionRequest


class EnterLogInline(admin.TabularInline):
    model = EnterLog


@admin.register(EnterLog)
class EnterLogAdmin(admin.ModelAdmin):
    pass


@admin.register(WorkHour)
class WorkHourAdmin(admin.ModelAdmin):
    inlines = (EnterLogInline,)


@admin.register(WorkHourCorrectionRequest)
class WorkHourCorrectionRequestAdmin(admin.ModelAdmin):
    pass
