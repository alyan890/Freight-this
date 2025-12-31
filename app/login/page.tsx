'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ForgotPasswordModal from '@/components/ForgotPasswordModal'

function LoginForm() {
  const router = useRouter()
  const { update } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      console.log('[Login] Submitting login with email:', formData.email)

      // Add timeout protection
      const signInPromise = signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Sign-in request timed out. Please check your internet connection and try again.')),
          10000 // 10 second timeout
        )
      )

      const result = await Promise.race([signInPromise, timeoutPromise])
      console.log('[Login] Sign-in result:', result)

      if (!result) {
        console.log('[Login] No result returned from signIn')
        setError('Sign-in failed. Please try again.')
        setLoading(false)
        return
      }

      if (result && typeof result === 'object' && 'ok' in result) {
        const signInError = (typeof result === 'object' && result && 'error' in result)
          ? (result as { error?: string }).error
          : undefined

        // Handle failed sign-in early (wrong credentials, etc.)
        if (!result.ok || signInError) {
          console.log('[Login] Sign-in failed with error:', signInError)
          
          // NextAuth returns 'credentials' as the error code for invalid credentials
          // Map error codes to user-friendly messages
          let userMessage = 'Invalid username or password'
          if (signInError === 'credentials' || signInError === 'CredentialsSignin') {
            userMessage = 'Invalid username or password'
          } else if (signInError === 'AccessDenied') {
            userMessage = 'Access denied. Please check your account status.'
          } else if (signInError?.includes('timeout') || signInError?.includes('Timeout')) {
            userMessage = 'Sign-in request timed out. Please try again.'
          } else if (signInError) {
            userMessage = signInError
          }
          
          setError(userMessage)
          setLoading(false)
          return
        }

        console.log('[Login] Sign-in successful, updating session...')
        
        // Update session to ensure it's fresh
        await update()
        
        // Small delay to ensure session is updated
        await new Promise(resolve => setTimeout(resolve, 100))
        
        // Get fresh session data
        const response = await fetch('/api/auth/session')
        const session = await response.json()
        console.log('[Login] Session data:', session)

        if (session?.user) {
          console.log('[Login] Redirecting based on role:', session.user.role)
          const redirectPath = session.user.role === 'ADMIN' ? '/admin' : '/jobs'
          router.push(redirectPath)
          router.refresh()
        } else {
          console.error('[Login] Session exists but no user data')
          setError('Failed to retrieve user information. Please try again.')
          setLoading(false)
        }
      } else {
        console.error('[Login] Unexpected sign-in result format:', result)
        setError('An unexpected error occurred. Please try again.')
        setLoading(false)
      }
    } catch (err: any) {
      console.error('[Login] Error during sign-in:', err)
      const errorMessage = err?.message || 'Sign-in failed. Please check your credentials and try again.'
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-amber-700 hover:text-amber-800">
              Sign up
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg border border-[#e0d9c7] shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error === 'Configuration' ? 'Invalid configuration' : error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  setError(null)
                }}
                className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value })
                  setError(null)
                }}
                className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                placeholder="••••••••"
              />
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-sm text-amber-700 hover:text-amber-800 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>

      <ForgotPasswordModal isOpen={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </div>
  )
}

export default function LoginPage() {
  return <LoginForm />
}
