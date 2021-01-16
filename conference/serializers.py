from .models import Reservation
from rest_framework import serializers


class ReservationSerializer(serializers.ModelSerializer):
    team = serializers.SerializerMethodField()

    def get_team(self, obj):
        user = obj.proposer
        return user.get_team_name() + "팀"

    #
    # def validate(self, values):
    #     print(values)
    #     return super().validate(values)
    #
    # def create(self, validated_data):
    #     print("Create")
    #     print("OK...")
    #     raise Exception

    class Meta:
        model = Reservation
        fields = ("room", "date", "start_time", "proposer", "team")
