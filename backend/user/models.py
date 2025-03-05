from django.db import models
from django.contrib.auth.models import AbstractUser

from .utils import create_directory_path


class UserProfile(AbstractUser):
    bio = models.TextField(max_length=1000, blank=True)
    avatar = models.ImageField(upload_to=create_directory_path, blank=True)
