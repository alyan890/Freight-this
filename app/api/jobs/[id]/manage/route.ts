import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { calculateExpiryDate } from '@/lib/utils'

// DELETE - Permanently delete a job
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

    // Delete the job and all related data
    await prisma.jobPost.delete({
      where: { id: jobId },
    })

    return NextResponse.json({
      success: true,
      message: 'Job deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting job:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete job' },
      { status: 500 }
    )
  }
}

// PATCH - Renew a job (extend expiry by 30 days)
export async function PATCH(
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

    // Calculate new expiry date (30 days from now)
    const expiryDays = parseInt(process.env.JOB_EXPIRY_DAYS || '30')
    const newExpiresAt = calculateExpiryDate(expiryDays)

    // Update job with new expiry date
    const job = await prisma.jobPost.update({
      where: { id: jobId },
      data: {
        expiresAt: newExpiresAt,
        status: 'APPROVED', // Ensure job is approved when renewed
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Job renewed successfully for 30 more days',
      job,
    })
  } catch (error: any) {
    console.error('Error renewing job:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to renew job' },
      { status: 500 }
    )
  }
}
