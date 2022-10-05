#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

from decouple import config


def main():
    """Run administrative tasks."""
    settings_module = config("DJANGO_SETTINGS_MODULE", default=None)
    if settings_module is not None:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", settings_module)
    else:
        print(
            "Error: no DJANGO_SETTINGS_MODULE found. Will NOT start devserver. "
            "Remember to create .env file at project root. "
            "Check README for more info."
        )
        sys.exit(1)

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
