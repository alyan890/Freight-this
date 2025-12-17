import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { ZodError } from 'zod'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Extract additional context from request
    const { requestType, category, ...contactData } = body

    // Build email content
    let emailContent = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #b45309;">New Contact Form Submission</h2>
  
  <div style="background-color: #f7f0e6; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Name:</strong> ${validatedData.name}</p>
    <p><strong>Email:</strong> ${validatedData.email}</p>
    <p><strong>Subject:</strong> ${validatedData.subject}</p>
    ${requestType ? `<p><strong>Request Type:</strong> ${requestType}</p>` : ''}
    ${category ? `<p><strong>Category:</strong> ${category}</p>` : ''}
  </div>
  
  <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #b45309; margin: 20px 0;">
    <h3>Message:</h3>
    <p style="white-space: pre-wrap;">${validatedData.message}</p>
  </div>
  
  <p style="color: #666; font-size: 12px;">
    This email was sent from the FreightThis contact form.
  </p>
</div>
    `

    // Send email if SendGrid is configured
    if (process.env.SENDGRID_API_KEY && process.env.ADMIN_EMAIL) {
      const msg = {
        to: process.env.ADMIN_EMAIL,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@freightthis.com',
        replyTo: validatedData.email,
        subject: `Contact Form: ${validatedData.subject}`,
        html: emailContent,
      }

      await sgMail.send(msg)
      console.log('Contact email sent successfully to', process.env.ADMIN_EMAIL)
    } else {
      console.log('SendGrid not configured. Contact form data:', validatedData)
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error processing contact form:', error)

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
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
