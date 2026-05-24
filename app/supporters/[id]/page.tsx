import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDate, formatJobType } from '@/lib/utils'
import ContactEmailEditor from '@/components/ContactEmailEditor'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function SupporterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const { id } = await params

  const sponsor = await prisma.jobPost.findUnique({
    where: { id },
  })

  const isAdmin = session?.user?.role === 'ADMIN'
  const isOwner = session?.user?.id && sponsor?.userId === session.user.id
  const canEditContactEmail = Boolean(isAdmin || isOwner)

  if (!sponsor || (sponsor.status !== 'APPROVED' && !isAdmin)) {
    notFound()
  }

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/supporters"
          className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Supporters
        </Link>

        <div className="bg-white rounded-lg border border-[#e0d9c7] p-8 mb-6">
          {sponsor.imageUrl && (
            <div className="mb-6 -mx-8 -mt-8">
              <img
                src={sponsor.imageUrl}
                alt={sponsor.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </div>
          )}

          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{sponsor.title}</h1>
              {sponsor.companyName && (
                <p className="text-xl text-gray-700">{sponsor.companyName}</p>
              )}
            </div>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
              {formatJobType(sponsor.jobType)}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {sponsor.location}
            </div>

            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {sponsor.category}
            </div>

            {sponsor.salary && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <a
                  href={sponsor.salary.startsWith('http') ? sponsor.salary : `https://${sponsor.salary}`}
                  className="text-amber-700 hover:text-amber-800 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#e0d9c7]">
            <span className="text-sm text-gray-500">Posted {formatDate(sponsor.createdAt)}</span>
            {sponsor.contactEmail && (
              <a
                href={`mailto:${sponsor.contactEmail}`}
                className="text-sm text-amber-700 hover:text-amber-800 font-medium"
              >
                Contact
              </a>
            )}
          </div>

          {canEditContactEmail && (
            <ContactEmailEditor sponsorId={sponsor.id} initialEmail={sponsor.contactEmail || ''} />
          )}
        </div>

        <div className="bg-white rounded-lg border border-[#e0d9c7] p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this supporter</h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {sponsor.description}
          </div>

          {sponsor.requirements && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Additional details</h3>
              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {sponsor.requirements}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
