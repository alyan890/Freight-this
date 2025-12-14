import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatDate, getStatusColor } from '@/lib/utils'
import ApproveCommentButton from './ApproveCommentButton'

export default async function AdminCommentsPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  // Fetch all comments
  const comments = await prisma.comment.findMany({
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
  })

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Moderate Comments</h1>
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

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg border border-[#e0d9c7] p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{comment.authorName}</h3>
                  <p className="text-sm text-gray-600">{comment.authorEmail}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                  {comment.status}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{comment.content}</p>

              <div className="flex justify-between items-center pt-4 border-t border-[#e0d9c7]">
                <div className="text-xs text-gray-500">
                  {comment.jobPost ? (
                    <Link href={`/jobs/${comment.jobPostId}`} className="text-amber-700 hover:text-amber-800">
                      Job: {comment.jobPost.title}
                    </Link>
                  ) : (
                    <>Page: {comment.pageUrl}</>
                  )}
                  {' '} • {formatDate(comment.createdAt)}
                </div>

                {comment.status === 'PENDING' && (
                  <ApproveCommentButton commentId={comment.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
