from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import WorkHourSerializer
from .models import WorkHour


User = get_user_model()


class WorkHourViewset(viewsets.ModelViewSet):
    serializer_class = WorkHourSerializer
    queryset = WorkHour.objects.all()
    permission_classes = []

    def list(self, request):
        """
        parameter:
        user=검색하고자 하는 user의 id(pk)
        month=검색하고자 하는 달 (1-12)
        """
        user = request.user

        # target_user 를 가져온다. 가져오지 못한다면 400
        try:
            target_user = User.objects.get(pk=request.GET.get("user"))
        except User.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # month를 가져온다. month는 1~12 의 정수여야 한다. month가 없거나 1~12에 속하지 않는 경우 400
        month = request.GET.get("month")
        try:
            month = int(month)
            if not 0 < month < 13:
                raise ValueError
        except (ValueError, TypeError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # user이 target_user과 같을 경우
        if user == target_user:
            workhours = user.workhours.get_queryset().filter(month=month)
        return Response(status=status.HTTP_200_OK)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        permission_classes = []
        if self.action == "list":
            pass
        elif self.action == "create":
            pass
        elif self.action == "retrieve":
            pass
        elif self.action == "update":
            pass
        elif self.action == "partial_update":
            pass
        elif self.action == "partial_update":
            pass

        return [permission() for permission in permission_classes]
