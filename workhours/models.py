import datetime
from django.db import models
from django.contrib.auth import get_user_model
from core.models import CoreModel

User = get_user_model()


class EnterLog(CoreModel):
    MODE_CHOICE = [(1, "출근"), (2, "퇴근"), (3, "출입")]

    # 통행 날짜
    date = models.DateField()
    # 통행 시각
    time = models.TimeField()
    # 직원의 성함
    name = models.CharField(max_length=10)
    # 직원코드
    code = models.CharField(max_length=10)
    # mode 는 통행의 형태를 나타낸다. => 1: 출근 / 2: 퇴근 / 3: 통행
    mode = models.IntegerField(choices=MODE_CHOICE)
    # workhour 는 EnterLog 객체와 연결된 workhour이다.
    workhour = models.ForeignKey(
        "WorkHour", on_delete=models.SET_NULL, related_name="enter_logs", null=True
    )

    def __str__(self):
        return f"{str(self.date)} {str(self.time)} {self.name}"

    @property
    def datetime(self):
        return datetime.datetime.combine(self.date, self.time)


class WorkHour(CoreModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workhours")

    class Meta:
        ordering = ["-created_at"]

    def total_time(self):
        pass

    def status(self):
        # 정상 혹은 비정상
        pass

    def start(self):
        # enter log 중 가장 과거 객체의 datetime을 가져온다.
        pass

    def end(self):
        # enter log 중 가장 최근 객체의 datetime을 가져온다.
        pass

    # def __str__(self):
    #     return f"{self.date} {self.name} {str(self.total_work)}"
    #
    # def delete(self, using=None, keep_parents=False):
    #     EnterLog.objects.filter(
    #         date=self.start_work.date, time=self.start_work.time
    #     ).delete()
    #     EnterLog.objects.filter(
    #         date=self.end_work.date, time=self.end_work.time
    #     ).delete()
    #     super().delete()
