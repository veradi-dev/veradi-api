from django.core.management import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        admin = User.objects.get_or_none(username="plus470")
        if admin is None:
            admin = User.objects.create_superuser(
                username="plus470", email="plus470@naver.com", password="hss7490"
            )
            admin.code = 1
            admin.save()
            self.stdout.write(self.style.SUCCESS("Successfully create superuser"))
        self.stdout.write(self.style.SUCCESS("이미 superuser가 존재합니다."))
