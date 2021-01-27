from rest_framework import viewsets, status
from rest_framework.response import Response

from users.models import Team
from .serializers import NoticeSerializer
from .models import Notice


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
    permission_classes = []

    def list(self, request):
        user = request.user
        team_code = request.GET.get("team", None)
        if team_code is not None:
            try:
                team = Team.objects.get(name=team_code)
                if team != user.team:
                    return Response(
                        status=status.HTTP_403_FORBIDDEN, data={"message": "권한이 없습니다."}
                    )
            except Team.DoesNotExist:
                return Response(
                    status=status.HTTP_403_FORBIDDEN,
                    data={"message": "쿼리로 잘못된 팀 코드가 전달되었습니다."},
                )
        queryset = self.get_queryset().filter(team=team_code)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        team_name = request.data.pop("team", None)
        try:
            team = Team.objects.get(name=team_name)
        except Team.DoesNotExist:
            if team_name not in [None, "all"]:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            team = None
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            instance = serializer.save()
            instance.team = team
            instance.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.data)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def update(self, request, pk=None):
        pass

    def retrieve(self, request, *args, **kwargs):
        pass

    def destroy(self, request, *args, **kwargs):
        pass
