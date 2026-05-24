import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password confirmation is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = passwordUpdateSchema.parse(body)

    // Get current user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, password: true },
    })

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    )

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error updating password:', error)

    if (error instanceof z.ZodError) {
      const fieldError = error.issues?.[0]
      return NextResponse.json(
        { error: fieldError?.message || 'Validation error' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    )
  }
}
