from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Subject
from .serializers import UnitSerializer


@api_view(["get"])
def get_units(request, subject):
    try:
        subject_obj = Subject.objects.get(name=subject)
        units = subject_obj.units
        return Response(
            data=UnitSerializer(units, many=True).data, status=status.HTTP_200_OK
        )
    except Subject.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
