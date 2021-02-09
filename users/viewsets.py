from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer, TeamMemberSerializer


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()
    permission_classes = [IsAuthenticated]

    @action(methods=["get"], detail=False)
    def get_team_members(self, request):
        user = request.user
        team_members = user.team.users.get_queryset()
        serializer = TeamMemberSerializer(team_members, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
