import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

const ADMIN_VIEW_CACHE = new Map<string, { jobs: Date; applications: Date; comments: Date }>()

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const adminId = session.user.id
    const lastView = ADMIN_VIEW_CACHE.get(adminId) || {
      jobs: new Date(0),
      applications: new Date(0),
      comments: new Date(0),
    }

    const [pendingJobs, pendingApplications, pendingComments] = await Promise.all([
      prisma.jobPost.count({
        where: { status: 'PENDING', createdAt: { gt: lastView.jobs } },
      }),
      prisma.application.count({
        where: { isReviewed: false, createdAt: { gt: lastView.applications } },
      }),
      prisma.comment.count({
        where: { status: 'PENDING', createdAt: { gt: lastView.comments } },
      }),
    ])

    return NextResponse.json({
      jobs: pendingJobs,
      applications: pendingApplications,
      comments: pendingComments,
    })
  } catch (error) {
    console.error('Error fetching admin counts:', error)
    return NextResponse.json({ error: 'Failed to fetch counts' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type } = await req.json()
    const adminId = session.user.id
    const now = new Date()

    // Update last view timestamp
    const currentView = ADMIN_VIEW_CACHE.get(adminId) || {
      jobs: new Date(0),
      applications: new Date(0),
      comments: new Date(0),
    }

    if (type === 'jobs') {
      currentView.jobs = now
    } else if (type === 'applications') {
      currentView.applications = now
    } else if (type === 'comments') {
      currentView.comments = now
    }

    ADMIN_VIEW_CACHE.set(adminId, currentView)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error marking as viewed:', error)
    return NextResponse.json({ error: 'Failed to mark as viewed' }, { status: 500 })
  }
}
