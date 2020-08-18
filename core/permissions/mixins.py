from django.contrib.auth.mixins import AccessMixin
from django.shortcuts import redirect


__all__ = [
	"AnonymousUserOnlyMixin",
	"ApprovedLoginRequiredMixin",
	"ContentDepartmentOnlyMixin",
	"DesignDepartmentOnlyMixin",
	"ManagementDepartmentOnlyMixin",
	"LegalDepartmentOnlyMixin",
	"TechnologyDepartmentOnlyMixin",
	"MarketingDepartmentOnlyMixin",
	"TeamManagerPositionRequiredMixin",
	"GeneralManagerPositionRequiredMixin",
	"CEOPositionRequiredMixin",
]


class BasePermissionMixin:
	def dispatch(self, request, *args, **kwargs):
		# superuser 의 경우 항상 접근 allow
		if request.user.is_superuser:
			return super().dispatch(request, *args, **kwargs)

		# anonymous_user_only (ex. LoginView or SignUpView)
		anonymous_user_only = kwargs.get('anonymous_user_only')
		if anonymous_user_only and request.user.is_authenticated:
			return redirect('/')

		# Log In 이 필요한 서비스의 경우
		log_in_required = kwargs.get('log_in_required')
		if log_in_required and not request.user.is_authenticated:
			return self.handle_no_permission()

		# 가입 승인이 필요한 서비스의 경우
		approved_user_only = kwargs.get('approved_user_only')
		if approved_user_only and not request.user.approved:
			return self.handle_no_permission()

		# 부서 제한이 있을 경우
		department = kwargs.get('department')
		if department is not None and request.user.department != department:
			return self.handle_no_permission()

		# 직급 제한이 있을 경우
		rank = kwargs.get('rank')
		if rank is not None and request.user.rank < rank:
			return self.handle_no_permission()

		# 팀 제한이 있을 경우
		team = kwargs.get('team')
		if team is not None and request.user.get_team_name() != team:
			return self.handle_no_permission()

		# 직책 제한이 있을 경우
		position = kwargs.get('position')
		if position is not None and request.user.position < position:
			return self.handle_no_permission()

		# 위의 제한을 통과한 경우 View 에 접근 가능
		return super().dispatch(request, *args, **kwargs)


# 1차적 접근 제한---------------------------------------------------------------------
class AnonymousUserOnlyMixin(BasePermissionMixin, AccessMixin):
	def dispatch(self, request, *args, **kwargs):
		kwargs['anonymous_user_only'] = True
		return super().dispatch(request, *args, **kwargs)


class ApprovedLoginRequiredMixin(BasePermissionMixin, AccessMixin):
	permission_denied_message = "승인되지 않은 계정입니다."

	def dispatch(self, request, *args, **kwargs):
		kwargs["approved_user_only"] = True
		kwargs["log_in_required"] = True
		return super().dispatch(request, *args, **kwargs)


# DepartmentMixin---------------------------------------------------------------------
class ContentDepartmentOnlyMixin(ApprovedLoginRequiredMixin):
	def dispatch(self, request, *args, **kwargs):
		kwargs['department'] = 'CO'
		return super().dispatch(request, *args, **kwargs)


class DesignDepartmentOnlyMixin(ApprovedLoginRequiredMixin):
	def dispatch(self, request, *args, **kwargs):
		kwargs['department'] = 'DE'
		return super().dispatch(request, *args, **kwargs)


class ManagementDepartmentOnlyMixin(ApprovedLoginRequiredMixin):
	def dispatch(self, request, *args, **kwargs):
		kwargs['department'] = 'MN'
		return super().dispatch(request, *args, **kwargs)


class LegalDepartmentOnlyMixin(ApprovedLoginRequiredMixin):
	def dispatch(self, request, *args, **kwargs):
		kwargs['department'] = 'LG'
		return super().dispatch(request, *args, **kwargs)


class TechnologyDepartmentOnlyMixin(ApprovedLoginRequiredMixin):
	def dispatch(self, request, *args, **kwargs):
		kwargs['department'] = 'TN'
		return super().dispatch(request, *args, **kwargs)


class MarketingDepartmentOnlyMixin(ApprovedLoginRequiredMixin):
	def dispatch(self, request, *args, **kwargs):
		kwargs['department'] = 'MK'
		return super().dispatch(request, *args, **kwargs)


# PositionMixin---------------------------------------------------------------------------
class TeamManagerPositionRequiredMixin(ApprovedLoginRequiredMixin):
	raise_exception = True
	permission_denied_message = "권한이 없는 계정입니다."

	def dispatch(self, request, *args, **kwargs):
		kwargs['position'] = 3
		return super().dispatch(request, *args, **kwargs)


class GeneralManagerPositionRequiredMixin(ApprovedLoginRequiredMixin):
	raise_exception = True
	permission_denied_message = "권한이 없는 계정입니다."

	def dispatch(self, request, *args, **kwargs):
		kwargs['position'] = 4
		return super().dispatch(request, *args, **kwargs)


class CEOPositionRequiredMixin(ApprovedLoginRequiredMixin):
	raise_exception = True
	permission_denied_message = "권한이 없는 계정입니다."

	def dispatch(self, request, *args, **kwargs):
		kwargs['position'] = 8
		return super().dispatch(request, *args, **kwargs)
