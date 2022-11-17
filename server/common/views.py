from rest_framework.response import Response
from rest_framework.views import APIView

from django.views.generic import TemplateView


class HealthView(APIView):
    def get(self, request):
        return Response("OK")


class SwaggerUIView(TemplateView):
    admin = {}
    template_name = "admin/swagger-ui.html"

    def get_context_data(self, **kwargs):
        return self.admin.each_context(self.request)
