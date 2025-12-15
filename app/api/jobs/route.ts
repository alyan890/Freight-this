import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { jobPostSchema } from '@/lib/validations'
import { calculateExpiryDate } from '@/lib/utils'
import { sendJobPostedEmail } from '@/lib/email'
import { ZodError } from 'zod'

// GET - Fetch jobs (with filters)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const jobType = searchParams.get('jobType')
    const status = searchParams.get('status')

    const jobs = await prisma.jobPost.findMany({
      where: {
        ...(status ? { status: status as any } : { status: 'APPROVED' }),
        ...(category && { category }),
        ...(jobType && { jobType: jobType as any }),
        ...(location && {
          location: {
            contains: location,
            mode: 'insensitive',
          },
        }),
        expiresAt: {
          gte: new Date(),
        },
      },
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

    return NextResponse.json({ jobs })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

// POST - Create new job
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate input
    const validatedData = jobPostSchema.parse(body)

    // Calculate expiry date (30 days from now)
    const expiryDays = parseInt(process.env.JOB_EXPIRY_DAYS || '30')
    const expiresAt = calculateExpiryDate(expiryDays)

    // Create job post
    const job = await prisma.jobPost.create({
      data: {
        ...validatedData,
        userId: session.user.id,
        expiresAt,
        status: 'PENDING', // Requires admin approval
      },
    })

    // Send email notification to admin
    await sendJobPostedEmail({
      title: job.title,
      companyName: job.companyName || undefined,
      location: job.location,
      contactEmail: job.contactEmail,
    })

    return NextResponse.json(
      { message: 'Job posted successfully and is pending approval', job },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating job:', error)

    if (error instanceof ZodError) {
        // Handle Zod validation errors
        const fieldError = error.issues?.[0]
        const field = fieldError?.path[0]
      
      let message = ''
        if (fieldError?.code === 'too_big') {
          message = `${String(field)} cannot exceed ${fieldError.maximum} characters`
        } else if (fieldError?.code === 'too_small') {
          message = fieldError.message
        } else {
          message = fieldError?.message || 'Validation error'
      }
      
      return NextResponse.json({ error: message }, { status: 400 })
    }

    if ((error as { issues?: Array<{ message: string }> }).issues) {
      const issues = (error as { issues: Array<{ message: string }> }).issues
      return NextResponse.json(
        { error: issues[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    )
  }
}
