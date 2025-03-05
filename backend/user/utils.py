from django.utils import timezone


def create_directory_path(instance, filename) -> str:
    user = instance.username
    current_date = timezone.now().strftime("%Y/%m/%d")

    return f"avatars/{user}/{current_date}/{filename}"
