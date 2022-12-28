from rest_framework import serializers

from game_configurations.models import Configuration

from .models import Quiz, QuizAppendedUrl, QuizCategory, QuizFile, Solved


class QuizOverviewSerializer(serializers.ModelSerializer):
    points = serializers.IntegerField(source="point")
    solved = serializers.SerializerMethodField()
    winners = serializers.SerializerMethodField()
    category = serializers.CharField(source="category.name")

    class Meta:
        model = Quiz
        fields = ("number", "title", "category", "difficulty", "points", "winners", "solved")

    def get_winners(self, obj):
        enable, freeze_time = Configuration.enable_ranking()
        solved = Solved.objects.filter(quiz__number=obj.number, user__is_staff=False, user__is_superuser=False)
        if enable:
            return solved.count()
        return solved.filter(solved_at_lt=freeze_time).count()

    def get_solved(self, obj):
        return Solved.objects.filter(quiz__number=obj.number, user=self.context["request"].user).exists()


class QuizFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizFile
        fields = ("title", "file")


class QuizAppendedURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAppendedUrl
        fields = ("title", "url")


class QuizDetailSerializer(serializers.ModelSerializer):
    files = QuizFileSerializer(many=True, source="file")
    urls = QuizAppendedURLSerializer(many=True, source="url")
    points = serializers.IntegerField(source="point")

    class Meta:
        model = Quiz
        fields = ("number", "title", "category", "statement", "difficulty", "points", "author", "files", "urls")


class QuizWinnerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = Solved
        fields = ("username", "solved_at")


class QuizFlagSerializer(serializers.Serializer):
    flag = serializers.RegexField(r"^pgctf\{[\w_]{1,100}\}$")


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizCategory
        fields = ("name",)
