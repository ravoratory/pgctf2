import math

from django.contrib.auth import get_user_model
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from game_configurations.models import Configuration
from quizzes.models import Quiz, Solved

User = get_user_model()


def recalculate_quiz_score(quiz_id=None):
    if not Configuration.update_score():
        return

    min_score = Configuration.min_score()
    max_score = Configuration.max_score()
    winners_threshould = Configuration.winners_threshould()

    quizzes: list[Quiz] = Quiz.objects.filter(published=True).prefetch_related("solved_users")
    if quiz_id is not None:
        quizzes = quizzes.filter(id=quiz_id)

    for quiz in quizzes:
        if quiz.fixed:
            continue
        solve_count: int = quiz.solved_users.filter(is_staff=False).count()
        value = (((min_score - max_score) / (winners_threshould**2)) * (solve_count**2)) + max_score
        value = math.ceil(value)
        quiz.point = value if value > min_score else min_score
        quiz.save()


@receiver(post_delete, sender=User)
def user_deleted_callback(**kwargs):
    recalculate_quiz_score()


@receiver([post_save, post_delete], sender=Solved)
def solved_post_delete_callback(sender, instance, **kwargs):
    recalculate_quiz_score(quiz_id=instance.quiz.id)


@receiver(post_save, sender=Configuration)
def score_changed_callback(sender, instance, created, **kwargs):
    if instance.field in ("min_score", "max_score", "winners_threshould") and not created:
        recalculate_quiz_score()
