from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Quiz, QuizCategory, Solved, SubmitLog
from .serializers import (
    CategorySerializer,
    QuizDetailSerializer,
    QuizFlagSerializer,
    QuizOverviewSerializer,
    QuizWinnerSerializer,
)


class QuizListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuizOverviewSerializer
    queryset = Quiz.objects.filter(published=True)


class QuizDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuizDetailSerializer
    queryset = Quiz.objects.filter(published=True)
    lookup_field = "number"


class QuizWinnersView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuizWinnerSerializer
    lookup_field = "number"

    def get_queryset(self):
        return Solved.objects.filter(quiz__number=self.kwargs["number"]).order_by("-solved_at")


class AnswerView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuizFlagSerializer

    def post(self, reuquest, number):
        serializer = self.get_serializer(data=reuquest.data)
        serializer.is_valid(raise_exception=True)

        quiz = Quiz.objects.get(number=number)
        user = reuquest.user

        if Solved.objects.filter(quiz=quiz, user=user).exists():
            return Response({"detail": "すでに正解済みです"}, status=status.HTTP_400_BAD_REQUEST)

        if quiz.flag == serializer.validated_data["flag"]:
            solved = Solved.objects.create(quiz=quiz, user=user)
            SubmitLog.objects.create(user=user, quiz=quiz, solved=solved, flag=serializer.validated_data["flag"])

            return Response({"correct": True}, status=status.HTTP_200_OK)

        SubmitLog.objects.create(user=user, quiz=quiz, flag=serializer.validated_data["flag"])
        return Response({"correct": False}, status=status.HTTP_200_OK)


class CategoriesView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CategorySerializer
    queryset = QuizCategory.objects.all()
