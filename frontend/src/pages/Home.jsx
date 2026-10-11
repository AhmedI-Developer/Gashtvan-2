import Seo from '@/components/layout/Seo'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import About from '@/components/sections/About'
import VisionMissionValues from '@/components/sections/VisionMissionValues'
import Services from '@/components/sections/Services'
import WhyGashtvan from '@/components/sections/WhyGashtvan'
import Team from '@/components/sections/Team'
import FutureVision from '@/components/sections/FutureVision'
import FeaturedOffers from '@/components/sections/FeaturedOffers'
import CtaBanner from '@/components/sections/CtaBanner'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Seo path="/" />
      <Hero />
      <TrustStrip />
      <About />
      <VisionMissionValues />
      <Services />
      <WhyGashtvan />
      <Team />
      <FutureVision />
      <FeaturedOffers />
      <CtaBanner />
      <Contact />
    </main>
  )
}
