from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from core.models import CoreModel


User = get_user_model()


class Subject(models.Model):
    name = models.CharField(max_length=255)
    curriculum = models.IntegerField(default=0)
    # <- units
    # <- projects
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
    class Group(models.TextChoices):
        UNDEFINED = "UNDEFINED"
        TEMP = "TEMP"
        RAQ = "RAQ"
        QTB = "QTB"
        PJD = "PJD"

    unit = models.ForeignKey("Unit", related_name="questions", on_delete=models.CASCADE)
    project = models.ForeignKey(
        "Project", related_name="questions", on_delete=models.CASCADE, null=True
    )
    name = models.CharField(max_length=255)
    # <- histories
    group = models.CharField(choices=Group.choices, max_length=10, default="UNDEFINED")

    def __str__(self):
        return self.name


class QuestionImage(CoreModel):
    history = models.ForeignKey(
        "History", related_name="images", on_delete=models.CASCADE
    )
    file = models.ImageField(upload_to="question_images")


class History(CoreModel):
    question = models.ForeignKey(
        "Question", related_name="histories", on_delete=models.CASCADE
    )
    writer = models.ForeignKey(User, on_delete=models.CASCADE)
    # <- images
    # <- Assessment
    answer = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    def __str__(self):
        return f"{self.question.name} - {self.writer} {self.created_at}"


1


class Assessment(CoreModel):
    class Size(models.IntegerChoices):
        small = 1, "소"
        medium = 2, "중"
        big = 3, "대"

    history = models.ForeignKey("History", on_delete=models.CASCADE)
    difficulty = models.IntegerField(
        "난이도", default=0, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    novelty = models.IntegerField(
        "참신성", default=0, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    sympathy = models.IntegerField(
        "호감도", default=0, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    integrity = models.IntegerField(
        "구성력", default=0, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    application = models.IntegerField(
        "단원응용력", default=0, validators=[MinValueValidator(0), MaxValueValidator(10)]
    )
    size = models.IntegerField("크기", choices=Size.choices, default=2)


class Project(CoreModel):
    # <- questions
    subject = models.ForeignKey(
        "Subject", related_name="projects", on_delete=models.CASCADE, verbose_name="과목"
    )
    name = models.CharField("모의고사 명", max_length=100)

    total_due_date = models.DateTimeField("전체 마감기한", default=timezone.now)
    design_due_date = models.DateTimeField("설계 마감기한", default=timezone.now)
    select_due_date = models.DateTimeField("대상 선정 마감기한", default=timezone.now)
    edit_due_date = models.DateTimeField("편집 마감기한", default=timezone.now)
    review_1_due_date = models.DateTimeField("1차 피드백 마감기한", default=timezone.now)
    illustration_1_due_date = models.DateTimeField("일러 1차 마감기한", default=timezone.now)
    review_2_due_date = models.DateTimeField("2차 피드백 마감기한", default=timezone.now)
    illustration_2_due_date = models.DateTimeField("일러 2차 마감기한", default=timezone.now)
    review_3_due_date = models.DateTimeField("3차 피드백 마감기한", default=timezone.now)
    illustration_3_due_date = models.DateTimeField("일러 3차 마감기한", default=timezone.now)

    select_completed = models.BooleanField(default=False)
    edit_completed = models.BooleanField(default=False)
    review_1_completed = models.BooleanField(default=False)
    illustration_1_completed = models.BooleanField(default=False)
    review_2_completed = models.BooleanField(default=False)
    illustration_2_completed = models.BooleanField(default=False)
    review_3_completed = models.BooleanField(default=False)
    illustration_3_completed = models.BooleanField(default=False)

    designer = models.ForeignKey(
        User,
        verbose_name="설계 책임자",
        related_name="+",
        on_delete=models.SET_NULL,
        null=True,
    )
    selector = models.ForeignKey(
        User,
        verbose_name="선정 책임자",
        related_name="+",
        on_delete=models.SET_NULL,
        null=True,
    )
    editor = models.ForeignKey(
        User,
        verbose_name="편집 책임자",
        related_name="+",
        on_delete=models.SET_NULL,
        null=True,
    )
    reviewer_1 = models.ForeignKey(
        User,
        verbose_name="1차 피드백 책임자",
        related_name="+",
        on_delete=models.SET_NULL,
        null=True,
    )
    reviewer_2 = models.ForeignKey(
        User,
        verbose_name="2차 피드백 책임자",
        related_name="+",
        on_delete=models.SET_NULL,
        null=True,
    )
    reviewer_3 = models.ForeignKey(
        User,
        verbose_name="3차 피드백 책임자",
        related_name="+",
        on_delete=models.SET_NULL,
        null=True,
    )

    def __str__(self):
        return self.name
