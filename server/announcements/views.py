from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Announcement
from .serializers import AnnouncementSerializer


class AnnouncementView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all().order_by("-created_at")
