from django.contrib import admin

from . import models


class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ["title", "created_at"]
    search_fields = ["title"]

    icon_name = "announcement"


admin.site.register(models.Announcement, AnnouncementAdmin)
