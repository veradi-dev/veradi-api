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


def seconds_to_time(seconds):
    """
    seconds(초) 를 받아서
    (hours, minutes, seconds) 의 Tuple 형태로 Return
    """
    seconds = int(seconds)
    hours, seconds = divmod(seconds, 3600)
    minutes, seconds = divmod(seconds, 60)
    return hours, minutes, seconds


def six_hour_later(a, b):
    """
    a, b: EnterLog object
    a와 b의 시간 차이가 6시간 이상이면 False, 이내이면 True 를 반환한다.
    """
    assert a.__class__ == EnterLog and b.__class__ == EnterLog, "Invalid argument type"

    a_abstime = datetime.datetime.combine(a.date, a.time).timestamp()
    b_abstime = datetime.datetime.combine(b.date, b.time).timestamp()

    return abs(a_abstime - b_abstime) / 21600 <= 1


def generate_workhours(user):
    """
    user: Django User Object
    return 뭐 할지는 미정
    """

    # 사용자의 지금까지 만들어진 Workhour 중 가장 최근의 객체를 가져온다.
    latest_workhour = user.workhours.get_queryset().latest("created_at")

    # latest_workhour 에 포함된 가장 최근의 EnterLog 객체를 가져온다.
    latest_enterlog = latest_workhour.enter_logs.get_queryset().latest("create_at")

    # latest_enterlog의 생성일시보다 이후에 생성된 해당 사용자의 모든 enterlog를 불러온다.
    datetime_query = Q(date__gte=latest_enterlog.datetime.date()) & ~Q(
        date=latest_enterlog.datetime.date(), time__lte=latest_enterlog.datetime.time()
    )
    enter_logs = EnterLog.objects.filter(
        datetime_query, name=user.get_full_name(), code=user.code
    ).order_by("created_at") # 과거의 EnterLog 부터 최근의 EnterLog 순서로 채워진다.

    # 불러온 EnterLog 객체를 대상으로 Workhour을 추가 / 수정한다.
    for enter_log in enter_logs:
        # 만약 latest_enterlog 와 시간 차이가
        # 6시간 이상이면, 새로운 WorkHour 객체를 만들어서 추가한다.
        # 6시간 이하이면, 기존 WorkHour 객체에 EnterLog를 추가한다.
        # if 문이 끝난 후, latest_enterlog 객체를 업데이트 한다.
        if six_hour_later(latest_enterlog, enter_log) or latest_enterlog.mode == 2:
            latest_workhour = WorkHour.objects.create(user=user)
        enter_log.workhour = latest_workhour
        enter_log.save()
        latest_enterlog = enter_log
