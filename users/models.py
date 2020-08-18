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
		EMPLOYEE = 1, _('사원')
		DEPUTY = 2, _('대리')
		MANAGER = 3, _('과장')
		DEPART_MANAGER = 4, _('부장')
		DIRECTOR = 5, _('이사')

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

	department = models.ForeignKey("Department", related_name='users', on_delete=models.SET_NULL, null=True)
	rank = models.IntegerField(_("직급"), choices=Rank.choices, default=1)
	team = models.ForeignKey("Team", related_name='users', on_delete=models.SET_NULL, null=True)
	position = models.IntegerField(_("직책"), choices=Position.choices, default=1)

	email_verified = models.BooleanField(_("이메일 인증 여부"), default=False)
	approved = models.BooleanField(_("가입 승인"), default=False)

	# User Model Manager
	objects = managers.CustomUserManager()

	# Meta class
	class Meta:
		verbose_name = '사원'
		verbose_name_plural = '사원'
		ordering = ('-date_joined', )

	# Model Methods
	def get_full_name(self):
		"""
		Return the first_name plus the last_name
		"""
		full_name = '%s%s' % (self.last_name, self.first_name)
		return full_name.strip()

	def get_short_name(self):
		"""Return the short name for the user."""
		return self.first_name

	def get_department_name(self):
		try:
			return self.department.get_name_display()
		except AttributeError:
			return '미지정'
	get_department_name.short_description = '부서 이름'
	get_department_name.admin_order_field = 'department_name'

	def get_team_name(self):
		try:
			return self.team.get_name_display()
		except AttributeError:
			return '미지정'
	get_team_name.short_description = '팀 이름'
	get_team_name.admin_order_field = 'team_name'

	def __str__(self):
		return f'{self.get_full_name()}'


# 부서 ------------------------------------------------------------------------------------
class Department(models.Model):
	class DepartmentChoice(models.TextChoices):
		CONTENTS = "CO", _('컨텐츠 개발')
		DESIGN = "DE", _('디자인')
		MANAGEMENT = "MN", _('경영지원')
		LEGAL = "LG", _('법무')
		TECHNOLOGY = "TN", _('기술개발')
		MARKETING = "MK", _('마케팅')

	name = models.CharField('소속 부서', choices=DepartmentChoice.choices, max_length=30, unique=True)

	def __str__(self):
		return f'{self.get_name_display()}부'


# 팀 ------------------------------------------------------------------------------------
class Team(models.Model):
	class ContentsTeamChoice(models.TextChoices):
		CONTENTS_BA = "COBA", _("컨텐츠 개발 본부")
		CONTENTS_LO = "COLO", _("국어")
		CONTENTS_MT = "COMT", _("수학")
		CONTENTS_PH = "COPH", _("물리")
		CONTENTS_CH = "COCH", _("화학")
		CONTENTS_BS = "COBS", _("생명과학")
		CONTENTS_GS = "COGS", _("지구과학")

	class DesignTeamChoice(models.TextChoices):
		DESIGN_HEAD = "DEH", _("디자인 본부")
		DESIGN_ONE = "DE1", _("디자인 1팀")
		DESIGN_TWO = "DE2", _("디자인 2팀")
		DESIGN_THREE = "DE3", _("디자인 3팀")

	class ManagementTeamChoice(models.TextChoices):
		MANAGEMENT_HEAD = "MNH", _("경영지원 본부")
		MANAGEMENT_GENERAL_AFFAIR = "MNG", _("총무팀")
		MANAGEMENT_ACCOUNT = "MNA", _("회계팀")
		MANAGEMENT_HUMAN_RESOURCE = "MNR", _("인사팀")

	class LegalTeamChoice(models.TextChoices):
		LEGAL_HEAD = "LGH", _("법무 본부")

	class TechnologyTeamChoice(models.TextChoices):
		TECHNOLOGY_HEAD = "TNH", _("기술개발 본부")

	class MarketingTeamChoice(models.TextChoices):
		MARKETING_HEAD = "MKH", _("마케팅 본부")

	department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='teams')
	name = models.CharField('소속 팀', max_length=30, unique=True)

	def __str__(self):
		return f'{self.get_name_display()}'

	def get_name_display(self):
		if self.name[0:2] == "CO":
			return dict(getattr(self, "ContentsTeamChoice").choices)[self.name]
		if self.name[0:2] == "DE":
			return dict(getattr(self, "DesignTeamChoice").choices)[self.name]
		if self.name[0:2] == "MN":
			return dict(getattr(self, "ManagementTeamChoice").choices)[self.name]
		if self.name[0:2] == "LG":
			return dict(getattr(self, "LegalTeamChoice").choices)[self.name]
		if self.name[0:2] == "TN":
			return dict(getattr(self, "TechnologyTeamChoice").choices)[self.name]
		if self.name[0:2] == "MK":
			return dict(getattr(self, "MarketingTeamChoice").choices)[self.name]

	class Meta:
		constraints = [
			models.CheckConstraint(
				check=models.Q(name__in=[
					"COBA",
					"COLO",
					"COMT",
					"COPH",
					"COCH",
					"COBS",
					"COGS",
					"DEH",
					"DE1",
					"DE2",
					"DE3",
					"MNH",
					"MNG",
					"MNA",
					"MNR",
					"LGH",
					"TNH",
					"MKH"
				]),
				name='name_in_choices'
			)
		]
