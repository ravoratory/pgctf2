from dj_rest_auth.views import LogoutView

from django.urls import path

from .views import PGritLoginView

urlpatterns = [
    path("login", PGritLoginView.as_view(), name="login"),
    path("logout", LogoutView.as_view(), name="logout"),
]
