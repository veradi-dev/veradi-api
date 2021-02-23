from django.utils import timezone
from rest_framework import serializers
from users.serializers import UserSerializer
from .models import EnterLog, WorkHour, WorkHourCorrectionRequest


class EnterLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnterLog
        fields = ("id", "date", "time", "name", "code", "mode")
        read_only_fields = ("id",)


class WorkHourSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    enter_logs = EnterLogSerializer(many=True)
    status = serializers.SerializerMethodField()
    message = serializers.SerializerMethodField()
    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()
    complete = serializers.SerializerMethodField()

    def get_status(self, obj):
        return obj.status[0]

    def get_message(self, obj):
        return obj.status[1]

    def get_start(self, obj):
        return obj.start

    def get_end(self, obj):
        return obj.end

    def get_complete(self, obj):
        return obj.complete

    class Meta:
        model = WorkHour
        fields = (
            "id",
            "user",
            "enter_logs",
            "status",
            "message",
            "start",
            "end",
            "total",
            "complete",
        )
        read_only_fields = ("id", "user")


class WorkHourCorrectionRequestSerializer(serializers.ModelSerializer):
    workhour = WorkHourSerializer()

    class Meta:
        model = WorkHourCorrectionRequest
        fields = (
            "id",
            "workhour",
            "mode",
            "date",
            "time",
            "reason",
            "approved",
            "complete",
            "created_at",
            "approver",
            "diff",
        )
        read_only_fields = ("id", "approver")

    def create(self, validated_data):
        workhour = self.context.get("workhour")
        return WorkHourCorrectionRequest.objects.create(
            workhour=workhour, **validated_data
        )

    def update(self, instance, validated_data):
        """
        front 에서 전달된 Data 를 바탕으로 근무시간 이의신청 객체와 WorkHour - EnterLog 객체를 수정하고 해당 기록을 저장한다.
        """
        workhour_data = self.context.get("workhour")
        workhour = WorkHour.objects.get(id=workhour_data.get("id"))

        enter_logs_data = workhour_data.get("enter_logs")
        log_list = []  # 수정사항을 이 리스트에 저장 후, 추후 하나의 str 으로 합친 후 instance.diff 에 저장한다.

        for enter_log_data in enter_logs_data:
            if enter_log_data["type"] == "update":
                log_str = "출입 기록 변경: \n"
                try:
                    enter_log = EnterLog.objects.get(id=enter_log_data["id"])
                    datetime_data = timezone.datetime.strptime(
                        f"{enter_log_data['date']} {enter_log_data['time']}",
                        "%Y-%m-%d %H:%M",
                    )

                    if enter_log.date != datetime_data.date():
                        # 기존의 데이터와 새로 받아온 데이터가 다르면 -> 수정하고 로그를 남긴다.
                        enter_log.date = datetime_data.date()
                        log_str += f"date: {enter_log.date.strftime('%Y-%m-%d')} → {datetime_data.date().strftime('%Y-%m-%d')}\n"

                    if enter_log.time != datetime_data.time():
                        enter_log.time = datetime_data.time()
                        log_str += f"time: {enter_log.time.strftime('%H:%M')} → {datetime_data.time().strftime('%H:%M')}\n"

                    if enter_log.mode != enter_log_data["mode"]:
                        enter_log.mode = enter_log_data["mode"]
                        log_str += (
                            f"mode: {enter_log.mode} → {enter_log_data['mode']}\n"
                        )

                    enter_log.save()
                    log_list.append(log_str)
                except EnterLog.DoesNotExist:
                    enter_log_data["type"] = "add"

            elif enter_log_data["type"] == "add":
                print(enter_log_data["date"])
                enter_log = EnterLog.objects.create(
                    date=enter_log_data["date"],
                    time=enter_log_data["time"],
                    mode=enter_log_data["mode"],
                    name=workhour.user.get_full_name(),
                    code=workhour.user.code,
                    workhour=workhour,
                )
                log_str = (
                    "출입 기록 생성: \n"
                    + f"date: {enter_log.date.strftime('%Y-%m-%d')}\n"
                    + f"time: {enter_log.time.strftime('%H:%M')}\n"
                    + f"mode: {enter_log.mode}\n"
                )
                log_list.append(log_str)

        # 승인 여부 저장
        approved = bool(self.context.get("approved"))
        instance.approved = approved
        log_list.append(f"승인 여부: {'승인' if approved else '거절'}\n")
        # 승인자 저장
        approver = self.context.get("user")
        instance.approver = approver
        log_list.append(f"승인자: {approver.get_full_name()} ({approver.code})")
        # 수정 로그 저장
        instance.diff = "".join(log_list)
        # 결재 완료 => 추후 수정 불가능
        instance.complete = True

        assert instance.workhour == workhour
        assert instance.mode is not None
        assert instance.date is not None
        assert instance.time is not None
        assert instance.reason is not None
        assert instance.approved is not None
        assert instance.approver is not None
        assert instance.diff is not None
        assert instance.complete is not False

        instance.save()
        return instance
