import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendSolutionRequestEmail } from '@/lib/email'

const payloadSchema = z.object({
  type: z.string(),
  selectedItems: z.array(z.string()).optional(),
  otherText: z.string().optional(),
  contact: z.object({
    fullName: z.string().optional(),
    companyName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = payloadSchema.parse(body)

    // Send plain-text email to the client's provided email address
    await sendSolutionRequestEmail({
      toEmail: data.contact.email,
      type: data.type,
      selectedItems: data.selectedItems || [],
      otherText: data.otherText || '',
      contact: data.contact,
    })

    return NextResponse.json({ message: 'Email sent' })
  } catch (error: any) {
    console.error('Error in solutions API:', error)
    return NextResponse.json({ error: error?.message || 'Failed to send email' }, { status: 500 })
  }
}
