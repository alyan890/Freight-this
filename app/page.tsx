import HeroSection from '@/components/HeroSection'
import LeadershipSection from '@/components/LeadershipSection'
import PartnersSection from '@/components/PartnersSection'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <div className="bg-[#faf8f3]">
      <HeroSection />
      <LeadershipSection />
      <PartnersSection />
      <CTASection />
    </div>
  )
}
