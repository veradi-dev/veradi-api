from django.urls import reverse_lazy
from django.views.generic import TemplateView
from .permissions.mixins import ApprovedLoginRequiredMixin


class HomeView(ApprovedLoginRequiredMixin, TemplateView):
	template_name = 'home/home.html'
	login_url = reverse_lazy('users:login')
	redirect_field_name = 'redirect_to'

