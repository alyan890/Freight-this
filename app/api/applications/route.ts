import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { supabaseAdmin, supabase } from '@/lib/supabase'
import { applicationSchema } from '@/lib/validations'
import { sendApplicationReceivedEmail, sendApplicationConfirmationEmail } from '@/lib/email'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const applicantName = formData.get('applicantName') as string
    const applicantEmail = formData.get('applicantEmail') as string
    const message = formData.get('message') as string
    const jobPostId = formData.get('jobPostId') as string
    const resumeFile = formData.get('resume') as File

    // Validate form data
    const validatedData = applicationSchema.parse({
      applicantName,
      applicantEmail,
      message,
    })

    if (!resumeFile) {
      return NextResponse.json(
        { error: 'Resume file is required' },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Resume file size must be less than 5MB. Please upload a smaller file.' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]
    
    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF, DOC, DOCX, or TXT file.' },
        { status: 400 }
      )
    }

    // Verify job exists and is approved
    const job = await prisma.jobPost.findUnique({
      where: { id: jobPostId },
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    if (job.status !== 'APPROVED') {
      return NextResponse.json(
        { error: 'This job is not currently accepting applications. It may be pending approval or has been closed.' },
        { status: 400 }
      )
    }

    // Check if job is expired
    if (new Date(job.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'This job posting has expired and is no longer accepting applications.' },
        { status: 400 }
      )
    }

    // Upload resume to Supabase Storage using admin client to bypass RLS
    const storageClient = supabaseAdmin || supabase
    const fileExt = resumeFile.name.split('.').pop()
    const fileName = `resumes/${jobPostId}/${Date.now()}-${validatedData.applicantName.replace(/\s+/g, '-')}.${fileExt}`

    const arrayBuffer = await resumeFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data: uploadData, error: uploadError } = await storageClient.storage
      .from('applications')
      .upload(fileName, buffer, {
        contentType: resumeFile.type,
        cacheControl: '3600',
      })

    if (uploadError) {
      console.error('[Upload Resume] Supabase storage error:', uploadError)
      
      // Check if it's a bucket not found error
      if (uploadError.message?.includes('Bucket not found')) {
        return NextResponse.json(
          { error: 'Storage system is not configured. Please contact the administrator to set up the applications storage bucket in Supabase.' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to upload resume. Please make sure your file is a valid PDF or document (max 5MB). If the issue persists, contact support.' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('applications')
      .getPublicUrl(fileName)

    // Create application in database
    const application = await prisma.application.create({
      data: {
        applicantName: validatedData.applicantName,
        applicantEmail: validatedData.applicantEmail,
        message: validatedData.message,
        resumeUrl: urlData.publicUrl,
        jobPostId,
      },
    })

    // Send emails (don't block on email failures)
    try {
      await Promise.all([
        sendApplicationReceivedEmail({
          jobTitle: job.title,
          applicantName: validatedData.applicantName,
          applicantEmail: validatedData.applicantEmail,
          message: validatedData.message,
          jobContactEmail: job.contactEmail,
        }),
        sendApplicationConfirmationEmail({
          jobTitle: job.title,
          applicantName: validatedData.applicantName,
          applicantEmail: validatedData.applicantEmail,
        }),
      ])
    } catch (emailError) {
      console.error('[Email] Failed to send notification emails:', emailError)
      // Continue anyway - application was saved successfully
    }

    return NextResponse.json(
      { message: 'Application submitted successfully', application },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error submitting application:', error)

    if (error instanceof ZodError) {
      // Handle Zod validation errors with user-friendly messages
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
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
}

// GET - Fetch applications (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const jobPostId = searchParams.get('jobPostId')

    const applications = await prisma.application.findMany({
      where: jobPostId ? { jobPostId } : undefined,
      include: {
        jobPost: {
          select: {
            title: true,
            companyName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}
