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
      const rep = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: account?.access_token,
        }),
      }).then((r) => {
        console.log(r.headers.get('set-cookie'))
        return r.json()
      })
      if (account) account.access_key = rep.key
      return true
    },
    async session({ session, user, token }) {
      session.accessKey = token.accessKey
      session.accessToken = token.accessToken
      console.log('session info: ', session)
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
