from django.contrib import admin

from common.admin import DropdownFilter, RelatedDropdownFilter

from . import models


class QuizAdmin(admin.ModelAdmin):
    list_display = ["number", "title", "category", "difficulty", "published", "point", "winners"]
    list_filter = [
        ("category", RelatedDropdownFilter),
        ("difficulty", DropdownFilter),
        "published",
        "is_extra",
        ("point", DropdownFilter),
        ("author", DropdownFilter),
    ]
    search_fields = ["number", "title"]

    fieldsets = (
        (None, {"fields": ("number", "title", "statement", "category")}),
        ("Detail", {"fields": ("flag", "difficulty", "point", "author")}),
        ("Appends", {"fields": ("file", "url")}),
        ("Publish", {"fields": ("published", "is_extra"), "description": "公開状態でQuizを新規作成するとAnnounceも自動生成されます"}),
    )

    def winners(self, obj):
        return obj.solved_users.count()


class SolvedAdmin(admin.ModelAdmin):
    list_display = ["user", "quiz", "solved_at"]
    list_filter = [("quiz", RelatedDropdownFilter), ("user", RelatedDropdownFilter), "solved_at"]
    search_fields = ["quiz__number", "user__username", "solved_at"]


class SubmitLogAdmin(admin.ModelAdmin):
    list_display = ["user", "quiz", "created_at", "correct"]
    list_filter = [("quiz", RelatedDropdownFilter), ("user", RelatedDropdownFilter)]
    search_fields = ["quiz__number", "user__username", "submitted_at"]

    def correct(self, obj):
        return obj.solved is not None


admin.site.register(models.Quiz, QuizAdmin)
admin.site.register(models.QuizCategory)
admin.site.register(models.QuizFile)
admin.site.register(models.QuizAppendedUrl)
admin.site.register(models.Solved, SolvedAdmin)
admin.site.register(models.SubmitLog, SubmitLogAdmin)
