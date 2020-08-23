from django.urls import path, include
from .views import get_units

urlpatterns = [
    path("api/v1/projects/<str:subject>/unit-list/", get_units, name="get_unit")
]
