from django.core.management import BaseCommand
from projects.models import Subject, Unit


class Command(BaseCommand):
    def handle(self, *args, **options):
        subjects = {
            "COLO": {"curriculum": 1, "units": {}},
            "COMT": {
                "curriculum": 1,
                "units": {
                    "AAM": "지수로그 정의",
                    "ABM": "지수로그 적분",
                    "ACM": "지수로그 부등식",
                    "AD1": "지수로그 활용",
                    "AD2": "입체도형",
                    "AD3": "다양한 방정식",
                    "AEM": "삼각함수 극한",
                    "AFM": "삼각함수 방정식",
                    "AG1": "삼각함수 그래프",
                    "AG2": "삼각함수 덧셈정리",
                    "AHM": "삼각함수 적분",
                    "AIM": "역함수의 이용",
                    "AJM": "다양한 미분법",
                    "AKM": "미분법 그래프",
                    "ALM": "치환부분적분",
                    "BAM": "순열과 조합의 정의",
                    "BBM": "순열과 조합",
                    "BCM": "분할",
                    "BDM": "확률의 정의",
                    "BEM": "확률",
                    "BFM": "독립시행과 조건부확률",
                    "BGM": "통계",
                    "BHM": "표본집단",
                    "BIM": "정규분포",
                    "CA1": "포물선",
                    "CA2": "타원",
                    "CA3": "쌍곡선",
                    "CB1": "음함수 미분",
                    "CB2": "매개변수의 이용",
                    "CB3": "평면도형 벡터",
                    "CCM": "벡터 성분",
                    "CDM": "공간좌표",
                    "CEM": "삼수선",
                    "CFM": "공간도형 방정식",
                    "CG1": "직선의 방정식",
                    "CG2": "벡터 회전",
                },
            },
            "COPH": {
                "curriculum": 1,
                "units": {
                    "AAM": "운동의 표현",
                    "ABM": "속도와 가속도",
                    "ACM": "운동의 법칙",
                    "ADM": "속가+운법",
                    "AE1": "운동량 보존 법칙",
                    "AE2": "충격량-운동량",
                    "AFM": "역학적 에너지 보존 법칙",
                    "AG1": "열역학",
                    "AG2": "열기관과 열효율",
                    "AHM": "특수상대성이론",
                    "AIM": "질량과 에너지",
                    "BAM": "원자와 전기력",
                    "BBM": "에너지 준위",
                    "BC1": "전기 전도성",
                    "BC2": "반도체",
                    "BDM": "전류에 의한 자기장",
                    "BEM": "물질의 자성",
                    "BFM": "전자기 유도",
                    "CAM": "파동의 성질",
                    "CBM": "전반사",
                    "CCM": "전자기파",
                    "CD1": "물질의 이중성",
                    "CD2": "빛의 이중성",
                    "CFM": "파동의 간섭",
                },
            },
            "COCH": {
                "curriculum": 1,
                "units": {
                    "AA1": "인류 문명",
                    "AA2": "탄소 화합물",
                    "AB1": "화학식량과 몰",
                    "AB2": "배수비례",
                    "AB3": "아보가드로 수",
                    "ACM": "양적 관계",
                    "ADM": "용액의 농도",
                    "BA1": "원자의 구조",
                    "BA2": "양중전질",
                    "BBM": "양자수",
                    "BC1": "주기적 성질",
                    "BC2": "이온화 에너지",
                    "BC3": "원자 반지름",
                    "BC4": "유효 핵전하",
                    "BC5": "주기율표의 역사",
                    "BDM": "전자 배치",
                    "CA1": "전기 분해",
                    "CA2": "이온 결합",
                    "CA3": "공유 결합, 금속 결합",
                    "CBM": "전기 음성도",
                    "CC1": "루이스 구조",
                    "CC2": "전자쌍",
                    "CC3": "분자의 구조",
                    "CC4": "물질의 성질",
                    "DA1": "동적 평형",
                    "DA2": "반응의 열출입",
                    "DA3": "비열",
                    "DB1": "산 염기의 정의",
                    "DB2": "pH",
                    "DB3": "중화 적정",
                    "DCM": "중화반응",
                    "DD1": "산화 환원 반응",
                    "DD2": "산화수",
                    "DD3": "산화수법",
                },
            },
            "COBS": {
                "curriculum": 1,
                "units": {
                    "AA1": "생명현상의 특성",
                    "AA2": "기본 물질",
                    "AA3": "세포의 구조",
                    "ABM": "구성체제",
                    "BA1": "염색체 구조",
                    "BA2": "핵형분석",
                    "BBM": "세포 주기",
                    "BCM": "세포 분열",
                    "BDM": "멘델의 유전 법칙",
                    "BEM": "여러가지 유전",
                    "BFM": "가계도",
                    "BGM": "비분리",
                    "CAM": "세포호흡",
                    "CBM": "기관계의 상호작용",
                    "CCM": "신경계",
                    "CDM": "전도와 전달",
                    "CE1": "근육의 수축",
                    "CE2": "호르몬/항상성",
                    "CF1": "병원체",
                    "CF2": "방어작용",
                    "CF3": "혈액형",
                    "DA1": "생태계",
                    "DA2": "환경요소와 생물",
                    "DA3": "개체군의 상호작용",
                    "DA4": "군집천이",
                    "DA5": "물질의 순환",
                    "DB1": "생태계의 생산량",
                    "DB2": "생물 다양성",
                },
            },
            "COGS": {
                "curriculum": 1,
                "units": {
                    "AAM": "변동대와 판 구조론",
                    "ABM": "대륙의 분포변화",
                    "AC1": "판 구조론의 정립과정과 플룸구조론",
                    "AC2": "마그마 생성과 화성암",
                    "AD1": "퇴적 구조와 환경",
                    "AD2": "지질구조",
                    "AD3": "지질시대의 환경과 생물",
                    "AEM": "지층의 나이",
                    "BA1": "기단과 전선",
                    "BA2": "온대저기압",
                    "BA3": "태풍",
                    "BA4": "우리나라의 주요 악기상",
                    "BB1": "대기대순환",
                    "BB2": "해수의 성질",
                    "BB3": "해류의 순환",
                    "BC1": "고기후분석",
                    "BC2": "기후 변화와 복사 평형",
                    "BDM": "외적요인",
                    "BEM": "엘리뇨아 라니냐",
                    "CAM": "별",
                    "CBM": "생명 가능 지대",
                    "CCM": "외계 행성 탐사",
                    "CD1": "외부 은하",
                    "CD2": "빅뱅 우주론",
                    "CD3": "암흑물질과 암흑 에너지",
                },
            },
        }

        for subject in subjects.keys():
            subject_obj, created = Subject.objects.get_or_create(name=subject)
            if created:
                curriculum = subjects[subject]["curriculum"]
                subject_obj.curriculum = curriculum
                subject_obj.save()
                print(f"{subject_obj.name} 과목이 생성되었습니다. \n")

                units = subjects[subject]["units"]
                for unit in units.keys():
                    unit_obj, created = Unit.objects.get_or_create(
                        subject=subject_obj, code=unit, name=units[unit]
                    )
                    if created:
                        print(
                            f"{subject_obj.name}의 {unit_obj.code} - {unit_obj.name} 단원이 생성되었습니다."
                        )
                    else:
                        print(
                            f"{subject_obj.name}의 {unit_obj.code} - {unit_obj.name} 단원이 이미 존재합니다."
                        )

        self.stdout.write(
            self.style.SUCCESS("Successfully initialize Subjects and Units")
        )
