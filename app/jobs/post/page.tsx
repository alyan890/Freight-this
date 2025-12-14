import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import JobForm from '@/components/JobForm'

export default async function PostJobPage() {
  const session = await auth()

  // Require authentication to post jobs
  if (!session?.user) {
    redirect('/login?callbackUrl=/jobs/post')
  }

  return (
    <div className="bg-[#faf8f3] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">
            Fill out the form below to post your job listing. Our team will review it within 24-48 hours.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-[#e0d9c7] p-8">
          <JobForm />
        </div>
      </div>
    </div>
  )
}
