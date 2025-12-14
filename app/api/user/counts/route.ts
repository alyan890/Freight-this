import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    const [userApplications, userComments, newJobs] = await Promise.all([
      prisma.application.count({
        where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      }),
      prisma.comment.count({
        where: { status: 'APPROVED', createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      }),
      prisma.jobPost.count({
        where: { status: 'APPROVED', createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      }),
    ])

    return NextResponse.json({
      jobs: newJobs,
      applications: userApplications,
      comments: userComments,
    })
  } catch (error) {
    console.error('Error fetching user counts:', error)
    return NextResponse.json({ error: 'Failed to fetch counts' }, { status: 500 })
  }
}
