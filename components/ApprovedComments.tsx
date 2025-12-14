'use client'

import { useState, useEffect } from 'react'
import { formatDate } from '@/lib/utils'

interface Comment {
  id: string
  content: string
  authorName: string
  authorEmail: string
  status: string
  createdAt: Date | string
}

interface ApprovedCommentsProps {
  jobPostId: string
}

export default function ApprovedComments({ jobPostId }: ApprovedCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?jobPostId=${jobPostId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch comments')
        }
        const data = await response.json()
        setComments(data.comments || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load comments')
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [jobPostId])

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-[#e0d9c7] p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-[#e0d9c7] p-6">
        <p className="flex items-center gap-1 text-red-600 text-sm">
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
        </p>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#e0d9c7] p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments</h3>
        <p className="text-gray-600 text-sm">No comments yet. Be the first to share your thoughts!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-[#e0d9c7] p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Comments ({comments.length})
      </h3>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-[#e0d9c7] pb-6 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{comment.authorName}</h4>
                <p className="text-xs text-gray-500">{comment.authorEmail}</p>
              </div>
              <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
