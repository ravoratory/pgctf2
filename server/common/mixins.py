from django.contrib.auth.mixins import UserPassesTestMixin

from game_configurations.models import Configuration


class QuizViewableMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.is_staff or Configuration.quiz_viewable() or Configuration.game_ongoing()


class CanSubmitFlagMixin(QuizViewableMixin):
    def test_func(self):
        return super().test_func() and not Configuration.game_paused()


class RankingViewableMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.is_staff or Configuration.ranking_viewable()
