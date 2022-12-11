import hashlib

from allauth.socialaccount.providers.base import ProviderAccount
from allauth.socialaccount.providers.oauth2.provider import OAuth2Provider


class PGritAccount(ProviderAccount):
    def get_name(self):
        return self.account.extra_data.get("username")

    def get_avatar_url(self):
        return self.account.extra_Data.get("avatar")

    def to_str(self):
        name = self.get_name()
        return name or super(PGritAccount, self).to_str()


class PGritProvider(OAuth2Provider):
    id = "pgrit"
    name = "PGrit"
    account_class = PGritAccount

    def get_auth_url(self, requeset, action):
        return "https://community.4nonome.com/oauth/authorize/"

    def get_default_scope(self):
        return ["read"]

    def extract_uid(self, data):
        return data["username"]

    def random_email(self, salt):
        return hashlib.sha256(salt.encode()).hexdigest() + "@example.com"

    def extract_common_fields(self, data):
        return dict(
            id=data.get("username"),
            username=data.get("username"),
            email=self.random_email(data.get("username")),
        )


provider_classes = [PGritProvider]
