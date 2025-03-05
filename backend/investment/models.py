from django.db import models
from user.models import UserProfile


class Article(models.Model):
    title = models.CharField(max_length=200)
    summary = models.TextField(blank=True)
    content = models.TextField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField("TagPost", blank=True, related_name="articles")
    author = models.ForeignKey(
        UserProfile,
        on_delete=models.SET_NULL,
        related_name="articles",
        null=True,
    )

    def __str__(self) -> str:
        return self.title


class TagPost(models.Model):
    name = models.CharField(max_length=50, db_index=True)

    def __str__(self) -> str:
        return self.name


class Comment(models.Model):
    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name="comments",
    )
    user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name="comments",
    )
    text = models.TextField()
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"user: {self.user}, time create{self.time_create}"


class Topic(models.Model):
    title = models.CharField(max_length=250)

    def __str__(self) -> str:
        return self.title


class Question(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="questions")
    answer = models.TextField(blank=True)
    question = models.TextField(blank=True)

    def __str__(self) -> str:
        return f"Topic {self.topic.pk}. {self.answer}"
