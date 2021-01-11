from rest_framework import serializers
from users.serializers import UserSerializer
from .models import EnterLog, WorkHour


class EnterLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnterLog
        fields = ("date", "time", "name", "code", "mode")


class WorkHourSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    enter_logs = EnterLogSerializer(many=True)
    status = serializers.SerializerMethodField()
    message = serializers.SerializerMethodField()
    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()

    def get_status(self, obj):
        return obj.status[0]

    def get_message(self, obj):
        return obj.status[1]

    def get_start(self, obj):
        return obj.start

    def get_end(self, obj):
        return obj.end

    class Meta:
        model = WorkHour
        fields = ('user', 'enter_logs', 'status', 'message', 'start', 'end')
