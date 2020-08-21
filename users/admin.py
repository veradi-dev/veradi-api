from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django import forms
from . import models

User = get_user_model()


class CustomUserModelForm(forms.ModelForm):
    class Meta:
        model = User
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = kwargs["instance"]
        if self.user.department is not None:
            self.fields["team"].queryset = models.Team.objects.filter(
                name__contains=self.user.department.name
            )


@admin.register(models.User)
class UserAdmin(UserAdmin):
    form = CustomUserModelForm
    # 외부 패널
    list_display = (
        "username",
        "__str__",
        "email",
        "code",
        "get_department_name",
        "get_team_name",
        "is_active",
    )

    # 내부 패널
    fieldsets = (
        ("계정 정보", {"fields": ("username", "password", "last_login", "date_joined")}),
        ("권한", {"fields": ("is_active", "is_staff", "is_superuser"),}),
        (
            "베라디 인적 사항",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "code",
                    "approved",
                    "department",
                    "rank",
                    "team",
                    "position",
                ),
            },
        ),
    )


@admin.register(models.Department)
class DepartmentAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Team)
class TeamAdmin(admin.ModelAdmin):
    pass
