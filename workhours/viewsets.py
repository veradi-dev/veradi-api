from django.contrib.auth import get_user_model
from django.db.models import Q
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
            data = {"message": "해당 유저가 없습니다."}
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data)

        # month를 가져온다. month는 1~12 의 정수여야 한다. month가 없거나 1~12에 속하지 않는 경우 400
        month = request.GET.get("month")
        try:
            month = int(month)
            if not 0 < month < 13:
                raise ValueError
        except (ValueError, TypeError) as e:
            data = {"message": "올바르지 않은 월(Month)입니다."}
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data)

        # user이 target_user가 아니고, target_user의 position이 user보다 높으면 403
        if target_user.position >= user.position and user != target_user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        # user == target_user 이거나 target_user의 position보다 user의 position이 높은 경우
        workhours = [
            workhour
            for workhour in user.workhours.get_queryset()
            if workhour.start.date().month == month
        ]
        serializer = self.get_serializer(workhours, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        permission_classes = []
        if self.action == "list":
            permission_classes = [IsAuthenticated]
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
