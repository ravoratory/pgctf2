from django.contrib import admin

from . import models


class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ["title", "created_at"]
    search_fields = ["title"]

    icon_name = "announcement"


class MainAnnounceAdmin(admin.ModelAdmin):
    icon_name = "notifications_active"


admin.site.register(models.MainAnnounce, MainAnnounceAdmin)
admin.site.register(models.Announcement, AnnouncementAdmin)
