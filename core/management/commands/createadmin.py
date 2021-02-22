from django.core.management import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        admin = User.objects.create_superuser(
            username="plus470", email="plus470@naver.com", password="hss7490"
        )
        self.stdout.write(self.style.SUCCESS("Successfully create superuser"))
