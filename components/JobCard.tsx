import Link from 'next/link'
import { formatDate, formatJobType, daysUntilExpiry } from '@/lib/utils'

interface JobCardProps {
  job: {
    id: string
    title: string
    description: string
    location: string
    category: string
    jobType: string
    companyName?: string | null
    salary?: string | null
    imageUrl?: string | null
    createdAt: Date | string
    expiresAt: Date | string
  }
}

export default function JobCard({ job }: JobCardProps) {
  const daysLeft = daysUntilExpiry(job.expiresAt)

  return (
    <div className="bg-white rounded-lg border border-[#e0d9c7] p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:border-amber-500 group overflow-hidden">
      {/* Image (if available) */}
      {job.imageUrl && (
        <div className="mb-4 -mx-6 -mt-6">
          <img
            src={job.imageUrl}
            alt={job.title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Link href={`/jobs/${job.id}`} className="inline-block">
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">
              {job.title}
            </h3>
          </Link>
          {job.companyName && (
            <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700 transition-colors">{job.companyName}</p>
          )}
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
          {formatJobType(job.jobType)}
        </span>
      </div>

      {/* Description */}
      <Link href={`/jobs/${job.id}`} className="block">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>
      </Link>

      {/* Details */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>

        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          {job.category}
        </div>

        {job.salary && (
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salary}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 pt-4 border-t border-[#e0d9c7]">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Posted {formatDate(job.createdAt)}</span>
          {daysLeft > 0 && (
            <span>
              {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
            </span>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Link
            href={`/jobs/${job.id}`}
            className="px-4 py-2 text-sm font-medium border border-amber-200 text-amber-800 rounded-md hover:bg-amber-50 transition-colors"
          >
            View details
          </Link>
          <Link
            href={`/jobs/${job.id}/apply`}
            className="px-4 py-2 text-sm font-medium bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors shadow-sm"
          >
            Apply now
          </Link>
        </div>
      </div>
    </div>
  )
}
