from rest_framework import serializers
from .models import Subject, Unit, Question, History, QuestionImage


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ("name", "curriculum", "units")


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = (
            "name",
            "code",
        )


class QuestionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionImage
        fields = (
            "history",
            "file",
            "caption",
        )


class HistorySerializer(serializers.ModelSerializer):
    images = QuestionImageSerializer(many=True)

    class Meta:
        model = History
        fields = (
            "question",
            "writer",
            "images",
            "difficulty",
            "novelty",
            "integrity",
            "order",
            "size",
            "complete",
        )


class QuestionSerializer(serializers.ModelSerializer):
    unit = UnitSerializer(read_only=True)
    histories = HistorySerializer(many=True)

    class Meta:
        model = Question
        fields = (
            "id",
            "unit",
            "name",
            "histories",
        )

    def validate(self, attrs):
        print(attrs)
        return attrs
