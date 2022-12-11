from django.urls import path

from . import views

app_name = "users"
urlpatterns = [
    path("self", views.UserSelfView.as_view(), name="self"),
    path("<str:username>", views.UserDetailView.as_view(), name="user"),
    path("<str:username>/chart/radar", views.UserRadarChartView.as_view(), name="radar_chart"),
    path("<str:username>/chart/line", views.UserLineChartView.as_view(), name="line_chart"),
]
