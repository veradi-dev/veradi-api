from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

app = Celery("config")


@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Calls task every 10 seconds.
    sender.add_periodic_task(60.0, update_enterlogs.s(), name="update_enterlogs")


app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

# this allows you to schedule items in the Django admin.
app.conf.beat_scheduler = "django_celery_beat.schedulers.DatabaseScheduler"

app.conf.timezone = "UTC"


@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")


@app.task(bind=True)
def update_enterlogs(self):
    import pandas_access as mdb
    from workhours.models import EnterLog
    from django.utils import timezone

    db_filename = r"adt/ACCESS.mdb"
    if os.path.isfile(db_filename):
        df = mdb.read_table(db_filename, "tenter")[
            ["e_date", "e_time", "e_idno", "e_name", "e_mode"]
        ]
    else:
        raise FileNotFoundError

    # 가장 최신의 enterlog 를 가져온다.
    try:
        latest_enterlog = EnterLog.objects.all().latest("date", "time")
        latest_enterlog = timezone.datetime.combine(
            latest_enterlog.date, latest_enterlog.time
        )
    except EnterLog.DoesNotExist:
        # 처음 서버 시작 시 언제부터 가져올 것인지 설정한다.
        latest_enterlog = timezone.datetime(2021, 2, 20)
        # 실제 프로덕션 하게 되면 좀 더 이전으로 설정하자.

    # 가장 최신의 enterlog 이후의 기록을 가져온다.
    q1 = df["e_date"] > latest_enterlog.date().strftime("%Y%m%d")
    q2 = (df["e_date"] == latest_enterlog.date().strftime("%Y%m%d")) & (
        df["e_time"] > latest_enterlog.time().strftime("%H%M%S")
    )
    results = df[q1 | q2]

    # 직원 코드가 nan 인 경우 해당 row를 삭제한다.
    results = results.dropna(subset=["e_idno"])

    # 직원 코드가 있는 row들을 가지고 EnterLog 객체를 생성한다.
    from django.db.utils import DataError

    prev_row = None
    for index, row in results.iterrows():
        e_date, e_time, e_idno, e_name, e_mode = row
        if prev_row is not None:
            if (
                prev_row.e_date == e_date
                and prev_row.e_time == e_time
                and prev_row.e_idno == e_idno
                and prev_row.e_mode == e_mode
            ):
                continue
        try:
            EnterLog.objects.create(
                date=timezone.datetime.strptime(e_date, "%Y%m%d").date(),
                time=timezone.datetime.strptime(e_time, "%H%M%S").time(),
                code=e_idno,
                mode=e_mode,
                name=e_name,
            )
            prev_row = {
                "e_date": e_date,
                "e_time": e_time,
                "e_idno": e_idno,
                "e_name": e_name,
                "e_mode": e_mode,
            }
        except DataError as e:
            print(f"DataError: {e}")
            continue
