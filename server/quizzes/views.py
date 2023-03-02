from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.db.models import Count, Exists, OuterRef, Subquery
from django.shortcuts import get_object_or_404
from django.utils import timezone

from common.mixins import CanSubmitFlagMixin, QuizViewableMixin

from .models import Quiz, QuizCategory, Solved, SubmitLog
from .serializers import (
    CategorySerializer,
    QuizDetailSerializer,
    QuizFlagSerializer,
    QuizOverviewSerializer,
    QuizWinnerSerializer,
)


class QuizListView(QuizViewableMixin, ListAPIView):
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
                # select count(*) from (select ... from ... group by ...)の書き方ができない?ので0件の場合はnullになる
                winners=Subquery(
                    Solved.objects.filter(quiz=OuterRef("pk"), user__is_staff=False)
                    .values("quiz_id")
                    .annotate(count=Count("quiz_id"))
                    .values("count")
                ),
            )
            .order_by("number")
        )


class QuizDetailView(QuizViewableMixin, RetrieveAPIView):
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


class QuizWinnersView(QuizViewableMixin, ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuizWinnerSerializer
    lookup_field = "number"

    def get_queryset(self):
        return Solved.objects.filter(quiz__number=self.kwargs["number"]).order_by("-solved_at")


class AnswerView(CanSubmitFlagMixin, GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = QuizFlagSerializer

    def check_brute_force(self, user):
        # 1分以内に20回以上お手つきしたら429 to many requests
        return (
            SubmitLog.objects.filter(
                user=user, solved__isnull=True, created_at__gte=timezone.now() - timezone.timedelta(minutes=1)
            ).count()
            >= 20
        )

    def post(self, request, number):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        quiz = get_object_or_404(Quiz.objects.filter(published=True), number=number)
        user = request.user

        if self.check_brute_force(user):
            return Response(status=status.HTTP_429_TOO_MANY_REQUESTS)

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
