from django.contrib import admin

from . import models


class QuizAdmin(admin.ModelAdmin):
    list_display = ["number", "title", "category", "difficulty", "published", "point", "winners"]
    list_filter = [
        "category",
        "difficulty",
        "published",
        "is_extra",
        "point",
        "author",
    ]
    search_fields = ["number", "title"]

    fieldsets = (
        (None, {"fields": ("number", "title", "statement", "category")}),
        ("Detail", {"fields": ("flag", "difficulty", "point", "author")}),
        ("Appends", {"fields": ("file", "url")}),
        ("Publish", {"fields": ("published", "is_extra"), "description": "公開状態でQuizを新規作成するとAnnounceも自動生成されます"}),
    )

    icon_name = "flag"

    def winners(self, obj):
        return obj.solved_users.count()


class QuizCategoryAdmin(admin.ModelAdmin):
    icon_name = "view_module"


class QuizFileAdmin(admin.ModelAdmin):
    icon_name = "attach_file"


class QuizAppendedUrlAdmin(admin.ModelAdmin):
    icon_name = "link"


class SolvedAdmin(admin.ModelAdmin):
    list_display = ["user", "quiz", "solved_at"]
    list_filter = ["quiz", "user", "solved_at"]
    search_fields = ["quiz__number", "user__username", "solved_at"]
    icon_name = "check_circle"


class SubmitLogAdmin(admin.ModelAdmin):
    list_display = ["user", "quiz", "created_at", "correct"]
    list_filter = ["quiz", "user"]
    search_fields = ["quiz__number", "user__username", "submitted_at"]
    icon_name = "description"

    def correct(self, obj):
        return obj.solved is not None


admin.site.register(models.Quiz, QuizAdmin)
admin.site.register(models.QuizCategory, QuizCategoryAdmin)
admin.site.register(models.QuizFile, QuizFileAdmin)
admin.site.register(models.QuizAppendedUrl, QuizAppendedUrlAdmin)
admin.site.register(models.Solved, SolvedAdmin)
admin.site.register(models.SubmitLog, SubmitLogAdmin)
