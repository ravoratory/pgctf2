from rest_framework import serializers

from .models import Quiz, QuizAppendedUrl, QuizCategory, QuizFile, Solved


class QuizOverviewSerializer(serializers.ModelSerializer):
    points = serializers.IntegerField(source="point")
    solved = serializers.BooleanField(source="is_solved")
    winners = serializers.SerializerMethodField()
    category = serializers.CharField(source="category.name")

    class Meta:
        model = Quiz
        fields = ("number", "title", "category", "difficulty", "points", "winners", "solved")

    def get_winners(self, obj):
        return obj.winners or 0


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
    solved = serializers.SerializerMethodField()
    category = serializers.CharField(source="category.name")
    winners = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = (
            "number",
            "title",
            "category",
            "statement",
            "difficulty",
            "points",
            "author",
            "files",
            "urls",
            "solved",
            "winners",
        )

    def get_solved(self, obj):
        return Solved.objects.filter(quiz__number=obj.number, user=self.context["request"].user).exists()

    def get_winners(self, obj):
        return obj.winners or 0


class SolvedQuizSerializer(serializers.ModelSerializer):
    points = serializers.IntegerField(source="point")
    category = serializers.CharField(source="category.name")
    solved_at = serializers.DateTimeField()

    class Meta:
        model = Quiz
        fields = ("number", "title", "category", "difficulty", "points", "solved_at")


class QuizWinnerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = Solved
        fields = ("username", "solved_at")


class QuizFlagSerializer(serializers.Serializer):
    flag = serializers.RegexField(r"^pgctf\{[\w_]{1,100}\}$")


class CategorySerializer(serializers.ModelSerializer):
    count = serializers.IntegerField()

    class Meta:
        model = QuizCategory
        fields = ("name", "count")
