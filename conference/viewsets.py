from django.utils import timezone
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .serializers import ReservationSerializer
from .models import Reservation


class ConferenceViewSet(viewsets.ModelViewSet):
    """
    회의실 예약 생성 / 조회 / 변경 / 삭제 를 위한 API

    회의실 예약 모델
    class Reservation(CoreModel):
        room = models.ForeignKey(
            "ConferenceRoom",
            verbose_name="회의실 번호",
            related_name="reservations",
            on_delete=models.CASCADE,
        )
        date = models.DateField()
        start_time = models.IntegerField(
            "회의 시작 일시 ",
            validators=[validators.MinValueValidator(0), validators.MaxValueValidator(23)],
        )  # 회의실은 1번부터 3번까지 있다.
        proposer = models.ForeignKey(User, related_name="+", on_delete=models.CASCADE)

        class Meta:
            unique_together = ["date", "start_time"]
    """

    serializer_class = ReservationSerializer
    queryset = Reservation.objects.all()
    permission_classes = []

    def list(self, request):
        """
        로그인 한 유저의 대상의 요청이 들어올 경우
        특정 일(date)의 회의실 예약 기록을 보내준다.

        method: GET
        query:
            year(int): require,
            month(int): require,
            day(int): require

        response:
            [
                {
                    "room": 1,
                    "date": "2021-01-17",
                    "start_time": 4,
                    "proposer": 1,
                    "team": "기술개발 본부팀"
                }
            ]

        """
        year = request.GET.get("year")
        month = request.GET.get("month")
        day = request.GET.get("day")

        try:
            if year is not None and month is not None and day is not None:
                year, month, day = int(year), int(month), int(day)
                date = timezone.datetime(year, month, day)
            else:
                raise TypeError
        except (ValueError, TypeError):
            date = timezone.now()

        reservations = self.get_queryset().filter(date=date)
        serializer = self.get_serializer(reservations, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    def create(self, request):
        """
        특정 일(date)의 회의실 예약 기록을 보내준다.

        method: POST
        data type:
            {
                room: '1'
                date: '2021-01-16'
                start_time: '10'
                proposer: '1'
            }

        response:
            [
                {
                    "room": 1,
                    "date": "2021-01-17",
                    "start_time": 4,
                    "proposer": 1,
                    "team": "기술개발 본부팀"
                }
            ]
        """
        serializer = self.get_serializer(
            data=request.data, context={"request", request}
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def update(self, request, *args, **kwargs):
        # 업데이트 기능 지원 안함. 삭제했다 새로 만들어야 함.
        return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # 회의실 예약 기록을 삭제할 수 있는 사람
        # 1. 본인 2. 해당 팀의 상급자
        if request.user.position < instance.proposer.position:
            return Response(status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
