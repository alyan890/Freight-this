import { prisma } from '@/lib/prisma'
import JobCard from '@/components/JobCard'
import Link from 'next/link'

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; location?: string; type?: string }>
}) {
  // Await searchParams in Next.js 16
  const params = await searchParams

  let jobs: any[] = []
  try {
    jobs = await prisma.jobPost.findMany({
      where: {
        status: 'APPROVED',
        expiresAt: {
          gte: new Date(),
        },
        ...(params.category && { category: params.category }),
        ...(params.type && { jobType: params.type as any }),
        ...(params.location && {
          location: {
            contains: params.location,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })
  } catch (err) {
    console.error('[Jobs] Failed to fetch jobs:', err)
  }

  return (
    <div className="min-h-screen bg-[#f7f0e6] text-gray-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          {/* Hero */}
          <div className="rounded-3xl bg-white/60 border border-white/60 p-8 shadow-xl shadow-amber-900/5 backdrop-blur-md">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-amber-700/80 mb-2">Opportunities Await</p>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3 text-gray-900">Browse Jobs</h1>
                <p className="text-gray-700 max-w-2xl">Curated roles from vetted teams across logistics and beyond. Filter quickly and apply with confidence.</p>
                <div className="mt-4 inline-flex items-center gap-3 text-sm text-amber-800/80">
                  <span className="px-3 py-1 rounded-full bg-white/80 border border-[#e0d9c7] text-gray-800 shadow-sm">{jobs.length} open role{jobs.length !== 1 ? 's' : ''}</span>
                  <span className="px-3 py-1 rounded-full bg-white/70 border border-[#e0d9c7] text-gray-700 shadow-sm">Updated daily</span>
                </div>
              </div>
              <Link
                href="/jobs/post"
                className="inline-flex items-center justify-center gap-2 bg-amber-400/90 text-gray-900 px-6 py-3 rounded-lg text-sm font-semibold shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition"
              >
                Post a Job
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-8 rounded-2xl bg-white/60 border border-white/60 p-6 shadow-xl shadow-amber-900/5 backdrop-blur-md">
            <form method="GET" className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-800 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  defaultValue={params.location || ''}
                  placeholder="e.g., New York"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#e0d9c7] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  defaultValue={params.category || ''}
                  placeholder="e.g., Technology"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#e0d9c7] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-gray-800 mb-2">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  defaultValue={params.type || ''}
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#e0d9c7] text-gray-900 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                >
                  <option value="" className="bg-white text-gray-900">All Types</option>
                  <option value="FULL_TIME" className="bg-white text-gray-900">Full Time</option>
                  <option value="PART_TIME" className="bg-white text-gray-900">Part Time</option>
                  <option value="CONTRACT" className="bg-white text-gray-900">Contract</option>
                  <option value="FREELANCE" className="bg-white text-gray-900">Freelance</option>
                  <option value="INTERNSHIP" className="bg-white text-gray-900">Internship</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center gap-2 bg-amber-400/90 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition"
                >
                  Filter
                </button>
              </div>
            </form>
          </div>

          {/* Job Listings */}
          <div className="mt-10">
            {jobs.length === 0 ? (
              <div className="bg-white/70 border border-white/60 rounded-2xl p-12 text-center shadow-inner shadow-amber-900/5 backdrop-blur-md">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-700 mb-4">Try adjusting your filters or check back later for new listings.</p>
                <Link href="/jobs" className="inline-block text-amber-700 hover:text-amber-800 font-semibold">
                  Clear filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job: any) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
  )
}
