from django.contrib.auth import get_user_model
from django.db import models
from core.models import CoreModel


User = get_user_model()


class Subject(models.Model):
    name = models.CharField(max_length=255)
    curriculum = models.IntegerField(default=0)
    # <- units
    def __str__(self):
        return self.name


class Unit(models.Model):
    subject = models.ForeignKey(
        "Subject", related_name="units", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50)
    # <- questions
    def __str__(self):
        return self.name


class Question(CoreModel):
    unit = models.ForeignKey("Unit", related_name="questions", on_delete=models.CASCADE)
    project = models.ForeignKey(
        "Project", related_name="questions", on_delete=models.CASCADE, null=True
    )
    name = models.CharField(max_length=255)
    # <- histories
    def __str__(self):
        return self.name


class QuestionImage(CoreModel):
    history = models.ForeignKey(
        "History", related_name="images", on_delete=models.CASCADE
    )
    file = models.ImageField(upload_to="question_images")


class History(CoreModel):
    class Size(models.IntegerChoices):
        small = 1, "소"
        medium = 2, "중"
        big = 3, "대"

    question = models.ForeignKey(
        "Question", related_name="histories", on_delete=models.CASCADE
    )
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    # <- images
    difficulty = models.IntegerField(default=0)
    novelty = models.IntegerField(default=0)
    integrity = models.IntegerField(default=0)
    order = models.IntegerField(default=0)
    size = models.IntegerField(choices=Size.choices, default=2)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.question.name} - {self.writer} {self.created_at}"


class Project(CoreModel):
    # <- questions
    pass
