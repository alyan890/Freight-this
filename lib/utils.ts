// Utility functions for FreightThis

// Format date to readable format
export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Calculate days remaining until expiry
export function daysUntilExpiry(expiresAt: Date | string): number {
  const now = new Date()
  const expiry = new Date(expiresAt)
  const diff = expiry.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Check if job is expired
export function isJobExpired(expiresAt: Date | string): boolean {
  return new Date(expiresAt) < new Date()
}

// Calculate expiry date (30 days from now or custom days)
export function calculateExpiryDate(days: number = 90): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Format job type for display
export function formatJobType(jobType: string): string {
  return jobType
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
}

// Get status badge color
export function getStatusColor(status: string): string {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-100 text-green-800'
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'REJECTED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Upload file to Supabase Storage
export async function uploadFileToSupabase(
  file: File,
  bucket: string,
  path: string
): Promise<string | null> {
  const { createClient } = await import('@supabase/supabase-js')
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Supabase credentials not configured')
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const fileExt = file.name.split('.').pop()
  const fileName = `${path}-${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName)

  return urlData.publicUrl
}
