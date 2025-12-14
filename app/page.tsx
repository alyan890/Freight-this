import HeroSection from '@/components/HeroSection'
import SolutionsSectionFreight from '@/components/SolutionsSectionFreight'
import LeadershipSection from '@/components/LeadershipSection'
import PartnersSection from '@/components/PartnersSection'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <div className="bg-[#faf8f3]">
      <HeroSection />
      <SolutionsSectionFreight />
      <LeadershipSection />
      <PartnersSection />
      <CTASection />
    </div>
  )
}
