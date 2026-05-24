import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import dns from 'dns'

// Prefer IPv4 to avoid potential IPv6 connectivity issues in some hosts
// Node 18+: setDefaultResultOrder may exist
try {
  // @ts-ignore - optional on older Node versions
  dns.setDefaultResultOrder && dns.setDefaultResultOrder('ipv4first')
} catch {}

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
  // Slightly more tolerant timeouts for cold starts/network jitter
  statement_timeout: 20000,
  query_timeout: 20000,
  // Keep pool small to avoid exhausting Supabase limits
  max: 5,
  min: 0,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
  keepAlive: true,
  // Let process exit even if clients idle (useful in dev/serverless)
  allowExitOnIdle: true,
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


