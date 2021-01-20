from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Team, Department

User = get_user_model()


@admin.register(User)
class UserAdmin(UserAdmin):
    # form = CustomUserModelForm
    readonly_fields = ("get_department_name",)
    # 외부 패널
    list_display = (
        "username",
        "__str__",
        "email",
        "code",
        "get_department_name",
        "get_team_name",
    )

    # 내부 패널
    fieldsets = (
        ("계정 정보", {"fields": ("username", "password", "last_login", "date_joined")}),
        (
            "권한",
            {
                "fields": ("is_active", "is_staff", "is_superuser"),
            },
        ),
        (
            "베라디 인적 사항",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "code",
                    "approved",
                    "get_department_name",
                    "rank",
                    "team",
                    "position",
                ),
            },
        ),
    )


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    pass


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    pass
