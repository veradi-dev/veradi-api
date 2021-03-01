import datetime
from django.utils import timezone
from django.db import models
from django.contrib.auth import get_user_model
from core.models import CoreModel
from utils import seconds_to_time


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

    class Meta:
        ordering = ["date", "time"]


class WorkHour(CoreModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workhours")

    class Meta:
        ordering = ["-created_at"]

    @property
    def complete(self):
        # Workhour 객체는
        # 1. 출근 기록이 없거나
        # 2. 마지막 EnterLog으로부터 현 6시간이 지났거나
        # 3. 마지막 EnterLog의 mode가 2일때, 종결된 상태이다.

        # 종결되었을때: True 반환
        # 진행중일때: False 반환

        now = timezone.now().timestamp()
        latest_enterlog = self.enter_logs.get_queryset().latest("created_at")
        if (
            self.enter_logs.get_queryset().filter(mode=1).__len__() == 0  # 1
            or latest_enterlog.mode == 2  # 2
            or now - latest_enterlog.datetime.timestamp() >= 21600  # 3
        ):
            return True
        else:
            return False

    @property
    def start(self):
        # enter log 중 가장 과거 객체의 datetime을 가져온다.
        # mode 1이 있으면 가장 과거의 1을 가져온다.
        enter_logs = self.enter_logs.get_queryset()
        for enter_log in enter_logs:
            if enter_log.mode == 1:
                return enter_log.datetime
        return enter_logs[0].datetime

    @property
    def end(self):
        # enter log 중 가장 최근 객체의 datetime을 가져온다.
        # mode 2가 있으면 2를 가져온다.
        enter_logs = self.enter_logs.get_queryset().reverse()
        for enter_log in enter_logs:
            if enter_log.mode == 2:
                return enter_log.datetime
        return enter_logs[0].datetime

    @property
    def total(self):
        if self.status[0] != 1:
            return False
        return (self.end - self.start).seconds

    @property
    def status(self):
        """
        return:
        (1, "정상입니다.")
        (2, "출근 기록이 없습니다.")
        (3, "퇴근 기록이 없습니다.")
        (4, "출 / 퇴근 기록이 모두 없습니다.")
        """
        # enter log 중 mode 1 과 mode 2 가 모두 들어 있으면 정상
        # 아니면 비정상이다.

        _MODE1_EXIST = False
        _MODE2_EXIST = False

        enter_logs = self.enter_logs.get_queryset()
        for enter_log in enter_logs:
            if enter_log.mode == 1:
                _MODE1_EXIST = True
            if enter_log.mode == 2:
                _MODE2_EXIST = True

        if _MODE1_EXIST and _MODE2_EXIST:
            return (1, "정상입니다.")
        elif _MODE1_EXIST:
            return (3, "퇴근 기록이 없습니다.")
        elif _MODE2_EXIST:
            return (2, "출근 기록이 없습니다.")
        else:
            return (4, "출 / 퇴근 기록이 모두 없습니다.")

    def data(self):
        """
        status code 가 1 (정상적으로 출 퇴근 기록이 있는 경우):
        Return: dict
        {status, message, hours, minutes, seconds}

        status code 가 1이 아닌 경우 (출 / 퇴근 기록 중 하나가 없는 경우):
        Return: dict
        {status, message}
        """
        status_code = self.status[0]
        message = self.status[1]
        if status_code == 1:
            hours, minutes, seconds = seconds_to_time((self.end - self.start).seconds)
            return {
                "status": status_code,
                "message": message,
                "hours": hours,
                "minutes": minutes,
                "seconds": seconds,
            }
        else:
            # 에러 메시지 Return
            return {"status": status_code, "message": message}

    def __str__(self):
        if self.status[0] == 1:
            return (
                f"{self.user.get_full_name()} "
                f"{self.start.strftime('%Y.%m.%d %H:%M:%S')} ~ {self.end.strftime('%Y.%m.%d %H:%M:%S')} "
                f"{self.data()['hours']}시간{self.data()['minutes']}분 근무"
            )
        else:
            return f"{self.user.get_full_name()} {self.status[1]}"


class WorkHourCorrectionRequest(CoreModel):
    MODE_CHOICE = [(1, "출근"), (2, "퇴근"), (3, "출입")]

    workhour = models.ForeignKey(
        WorkHour,
        related_name="+",
        verbose_name="원본 근무 시간",
        on_delete=models.CASCADE,
    )
    # mode 는 통행의 형태를 나타낸다. => 1: 출근 / 2: 퇴근 / 3: 통행
    mode = models.IntegerField(choices=MODE_CHOICE)
    # 통행 날짜
    date = models.DateField(verbose_name="통행 날짜")
    # 통행 시각
    time = models.TimeField(verbose_name="통행 시각")
    # 사유
    reason = models.CharField(verbose_name="사유", max_length=1000)
    # 결재 여부
    complete = models.BooleanField(default=False)
    # 승인 여부 (결재가 완료됐을 때에만 의미가 있다)
    approved = models.BooleanField(default=False)
    # 승인자
    approver = models.ForeignKey(
        User,
        verbose_name="결재자",
        related_name="workhour_correction_decisions",
        on_delete=models.SET_NULL,
        null=True,
    )
    # 수정 상세사항
    diff = models.CharField(max_length=1500, verbose_name="수정 상세사항", null=True)

    def __str__(self):
        return f"{self.workhour.user.get_full_name()}의 {self.date}의 근무시간 정정 요청"
