from django.contrib.auth.models import AbstractUser
from django.db import models
from core.models import CoreModel
from django.utils.translation import gettext_lazy as _
from core import managers


# 사원 ------------------------------------------------------------------------------------
class User(AbstractUser):
    """
    Custom User Model for Veradi
    """

    # Choices
    class Rank(models.IntegerChoices):
        EMPLOYEE = 1, _("사원")
        DEPUTY = 2, _("대리")
        MANAGER = 3, _("과장")
        DEPART_MANAGER = 4, _("부장")
        DIRECTOR = 5, _("이사")

    class Position(models.IntegerChoices):
        STAFF = 1, _("평사원")
        TASK_MANAGER = 2, _("타스크장")
        TEAM_MANAGER = 3, _("팀장")
        GENERAL_MANAGER = 4, _("실장")
        BUSINESS_MANAGER = 5, _("사업부장")
        HEAD_OF_DEPARTMENT = 6, _("본부장")
        CFO = 7, _("부사장")
        CEO = 8, _("사장")

    # Model Fields
    # Basic Fields
    first_name = models.CharField(_("이름"), max_length=10)
    last_name = models.CharField(_("성"), max_length=10)
    code = models.CharField(_("직원 코드"), max_length=10)
    rank = models.IntegerField(_("직급"), choices=Rank.choices, default=1)
    team = models.ForeignKey(
        "Team", related_name="users", on_delete=models.SET_NULL, null=True
    )
    position = models.IntegerField(_("직책"), choices=Position.choices, default=1)

    approved = models.BooleanField(_("가입 승인"), default=False)

    # User Model Manager
    objects = managers.CustomUserManager()

    # Meta class
    class Meta:
        verbose_name = "사원"
        verbose_name_plural = "사원"
        ordering = ("-date_joined",)

    # Model Methods
    def get_full_name(self):
        """
        Return the first_name plus the last_name
        """
        full_name = "%s%s" % (self.last_name, self.first_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def get_department_name(self):
        try:
            return self.team.department.get_name_display()
        except AttributeError:
            return "미지정"

    get_department_name.short_description = "부서 이름"
    get_department_name.admin_order_field = "department_name"

    def get_team_name(self):
        try:
            return self.team.get_name_display()
        except AttributeError:
            return "미지정"

    get_team_name.short_description = "팀 이름"
    get_team_name.admin_order_field = "team_name"

    def __str__(self):
        return f"{self.get_full_name()}"


# 부서 ------------------------------------------------------------------------------------
class Department(models.Model):
    class DepartmentChoice(models.TextChoices):
        MS = "MS", _("경영지원부")
        SCI = "SCI", _("과학탐구개발부")
        CM = "CM", _("사회탐구개발부")
        KR = "KR", _("국어개발부")
        MT = "MT", _("수학개발부")
        EG = "EG", _("영어개발부")
        DDB = "DDB", _("디자인부")
        TECHNOLOGY = "TDD", _("기술개발부")
        VIDEO = "VDO", _("영상부")

    name = models.CharField(
        "부서명", choices=DepartmentChoice.choices, max_length=30, unique=True
    )

    def __str__(self):
        return f"{self.get_name_display()}"


# 팀 ------------------------------------------------------------------------------------
class Team(models.Model):
    class TeamChoice(models.TextChoices):
        # 국어개발부
        CONTENTS_KR = "KR", _("국어연구팀")
        # 수학개발부
        CONTENTS_MT = "MT", _("수학연구팀")
        # 영어개발부
        CONTENTS_EG = "EG", _("영어연구팀")
        # 과학탐구개발부
        CONTENTS_PH = "SCI_PH", _("물리학연구팀")
        CONTENTS_CH = "SCI_CH", _("화학연구팀")
        CONTENTS_BS = "SCI_BS", _("생명과학연구팀")
        CONTENTS_GS = "SCI_GS", _("지구과학연구팀")
        # 사회탐구개발부
        CONTENTS_KH = "CM_KH", _("한국사연구팀")
        CONTENTS_LAE = "CM_LAE", _("생활과윤리연구팀")
        CONTENTS_AEI = "CM_AEI", _("윤리와사상연구팀")
        CONTENTS_KRG = "CM_KRG", _("한국지리연구팀")
        CONTENTS_WDG = "CM_WDG", _("세계지리연구팀")
        CONTENTS_EAH = "CM_EAH", _("동아시아사연구팀")
        CONTENTS_WDH = "CM_WDH", _("세계사연구팀")
        CONTENTS_ECN = "CM_ECN", _("경제연구팀")
        CONTENTS_PAL = "CM_PAL", _("정치와법연구팀")
        CONTENTS_SCT = "CM_SCT", _("사회문화연구팀")
        # 경영지원부
        MANAGEMENT_EPD = "MS_EPD", _("교육/인사팀")
        MANAGEMENT_FI = "MS_FI", _("회계팀")
        MANAGEMENT_LAW = "MS_LAW", _("법무팀")
        MANAGEMENT_GA = "MS_GA", _("총무팀")
        # 기술개발부
        TECHNOLOGY_HEAD = "TDD", _("기술개발팀")
        # 디자인부
        DESIGN_HEAD = "DDB", _("디자인팀")
        # 영상부
        VIDEO_HEAD = "VDO", _("영상팀")

    department = models.ForeignKey(
        Department, on_delete=models.CASCADE, related_name="teams"
    )
    name = models.CharField(
        "팀명", choices=TeamChoice.choices, max_length=30, unique=True
    )

    def __str__(self):
        return f"{self.get_name_display()}"
