from django.contrib.auth import get_user_model, authenticate, login
from knox.models import AuthToken


User = get_user_model()


def create_user_token(request):
    username = request.data.get("username")
    password = request.data.get("password")
    code = request.data.get("code")

    user = authenticate(username=username, password=password)

    if user.code == code:
        token = AuthToken.objects.create(user=user)
        login(request, user)
        return token
    return None
