from django.db import models
from django.contrib.auth import get_user_model
from core.models import CoreModel
from users.models import Team

User = get_user_model()


class Notice(CoreModel):
    """
    공지사항 모델

    writer: 글쓴이
    team: 공지될 팀 , null 이면 전체 공지
    title: 제목
    contents: 내용

    CoreModel
     - created_at
     - updated_at
    """

    writer = models.ForeignKey(User, verbose_name="글쓴이", related_name='+', on_delete=models.CASCADE)
    team = models.ForeignKey(Team, verbose_name="영역", related_name='notices', on_delete=models.SET_NULL, null=True, default=None, blank=True)
    title = models.CharField("제목", max_length=300)
    contents = models.CharField("내용", max_length=5000)

    def __str__(self):
        return f"{self.title} {self.created_at.strftime('%Y.%m.%d %H:%M:%S')}"
