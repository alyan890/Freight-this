import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AdminNotificationAlert from '@/components/AdminNotificationAlert'

export default async function AdminDashboard() {
  const session = await auth()

  // Check if user is admin
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  // Fetch statistics
  const [pendingJobs, pendingComments, pendingApplications, totalApplications, activeJobs] = await Promise.all([
    prisma.jobPost.count({ where: { status: 'PENDING' } }),
    prisma.comment.count({ where: { status: 'PENDING' } }),
    prisma.application.count({ where: { isReviewed: false } }),
    prisma.application.count(),
    prisma.jobPost.count({ 
      where: { 
        status: 'APPROVED',
        expiresAt: { gte: new Date() }
      } 
    }),
  ])

  const totalNotifications = pendingJobs + pendingComments + pendingApplications

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          
          {/* Notifications Alert */}
          <AdminNotificationAlert />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-[#e0d9c7] p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Pending Sponsors</div>
            <div className="text-3xl font-bold text-amber-700">{pendingJobs}</div>
          </div>

          <div className="bg-white rounded-lg border border-[#e0d9c7] p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Active Sponsors</div>
            <div className="text-3xl font-bold text-green-600">{activeJobs}</div>
          </div>

          <div className="bg-white rounded-lg border border-[#e0d9c7] p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Applications</div>
            <div className="text-3xl font-bold text-blue-600">{totalApplications}</div>
          </div>

          <div className="bg-white rounded-lg border border-[#e0d9c7] p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Pending Comments</div>
            <div className="text-3xl font-bold text-purple-600">{pendingComments}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/jobs"
            className="bg-white rounded-lg border border-[#e0d9c7] p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Sponsors Request</h3>
                <p className="text-sm text-gray-600">Review and approve partnership postings</p>
              </div>
              <svg className="w-8 h-8 text-amber-700" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
          </Link>

          <Link
            href="/admin/applications"
            className="bg-white rounded-lg border border-[#e0d9c7] p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Applications</h3>
                <p className="text-sm text-gray-600">View all partnership applications</p>
              </div>
              <svg className="w-8 h-8 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </Link>

          <Link
            href="/admin/comments"
            className="bg-white rounded-lg border border-[#e0d9c7] p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Comments</h3>
                <p className="text-sm text-gray-600">Moderate user comments</p>
              </div>
              <svg className="w-8 h-8 text-purple-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
