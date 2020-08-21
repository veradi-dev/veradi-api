from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    code = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
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
