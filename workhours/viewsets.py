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

    @action(methods=["get", "post"], detail=False)
    def correction(self, request):
        print("correction")
        if request.method == "GET":
            print("get")
            return Response()

        elif request.method == "POST":
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
            serializer = WorkHourCorrectionRequestSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.data)
