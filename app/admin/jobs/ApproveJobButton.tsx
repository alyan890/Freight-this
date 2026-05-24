'use client'

import { useState } from 'react'

interface ApproveJobButtonProps {
  jobId: string
  status: string
}

export default function ApproveJobButton({ jobId, status }: ApproveJobButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleApprove = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`/api/jobs/${jobId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error approving job:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status !== 'PENDING') {
    return null
  }

  return (
    <button
      onClick={handleApprove}
      disabled={isLoading}
      className="text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
    >
      {isLoading ? 'Approving...' : 'Approve'}
    </button>
  )
}
