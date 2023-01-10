from decouple import Csv, config

from .base import *  # noqa

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("DJANGO_SECRET_KEY")

DEBUG = False

ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=Csv())
CSRF_TRUSTED_ORIGINS = config("CSRF_TRUSTED_ORIGINS", cast=Csv())
CORS_ORIGIN_WHITELIST = config("CORS_ORIGIN_WHITELIST", cast=Csv())
CORS_ALLOW_CREDENTIALS = True
SESSION_COOKIE_SAMESITE = "None"
CSRF_COOKIE_SAMESITE = "None"
SESSION_COOKIE_SECURE = True

MIDDLEWARE += [  # noqa: F405
    "whitenoise.middleware.WhiteNoiseMiddleware",
]

STATIC_ROOT = BASE_DIR / "staticfiles"  # noqa: F405
# キャッシュが悪さしてるっぽいので一旦Off
# STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {"format": "%(levelname)-8s [%(asctime)s] %(name)s: %(message)s"},
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "standard",
        },
    },
    "loggers": {
        "": {"handlers": ["console"], "level": "INFO"},
    },
}
