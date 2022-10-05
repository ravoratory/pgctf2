from django.contrib import admin

from .models import Configuration


class ConfigurationAdmin(admin.ModelAdmin):
    list_display = ["field", "value", "description"]
    search_fields = ["field", "description"]
    list_editable = ["value"]
    ordering = ["id"]


admin.site.register(Configuration, ConfigurationAdmin)
