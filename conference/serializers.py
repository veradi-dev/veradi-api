import datetime
from django.utils import timezone
from .models import Reservation
from rest_framework import serializers


class ReservationSerializer(serializers.ModelSerializer):
    team = serializers.SerializerMethodField()

    def get_team(self, obj):
        try:
            user = obj.proposer
        except AttributeError:
            user = obj["proposer"]
        return user.get_team_name()

    def validate_proposer(self, value):
        user = self.context["request"].user
        if value.position == 1 or user != value:
            raise serializers.ValidationError({"error": "회의실 예약 권한이 없습니다."})
        return value

    def create(self, validated_data):
        # 회의실 예약은 반드시 미래의 시간에 대해서만 가능하다.
        date = validated_data["date"]
        start_time = validated_data["start_time"]
        hour, minute = divmod(start_time, 2)
        minute *= 30
        d_datetime = timezone.datetime.combine(
            date,
            datetime.time(hour, minute),
            tzinfo=timezone.timezone(timezone.timedelta(hours=9)),
        )
        if d_datetime < timezone.localtime():
            raise serializers.ValidationError(
                {"error": f"{d_datetime}은 예약이 불가능한 시간입니다."}
            )

        # super().create()에서 reservation을 생성하고 return 한다.
        return super().create(validated_data)

    def update(self, request, pk=None):
        pass

    class Meta:
        model = Reservation
        fields = ("room", "date", "start_time", "proposer", "team")
