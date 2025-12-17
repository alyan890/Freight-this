import HeroSection from '@/components/HeroSection'
import SolutionsSectionFreight from '@/components/SolutionsSectionFreight'
import SolutionsCategoriesSection from '@/components/SolutionsCategoriesSection'
import LeadershipSection from '@/components/LeadershipSection'
import PartnersSection from '@/components/PartnersSection'
import CTASection from '@/components/CTASection'

export default function HomePage() {
  return (
    <div className="bg-[#faf8f3]">
      <HeroSection />
      <SolutionsSectionFreight />
      <SolutionsCategoriesSection />
      <LeadershipSection />
      <PartnersSection />
      <CTASection />
    </div>
  )
}
