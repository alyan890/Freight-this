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

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    const [userApplications, userComments, userJobs] = await Promise.all([
      prisma.application.count({
        where: {
          userId: userId,
          createdAt: { gte: sevenDaysAgo },
        },
      }),
      prisma.comment.count({
        where: {
          userId: userId,
          createdAt: { gte: sevenDaysAgo },
        },
      }),
      prisma.jobPost.count({
        where: {
          userId: userId,
          createdAt: { gte: sevenDaysAgo },
        },
      }),
    ])

    return NextResponse.json({
      jobs: userJobs,
      applications: userApplications,
      comments: userComments,
    })
  } catch (error) {
    console.error('Error fetching user counts:', error)
    return NextResponse.json({ error: 'Failed to fetch counts' }, { status: 500 })
  }
}
