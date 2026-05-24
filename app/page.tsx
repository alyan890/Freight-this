import HeroSection from '@/components/HeroSection'
import LeadershipSection from '@/components/LeadershipSection'
import PartnersSection from '@/components/PartnersSection'
import CTASection from '@/components/CTASection'
import NewsSection from '@/components/NewsSection'

// Mission Section Component
function MissionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-amber-700 font-semibold text-xl mb-8">
            Revolutionizing Transportation Connections
          </p>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              At FreightThis, we believe that finding the right solutions and partners should be simple, transparent, and rewarding. Our mission is to create a platform that connects transportation professionals and companies where the fit is natural and value-driven.</p>
            <p>
              We are committed to building a trusted portal that prioritizes quality over quantity, ensuring that every solution provider is vetted and every connection is meaningful, timely, and relevant.
            </p>
            <p>
              By leveraging technology while maintaining a strong human touch, we are transforming how the transportation industry discovers solutions, builds relationships, and improves business outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// LinkedIn Affiliation Component
function LinkedInAffiliation() {
  return (
    <section className="py-12 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-[#e0d9c7] p-8">
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
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="bg-[#faf8f3]">
      <HeroSection />
      <LinkedInAffiliation />
      <MissionSection />
      <NewsSection />
      <LeadershipSection />
      <PartnersSection />
      <CTASection />
    </div>
  )
}
