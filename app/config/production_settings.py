import os

from .settings import *  # noqa F403

DEBUG = False
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        "PORT": os.getenv("DB_PORT"),
    }
}
STATIC_ROOT = os.path.join(BASE_DIR, "static/")  # noqa: F405
STATICFILES_DIRS = (
    ("css", os.path.join(STATIC_ROOT, "css")),
    ("img", os.path.join(STATIC_ROOT, "img")),
    ("js", os.path.join(STATIC_ROOT, "js")),
    ("html", os.path.join(STATIC_ROOT, "html")),
)

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")  # noqa: F405

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
}
