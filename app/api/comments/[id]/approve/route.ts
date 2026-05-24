import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    // Check if user is admin
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Approve comment
    const comment = await prisma.comment.update({
      where: { id },
      data: { status: 'APPROVED' },
    })

    return NextResponse.json({ message: 'Comment approved', comment })
  } catch (error: any) {
    console.error('Error approving comment:', error)
    return NextResponse.json({ error: 'Failed to approve comment' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    // Check if user is admin
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Reject comment
    const comment = await prisma.comment.update({
      where: { id },
      data: { status: 'REJECTED' },
    })

    return NextResponse.json({ message: 'Comment rejected', comment })
  } catch (error: any) {
    console.error('Error rejecting comment:', error)
    return NextResponse.json({ error: 'Failed to reject comment' }, { status: 500 })
  }
}
