from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import get_units, QuestionRegisterView
from .viewsets import QuestionViewSet

router = DefaultRouter()
router.register("", viewset=QuestionViewSet)

urlpatterns = [
    path("api/v1/projects/<str:subject>/unit-list/", get_units, name="get_unit"),
    path(
        "api/v1/projects/question/registration/",
        QuestionRegisterView.as_view(),
        name="get_question",
    ),
    path("api/v1/projects/questions/", include(router.urls)),
]
