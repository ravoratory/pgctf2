from rest_framework.authtoken.models import Token

from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib.auth.models import AnonymousUser

from game_configurations.models import Configuration


class QuizViewableMixin(UserPassesTestMixin):
    def test_func(self):
        user = self._get_user_from_token(self.request)
        return user.is_staff or Configuration.quiz_viewable() or Configuration.game_ongoing()

    def _get_user_from_token(self, request):
        token = request.META.get("HTTP_AUTHORIZATION", " ").split(" ")[1]
        try:
            valid_data = Token.objects.get(key=token)
            return valid_data.user
        except Token.DoesNotExist:
            return AnonymousUser()


class CanSubmitFlagMixin(QuizViewableMixin):
    def test_func(self):
        return super().test_func() and not Configuration.game_paused()


class RankingViewableMixin(UserPassesTestMixin):
    def test_func(self):
        user = self._get_user_from_token(self.request)
        return user.is_staff or Configuration.ranking_viewable()

    def _get_user_from_token(self, request):
        token = request.META.get("HTTP_AUTHORIZATION", " ").split(" ")[1]
        try:
            valid_data = Token.objects.get(key=token)
            return valid_data.user
        except Token.DoesNotExist:
            return AnonymousUser()
