from django.apps import AppConfig


class QuizzesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "quizzes"
    icon_name = "flag"

    def ready(self):
        from . import signals  # noqa: F401
