import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import { prisma } from '@/lib/prisma'
import { SignJWT } from 'jose'

if (!process.env.SENDGRID_API_KEY) {
  console.error('[ForgotPassword] SENDGRID_API_KEY is not configured')
}

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'dev-secret-key'
)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    console.log('[ForgotPassword API] Reset request for:', email)

    // Check if user exists in database (no changes to database)
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log('[ForgotPassword API] User not found:', email)
      // For security, don't reveal if user exists or not
      return NextResponse.json({
        success: true,
        message: 'If an account exists with this email, a reset link has been sent.',
      })
    }

    console.log('[ForgotPassword API] Generating JWT token for:', email)

    // Generate JWT token with email and expiry (no database storage)
    const resetToken = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // 1 hour expiry
      .sign(JWT_SECRET)

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

    // Send email via SendGrid
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@freightthis.com'
    
    const msg = {
      to: email,
      from: fromEmail,
      subject: 'Reset Your Password - FreightThis',
      text: `You requested a password reset. Click this link to reset your password: ${resetUrl}\n\nThis link expires in 1 hour.\n\nIf you didn't request this, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #92400e;">Reset Your Password</h2>
          <p>You requested a password reset for your FreightThis account.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #92400e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 12px; word-break: break-all;">${resetUrl}</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">This link expires in 1 hour.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    }

    console.log('[ForgotPassword API] Sending email via SendGrid to:', email)
    await sgMail.send(msg)
    console.log('[ForgotPassword API] Email sent successfully to:', email)

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent successfully',
    })
  } catch (error: unknown) {
    console.error('[ForgotPassword API] Error:', error)
    
    const sgError = error as { response?: { body?: unknown } }
    if (sgError.response?.body) {
      console.error('[ForgotPassword API] SendGrid error:', sgError.response.body)
    }

    const message = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      { 
        error: 'Failed to send password reset email',
        details: message,
      },
      { status: 500 }
    )
  }
}
