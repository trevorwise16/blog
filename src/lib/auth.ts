import { NextAuthOptions, getServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow your email to sign in
      return user.email === process.env.AUTHORIZED_USER_EMAIL
    },
    async jwt({ token, user }) {
      // Persist user info in the JWT
      if (user) {
        token.email = user.email
        token.name = user.name
        token.picture = user.image
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user!.email = token.email as string
        session.user!.name = token.name as string
        session.user!.image = token.picture as string
      }
      return session
    },
  },
  pages: {
    error: '/auth/error',
  },
}

export async function getCurrentSession() {
  return await getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getCurrentSession()

  if (!session || !session.user) {
    throw new Error('Authentication required')
  }

  if (session.user.email !== process.env.AUTHORIZED_USER_EMAIL) {
    throw new Error('Unauthorized access')
  }

  return session
}
