'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function ApplyPage() {
  const router = useRouter()
  const params = useParams()
  const jobId = params?.id as string
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    applicantName: '',
    applicantEmail: '',
    message: '',
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    if (!resumeFile) {
      setError('Please upload your resume')
      setLoading(false)
      return
    }

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData()
      formDataToSend.append('applicantName', formData.applicantName)
      formDataToSend.append('applicantEmail', formData.applicantEmail)
      formDataToSend.append('message', formData.message)
      formDataToSend.append('resume', resumeFile)
      formDataToSend.append('jobPostId', jobId)

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit application')
      }

      // Show success message
      setSuccess(true)
      setFormData({ applicantName: '', applicantEmail: '', message: '' })
      setResumeFile(null)
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/jobs/${jobId}?applied=true`)
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Apply for this Position</h1>
          <p className="text-gray-600">
            Fill out the application form below and upload your resume.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-[#e0d9c7] p-8">
          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              ✓ Application has been submitted successfully! Redirecting...
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="applicantName"
                name="applicantName"
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                required
                className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="applicantEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="applicantEmail"
                name="applicantEmail"
                value={formData.applicantEmail}
                onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                required
                className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter / Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
                placeholder="Tell the employer why you're a great fit for this position..."
              />
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                Resume * <span className="text-xs text-gray-500">(PDF, DOC, DOCX - max 5MB)</span>
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    // Validate file size
                    if (file.size > 5 * 1024 * 1024) {
                      setError('Resume file must be less than 5MB. Please select a smaller file.')
                      setResumeFile(null)
                      e.target.value = ''
                      return
                    }
                    
                    // Validate file type
                    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                    if (!allowedTypes.includes(file.type)) {
                      setError('Please upload a PDF, DOC, or DOCX file.')
                      setResumeFile(null)
                      e.target.value = ''
                      return
                    }
                    
                    setError(null)
                    setResumeFile(file)
                  } else {
                    setResumeFile(null)
                  }
                }}
                accept=".pdf,.doc,.docx"
                required
                className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />
              <p className="mt-2 text-xs text-gray-600 inline-flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v-1.5m3 1.5v-1.5m-6 1.5v-1.5m7.5 7.5v3a2.25 2.25 0 0 1-2.25 2.25h-6a2.25 2.25 0 0 1-2.25-2.25v-6a2.25 2.25 0 0 1 2.25-2.25h.75a.75.75 0 0 0 .75-.75V5.25a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v3.75a.75.75 0 0 0 .75.75h.75A2.25 2.25 0 0 1 18 12Z" />
                </svg>
                <span>
                  <strong>Accepted formats:</strong> PDF, DOC, DOCX (Max 5MB)
                </span>
              </p>
              {resumeFile && (
                <p className="mt-2 text-xs text-green-700 font-semibold inline-flex items-center gap-2">
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
                  File selected: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(0)} KB)
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-[#e0d9c7] rounded-md text-gray-700 hover:bg-[#f5f0e6] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
