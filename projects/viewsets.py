import json
import datetime
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.response import Response
from projects.models import Question, Project, Subject
from projects.serializers import (
    QuestionSerializer,
    ProjectListSerializer,
    ProjectDetailSerializer,
    ProjectCreateSerializer,
)


User = get_user_model()


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return ProjectCreateSerializer
        if self.action == "retrieve":
            return ProjectDetailSerializer
        return ProjectListSerializer

    def create(self, request, *args, **kwargs):
        directors = json.loads(request.data["directors"])
        dueDates = json.loads(request.data["dueDates"])
        data = {
            "subject": Subject.objects.get(name=request.data["subject"]).pk,
            "name": request.data["name"],
            "designer": int(directors["designer"]),
            "selector": int(directors["selector"]),
            "editor": int(directors["editor"]),
            "reviewer_1": int(directors["reviewer_1"]),
            "reviewer_2": int(directors["reviewer_2"]),
            "reviewer_3": int(directors["reviewer_3"]),
            "total_due_date": datetime.datetime.strptime(
                dueDates["total_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "design_due_date": datetime.datetime.strptime(
                dueDates["design_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "select_due_date": datetime.datetime.strptime(
                dueDates["select_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "edit_due_date": datetime.datetime.strptime(
                dueDates["edit_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "review_1_due_date": datetime.datetime.strptime(
                dueDates["review_1_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "illustrate_1_due_date": datetime.datetime.strptime(
                dueDates["illustrate_1_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "review_2_due_date": datetime.datetime.strptime(
                dueDates["review_2_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "illustrate_2_due_date": datetime.datetime.strptime(
                dueDates["illustrate_2_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "review_3_due_date": datetime.datetime.strptime(
                dueDates["review_3_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "illustrate_3_due_date": datetime.datetime.strptime(
                dueDates["illustrate_2_due_date"], "%Y-%m-%dT%H:%M"
            ),
        }
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
