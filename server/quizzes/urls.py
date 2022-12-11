from django.urls import path

from . import views

app_name = "quizzes"
urlpatterns = [
    path("", views.QuizListView.as_view(), name="quizzes"),
    path("<str:number>", views.QuizDetailView.as_view(), name="quiz"),
    path("<str:number>/winners", views.QuizWinnersView.as_view(), name="winners"),
    path("<str:number>/answer", views.AnswerView.as_view(), name="answer"),
]
