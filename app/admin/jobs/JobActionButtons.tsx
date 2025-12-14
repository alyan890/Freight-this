'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface JobActionButtonsProps {
  jobId: string
  jobTitle: string
  isExpired: boolean
}

export default function JobActionButtons({ jobId, jobTitle, isExpired }: JobActionButtonsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${jobTitle}"? This action cannot be undone.`)) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/jobs/${jobId}/manage`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to delete job')
      }

      // Refresh the page to show updated list
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to delete job')
      console.error('Error deleting job:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRenew = async () => {
    if (!confirm(`Renew "${jobTitle}" for 30 more days?`)) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/jobs/${jobId}/manage`, {
        method: 'PATCH',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to renew job')
      }

      // Refresh the page to show updated list
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to renew job')
      console.error('Error renewing job:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 p-2 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-.007 3h.01M3.375 18h17.25c.621 0 1.017-.667.731-1.215L12.73 4.306c-.31-.597-1.15-.597-1.46 0L2.644 16.785c-.286.548.11 1.215.731 1.215Z" />
          </svg>
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleRenew}
          disabled={loading}
          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Extend job posting for 30 more days (from today)"
        >
          {loading ? (
            'Renewing...'
          ) : (
            <span className="inline-flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 9.75a7.5 7.5 0 0 1 12.995-3.288m2.255 4.788a7.5 7.5 0 0 1-12.995 3.288M8.25 9.75H4.5v-4.5"
                />
              </svg>
              Renew
            </span>
          )}
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Permanently delete this job"
        >
          {loading ? (
            'Deleting...'
          ) : (
            <span className="inline-flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75v6.75m4.5-6.75v6.75M3 6.75h18M9.75 4.5h4.5A1.5 1.5 0 0 1 15.75 6v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0A1.5 1.5 0 0 1 9.75 4.5Z"
                />
              </svg>
              Delete
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
