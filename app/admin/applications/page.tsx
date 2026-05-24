import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function AdminApplicationsPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  // Fetch latest applications (limit to 200 to avoid long queries/timeouts)
  const applications = await prisma.application.findMany({
    include: {
      jobPost: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 200,
  })

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Applications</h1>
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

        {/* Applications Table */}
        <div className="bg-white rounded-lg border border-[#e0d9c7] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f5f0e6] border-b border-[#e0d9c7]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Applicant</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Partnership Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Applied On</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app: any) => (
                  <tr key={app.id} className="border-b border-[#e0d9c7] hover:bg-[#faf8f3]">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {app.applicantName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {app.applicantEmail}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <Link href={`/supporters/${app.jobPostId}`} className="text-amber-700 hover:text-amber-800">
                        {app.jobPost.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.isReviewed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {app.isReviewed ? 'Reviewed' : 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
                        View Resume
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
