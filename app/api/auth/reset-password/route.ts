import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'dev-secret-key'
)

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    console.log('[ResetPassword API] Validating JWT token...')

    // Verify JWT token (no database lookup needed)
    let email: string
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      email = payload.email as string
      
      if (!email) {
        throw new Error('Invalid token payload')
      }
      
      console.log('[ResetPassword API] Token valid for:', email)
    } catch (error) {
      console.log('[ResetPassword API] Invalid or expired token:', error)
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Find user by email (read-only, no database modification for token)
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log('[ResetPassword API] User not found:', email)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('[ResetPassword API] Updating password for:', email)

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Update user password (only password field, no token fields)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    })

    console.log('[ResetPassword API] Password updated successfully for:', email)

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
    })
  } catch (error: unknown) {
    console.error('[ResetPassword API] Error:', error)

    const message = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        error: 'Failed to reset password',
        details: message,
      },
      { status: 500 }
    )
  }
}
