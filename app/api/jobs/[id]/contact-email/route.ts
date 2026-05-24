import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const contactEmailSchema = z.object({
  contactEmail: z.string().email('Please enter a valid email address'),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { contactEmail } = contactEmailSchema.parse(body)

    const job = await prisma.jobPost.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!job) {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 })
    }

    const isOwner = job.userId === session.user.id
    const isAdmin = session.user.role === 'ADMIN'

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.jobPost.update({
      where: { id },
      data: { contactEmail },
    })

    return NextResponse.json({ success: true, contactEmail: updated.contactEmail })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Invalid input' }, { status: 400 })
    }

    if (error?.code === 'P2025') {
      return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 })
    }

    console.error('Error updating contact email:', error)
    return NextResponse.json({ error: 'Failed to update contact email' }, { status: 500 })
  }
}
