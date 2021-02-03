from rest_framework import serializers
from users.serializers import UserSerializer
from .models import EnterLog, WorkHour, WorkHourCorrectionRequest


class EnterLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnterLog
        fields = ("date", "time", "name", "code", "mode")


class WorkHourSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    enter_logs = EnterLogSerializer(many=True)
    status = serializers.SerializerMethodField()
    message = serializers.SerializerMethodField()
    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()
    complete = serializers.SerializerMethodField()

    def get_status(self, obj):
        return obj.status[0]

    def get_message(self, obj):
        return obj.status[1]

    def get_start(self, obj):
        return obj.start

    def get_end(self, obj):
        return obj.end

    def get_complete(self, obj):
        return obj.complete

    class Meta:
        model = WorkHour
        fields = (
            "id",
            "user",
            "enter_logs",
            "status",
            "message",
            "start",
            "end",
            "total",
            "complete",
        )
        read_only_fields = ("id", "user")


class WorkHourCorrectionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkHourCorrectionRequest
        fields = ("workhour", "mode", "date", "time", "reason", "approved", "complete")
