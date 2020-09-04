from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import get_units, QuestionRegisterView
from .viewsets import QuestionViewSet, ProjectViewSet

router = DefaultRouter()
router.register("api/v1/projects", ProjectViewSet, "project")
router.register("api/v1/questions", QuestionViewSet, "question")

urlpatterns = [
    path("api/v1/projects/<str:subject>/unit-list/", get_units, name="get_unit"),
    path(
        "api/v1/questions/registration/",
        QuestionRegisterView.as_view(),
        name="get_question",
    ),
]
urlpatterns += router.urls
