from django.urls import path, include
from frontend.views import index


app_name = "core"

urlpatterns = [
    path("", index, name="home"),
    path("", include("users.urls")),
]
