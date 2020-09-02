from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import get_units, QuestionRegisterView
from .viewsets import QuestionViewSet, ProjectViewSet

router = DefaultRouter()
router.register("", viewset=ProjectViewSet)
router.register("questions", viewset=QuestionViewSet)

urlpatterns = [
    path("api/v1/projects/<str:subject>/unit-list/", get_units, name="get_unit"),
    path(
        "api/v1/projects/questions/registration/",
        QuestionRegisterView.as_view(),
        name="get_question",
    ),
    path("api/v1/projects/", include(router.urls)),
]
