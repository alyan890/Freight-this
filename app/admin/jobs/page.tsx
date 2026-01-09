import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate, getStatusColor } from '@/lib/utils'
import JobActionButtons from './JobActionButtons'

export default async function AdminJobsPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  // Fetch all sponsor applications
  const jobs = await prisma.jobPost.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          applications: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Manage Sponsors</h1>
          <Link
            href="/admin"
            className="text-amber-700 hover:text-amber-800 font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg border border-[#e0d9c7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f5f0e6] border-b border-[#e0d9c7]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Partnership Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Posted By</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Applications</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Posted On</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job: any) => {
                  return (
                    <tr key={job.id} className="border-b border-[#e0d9c7] hover:bg-[#faf8f3]">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <Link href={`/supporters/${job.id}`} className="text-amber-700 hover:text-amber-800">
                          {job.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>{job.user.name}</div>
                        <div className="text-xs text-gray-500">{job.user.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {job._count.applications}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(job.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-4">
                          <JobActionButtons jobId={job.id} jobTitle={job.title} status={job.status} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
