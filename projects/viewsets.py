import json
import datetime
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.response import Response
from projects.models import Question, Project, Subject
from projects.serializers import QuestionSerializer, ProjectSerializer


User = get_user_model()


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

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
            "total_due_date": dueDates["total_due_date"],
            "designer_due_date": datetime.datetime.strptime(
                dueDates["designer_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "selector_due_date": datetime.datetime.strptime(
                dueDates["selector_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "editor_due_date": datetime.datetime.strptime(
                dueDates["editor_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "illustrator_due_date": datetime.datetime.strptime(
                dueDates["illustrator_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "reviewer_1_due_date": datetime.datetime.strptime(
                dueDates["reviewer_1_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "reviewer_2_due_date": datetime.datetime.strptime(
                dueDates["reviewer_2_due_date"], "%Y-%m-%dT%H:%M"
            ),
            "reviewer_3_due_date": datetime.datetime.strptime(
                dueDates["reviewer_3_due_date"], "%Y-%m-%dT%H:%M"
            ),
        }
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)
