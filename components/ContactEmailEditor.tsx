'use client'

import { useState } from 'react'

interface ContactEmailEditorProps {
  sponsorId: string
  initialEmail: string
}

export default function ContactEmailEditor({ sponsorId, initialEmail }: ContactEmailEditorProps) {
  const [contactEmail, setContactEmail] = useState(initialEmail)
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('saving')
    setError(null)

    try {
      const response = await fetch(`/api/jobs/${sponsorId}/contact-email`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactEmail }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update contact email')
      }

      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (err: any) {
      setStatus('error')
      setError(err.message || 'Failed to update contact email')
    }
  }

  return (
    <div className="mt-6 border border-[#e0d9c7] rounded-lg p-4 bg-[#faf8f3]">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Update contact email</h3>
      <p className="text-sm text-gray-600 mb-4">Use this email for partnership inquiries shown on your profile.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-[#e0d9c7] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          placeholder="name@example.com"
        />
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === 'saving'}
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-60"
          >
            {status === 'saving' ? 'Saving...' : 'Save email'}
          </button>
          {status === 'success' && <span className="text-sm text-green-700">Saved</span>}
          {status === 'error' && <span className="text-sm text-red-700">{error}</span>}
        </div>
      </form>
    </div>
  )
}
