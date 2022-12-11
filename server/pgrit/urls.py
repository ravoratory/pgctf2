from django.urls import path

from .views import PGritLoginView

urlpatterns = [
    path("login", PGritLoginView.as_view(), name="login"),
]
