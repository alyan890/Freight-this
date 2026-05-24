'use client'

import { useState } from 'react'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)

    try {
      console.log('[ForgotPassword] Requesting reset for email:', email)

      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('[ForgotPassword] Reset email error:', data)
        setMessage({ 
          type: 'error', 
          text: data.error || 'Failed to send reset email. Please try again.' 
        })
        setLoading(false)
        return
      }

      console.log('[ForgotPassword] Reset email sent successfully for:', email)
      setMessage({ type: 'success', text: 'Password reset email sent! Check your inbox (check spam folder too).' })
      setEmail('')
      setTimeout(() => {
        onClose()
        setMessage(null)
      }, 3000)
    } catch (err) {
      console.error('[ForgotPassword] Exception during reset:', err)
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setMessage({ type: 'error', text: `Error: ${errorMessage}` })
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Forgot Password?</h2>
        <p className="text-gray-600 mb-4">Enter your email address and we&apos;ll send you a link to reset your password.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
