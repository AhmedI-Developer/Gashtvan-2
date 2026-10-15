import Seo from '@/components/layout/Seo'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import WhyGashtvan from '@/components/sections/WhyGashtvan'
import Team from '@/components/sections/Team'
import FutureVision from '@/components/sections/FutureVision'
import Destinations from '@/components/sections/Destinations'
import FeaturedOffers from '@/components/sections/FeaturedOffers'
import News from '@/components/sections/News'
import CtaBanner from '@/components/sections/CtaBanner'

export default function Home() {
  return (
    <main>
      <Seo path="/" />
      <Hero />
      <TrustStrip />
      <News />
      <About />
      <Services />
      <WhyGashtvan />
      <Team />
      <FutureVision />
      <Destinations />
      <FeaturedOffers />
      <CtaBanner />
    </main>
  )
}
