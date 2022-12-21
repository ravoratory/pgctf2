import json

import pytz
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Case, F, Max, NullBooleanField, Prefetch, Sum, When
from django.db.models.expressions import Window
from django.db.models.functions import Cast, Rank
from django.http import HttpRequest
from django.http.response import HttpResponse
from django.views.decorators.http import require_GET

from game_configurations.models import Configuration
from quizzes.models import Solved

from .models import User
from .serializers import UserDetailSerializer


class UserSelfView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserDetailSerializer

    def get_object(self):
        return self.request.user


class UserDetailView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserDetailSerializer
    lookup_field = "username"
    queryset = User.objects.filter(is_active=True)  # , is_staff=False)


class UserRadarChartView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        return Response(status=status.HTTP_200_OK)


class UserLineChartView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, username):
        return Response(status=status.HTTP_200_OK)


class RankingView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserDetailSerializer

    def get_queryset(self):
        enable, freeze_datetime = Configuration.enable_ranking()

        ranking = User.objects.filter(is_active=True, is_staff=False).prefetch_related("solved")

        if enable:
            ranking = ranking.annotate(points=Sum("solved__quiz__point")).annotate(last_solve=Max("solved__solved_at"))
        else:
            ranking = ranking.annotate(
                points=Sum(Case(When(solved__solved_at__lt=freeze_datetime, then="solved__quiz__point")))
            ).annotate(last_solve=Cast(None, output_field=NullBooleanField()))

        return (
            ranking.annotate(
                rank=Window(
                    expression=Rank(),
                    order_by=F("points").desc(nulls_last=True),
                )
            )
            .values("rank", "username", "points", "last_solve")
            .order_by("rank", "last_solve")
        )


@require_GET
def ranking_chart(request: HttpRequest, *args, **kwargs):
    if not Configuration.ranking_viewable() and not request.user.is_staff:
        return HttpResponse(status=403)

    enable, freeze_datetime = Configuration.enable_ranking()
    limit = request.GET.get("limit", 10)

    ranking = User.objects.filter(is_active=True, is_staff=False)
    if enable:
        ranking = ranking.prefetch_related("solved")
    else:
        ranking = ranking.prefetch_related(
            Prefetch(
                "solved",
                queryset=Solved.objects.filter(solved_at__lt=freeze_datetime),
                to_attr="solved",
            )
        )
    ranking = (
        ranking.annotate(points=Sum("solved__quiz__point"))
        .annotate(
            rank=Window(
                expression=Rank(),
                order_by=F("points").desc(nulls_last=True),
            )
        )
        .annotate(last_solve=Max("solved__solved_at"))
        .order_by("rank", "last_solve")
        .values("id")
    )[:limit]
    solved = Solved.objects.filter(user__in=ranking)
    if not enable:
        solved = solved.filter(solved_at__lt=freeze_datetime)
    solved = (
        solved.annotate(date_joined=F("user__date_joined"))
        .annotate(username=F("user__username"))
        .annotate(point=F("quiz__point"))
        .values("username", "point", "solved_at", "date_joined")
        .order_by("solved_at")
    )

    users = {}
    times = []
    for record in solved:
        if users.get(record["username"]) is None:
            users[record["username"]] = []
            times.append(
                {
                    "time": record["date_joined"].astimezone(pytz.timezone("Asia/Tokyo")),
                    "username": record["username"],
                    "point": 0,
                }
            )

        for t in times:
            if t["username"] == record["username"]:
                point = t["point"]

        times.append(
            {
                "time": record["solved_at"].astimezone(pytz.timezone("Asia/Tokyo")),
                "username": record["username"],
                "point": record["point"] + point,
            }
        )
    times.sort(key=lambda k: k["time"])

    response = {"datetime": [], "points": users, "usernames": list(users.keys())}
    for time in times:
        response["datetime"].append(time["time"])
        for u in users.keys():
            if u == time["username"]:
                response["points"][u].append(time["point"])
            else:
                response["points"][u].append("NaN")

    response = json.dumps(response, cls=DjangoJSONEncoder)

    return HttpResponse(response, content_type="application/json")
