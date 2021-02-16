from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from users.models import Team
from .serializers import NoticeSerializer
from .models import Notice


class NoticePagination(PageNumberPagination):
    page_size = 20


class NoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
    permission_classes = []
    pagination_class = NoticePagination

    def get_queryset(self):
        team_code = self.request.GET.get("team", None)
        user = self.request.user
        if team_code is not None:
            try:
                team = Team.objects.get(name=team_code)
                queryset = team.notices.get_queryset().order_by("-created_at")
                if team != user.team:
                    return Response(
                        status=status.HTTP_403_FORBIDDEN, data={"message": "권한이 없습니다."}
                    )
            except Team.DoesNotExist:
                return Response(
                    status=status.HTTP_403_FORBIDDEN,
                    data={"message": "쿼리로 잘못된 팀 코드가 전달되었습니다."},
                )
        else:
            queryset = Notice.objects.filter(team=None)
        return queryset

    def list(self, request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(data=serializer.data)

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

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        # 본인만 수정 가능
        if request.user != instance.writer:
            return Response(status=status.HTTP_403_FORBIDDEN)
        data = request.data
        print(data)
        serializer = self.get_serializer(instance, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        pass

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # 공지사항을 삭제할 수 있는 사람
        # 1. 본인 2. 해당 팀의 상급자
        if (
            request.user.position < instance.writer.position
            or request.user.team != instance.writer.team
        ):
            return Response(status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
