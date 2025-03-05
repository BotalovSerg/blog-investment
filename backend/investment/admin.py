from django.contrib import admin

from .models import Article, TagPost, Comment, Topic, Question


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    pass


@admin.register(TagPost)
class TagAdmin(admin.ModelAdmin):
    pass


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "article", "user", "text", "time_create")
    fields = ("article", "user", "text")


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    pass


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    pass
