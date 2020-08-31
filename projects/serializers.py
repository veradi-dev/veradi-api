from rest_framework import serializers
from .models import Subject, Unit, Question, History, QuestionImage
from users.serializers import UserSerializer


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ("name", "curriculum", "units")


class UnitSerializer(serializers.ModelSerializer):
    subject = serializers.SerializerMethodField()

    class Meta:
        model = Unit
        fields = (
            "subject",
            "name",
            "code",
        )

    def get_subject(self, obj):
        return obj.subject.name


class QuestionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionImage
        fields = (
            "history",
            "file",
        )


class HistorySerializer(serializers.ModelSerializer):
    images = QuestionImageSerializer(many=True)
    writer = UserSerializer()

    class Meta:
        model = History
        fields = ("question", "writer", "images", "answer")


class QuestionSerializer(serializers.ModelSerializer):
    unit = UnitSerializer(read_only=True)
    histories = HistorySerializer(many=True)

    class Meta:
        model = Question
        fields = ("id", "unit", "name", "histories", "created_at", "group")

    def validate(self, attrs):
        print(attrs)
        return attrs
