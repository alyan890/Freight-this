import { prisma } from '@/lib/prisma'
import { formatDate, formatJobType, daysUntilExpiry } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CommentForm from '@/components/CommentForm'
import ApprovedComments from '@/components/ApprovedComments'

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await prisma.jobPost.findUnique({
    where: {
      id: id,
      status: 'APPROVED',
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!job) {
    notFound()
  }

  const daysLeft = daysUntilExpiry(job.expiresAt)
  const isExpired = daysLeft <= 0

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Partnerships
        </Link>

        {/* Partnership Header */}
        <div className="bg-white rounded-lg border border-[#e0d9c7] p-8 mb-6">
          {/* Job Image */}
          {job.imageUrl && (
            <div className="mb-6 -mx-8 -mt-8">
              <img
                src={job.imageUrl}
                alt={job.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </div>
          )}
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              {job.companyName && (
                <p className="text-xl text-gray-700">{job.companyName}</p>
              )}
            </div>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
              {formatJobType(job.jobType)}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </div>

            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {job.category}
            </div>

            {job.salary && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.salary}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#e0d9c7]">
            <span className="text-sm text-gray-500">
              Posted {formatDate(job.createdAt)}
            </span>
            {!isExpired && daysLeft > 0 && (
              <span className="text-sm text-gray-500">
                {daysLeft} {daysLeft === 1 ? 'day' : 'days'} remaining
              </span>
            )}
          </div>
        </div>

        {/* Partnership Description */}
        <div className="bg-white rounded-lg border border-[#e0d9c7] p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Partnership Description</h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {job.description}
          </div>

          {job.requirements && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Requirements</h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {job.requirements}
              </div>
            </>
          )}
        </div>

        {/* Apply Button */}
        {!isExpired && (
          <div className="bg-white rounded-lg border border-[#e0d9c7] p-8 mb-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Interested in this position?</h3>
            <Link
              href={`/jobs/${job.id}/apply`}
              className="inline-block bg-amber-700 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-amber-800 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        )}

        {/* Comments Section */}
        <div className="mb-6">
          <ApprovedComments jobPostId={job.id} />
        </div>

        {/* Add Comment Section */}
        <div className="mb-6">
          <CommentForm jobPostId={job.id} />
        </div>
      </div>
    </div>
  )
}
