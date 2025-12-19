import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const schema = z.object({
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6),
}).refine((d) => d.newPassword === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] })

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const data = schema.parse(body)

    const hashed = await bcrypt.hash(data.newPassword, 10)

    await prisma.user.update({ where: { id }, data: { password: hashed } })

    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error: any) {
    console.error('Admin password reset error:', error)
    if (error instanceof z.ZodError) {
      const fieldError = error.issues?.[0]
      return NextResponse.json({ error: fieldError?.message || 'Validation error' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
  }
}
