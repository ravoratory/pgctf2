import NextAuth from 'next-auth'
import { setCookie } from 'nookies'

export default NextAuth({
  secret: 'secretNExt',
  providers: [
    {
      id: 'PGrit',
      name: 'PGrit',
      type: 'oauth',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      token: 'https://community.4nonome.com/oauth/token',
      authorization: {
        url: 'https://community.4nonome.com/oauth/authorize',
        params: { scope: 'read' },
      },
      userinfo:
        'https://community.4nonome.com/api/v1/accounts/verify_credentials',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
        }
      },
    },
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const rep = await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/login`,
        {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: account?.access_token,
          }),
        },
      ).then((r) => {
        return r.json()
      })
      setCookie(null, 'accessToken', rep.key, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      if (account) account.access_key = rep.key
      return true
    },
    async session({ session, user, token }) {
      session.accessKey = token.accessKey
      session.accessToken = token.accessToken
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessKey = account.access_key
        token.accessToken = account.access_token
        token.sub = user?.id
      }
      return token
    },
  },
})
