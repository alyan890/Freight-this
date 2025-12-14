import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

declare global {
  var prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Create pool with enhanced SSL and connection settings for Supabase
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  application_name: 'FreightThis',
  statement_timeout: 15000,
  query_timeout: 15000,
  // Force IPv4 connections
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
})

// Log pool events
pool.on('error', (err) => {
  console.error('[Database Pool Error]', err.message)
})

pool.on('connect', () => {
  console.log('[Database] Pool connection established')
})

const adapter = new PrismaPg(pool)

export const prisma =
  global.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}


