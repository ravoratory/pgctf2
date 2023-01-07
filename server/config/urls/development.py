import debug_toolbar
from allauth.socialaccount.providers.oauth2.urls import default_urlpatterns
from pgrit.provider import PGritProvider

from django.urls import include, path

from .urls import urlpatterns

# fmt: off
urlpatterns += [
    path("__debug__/", include(debug_toolbar.urls)),
    # 手動でOAuth Tokenを入手してPOSTしなくてもログインできるようにする
    # login: /pgrit/login/
    # callback: /pgrit/login/callback/
    *default_urlpatterns(PGritProvider),
]
# fmt: on
