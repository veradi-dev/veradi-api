from django.urls import path, include
from rest_framework.routers import DefaultRouter
from knox import views as knox_views
from .views import LoginView
from .viewsets import UserViewSet

app_name = "users"
router = DefaultRouter()
router.register(r"api/v1/users", UserViewSet, basename="users")
urlpatterns = [
    path("", include(router.urls)),
    path("api/v1/auth/login/", LoginView.as_view(), name="login"),
    path("api/v1/auth/logout/", knox_views.LogoutView.as_view(), name="logout"),
    path("api/v1/auth/", include("knox.urls")),
]
