from rest_framework import viewsets
from .serializers import ReservationSerializer
from .models import Reservation


class ConferenceViewSet(viewsets.ModelViewSet):
    serializer_class = ReservationSerializer
    queryset = Reservation.objects.all()
