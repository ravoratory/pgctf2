from rest_framework import serializers

from django.contrib.auth import get_user_model

from quizzes.serializers import SolvedQuizSerializer

User = get_user_model()


class UserDetailSerializer(serializers.ModelSerializer):
    points = serializers.IntegerField(source="ranking_score")
    solved_quiz_count = serializers.IntegerField(source="ranking_solved_quiz_count")
    last_solved = serializers.DateTimeField(source="ranking_last_solved_at")
    solved_quizzes = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("username", "points", "solved_quiz_count", "last_solved", "solved_quizzes")

    def get_solved_quizzes(self, obj):
        quizzes = obj.ranking_solved_quizzes()
        return SolvedQuizSerializer(quizzes, many=True, context=self.context).data


class UserOverviewSerializer(serializers.ModelSerializer):
    rank = serializers.IntegerField()
    points = serializers.IntegerField()
    last_solved = serializers.DateTimeField(source="last_solve")

    class Meta:
        model = User
        fields = ("username", "rank", "points", "last_solved")


class UserRadarChartSerializer(serializers.Serializer):
    subject = serializers.CharField(source="category__name")
    ratio = serializers.FloatField()
    fullmark = serializers.IntegerField()
