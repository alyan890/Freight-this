import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SponsorForm from '@/components/SponsorForm'

export default async function SubmitSponsorPage() {
  const session = await auth()

  // Require authentication to submit sponsorship
  if (!session?.user) {
    redirect('/login?callbackUrl=/supporters/submit')
  }

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Become a Sponsor</h1>
          <p className="text-gray-600">
            Join our community of supporters and help build a better transportation marketplace. Fill out the form below and our team will review your application within 24-48 hours.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-[#e0d9c7] p-8">
          <SponsorForm />
        </div>
      </div>
    </div>
  )
}
