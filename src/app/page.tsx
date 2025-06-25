import { HeroSection } from '@/components/home/hero-section'
import { FeaturesSection } from '@/components/home/features-section'
import { PopularRestaurants } from '@/components/home/popular-restaurants'
import { CTASection } from '@/components/home/cta-section'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PopularRestaurants />
      <CTASection />
    </div>
  )
}
