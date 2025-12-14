import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Here you would typically send an email to admin
    // For now, we'll just return success
    console.log('Contact form submission:', validatedData)

    // You can integrate with SendGrid here similar to other email functions

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error processing contact form:', error)

    if (error instanceof ZodError) {
      // Handle Zod validation errors with user-friendly messages
      const fieldError = error.errors[0]
      const field = fieldError.path[0]
      
      let message = ''
      if (fieldError.code === 'too_big') {
        message = `${String(field)} cannot exceed ${fieldError.maximum} characters`
      } else if (fieldError.code === 'too_small') {
        message = fieldError.message
      } else {
        message = fieldError.message
      }
      
      return NextResponse.json({ error: message }, { status: 400 })
    }

    if (error.errors) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
