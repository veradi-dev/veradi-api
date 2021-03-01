import datetime
from django.db.models import Q


def six_hour_later(a, b):
    """
    a, b: EnterLog object
    a와 b의 시간 차이가 6시간 이상이면 True, 이내이면 False 를 반환한다.
    """
    from .models import EnterLog

    assert a.__class__ == EnterLog and b.__class__ == EnterLog, "Invalid argument type"

    a_abstime = datetime.datetime.combine(a.date, a.time).timestamp()
    b_abstime = datetime.datetime.combine(b.date, b.time).timestamp()

    return abs(a_abstime - b_abstime) / 21600 >= 1


def generate_workhours(user):
    """
    user: Django User Object
    return 뭐 할지는 미정
    """
    from .models import EnterLog, WorkHour

    # 앞으로 생성할 workhours는 아래의 workhours 리스트에 담는다.
    workhours = []
    try:
        # 사용자의 지금까지 만들어진 Workhour 중 가장 최근의 객체를 가져온다.
        try:
            latest_workhour = user.workhours.get_queryset().latest("created_at")
        except WorkHour.DoesNotExist:
            # 없으면 하나 만든다
            # 나중에 추가할 EnterLog 도 없으면 삭제한다.
            latest_workhour = WorkHour.objects.create(user=user)
            workhours.append(latest_workhour)

        # latest_workhour 에 포함된 가장 최근의 EnterLog 객체를 가져온다.
        try:
            latest_enterlog = latest_workhour.enter_logs.get_queryset().latest(
                "created_at"
            )
        except EnterLog.DoesNotExist:
            # 없으면 사용자의 모든 EnterLog 중 workhour와 연결되지 않은 EnterLog 중 가장 과거의 객체를 가져온다.
            try:
                latest_enterlog = EnterLog.objects.filter(
                    code=user.code, workhour=None
                ).earliest("created_at")
            except EnterLog.DoesNotExist:
                # 그것도 없으면 할 수 있는게 없다
                # 만든거 지우고 나간다.
                for workhour in workhours:
                    workhour.delete()
                return

        # latest_enterlog의 생성일시보다 이후에 생성된 해당 사용자의 모든 enterlog를 불러온다.
        datetime_query = Q(date__gte=latest_enterlog.datetime.date()) & ~Q(
            date=latest_enterlog.datetime.date(),
            time__lte=latest_enterlog.datetime.time(),
        )

        # 직원 코드만을 이용하여 찾는다.
        enter_logs = EnterLog.objects.filter(datetime_query, code=user.code).order_by(
            "date", "time"
        )  # 과거의 EnterLog 부터 최근의 EnterLog 순서로 채워진다.

        # 불러온 EnterLog 객체를 대상으로 Workhour을 추가 / 수정한다.
        for enter_log in enter_logs:
            # 케이스 (1): latest_enterlog 와 시간 차이가 6시간 이상
            # ---> workhour을 새로 생성한다.

            # 케이스 (2):
            # latest_workhour.mode == 2 이고 latest_enterlog 와 시간 차이가 6시간 미만이며
            # 새로 생성된 enterlog.mode == 2 인 경우
            # ---> 기존 workhour에 추가

            # 케이스 (3):
            # latest_workhour.mode == 2 이고 latest_enterlog 와 시간 차이가 6시간 미만이지만
            # 새로 생성된 enterlog.mode != 2 인 경우
            # ---> 새로운 workhour에 추가

            if six_hour_later(latest_enterlog, enter_log):
                # (1)
                latest_workhour = WorkHour.objects.create(user=user)
                workhours.append(latest_workhour)
            else:
                if latest_enterlog.mode == 2:
                    if enter_log.mode == 2:
                        # (2)
                        pass
                    else:
                        # (3)
                        latest_workhour = WorkHour.objects.create(user=user)

            enter_log.workhour = latest_workhour
            enter_log.save()

            # if 문이 끝난 후, latest_enterlog 객체를 업데이트 한다.
            latest_enterlog = enter_log
        return workhours

    except Exception as e:
        # 위의 코드를 실행하던 중 에러가 발생할 경우 생성한 모든 workhours 를 삭제한다.
        for workhour in workhours:
            workhour.delete()
        raise e
