'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<string | null>(null)
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      const response = await fetch('/api/user/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwords),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password')
      }

      setSuccess(true)
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    setForgotPasswordLoading(true)
    setForgotPasswordMessage(null)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user?.email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email')
      }

      setForgotPasswordMessage('Password reset email sent! Check your inbox for instructions.')
      setTimeout(() => setForgotPasswordMessage(null), 5000)
    } catch (err: any) {
      setForgotPasswordMessage(`Error: ${err.message || 'Failed to send reset email'}`)
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-[#e0d9c7] p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-700">
                    {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{session.user?.name}</h3>
                  <p className="text-sm text-gray-600">{session.user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg font-medium">
                  Account Settings
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-[#e0d9c7] p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Change Password</h2>

              {success && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                  Password updated successfully!
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              {forgotPasswordMessage && (
                <div className={`mb-6 px-4 py-3 rounded-md border ${
                  forgotPasswordMessage.startsWith('Error') 
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : 'bg-green-50 border-green-200 text-green-800'
                }`}>
                  {forgotPasswordMessage}
                </div>
              )}

              <form onSubmit={handlePasswordUpdate} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-[#e0d9c7] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password *
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwords.newPassword}
                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#e0d9c7] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#e0d9c7] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={forgotPasswordLoading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ml-auto"
                  >
                    {forgotPasswordLoading ? 'Sending...' : 'Reset Password via Email'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
