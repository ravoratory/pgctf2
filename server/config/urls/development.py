import debug_toolbar

from django.urls import include, path

from .urls import urlpatterns

# fmt: off
urlpatterns += [
    path("__debug__/", include(debug_toolbar.urls)),
]
# fmt: on
