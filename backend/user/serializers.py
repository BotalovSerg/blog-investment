from rest_framework import serializers
from .models import UserProfile
from django.conf import settings


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=True)
    avatar_url = serializers.SerializerMethodField()

    def get_avatar_url(self, obj: UserProfile):
        # return f"{settings.HOST_API_URL}{settings.MEDIA_URL}{str(obj.avatar)}"
        if obj.avatar:
            return f"{settings.MEDIA_URL}{str(obj.avatar)}"
        return None

    # DEFAULT_AVATAR = "avatars/default_avatar.png"

    def create(self, validated_data):
        # avatar = validated_data.get("avatar", self.DEFAULT_AVATAR)
        user = UserProfile.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            # avatar=avatar,
        )
        return user

    def update(self, instance, validated_data):

        password = validated_data.pop("password", None)
        if password:
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "bio",
            "avatar",
            "avatar_url",
        ]
