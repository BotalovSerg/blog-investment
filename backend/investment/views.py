from rest_framework import viewsets, mixins, permissions

from .serializers import (
    ArticleSerialiser,
    ArticlesSerialiser,
    TagSerializer,
    TopicSerializer,
    CommentCreateSerializer,
)
from .models import Article, TagPost, Topic, Comment
from user.models import UserProfile


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerialiser
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == "list":
            return ArticlesSerialiser
        return super().get_serializer_class()

    def perform_create(self, serializer):
        summary = self.request.data.get("summary", None)
        if summary is None:
            summary = self.request.data["content"][:150] + "..."
        current_user = self.request.user
        return serializer.save(summary=summary, author=current_user)


class TagViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = TagPost.objects.all()
    serializer_class = TagSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class CommentCreate(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        current_user = self.request.user
        return serializer.save(user=current_user)
