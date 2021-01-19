from django.urls import path, include
from rest_framework import routers
from .viewsets import ConferenceViewSet


router = routers.DefaultRouter()
router.register(r"", ConferenceViewSet)


urlpatterns = [path("api/v1/conference/", include(router.urls))]
