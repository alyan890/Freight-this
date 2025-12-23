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
              At FreightThis, we believe that finding the right job should be simple, transparent, and rewarding. Our mission is to create a platform that connects talented professionals with companies that value their skills and potential.
            </p>
            <p>
              We're committed to building a job portal that prioritizes quality over quantity, ensuring that every job listing is vetted and every application is treated with respect.
            </p>
            <p>
              By leveraging technology and maintaining a human touch, we're transforming how the transportation industry approaches hiring and career development.
            </p>
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
      <MissionSection />
      <NewsSection />
      <LeadershipSection />
      <PartnersSection />
      <CTASection />
    </div>
  )
}
