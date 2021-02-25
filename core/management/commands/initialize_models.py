from django.core.management import BaseCommand
from users.models import Department, Team
from conference.models import ConferenceRoom


class Command(BaseCommand):
    def handle(self, *args, **options):
        departments = [
            (
                "MS",
                [
                    "MS_EPD",
                    "MS_FI",
                    "MS_LAW",
                    "MS_GA",
                ],
            ),
            (
                "SCI",
                [
                    "SCI_PH",
                    "SCI_CH",
                    "SCI_BS",
                    "SCI_GS",
                ],
            ),
            (
                "CM",
                [
                    "CM_KH",
                    "CM_LAE",
                    "CM_AEI",
                    "CM_KRG",
                    "CM_WDG",
                    "CM_EAH",
                    "CM_WDH",
                    "CM_ECN",
                    "CM_PAL",
                    "CM_SCT",
                ],
            ),
            (
                "KR",
                [
                    "KR",
                ],
            ),
            (
                "MT",
                [
                    "MT",
                ],
            ),
            (
                "EG",
                [
                    "EG",
                ],
            ),
            (
                "TDD",
                [
                    "TDD",
                ],
            ),
            (
                "DDB",
                [
                    "DDB",
                ],
            ),
            (
                "VDO",
                [
                    "VDO",
                ],
            ),
        ]
        for department in departments:
            department_name, teams = department
            department_obj, created = Department.objects.get_or_create(
                name=department_name
            )
            if created:
                print(f"{department_obj} has been created")
            else:
                print(f"{department_obj} has been already exist")

            for team in teams:
                team = Team.objects.get_or_create(department=department_obj, name=team)
                if team[1]:
                    print(f"{team[0]} team has been created")
                else:
                    print(f"{team[0]} has been already exist")

        rooms = [
            {"room_number": 1, "location": "3층 회의실"},
            {"room_number": 2, "location": "3층 탕비실"},
        ]
        for room in rooms:
            cr, created = ConferenceRoom.objects.get_or_create(**room)
            if created:
                print(f"{room['location']}이 생성되었습니다.")
            else:
                print(f"{room['location']}이 이미 존재합니다.")

        self.stdout.write(
            self.style.SUCCESS("Successfully initialize departments and team")
        )
