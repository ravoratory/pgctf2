"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path

from common.admin import site
from common.views import HealthView
from quizzes.views import CategoriesView
from users.views import RankingChartView, RankingView

# fmt: off
urlpatterns = [
    path("admin/", site.urls),
    path("api/", include([
        path("", include("pgrit.urls")),
        path("announces/", include("announcements.urls")),
        path("categories", CategoriesView.as_view(), name="categories"),
        path("health", HealthView.as_view(), name="health"),
        path("ranking", RankingView.as_view(), name="ranking"),
        path("ranking/chart/line", RankingChartView.as_view(), name="ranking_chart"),
        path("quizzes/", include("quizzes.urls")),
        path("users/", include("users.urls")),
    ])),
]
# fmt: on
