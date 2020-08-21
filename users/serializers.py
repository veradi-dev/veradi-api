from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    code = serializers.CharField(write_only=True)
    department = serializers.SerializerMethodField()
    rank = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    position = serializers.SerializerMethodField()

    def get_department(self, obj):
        return obj.get_department_name()

    def get_rank(self, obj):
        return obj.get_rank_display()

    def get_team(self, obj):
        return obj.get_team_name()

    def get_position(self, obj):
        return obj.get_position_display()

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "code",
            "department",
            "rank",
            "team",
            "position",
            "email_verified",
            "approved",
        )
        read_only_fields = (
            "id",
            "username",
            "code",
        )
