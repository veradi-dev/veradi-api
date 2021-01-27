from rest_framework import serializers
from users.models import Team
from users.serializers import UserSerializer, TeamSerializer
from .models import Notice


class NoticeSerializer(serializers.ModelSerializer):
    writer = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)

    class Meta:
        model = Notice
        fields = (
            "id",
            "writer",
            "team",
            "title",
            "contents",
        )
        read_only_fields = ("id", "writer", "team")

    def create(self, validated_data):
        request = self.context.get("request", None)
        assert request is not None
        writer = request.user
        instance = Notice.objects.create(writer=writer, **validated_data)
        return instance
