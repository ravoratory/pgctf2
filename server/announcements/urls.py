from django.urls import path

from . import views

app_name = "announcements"
urlpatterns = [
    path("", views.AnnouncementView.as_view(), name="announces"),
]
