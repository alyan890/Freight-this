'use client'

import { useState } from 'react'
import { commentSchema, type CommentInput } from '@/lib/validations'
import { ZodError } from 'zod'

interface CommentFormProps {
  jobPostId?: string
  pageUrl?: string
}

export default function CommentForm({ jobPostId, pageUrl }: CommentFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<CommentInput>({
    content: '',
    authorName: '',
    authorEmail: '',
    jobPostId,
    pageUrl,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      // Validate form data
      const validatedData = commentSchema.parse(formData)

      // Submit to API
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit comment')
      }

      // Success - reset form
      setSuccess(true)
      setFormData({
        content: '',
        authorName: '',
        authorEmail: '',
        jobPostId,
        pageUrl,
      })

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err: any) {
      if (err instanceof ZodError) {
        // Handle Zod validation errors with user-friendly messages
        const issue = err.issues?.[0]

        if (!issue) {
          setError('Please check your inputs and try again.')
        } else {
          const field = issue.path[0]
          let message = issue.message

          if (issue.code === 'too_big') {
            message = `${field === 'content' ? 'Comment' : String(field)} cannot exceed ${issue.maximum} characters`
          }

          setError(message)
        }
      } else if (err.errors) {
        setError(err.errors[0].message)
      } else {
        setError(err.message || 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="bg-white rounded-lg border border-[#e0d9c7] p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Leave a Comment</h3>

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          Thank you! Your comment has been submitted and will appear after approval.
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent text-sm"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              value={formData.authorEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent text-sm"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Comment Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Comment *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent text-sm"
            placeholder="Share your thoughts..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {loading ? 'Submitting...' : 'Submit Comment'}
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Your comment will be reviewed before appearing on the site.
        </p>
      </form>
    </div>
  )
}
