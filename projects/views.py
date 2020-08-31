from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Subject, Unit, Question, History
from .serializers import UnitSerializer, QuestionSerializer, QuestionImage
from .utils import create_question_name


User = get_user_model()  # 나중에 삭제할 것


@api_view(["get"])
def get_units(request, subject):
    try:
        subject_obj = Subject.objects.get(name=subject)
        units = subject_obj.units
        return Response(
            data=UnitSerializer(units, many=True).data, status=status.HTTP_200_OK
        )
    except Subject.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


class QuestionRegisterView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            data = request.data
            subject = data["subject"]
            unit = data["unit"]
            answer = int(data["answer"])
            images = request.FILES
            unit_obj = Unit.objects.get(subject__name=subject, code=unit)
            question_obj, _ = Question.objects.get_or_create(
                unit=unit_obj,
                name=create_question_name(
                    subject,
                    unit,
                    User.objects.get(username=1),
                    (timezone.now()).strftime("%y%m%d"),
                ),
            )

            history_obj = History.objects.create(
                question=question_obj,
                writer=User.objects.get(username=1),
                answer=answer,
            )

            for key in images.keys():
                question_image_obj = QuestionImage.objects.create(
                    history=history_obj, file=images[key],
                )
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
