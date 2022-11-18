from material.admin.sites import MaterialAdminSite

from django.contrib import admin
from django.urls import path

from . import views


class CustomAdminSite(MaterialAdminSite):
    def get_urls(self):
        self._registry = admin.site._registry
        admin_urls = super().get_urls()
        custom_urls = [
            path("swagger-ui", views.SwaggerUIView.as_view(admin=self), name="swagger-ui"),
        ]
        return custom_urls + admin_urls  # custom urls must be at the beginning

    def get(self, request):
        request.current_app == self.name
        return super().get(request)

    def get_app_list(self, request):
        app_list = super().get_app_list(request)
        app_list += [
            {
                "name": "Swagger UI",
                "app_label": "Swagger UI",
                "models": [
                    {
                        "name": "Swagger",
                        "object_name": "schema",
                        "admin_url": "/admin/swagger-ui",
                        "view_only": True,
                    }
                ],
            }
        ]
        return app_list


site = CustomAdminSite()
