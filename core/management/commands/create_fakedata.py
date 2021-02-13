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
        users = []
        user_num = int(input("몇 명의 User 를 생성하시겠습니까? :"))
        reservations = []
        reservation_num = int(input("몇개의 회의식 예약을 생성하시겠습니까? :"))
        enter_logs = []
        enter_log_num = int(input("몇개의 enter_log을 생성하시겠습니까? :"))
        work_hours = []
        notices = []
        notice_num = int(input("몇개의 공지사항을 생성하시겠습니까? :"))

        try:
            # 유저
            print("Fake User을 생성합니다.")
            first_name = [
                "민준",
                "서준",
                "예준",
                "도윤",
                "시우",
                "주원",
                "하준",
                "지호",
                "지후",
                "준서",
                "준우",
                "현우",
                "도현",
                "지훈",
                "건우",
                "우진",
                "선우",
                "서진",
                "민재",
                "현준",
                "연우",
                "유준",
                "정우",
                "승우",
                "승현",
                "시윤",
                "준혁",
                "은우",
                "지환",
                "승민",
                "지우",
                "유찬",
                "윤우",
                "민성",
                "준영",
                "시후",
                "진우",
                "지원",
                "수현",
                "재윤",
                "시현",
                "동현",
                "수호",
                "태윤",
                "민규",
                "재원",
                "한결",
                "민우",
                "재민",
                "은찬",
                "윤호",
                "시원",
                "이준",
                "민찬",
                "지안",
                "시온",
                "성민",
                "준호",
                "승준",
                "성현",
                "이안",
                "현서",
                "재현",
                "하율",
                "지한",
                "우빈",
                "태민",
                "지성",
                "예성",
                "민호",
                "태현",
                "지율",
                "민혁",
                "서우",
                "성준",
                "은호",
                "규민",
                "정민",
                "준",
                "지민",
                "윤성",
                "율",
                "윤재",
                "하람",
                "하진",
                "민석",
                "준수",
                "은성",
                "태양",
                "예찬",
                "준희",
                "도훈",
                "하민",
                "준성",
                "건",
                "지완",
                "현수",
                "승원",
                "강민",
                "정현",
            ]
            last_name = [
                "가",
                "강",
                "강",
                "강",
                "강",
                "강",
                "경",
                "경",
                "고",
                "공",
                "공",
                "곽",
                "구",
                "구",
                "구",
                "국",
                "국",
                "국",
                "기",
                "기",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "김",
                "나",
                "남",
                "남",
                "노",
                "노",
                "노",
                "마",
                "마",
                "민",
                "문",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "박",
                "반",
                "반",
                "방",
                "방",
                "방",
                "방",
                "배",
                "백",
                "변",
                "변",
                "사",
                "서",
                "서",
                "석",
                "선",
                "선",
                "설",
                "성",
                "소",
                "소",
                "손",
                "송",
                "송",
                "수",
                "수",
                "승",
                "승",
                "시",
                "시",
                "신",
                "신",
                "신",
                "심",
                "아",
                "안",
                "애",
                "야",
                "양",
                "양",
                "어",
                "어",
                "엄",
                "여",
                "여",
                "연",
                "연",
                "연",
                "염",
                "영",
                "영",
                "예",
                "오",
                "오",
                "옥",
                "온",
                "옹",
                "옹",
                "왕",
                "요",
                "용",
                "우",
                "우",
                "운",
                "원",
                "원",
                "위",
                "위",
                "유",
                "유",
                "유",
                "유",
                "육",
                "윤",
                "은",
                "음",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "이",
                "임",
                "임",
                "자",
                "장",
                "장",
                "장",
                "장",
                "전",
                "전",
                "전",
                "점",
                "정",
                "정",
                "정",
                "제",
                "제",
                "조",
                "조",
                "주",
                "주",
                "지",
                "지",
                "진",
                "진",
                "진",
                "진",
                "차",
                "채",
                "채",
                "천",
                "천",
                "초",
                "최",
                "추",
                "표",
                "하",
                "한",
                "한",
                "허",
                "현",
                "호",
                "홍",
                "황",
            ]

            for n in range(user_num):
                user, created = User.objects.get_or_create(
                    username=str(hex(random.randint(1000000, 9999999))).upper(),
                    first_name=random.choice(first_name),
                    last_name=random.choice(last_name),
                    team=random.choice(Team.objects.all()),
                    rank=random.choice(range(1, 6)),
                    position=random.choice(range(1, 9)),
                    code=str(hex(random.randint(1000000, 9999999))).upper(),
                )
                if created:
                    print(user, "가 생성되었습니다.")
                users.append(user)

            # 회의실 예약
            main_room, created = ConferenceRoom.objects.get_or_create(room_number=1)
            if created:
                main_room.location = "3층 중앙 회의실"
                main_room.save()

            sub_room, created = ConferenceRoom.objects.get_or_create(room_number=2)
            if created:
                sub_room.location = "3층 탕비실"
                sub_room.save()

            for i in range(reservation_num):
                room = random.choice([main_room, sub_room])
                date = timezone.now().date() + timezone.timedelta(
                    days=random.choice(range(10))
                )
                start_time = random.choice(range(48))
                proposer = random.choice(users)
                try:
                    reservation = Reservation.objects.create(
                        room=room, date=date, start_time=start_time, proposer=proposer
                    )
                    print(reservation, "가 생성되었습니다.")
                    reservations.append(reservation)
                except IntegrityError:
                    pass

            # 근무 시간
            for i in range(enter_log_num):
                user = random.choice(users)
                _datetime = timezone.now() - timezone.timedelta(
                    days=random.choice(range(60)), minutes=random.randrange(1440)
                )
                date = _datetime.date()
                time = _datetime.time()
                (mode,) = random.choices(range(1, 4), weights=[0.1, 0.1, 0.8])
                enter_log, created = EnterLog.objects.get_or_create(
                    date=date,
                    time=time,
                    name=user.get_full_name(),
                    code=user.code,
                    mode=mode,
                )
                if created:
                    print(enter_log, "가 생성되었습니다. ")
                enter_logs.append(enter_log)

            for user in users:
                work_hours = generate_workhours(user)

            # 공지 사항
            contents = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi voluptatibus, fugiat eaque unde quo inventore consequatur est magni? Consequatur, aut. Ducimus debitis voluptate nobis totam tenetur sed nisi neque error sapiente saepe iure incidunt, qui voluptas dolorem aliquam molestias. Sint, delectus exercitationem vero quisquam necessitatibus eaque ut fuga explicabo cumque vel itaque cupiditate, tempora ipsa cum soluta ducimus enim numquam autem aliquid, quae maxime reprehenderit hic. Iusto odio dolor voluptas minima alias voluptates sed id deserunt, commodi et maxime dolores quidem tempore dignissimos architecto nam, exercitationem quia! Nulla, repudiandae ad laudantium vero culpa officiis architecto sunt vitae voluptatum ratione, libero, facilis magni! Mollitia laborum id quibusdam architecto optio eius, illum, nemo similique nostrum at quod quisquam. Quis dolores asperiores qui blanditiis aliquid ratione tempore debitis similique amet, perferendis officiis. Repellat velit animi modi debitis! Reprehenderit, dolorem quae at quisquam ullam incidunt qui illum corporis doloremque architecto porro mollitia fugit delectus ipsam nisi dolor autem itaque tempore quidem omnis dolore! Atque labore molestias facilis quasi similique error, expedita iure animi voluptatem ab qui adipisci nesciunt dolorem ullam in reprehenderit exercitationem libero, accusantium iste. Explicabo quibusdam ad et quis quasi fugit laboriosam ipsam veritatis nisi tenetur, voluptates temporibus eum! Aperiam, voluptatibus possimus? Magnam molestiae aperiam voluptas iste obcaecati exercitationem natus cum asperiores quod officia autem qui quia impedit, voluptatibus sint. Praesentium debitis dolorem recusandae sint, corporis corrupti velit omnis reiciendis est. Consequuntur nihil itaque rerum. Suscipit veritatis dolores aut rerum incidunt animi ratione blanditiis, sequi et corrupti reiciendis ex deserunt consequuntur natus iste iusto necessitatibus quas omnis. Corrupti perspiciatis totam quos, officiis, quis tempore culpa dicta dolores reprehenderit distinctio qui magni explicabo, ratione eius sed earum nemo perferendis? Eaque atque nihil unde suscipit totam pariatur at expedita harum autem officia quasi ab consequatur ipsum dolore beatae voluptatum earum ipsa, perferendis quaerat. Odio?"
            for i in range(notice_num):
                writer = random.choice(User.objects.filter(position__gte=2))
                team = random.choice([None, writer.team])
                title = f"{writer}이 작성한 공지사항입니다."
                notices.append(
                    Notice.objects.create(
                        writer=writer, team=team, title=title, contents=contents
                    )
                )
            print(notice_num, "개의 공지사항이 생성되었습니다.")

        except Exception as e:
            for obj in [*notices, *enter_logs, *work_hours, *reservations, *users]:
                obj.delete()
            raise CommandError(e)

        self.stdout.write(self.style.SUCCESS("Successfully create fake data"))
