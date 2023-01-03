import { Session, Account } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessKey?: string
    accessToken?: string
  }
  interface Account {
    access_key?: string
    access_token?: string
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    accessKey?: string
    accessToken?: string
  }
}
