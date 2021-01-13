from rest_framework import viewsets
from .serializers import WorkHourSerializer
from .models import WorkHour


class WorkHourViewset(viewsets.ModelViewSet):
    serializer_class = WorkHourSerializer
    queryset = WorkHour.objects.all()
    permission_classes = []
