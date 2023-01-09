import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import axios from 'axios'

const nextAuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse,
): NextAuthOptions => {
  return {
    secret: 'secretNext',
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
        const rep = await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/login`,
          {
            access_token: account?.access_token,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        rep.headers['set-cookie']?.forEach((cookie) => {
          res.setHeader('Set-Cookie', cookie)
        })
        if (account) account.access_key = rep.data.key
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
        }
        return token
      },
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}
