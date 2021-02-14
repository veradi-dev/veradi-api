from django.urls import path, include
from frontend.views import index
from django.views.generic.base import RedirectView
from django.conf.urls import url

app_name = "core"

urlpatterns = [
    path("", index, name="home"),
    path("", include("users.urls")),
    path("", include("projects.urls")),
    path("", include("workhours.urls")),
    path("", include("conference.urls")),
    path("", include("notice.urls")),
    url(
        r"^favicon\.ico$",
        RedirectView.as_view(url="/static/frontend/favicon.ico", permanent=True),
    ),
]
