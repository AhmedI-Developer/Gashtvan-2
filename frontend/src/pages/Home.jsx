import Seo from '@/components/layout/Seo'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import Services from '@/components/sections/Services'
import Branches from '@/components/sections/Branches'
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
      <Services />
      <Branches />
      <Destinations />
      <FeaturedOffers />
      <CtaBanner />
    </main>
  )
}
