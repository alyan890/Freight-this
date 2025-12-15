import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

// Login schema validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

// Validate required environment variables (support NextAuth v5 aliases)
if (!process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET) {
  console.warn('[Auth] Warning: AUTH_SECRET/NEXTAUTH_SECRET is not set')
}

if (!process.env.AUTH_URL && !process.env.NEXTAUTH_URL && process.env.NODE_ENV === 'production') {
  console.warn('[Auth] Warning: AUTH_URL/NEXTAUTH_URL is not set for production')
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials)
          console.log('[Auth] Attempting login for:', email)

          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (!user) {
            console.log('[Auth] User not found:', email)
            throw new Error('Invalid email or password')
          }

          if (!user.password) {
            console.log('[Auth] User has no password hash:', email)
            throw new Error('Invalid email or password')
          }

          console.log('[Auth] User found, comparing passwords...')
          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password)

          if (!isPasswordValid) {
            console.log('[Auth] Password mismatch for:', email)
            throw new Error('Invalid email or password')
          }

          console.log('[Auth] Authentication successful for:', email)
          // Return user object (will be stored in session)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error: any) {
          console.error('[Auth] Error during authentication:', error)
          throw new Error(error.message || 'Authentication failed')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to JWT token
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Add user info to session
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? 'dev-secret-key',
  trustHost: true,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
