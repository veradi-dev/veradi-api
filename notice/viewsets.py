from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import NoticeSerializer
from .models import Notice


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = None
    permission_classes = []
