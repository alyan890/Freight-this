import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { commentSchema } from '@/lib/validations'
import { ZodError } from 'zod'

// POST - Create new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = commentSchema.parse(body)

    // Create comment (pending approval)
    const comment = await prisma.comment.create({
      data: {
        content: validatedData.content,
        authorName: validatedData.authorName,
        authorEmail: validatedData.authorEmail,
        pageUrl: validatedData.pageUrl,
        jobPostId: validatedData.jobPostId,
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      { message: 'Comment submitted and is pending approval', comment },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating comment:', error)

    if (error instanceof ZodError) {
      // Handle Zod validation errors with user-friendly messages
      const fieldError = error.issues[0]
      const field = fieldError.path[0]
      
      let message = ''
      if (fieldError.code === 'too_big') {
        message = `${field === 'content' ? 'Comment' : String(field)} cannot exceed ${fieldError.maximum} characters`
      } else if (fieldError.code === 'too_small') {
        message = fieldError.message
      } else {
        message = fieldError.message
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
      { error: 'Failed to submit comment' },
      { status: 500 }
    )
  }
}

// GET - Fetch approved comments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const jobPostId = searchParams.get('jobPostId')
    const pageUrl = searchParams.get('pageUrl')

    const comments = await prisma.comment.findMany({
      where: {
        status: 'APPROVED',
        ...(jobPostId && { jobPostId }),
        ...(pageUrl && { pageUrl }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ comments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}
