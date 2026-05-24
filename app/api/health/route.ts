import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Simple test query to verify DB connection
    const result = await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ status: 'ok', database: 'connected' })
  } catch (error: any) {
    console.error('Health check error:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: error.message,
        code: error.code,
      },
      { status: 500 }
    )
  }
}
