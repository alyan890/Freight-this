import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUpVariants } from '@/lib/animations'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

// Always render fresh data so newly approved sponsors appear immediately
export const revalidate = 0
export const dynamic = 'force-dynamic'

// Tier mapping
const TIER_CONFIG = {
  FULL_TIME: { name: 'Premium Sponsors', order: 1, color: 'amber' },
  PART_TIME: { name: 'Standard Sponsors', order: 2, color: 'orange' },
  CONTRACT: { name: 'Basic Sponsors', order: 3, color: 'yellow' },
  FREELANCE: { name: 'Community Supporters', order: 4, color: 'blue' },
  INTERNSHIP: { name: 'Supporters', order: 5, color: 'gray' },
} as const

export default async function SupportersPage() {
  // Fetch approved sponsors from database (reusing JobPost table)
  let sponsors: Awaited<ReturnType<typeof prisma.jobPost.findMany>> = []
  try {
    sponsors = await prisma.jobPost.findMany({
      where: {
        status: 'APPROVED',
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        companyName: true,
        description: true,
        salary: true, // Contains website URL
        jobType: true, // Contains tier
        location: true,
        category: true,
        contactEmail: true,
      },
    })
  } catch (error) {
    console.error('Failed to load supporters:', error)
  }

  // Group sponsors by tier
  const sponsorsByTier = sponsors.reduce((acc, sponsor) => {
    const tier = sponsor.jobType
    if (!acc[tier]) {
      acc[tier] = []
    }
    acc[tier].push(sponsor)
    return acc
  }, {} as Record<string, typeof sponsors>)

  // Sort tiers by order
  const sortedTiers = Object.keys(sponsorsByTier).sort(
    (a, b) => TIER_CONFIG[a as keyof typeof TIER_CONFIG].order - TIER_CONFIG[b as keyof typeof TIER_CONFIG].order
  )

  return (
    <div className="min-h-screen bg-[#faf8f3] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Supporters / Sponsors
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're grateful to our supporters who help make FreightThis possible
          </p>
        </div>

        {/* Sponsors by Tier */}
        {sponsors.length > 0 ? (
          <div className="space-y-16 mb-16">
            {sortedTiers.map((tier) => {
              const tierConfig = TIER_CONFIG[tier as keyof typeof TIER_CONFIG]
              const tierSponsors = sponsorsByTier[tier]

              return (
                <div key={tier} className="space-y-8">
                  {/* Tier Header */}
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {tierConfig.name}
                    </h2>
                    <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
                  </div>

                  {/* Sponsors in this tier */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {tierSponsors.map((sponsor) => (
                      <div
                        key={sponsor.id}
                        className="bg-white border border-[#e0d9c7] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group w-full max-w-xs mx-auto"
                      >
                        {/* Logo Section */}
                        <div className="bg-gradient-to-br from-amber-50 to-white p-3 flex items-center justify-center h-28 border-b border-[#e0d9c7]">
                          {sponsor.imageUrl ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={sponsor.imageUrl}
                                alt={sponsor.title}
                                fill
                                sizes="100vw"
                                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-400 text-xs font-medium text-center px-3">
                                {sponsor.title}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Info Section */}
                        <div className="p-3 space-y-2">
                          <div>
                            <h3 className="text-base font-bold text-gray-900 mb-1">
                              {sponsor.title}
                            </h3>
                            {sponsor.companyName && (
                              <p className="text-[11px] text-gray-600">{sponsor.companyName}</p>
                            )}
                          </div>

                          {sponsor.description && (
                            <p className="text-xs text-gray-700 line-clamp-3">
                              {sponsor.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-2 text-[11px]">
                            {sponsor.location && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                                {sponsor.location}
                              </span>
                            )}
                            {sponsor.category && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                                {sponsor.category}
                              </span>
                            )}
                          </div>

                          {sponsor.salary && (
                            <a
                              href={sponsor.salary.startsWith('http') ? sponsor.salary : `https://${sponsor.salary}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-amber-700 hover:text-amber-800 font-medium"
                            >
                              Visit Website
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 mb-16">
            <p className="text-gray-500">No sponsors yet. Be the first to support FreightThis!</p>
          </div>
        )}

        {/* LinkedIn Group Affiliation */}
        <div className="mb-16 bg-white rounded-lg border border-[#e0d9c7] p-8">
          <div className="flex items-center gap-4 justify-center">
            <svg className="w-12 h-12 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
            </svg>
            <div className="text-center">
              <p className="text-gray-700 font-semibold text-lg">In affiliation with</p>
              <a
                href="https://www.linkedin.com/groups/54591/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 font-bold text-xl hover:underline"
              >
                175,000+ transportation professionals
              </a>
            </div>
          </div>
        </div>

        {/* Join the Group CTA */}
        <div className="text-center bg-linear-to-br from-amber-50 to-amber-100/50 rounded-2xl p-12 border border-amber-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Become a Sponsor
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join our community of supporters and help build a better transportation marketplace. Fill out the form below and our team will review your application within 24-48 hours.
          </p>
          <Link
            href="/supporters/submit"
            className="inline-block bg-linear-to-r from-amber-600 to-amber-700 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-amber-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Submit Sponsorship
          </Link>
        </div>
      </div>
    </div>
  )
}
