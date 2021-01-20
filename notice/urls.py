from django.urls import path, include
from rest_framework import routers
from .viewsets import NoticeViewSet


router = routers.DefaultRouter()
router.register(r"", NoticeViewSet)


urlpatterns = [path("api/v1/notice/", include(router.urls))]
