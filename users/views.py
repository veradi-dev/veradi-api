from rest_framework.permissions import AllowAny
from rest_framework.settings import api_settings
from knox.views import LoginView as KnoxLoginView
from .token import create_user_token


class LoginView(KnoxLoginView):
    authentication_classes = api_settings.DEFAULT_AUTHENTICATION_CLASSES
    permission_classes = (AllowAny,)

    def post(self, request, **kwargs):
        token = create_user_token(request)
        if token is not None:
            return super().post(request, **kwargs)
