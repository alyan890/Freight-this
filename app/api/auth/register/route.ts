import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    return NextResponse.json(
      { message: 'User registered successfully', user },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    
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
      { error: 'Failed to register user' },
      { status: 500 }
    )
  }
}
