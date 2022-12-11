from decouple import config

from .base import *  # noqa: F401, F403

SECRET_KEY = config("DJANGO_SECRET_KEY", "secret_key")

DEBUG = False

ALLOWED_HOSTS = ["*"]

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]
