import Link from 'next/link'

export default function JobPostSuccessPage() {
  return (
    <div className="bg-[#faf8f3] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-lg border border-[#e0d9c7] p-8 sm:p-10 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 inline-flex items-center gap-2 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7 w-7 text-amber-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m5.303-14.303-1.591 1.591m-8.424 8.424-1.591 1.591m12.006 0-1.591-1.591m-8.424-8.424-1.591-1.591M21 12h-2.25M5.25 12H3m3.408 6.303 1.591-1.591m8.424-8.424 1.591-1.591m0 12.006-1.591-1.591M7.999 7.999l-1.591-1.591" />
            </svg>
            Partnership Posted Successfully!
          </h1>

          {/* Main Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-lg font-semibold text-blue-900 mb-3">Thank You for Your Submission!</h2>
            <p className="text-blue-800 mb-3">
              Your partnership posting has been successfully submitted and is now pending admin approval.
            </p>
            <p className="text-blue-800">
              Our team will review your posting to ensure it meets our quality standards. This typically takes <strong>1-2 business days</strong>.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-amber-900 mb-4 inline-flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h4.5m-4.5 3h4.5m-8.25 3h12A2.25 2.25 0 0 0 20.25 13.5v-6A2.25 2.25 0 0 0 18 5.25H6A2.25 2.25 0 0 0 3.75 7.5v6A2.25 2.25 0 0 0 6 15.75Zm0 0V18A2.25 2.25 0 0 0 8.25 20.25H15a2.25 2.25 0 0 0 2.25-2.25v-2.25" />
              </svg>
              What Happens Next?
            </h3>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="shrink-0 w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                <span className="text-amber-900">
                  <strong>Review:</strong> Our admin team reviews your partnership posting for quality and compliance
                </span>
              </li>
              <li className="flex items-start">
                <span className="shrink-0 w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                <span className="text-amber-900">
                  <strong>Approval:</strong> Once approved, your partnership will be visible to all partnership seekers
                </span>
              </li>
              <li className="flex items-start">
                <span className="shrink-0 w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                <span className="text-amber-900">
                  <strong>Start Recruiting:</strong> You'll begin receiving applications from qualified candidates
                </span>
              </li>
            </ol>
          </div>

          {/* Info Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-700 inline-flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4 mt-0.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-4.5m0 0a2.25 2.25 0 1 0-2.25-2.25m2.25 2.25H9m3-8.25a7.5 7.5 0 1 0 7.5 7.5 7.5 7.5 0 0 0-7.5-7.5Z" />
              </svg>
              <span>
                <strong>Tip:</strong> Check back here in the next day to see if your partnership has been approved. You can also view all your posted partnerships from your dashboard.
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supporters"
              className="inline-flex items-center justify-center px-6 py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition-colors"
            >
              Browse Partnerships
            </Link>
            <Link
              href="/supporters/submit"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-amber-700 text-amber-700 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
            >
              Post Another Partnership
            </Link>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 inline-flex items-center gap-2 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a23.86 23.86 0 0 0-2.27 3.66c-.44.87-1.46.91-1.9.04a23.74 23.74 0 0 0-2.16-3.48 11.98 11.98 0 0 1-2.15-6.87c.03-.9.11-1.8.25-2.68a.44.44 0 0 1 .75-.24l2.15 2.15c.17.17.23.42.15.65l-.68 2.03a.75.75 0 0 0 .22.8l1.6 1.27a.75.75 0 0 0 .94 0l1.6-1.27a.75.75 0 0 0 .22-.8l-.68-2.03a.62.62 0 0 1 .15-.65l2.11-2.11a.43.43 0 0 1 .73.22c.18.84.3 1.7.35 2.57a11.9 11.9 0 0 1-2.43 8.09Z" />
              </svg>
              Questions? Contact our support team, and we'll help you out. Thank you for using FreightThis!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
