from rest_framework import serializers

from quizzes.serializers import QuizOverviewSerializer

from .models import User


class UserDetailSerializer(serializers.ModelSerializer):
    points = serializers.IntegerField(source="ranking_score")
    solved_quiz_count = serializers.IntegerField(source="ranking_solved_quiz_count")
    last_solved = serializers.DateTimeField(source="ranking_last_solved_at")
    solved_quizzes = serializers.SerializerMethodField()
    # solved_quizzes = QuizOverviewSerializer(many=True, source="ranking_solved_quizzes")

    class Meta:
        model = User
        fields = ("username", "points", "solved_quiz_count", "last_solved", "solved_quizzes")

    def get_solved_quizzes(self, obj):
        return QuizOverviewSerializer(obj.ranking_solved_quizzes(), many=True, context=self.context).data
