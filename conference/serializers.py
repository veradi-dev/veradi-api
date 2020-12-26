from .models import Reservation
from rest_framework import serializers


class ReservationSerializer(serializers.ModelSerializer):
    team = serializers.SerializerMethodField()

    def get_team(self, obj):
        user = obj.proposer
        return user.get_team_name() + "팀"

    class Meta:
        model = Reservation
        fields = ("room", "date", "start_time", "proposer", "team")
