from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
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

        # user == target_user 이거나 target_user의 position보다 user의 position이 높고,
        # 그리고 user.team == target_user.team 인 경우
        if (
            target_user.position <= user.position and user.team == target_user.team
        ) or user == target_user:
            workhours = [
                workhour
                for workhour in user.workhours.get_queryset()
                if workhour.start.date().month == month
            ]
            serializer = self.get_serializer(workhours, many=True)
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        else:
            # 여기로 넘어온 경우는 user이 target_user가 아니고, target_user의 position이 user보다 높거나 같은 팀이 아닌 것이다
            # 이 경우 403을 Response 로 보낸다
            return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def team_average_time(self, request):
        """
        특정 month 의 사용자(user)가 소속된 팀의 평균 근무 시간을 초(seconds)로 제공한다.
        get으로 month가 제공되지 않으면 현재 월을 기본으로 한다.
        """
        user = request.user
        team = user.team
        month = request.GET.get("month")
        now = timezone.now()
        if month is None:
            month = now.month

        # total은 해당 월에 모든 팀원이 근무한 근무시간의 총합을 초(seconds)로 나타낸 것이다.
        # 만약 지난 달이면, total을 30으로 나누고, 아직 해당 월이 다 끝나지 않았으면, 지금이 몇 일인지(day) 를 가져와서 나눈다.
        total = 0
        for team_member in team.users.get_queryset():
            for workhour in team_member.workhours.get_queryset():
                if workhour.start.month == month:
                    total += workhour.total if workhour.total is not False else 0
        avg_per_date = int(total / now.day) if month == now.month else int(total / 30)
        avg_per_person = int(total / team.users.get_queryset().__len__())
        data = {"avg_per_date": avg_per_date, "avg_per_person": avg_per_person}
        return Response(status=status.HTTP_200_OK, data=data)

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
