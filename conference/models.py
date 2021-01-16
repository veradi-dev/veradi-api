from django.db import models
from django.contrib.auth import get_user_model
from django.core import validators
from core.models import CoreModel

User = get_user_model()


class ConferenceRoom(CoreModel):
    room_number = models.IntegerField(
        "회의실 번호",
        validators=[validators.MinValueValidator(1), validators.MaxValueValidator(3)],
    )  # 회의실은 1번부터 3번까지 있다.
    location = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.room_number}번 회의실"


class Reservation(CoreModel):
    # 회의실은 1번부터 3번까지 있다.
    room = models.ForeignKey(
        "ConferenceRoom",
        verbose_name="회의실 번호",
        related_name="reservations",
        on_delete=models.CASCADE,
    )
    # 날짜
    date = models.DateField()
    # 24시간을 30분 단위로 자른것.
    start_time = models.IntegerField(
        "회의 시작 일시 ",
        validators=[validators.MinValueValidator(0), validators.MaxValueValidator(47)],
    )
    proposer = models.ForeignKey(User, related_name="+", on_delete=models.CASCADE)

    class Meta:
        unique_together = ["date", "start_time"]
