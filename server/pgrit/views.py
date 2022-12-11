import requests
from allauth.socialaccount.models import SocialToken
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.oauth2.views import OAuth2Adapter, OAuth2CallbackView, OAuth2LoginView
from dj_rest_auth.registration.views import SocialLoginView

from .provider import PGritProvider


class PGritAPI(OAuth2Client):
    pass


class PGritOAuth2Adapter(OAuth2Adapter):
    provider_id = PGritProvider.id
    access_token_url = "https://community.4nonome.com/oauth/token"
    authorize_url = "https://community.4nonome.com/oauth/authorize"
    profile_url = "https://community.4nonome.com/api/v1/accounts/verify_credentials"
    client_class = PGritAPI

    def parse_token(self, data):
        token = SocialToken(
            token=data["access_token"],
        )
        token.token_secret = data.get("refresh_token", "")
        token.user_data = {**data}

        return token

    def complete_login(self, request, app, token, **kwargs):
        res = requests.get(self.profile_url, headers={"Authorization": "Bearer " + token.token})
        extra_data = res.json()

        return self.get_provider().sociallogin_from_response(request, extra_data)


oauth2_login = OAuth2LoginView.adapter_view(PGritOAuth2Adapter)
oauth2_callback = OAuth2CallbackView.adapter_view(PGritOAuth2Adapter)


class PGritLoginView(SocialLoginView):
    adapter_class = PGritOAuth2Adapter
