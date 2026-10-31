import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.freightthis.com'

  // Static pages: omit lastModified until we have a reliable update timestamp.
  const staticPages = [
    {
      url: baseUrl,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/jobs`,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jobs/post`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/supporters`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/supporters/submit`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Dynamic job pages - only include approved jobs
  let jobPages: MetadataRoute.Sitemap = []
  try {
    const jobs = await prisma.jobPost.findMany({
      // Match the public listings page: exclude expired partnerships.
      where: {
        status: 'APPROVED',
        expiresAt: { gte: new Date() },
      },
      select: { id: true, updatedAt: true },
    })

    jobPages = jobs.map((job) => ({
      url: `${baseUrl}/jobs/${job.id}`,
      lastModified: job.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching jobs for sitemap:', error)
  }

  return [...staticPages, ...jobPages]
}
