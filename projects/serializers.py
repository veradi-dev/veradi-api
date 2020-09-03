import json
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Subject, Unit, Question, History, QuestionImage, Project
from users.serializers import UserSerializer


User = get_user_model()


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


class ProjectSerializer(serializers.ModelSerializer):
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())
    designer = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    selector = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    editor = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    reviewer_1 = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    reviewer_2 = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    reviewer_3 = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Project
        fields = (
            "subject",
            "name",
            "designer",
            "selector",
            "editor",
            "reviewer_1",
            "reviewer_2",
            "reviewer_3",
            "total_due_date",
            "selector_due_date",
            "editor_due_date",
            "illustrator_due_date",
            "reviewer_1_due_date",
            "reviewer_2_due_date",
            "reviewer_3_due_date",
        )
