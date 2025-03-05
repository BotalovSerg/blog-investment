from rest_framework import serializers
from .models import Article, TagPost, Topic, Question, Comment
from user.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "user", "text", "time_create"]


class CommentCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "text", "article", "user", "time_create"]


class ArticlesSerialiser(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "summary",
            "tags",
        ]


class ArticleSerialiser(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "content",
            "author",
            "tags",
            "comments",
        ]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagPost
        fields = ["id", "name"]


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "answer", "question"]


class TopicSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ["id", "title", "questions"]
