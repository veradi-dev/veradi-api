import json
import datetime
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.response import Response
from projects.models import Question, Project
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
            "subject": request.data["subject"],
            "name": request.data["name"],
            "designer": User.objects.get(id=int(directors["designer"])),
            "selector": User.objects.get(id=int(directors["selector"])),
            "editor": User.objects.get(id=int(directors["editor"])),
            "reviewer_1": User.objects.get(id=int(directors["reviewer_1"])),
            "reviewer_2": User.objects.get(id=int(directors["reviewer_2"])),
            "reviewer_3": User.objects.get(id=int(directors["reviewer_3"])),
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
        # try:
        #     Project.objects.create(**data)
        #     return Response(status=status.HTTP_200_OK)
        # except:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
