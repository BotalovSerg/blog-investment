from rest_framework import views, response, permissions, viewsets, mixins
from .serializers import UserSerializer

from .models import UserProfile


class UserViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj != self.request.user:
            self.permission_denied(self.request)  # Возвращаем ошибку 403
        return obj

    def update(self, request, *args, **kwargs):
        partial = True
        return super().update(request, *args, partial=partial, **kwargs)

    def get_permissions(self):
        if self.action in ["retrieve", "update"]:
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == "create":
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()
