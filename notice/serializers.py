from rest_framework import serializers
from .models import Notice
from users.serializers import UserSerializer


class NoticeSerializer(serializers.ModelSerializer):
    writer = UserSerializer()

    class Meta:
        model = Notice
        fields = (
            "writer",
            "team",
            "title",
            "contents",
        )
        read_only_fields = ('writers', )
