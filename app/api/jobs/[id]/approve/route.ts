import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    // Check if user is admin
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { id: jobId } = await params

    // Update job status to APPROVED
    const job = await prisma.jobPost.update({
      where: { id: jobId },
      data: { status: 'APPROVED' },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Job approved successfully',
      job 
    })
  } catch (error) {
    console.error('Error approving job:', error)
    return NextResponse.json(
      { error: 'Failed to approve job' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    // Check if user is admin
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { id: jobId } = await params

    // Update job status to REJECTED
    const job = await prisma.jobPost.update({
      where: { id: jobId },
      data: { status: 'REJECTED' },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Job rejected successfully',
      job 
    })
  } catch (error) {
    console.error('Error rejecting job:', error)
    return NextResponse.json(
      { error: 'Failed to reject job' },
      { status: 500 }
    )
  }
}
