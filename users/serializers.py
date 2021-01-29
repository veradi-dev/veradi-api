from django.contrib.auth import get_user_model
from rest_framework import serializers
from workhours.models import WorkHour
from .models import Team


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
        )
        read_only_fields = (
            "id",
            "username",
            "code",
        )


class TeamMemberSerializer(serializers.ModelSerializer):
    """
    get_team_members 액션을 위한 Serializer
    """

    isWorking = serializers.SerializerMethodField()
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

    def get_isWorking(self, obj):
        from workhours.serializers import WorkHourSerializer
        try:
            return WorkHourSerializer(
                obj.workhours.get_queryset().latest("created_at")
            ).data
        except WorkHour.DoesNotExist:
            return None
        

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "department",
            "rank",
            "team",
            "position",
            "isWorking",
        )
        read_only_fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "department",
            "rank",
            "team",
            "position",
        )


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("department", "name")
