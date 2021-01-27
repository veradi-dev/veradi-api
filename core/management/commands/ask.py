import random
from django.utils import timezone
from django.db.utils import IntegrityError
from django.contrib.auth import get_user_model
from django.core.management import BaseCommand, CommandError
from users.models import Team
from conference.models import ConferenceRoom, Reservation
from notice.models import Notice
from workhours.models import EnterLog
from workhours.handle_log import generate_workhours


User = get_user_model()


class Command(BaseCommand):
    def handle(self, *args, **options):
        """
        유저 / 회의실 예약 / 근무 시간 / 공지 사항을 위한 FAKE DATA 생성 Command
        """
        num1 = int(input("숫자 입력하세요:"))

        self.stdout.write(self.style.SUCCESS("Successfully create fake data"))
