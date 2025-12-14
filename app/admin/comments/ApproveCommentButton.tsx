'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ApproveCommentButtonProps {
  commentId: string
}

export default function ApproveCommentButton({ commentId }: ApproveCommentButtonProps) {
  const router = useRouter()
  const [approveLoading, setApproveLoading] = useState(false)
  const [rejectLoading, setRejectLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApprove = async () => {
    setError(null)
    setApproveLoading(true)
    try {
      const response = await fetch(`/api/comments/${commentId}/approve`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to approve comment')
      }

      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to approve comment')
    } finally {
      setApproveLoading(false)
    }
  }

  const handleReject = async () => {
    setError(null)
    setRejectLoading(true)
    try {
      const response = await fetch(`/api/comments/${commentId}/approve`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to reject comment')
      }

      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to reject comment')
    } finally {
      setRejectLoading(false)
    }
  }

  return (
    <>
      {error && (
        <div className="flex items-center gap-1 text-red-600 text-xs mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-3.5 w-3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-.007 3h.01M3.375 18h17.25c.621 0 1.017-.667.731-1.215L12.73 4.306c-.31-.597-1.15-.597-1.46 0L2.644 16.785c-.286.548.11 1.215.731 1.215Z" />
          </svg>
          {error}
        </div>
      )}
      <div className="space-x-2">
        <button
          onClick={handleApprove}
          disabled={approveLoading || rejectLoading}
          className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {approveLoading ? (
            'Approving...'
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Approve
            </>
          )}
        </button>
        <button
          onClick={handleReject}
          disabled={rejectLoading || approveLoading}
          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {rejectLoading ? (
            'Rejecting...'
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6m0 12L6 6" />
              </svg>
              Reject
            </>
          )}
        </button>
      </div>
    </>
  )
}
