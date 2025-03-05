from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"articles", views.ArticleViewSet)
router.register(r"tags", views.TagViewSet)
router.register(r"topics", views.TopicViewSet)
router.register(r"comments", views.CommentCreate)

urlpatterns = [
    path("", include(router.urls)),
]
