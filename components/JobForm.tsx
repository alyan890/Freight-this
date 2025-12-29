'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { jobPostSchema, type JobPostInput } from '@/lib/validations'
import { ZodError } from 'zod'

export default function JobForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<JobPostInput>({
    title: '',
    description: '',
    location: '',
    category: '',
    jobType: 'FULL_TIME',
    contactEmail: '',
    companyName: '',
    salary: '',
    requirements: '',
    imageUrl: '',
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validate that an image is selected
    if (!imageFile) {
      setError('Job image is required. Please upload an image to proceed.')
      setLoading(false)
      return
    }

    try {
      let imageUrl = ''
      
      // Upload image (required)
      setUploading(true)
      const imageFormData = new FormData()
      imageFormData.append('file', imageFile)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: imageFormData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await uploadResponse.json()
      imageUrl = data.url
      setUploading(false)

      // Validate form data with image URL
      const validatedData = jobPostSchema.parse({
        ...formData,
        imageUrl,
      })

      // Submit to API
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to post job')
      }

      // Success - redirect to success page
      router.push('/jobs/success')
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
            message = `${String(field)} cannot exceed ${issue.maximum} characters`
          }

          setError(message)
        }
      } else if (err.errors && Array.isArray(err.errors)) {
        // Zod validation errors - get the field name and message
        const error = err.errors[0]
        const fieldName = error.path?.[0] || 'field'
        const message = error.message
        
        // Create user-friendly error message
        if (fieldName === 'imageUrl') {
          setError('Image upload issue: There was a problem with the image. Please try uploading again.')
        } else {
          setError(message)
        }
      } else if (err.message === 'Failed to upload image') {
        setError('Image upload failed: Please check that your image is a valid image file and less than 5MB. Try again or skip the image for now.')
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
      setUploading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-2 border-red-300 text-red-800 px-5 py-4 rounded-lg shadow-sm">
          <p className="font-semibold inline-flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 mt-0.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-.007 3h.01M3.375 18h17.25c.621 0 1.017-.667.731-1.215L12.73 4.306c-.31-.597-1.15-.597-1.46 0L2.644 16.785c-.286.548.11 1.215.731 1.215Z" />
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* Partnership Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Partnership Title * <span className="text-xs text-gray-500">(3+ characters)</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
          placeholder="e.g., Senior Frontend Developer"
        />
        <p className="text-xs text-gray-500 mt-1">Be specific and clear about the role</p>
      </div>

      {/* Company Name */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
          placeholder="Your company name"
        />
      </div>

      {/* Location & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location * <span className="text-xs text-gray-500">(required)</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
            placeholder="e.g., New York, Remote"
          />
          <p className="text-xs text-gray-500 mt-1">Specify city or 'Remote' if available</p>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category * <span className="text-xs text-gray-500">(required)</span>
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
            placeholder="e.g., Technology, Finance"
          />
          <p className="text-xs text-gray-500 mt-1">Examples: Technology, Healthcare, Finance, Engineering, etc.</p>
        </div>
      </div>

      {/* Job Type & Salary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">
            Job Type *
          </label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="FREELANCE">Freelance</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
            Salary Range
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
            placeholder="e.g., $80k - $120k"
          />
        </div>
      </div>

      {/* Contact Email */}
      <div>
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Contact Email *
        </label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
          placeholder="recruiter@company.com"
        />
      </div>

      {/* Company/Job Image */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          Company/Job Image * <span className="text-xs text-red-600">(required)</span>
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
        />
        <p className="mt-2 text-xs text-gray-600">Image is required to post a partnership. Max 5MB - JPG, PNG, etc.</p>
        
        {imagePreview && (
          <div className="mt-4">
            <p className="text-xs text-green-700 font-semibold mb-2 inline-flex items-center gap-2">
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
              Image selected and ready to post!
            </p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md border-2 border-green-300"
            />
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Partnership Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
          placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
        />
        <p className="mt-1 text-xs text-gray-500">Minimum 50 characters - the more details, the better! Tell about responsibilities, skills needed, and company culture.</p>
      </div>

      {/* Requirements */}
      <div>
        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
          Requirements
        </label>
        <textarea
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-[#e0d9c7] rounded-md focus:ring-2 focus:ring-amber-700 focus:border-transparent"
          placeholder="List key qualifications, skills, and experience required..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-[#e0d9c7] rounded-md text-gray-700 hover:bg-[#f5f0e6] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading Image...' : loading ? 'Posting...' : 'Post Partnership'}
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Your partnership will be reviewed by our team before appearing on the site. This usually takes 24-48 hours.
      </p>
    </form>
  )
}
