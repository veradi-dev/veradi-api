from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import WorkHourViewset

app_name = "workhours"
router = DefaultRouter()
router.register(r"api/v1/workhours", WorkHourViewset, basename="workhours")
urlpatterns = [path("", include(router.urls))]
