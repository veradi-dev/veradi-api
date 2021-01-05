import os
import datetime

import pandas as pd
import pandas.io.sql as sqlio
import psycopg2

from django.db.models import Q
from .models import EnterLog, WorkHour


def generate_EnterLog(name, code):
    """
	DATABASE 의 enter_log table 에서
	user 의 가장 최신의 EnterLog 가 생성된 시점 이후의 출입 데이터를 가져온 후,
	EnterLog model objects 를 생성한다.
	중복 데이터가 존재한다면 아무것도 하지 않는다.
	"""
    HOST = os.environ.get("DATABASEHOST")
    PORT = os.environ.get("DATABASEPORT")
    DBNAME = os.environ.get("DATABASENAME")
    USERNAME = os.environ.get("DATABASEUSERNAME")
    PWD = os.environ.get("DATABASEPASSWORD")

    try:
        latest = EnterLog.objects.filter(name=name, code=code).latest("created")
        last_generated_date = latest.date
        last_generated_time = latest.time
        last_generated = datetime.datetime.combine(
            last_generated_date, last_generated_time
        ).strftime("%Y-%m-%d %H:%M")
    except EnterLog.DoesNotExist:
        last_generated = datetime.datetime(2017, 1, 1).strftime("%Y-%m-%d %H:%M")
    conn = psycopg2.connect(
        "host='{}' port={} dbname='{}' user={} password={}".format(
            HOST, PORT, DBNAME, USERNAME, PWD
        )
    )
    sql = (
        "SELECT e_date, e_time, e_name, e_idno, e_mode "
        "FROM public.enter_log "
        f"WHERE e_date+e_time >= '{last_generated}' AND e_name='{name}' AND e_idno='{code}' "
        "ORDER BY e_date , e_time ;"
    )
    dat = sqlio.read_sql_query(sql, conn)
    for i in dat.iterrows():
        enter_log = i[1]
        date = enter_log["e_date"]
        time = enter_log["e_time"]
        name = enter_log["e_name"]
        code = enter_log["e_idno"]
        mode = enter_log["e_mode"]
        EnterLog.objects.get_or_create(
            date=date, time=time, name=name, code=code, mode=mode
        )


def generate_WorkHour_model_objects(name, code):
    """
	generate_EnterLog 에서 생성한 EnterLog 객체들을 이용하여,
	실 근무시간 데이터를 가지고 있는 WorkHour 객체를 생성한다.
	"""

    # 가장 최근의 WorkHour을 찾는다. 그리고 그 객체의 퇴근시간을 latest_work_datetime 에 저장한다.
    # 만약 WorkHour 객체가 없으면 (출근기록이 0인 경우) 그 달 1일을 latest_work_datetime 으로 설정한다.
    try:
        latest_workhour = WorkHour.objects.filter(name=name, code=code).latest(
            "created"
        )
        latest_work_datetime = latest_workhour.end_work
        # 만약 마지막 WorkHour 객체의 off_work_check = False 인 경우, start_work가 recent_work_datetime이 된다.
        if latest_work_datetime == None:
            latest_work_datetime = (
                WorkHour.objects.filter(name=name, code=code).latest("created")
            ).start_work
    except WorkHour.DoesNotExist:
        latest_work_datetime = datetime.datetime(2017, 1, 1)

    # recent_work_datetime으로 recent_date, recent_time 이라는 변수명의 datetime.date, datetime.time 객체를 생성한다.
    recent_date = latest_work_datetime.date()
    recent_time = latest_work_datetime.time()

    # recent_date,time 이후의 시간대에 있는 EnterLog객체를 가져오기 위한 query를 작성하고,
    # 해당 queryset을 enter_log_queryset에 저장한다.
    datetime_query = Q(date__gte=recent_date) & ~Q(
        date=recent_date, time__lte=recent_time
    )
    enter_log_queryset = EnterLog.objects.filter(datetime_query, name=name, code=code)
    # enter_log_queryset을 iterate 시킨다.
    # 퇴근 시 아래 세 가지는 다시 아래상태로 돌아가야 한다.
    find_start = False
    previous_passtime = None
    abnormal = False
    # ----------------------------
    start_datetime = None
    end_datetime = None

    for enter_log in enter_log_queryset:
        if previous_passtime:
            current_passtime = datetime.datetime.combine(enter_log.date, enter_log.time)
            term = current_passtime - previous_passtime
            if term > datetime.timedelta(hours=6):
                # 6시간동안 통행한 기록이 없으면 abnormal = True
                # 단, 전날 퇴근을 안 찍고 갔을 경우는 거기서 abnormal = False 로 바꿔준다.
                abnormal = True
            previous_passtime = current_passtime

        if not find_start:
            # 정상적으로 출근한 상황
            if enter_log.mode == 1:
                # 출근때부터 previous_passtime 을 기록하기 시작한다.
                previous_passtime = datetime.datetime.combine(
                    enter_log.date, enter_log.time
                )
                start_datetime = datetime.datetime.combine(
                    enter_log.date, enter_log.time
                )
                find_start = True
            # 출근 안 찍고 퇴근 찍는 신기한 상황
            elif enter_log.mode == 2:
                end_datetime = datetime.datetime.combine(enter_log.date, enter_log.time)
                WorkHour.objects.get_or_create(
                    name=name,
                    code=code,
                    date=end_datetime.date()
                    if end_datetime.time() >= datetime.time(6, 0)
                    else end_datetime.date() - datetime.timedelta(days=1),
                    end_work=end_datetime,
                    abnormal=True,
                    error_message="출근 기록을 확인할 수 없습니다.",
                )
                # find_start = False 이므로 따로 수정할 필요 X
                previous_passtime = None
                abnormal = False
                start_datetime = None
                end_datetime = None
        else:
            # 출근 찍고 또 출근 찍는 경우
            if enter_log.mode == 1:
                WorkHour.objects.get_or_create(
                    name=name,
                    code=code,
                    date=start_datetime.date()
                    if start_datetime.time() >= datetime.time(6, 0)
                    else start_datetime.date() - datetime.timedelta(days=1),
                    start_work=start_datetime,
                    abnormal=True,
                    error_message="퇴근 기록을 확인할 수 없습니다.",
                )
                start_datetime = datetime.datetime.combine(
                    enter_log.date, enter_log.time
                )
                previous_passtime = datetime.datetime.combine(
                    enter_log.date, enter_log.time
                )
                find_start = True
                abnormal = False
            # 정상적으로 출근찍고 퇴근 찍는 경우
            elif enter_log.mode == 2:
                end_datetime = datetime.datetime.combine(enter_log.date, enter_log.time)
                try:
                    total_work = seconds_to_time(
                        (end_datetime - start_datetime).total_seconds()
                    )
                    WorkHour.objects.get_or_create(
                        name=name,
                        code=code,
                        date=start_datetime.date()
                        if start_datetime.time() >= datetime.time(6, 0)
                        else start_datetime.date() - datetime.timedelta(days=1),
                        start_work=start_datetime,
                        end_work=end_datetime,
                        total_work=total_work if not abnormal else None,
                        abnormal=abnormal,
                        error_message="6시간 이상의 출입 공백이 있습니다." if abnormal else "",
                    )
                except ValueError:
                    # 한번에 근무시간이 24시간 이상이 뜰 경우
                    # 중간에 출퇴근 안 찍은 걸로 간주하고 (퇴근 없는 출근)과 (출근 없는 퇴근) 객체를 하나씩 만들어주자
                    WorkHour.objects.get_or_create(
                        name=name,
                        code=code,
                        date=start_datetime.date()
                        if start_datetime.time() >= datetime.time(6, 0)
                        else start_datetime.date() - datetime.timedelta(days=1),
                        start_work=start_datetime,
                        abnormal=True,
                        error_message="퇴근 기록을 확인할 수 없습니다.",
                    )
                    WorkHour.objects.get_or_create(
                        name=name,
                        code=code,
                        date=end_datetime.date()
                        if end_datetime.time() >= datetime.time(6, 0)
                        else end_datetime.date() - datetime.timedelta(days=1),
                        end_work=end_datetime,
                        abnormal=True,
                        error_message="출근 기록을 확인할 수 없습니다.",
                    )
                finally:
                    previous_passtime = None
                    abnormal = False
                    find_start = False


def seconds_to_time(seconds):
    seconds = int(seconds)
    hours, seconds = divmod(seconds, 3600)
    minutes, seconds = divmod(seconds, 60)
    return datetime.time(hour=hours, minute=minutes, second=seconds)


def six_hour_determinant(a, b):
    """
    a, b: EnterLog object
    a와 b의 시간 차이가 6시간 이상이면 False, 이내이면 True 를 반환한다.
    """
    assert a.__class__ == EnterLog and b.__class__ == EnterLog, "Invalid argument type"

    a_abstime = datetime.datetime.combine(a.date, a.time).timestamp()
    b_abstime = datetime.datetime.combine(b.date, b.time).timestamp()

    return abs(a_abstime - b_abstime) / 21600 <= 1


def new_generate_workhours(user):
    """
    user: Django User Object
    return: isOn: Bool (출근중인지 여부: 출근중이면 True, 퇴근했으면 False)
    """

    isOn = None

    # def isOn_determinant(latest_enterlog):
    #     """
    #     latest Enterlog를 보고 현재 user가 출근중인지 퇴근했는지 확인한다.
    #     출근중: True, 퇴근: False
    #     """
    #     return (
    #         (
    #             datetime.datetime.now()
    #             - datetime.datetime.combine(latest_enterlog.date, latest_enterlog.time)
    #         )
    #         < datetime.timedelta(hours=6)
    #     ) and latest_enterlog.mode != 2

    latest_workhour = user.workhours.get_queryset().latest("created_at")
    enter_logs = EnterLog.objects.filter(
        name=user.get_full_name(), code=user.code, workhour=None
    ).order_by("-created_at")

    if enter_logs.__len__() == 0:
        latest_workhour = WorkHour.objects.filter(user=user).latest("created_at")
        enter_logs = latest_workhour.enter_logs.get_queryset()

    latest = enter_logs[0]
    if (
        datetime.datetime.now() - datetime.datetime.combine(latest.date, latest.time)
    ) > datetime.timedelta(hours=6) or latest.mode == 2:
        isOn = False

    assert type(isOn) == bool, "Invalid Type"
    return isOn
    #
