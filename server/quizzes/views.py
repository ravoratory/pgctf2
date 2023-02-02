from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.db.models import Count, Exists, OuterRef, Subquery
from django.shortcuts import get_object_or_404

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

    def get_queryset(self):
        user = self.request.user

        return (
            Quiz.objects.filter(published=True)
            .select_related("category")
            .annotate(
                is_solved=Exists(
                    Solved.objects.filter(quiz=OuterRef("pk"), user=user).values("id"),
                ),
                # 一旦ランキングのフリーズは考えないことにする
                winners=Subquery(
                    Solved.objects.filter(quiz=OuterRef("pk"), user__is_staff=False)
                    .values("quiz_id")
                    .annotate(count=Count("quiz_id"))
                    .values("count")
                ),
            )
            .order_by("number")
        )


class QuizDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuizDetailSerializer
    queryset = (
        Quiz.objects.filter(published=True)
        .select_related("category")
        .annotate(
            winners=Subquery(
                Solved.objects.filter(quiz=OuterRef("pk"), user__is_staff=False)
                .values("quiz_id")
                .annotate(count=Count("quiz_id"))
                .values("count")
            )
        )
    )
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

    def post(self, request, number):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        quiz = get_object_or_404(Quiz.objects.filter(published=True), number=number)
        user = request.user

        if Solved.objects.filter(quiz=quiz, user=user).exists():
            return Response({"detail": "すでに正解済みです"}, status=status.HTTP_400_BAD_REQUEST)

        if quiz.flag == serializer.validated_data["flag"].strip():
            solved = Solved.objects.create(quiz=quiz, user=user)
            SubmitLog.objects.create(
                user=user, quiz=quiz, solved=solved, flag=serializer.validated_data["flag"].lower()
            )

            return Response({"correct": True}, status=status.HTTP_200_OK)

        SubmitLog.objects.create(user=user, quiz=quiz, flag=serializer.validated_data["flag"])
        return Response({"correct": False}, status=status.HTTP_200_OK)


class CategoriesView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CategorySerializer
    queryset = (
        QuizCategory.objects.all()
        .annotate(
            count=Subquery(
                Quiz.objects.filter(category=OuterRef("pk"))
                .values("category")
                .annotate(count=Count("category"))
                .values("count")
            )
        )
        .order_by("name")
    )
