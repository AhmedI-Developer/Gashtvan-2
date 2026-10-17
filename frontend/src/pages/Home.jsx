import { lazy, Suspense } from 'react'
import Seo from '@/components/layout/Seo'
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import Branches from '@/components/sections/Branches'
import Destinations from '@/components/sections/Destinations'
import AirlinePartners from '@/components/sections/AirlinePartners'
import FeaturedOffers from '@/components/sections/FeaturedOffers'
import Quotes from '@/components/sections/Quotes'
import News from '@/components/sections/News'
import CtaBanner from '@/components/sections/CtaBanner'

const Services = lazy(() => import('@/components/sections/Services'))

function ServicesFallback() {
  return (
    <section id="services" className="section-pad bg-[var(--bg)]" aria-hidden="true">
      <div className="container-shell h-48 animate-pulse rounded-[28px] bg-[var(--surface)]" />
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Seo path="/" />
      <Hero />
      <TrustStrip />
      <News />
      <Suspense fallback={<ServicesFallback />}>
        <Services />
      </Suspense>
      <Branches />
      <Destinations />
      <AirlinePartners />
      <FeaturedOffers />
      <Quotes />
      <CtaBanner />
    </main>
  )
}
