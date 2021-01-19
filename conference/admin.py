from django.contrib import admin
from .models import ConferenceRoom, Reservation


@admin.register(ConferenceRoom)
class ConferenceRoomAdmin(admin.ModelAdmin):
    pass


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    pass
