from django.db.models import Prefetch
from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import WorkHourSerializer, WorkHourCorrectionRequestSerializer
from .models import WorkHour, WorkHourCorrectionRequest
from utils import get_aware_datetime
from django_property_filter import (
    PropertyFilterSet,
    PropertyBooleanFilter,
    PropertyNumberFilter,
    PropertyDateTimeFilter,
)


class WorkHourFilterSet(PropertyFilterSet):
    class Meta:
        model = WorkHour
        fields = ("user",)
        property_fields = [
            ("complete", PropertyBooleanFilter, ["exact"]),
            ("start", PropertyDateTimeFilter, ["lt", "exact"]),
            ("end", PropertyDateTimeFilter, ["lt", "exact"]),
            ("total", PropertyNumberFilter, ["lt", "lte", "exact", "gt", "gte"]),
        ]


User = get_user_model()


class WorkHourViewset(viewsets.ModelViewSet):
    serializer_class = WorkHourSerializer
    queryset = WorkHour.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        """
        parameter:
        user=검색하고자 하는 user의 id(pk)
        month=검색하고자 하는 달 (1-12)
        """
        user = request.user
        # target_user 를 가져온다. 가져오지 못한다면 400
        try:
            target_user = User.objects.get(pk=int(request.GET.get("user")))
        except User.DoesNotExist:
            data = {"message": "해당 유저가 없습니다."}
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data)

        # year를 가져온다. year는 2021 이상 의 정수여야 한다. year가 없거나 2021 이상에 속하지 않는 경우 400
        year = request.GET.get("year")
        try:
            year = int(year)
            if not 2021 <= year:
                raise ValueError
        except (ValueError, TypeError) as e:
            data = {"message": "올바르지 않은 년(Year)입니다."}
            return Response(status=status.HTTP_400_BAD_REQUEST, data=data)

        # month를 가져온다. month는 1~12 의 정수여야 한다. month가 없거나 1~12에 속하지 않는 경우 400
        month = request.GET.get("month", timezone.now().month)
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
            and workhour.start.date().year == year
        ]
        serializer = self.get_serializer(workhours, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    # update 는 구현하지 않는다. WorkHour 업데이트는 correction 을 통해서만 가능하다.

    @action(methods=["get", "post", "patch", "delete"], detail=False)
    def correction(self, request):
        if request.method == "GET":
            """
            근무 시간 정정 요청을 모두 가져온다.
            """
            user = request.user
            # 팀장 권한이 있는 사람만 근무 시간 정정 요청을 확인할 수 있다.
            if user.position < 3:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            # 자신이 속한 팀의 아직 결재되지 않은 모든 근무 정정을 가져온다.
            queryset = WorkHourCorrectionRequest.objects.filter(
                workhour__user__in=User.objects.filter(team=user.team),
                complete=False,
            )
            if queryset.__len__() == 0:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serializer = WorkHourCorrectionRequestSerializer(queryset, many=True)
            print(queryset)
            return Response(status=status.HTTP_200_OK, data=serializer.data)

        elif request.method == "POST":
            """
            근무 시간 정정 요청을 생성한다.
            """
            data = request.data

            datetime_str = data.pop("datetime", None)
            if datetime_str is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            data.update(
                {
                    "date": get_aware_datetime(datetime_str).date(),
                    "time": get_aware_datetime(datetime_str).time(),
                }
            )

            workhour = WorkHour.objects.get(id=data.pop("workhour").get("id"))
            serializer = WorkHourCorrectionRequestSerializer(
                data=data, partial=True, context={"workhour": workhour}
            )
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.data)

        elif request.method == "PATCH":
            """
            근무 시간 정정 요청을 결재한다. (승인 / 거절)
            """
            data = request.data
            print(data)
            wcr = WorkHourCorrectionRequest.objects.get(id=data.pop("id"))

            serializer = WorkHourCorrectionRequestSerializer(
                wcr,
                data=data,
                partial=True,
                context={
                    "workhour": data.pop("workhour"),
                    "user": request.user,
                    "approved": data.pop("approve"),
                },
            )
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        elif request.method == "DELETE":
            """
            근무 시간 정정 요청을 삭제한다.
                - 결재 이전에는 결재 생성자가 삭제 가능.
                - 결재가 된 이후는 삭제 불가능.
            """
            pass

    @action(methods=["get"], detail=False)
    def team_stat(self, request):
        """
        특정 month 의 사용자(user)가 소속된 팀의 평균 근무 시간을 초(seconds)로 제공한다.
        get으로 month가 제공되지 않으면 현재 월을 기본으로 한다.
        """
        user = request.user
        # 팀장 권한이 있는 사람만 팀원 전체의 근무시간을 확인할 수 있다.
        if user.position < 3:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            year = int(request.GET.get("year", None))
            month = int(request.GET.get("month", None))
            if year is None or month is None:
                raise ValueError
        except (ValueError, TypeError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        team = user.team
        team_members = team.users.get_queryset()
        print(team_members)
        data = []
        import time

        for member in team_members:
            print(f"workhour 불러오기 시작")
            start = time.time()
            workhours = [
                workhour
                for workhour in WorkHour.objects.filter(
                    user=member,
                )
                if workhour.start.year == year and workhour.start.month == month
            ]
            print(f"실행 시간: {time.time()-start}")

            d = {
                "name": member.get_full_name(),
                "code": member.code,
                "total": 0,  # 총 근무 시간
                "work_count": 0,  # 근무 일수
            }
            if workhours.__len__() != 0:
                # work_count 1로 시작
                d["work_count"] += 1

                prev_work_date = workhours[0].start.date()
                for workhour in workhours:
                    if workhour.complete is True and workhour.status[0] == 1:
                        d["total"] += workhour.total
                        # 근무 시간이 인정된 경우 count + 1
                        if workhour.start.date() != prev_work_date:
                            d["work_count"] += 1
                            prev_work_date = workhour.start.date()

            data.append(d)

        return Response(status=status.HTTP_200_OK, data=data)


# from django.contrib.auth import get_user_model
# from workhours.models import *
# from django.db.models import Prefetch
#
# User = get_user_model()
# EnterLog.objects.prefetch(Prefetch("workhour"))
