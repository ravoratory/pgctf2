from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    fieldsets = (
        (None, {"fields": ("username",)}),
        ("個人情報", {"fields": ("email", "password")}),
        (
            "権限",
            {
                "fields": ("is_staff", "is_superuser", "groups", "user_permissions"),
            },
        ),
        ("日付", {"fields": ("last_login", "date_joined")}),
    )
    readonly_fields = ("date_joined",)
    list_display = ("username", "is_staff", "last_login", "date_joined")
    search_fields = ("username",)
