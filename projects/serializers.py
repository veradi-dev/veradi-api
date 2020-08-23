from rest_framework.serializers import ModelSerializer
from .models import Subject, Unit


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = ("name", "curriculum", "units")


class UnitSerializer(ModelSerializer):
    class Meta:
        model = Unit
        fields = (
            "name",
            "code",
        )
