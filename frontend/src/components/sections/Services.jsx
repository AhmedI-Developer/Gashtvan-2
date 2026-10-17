/**
 * Services — bento grid (navy cards + photo + CTA)
 * --------------------------------------------------------------------------
 * Images: `/src/data/services.js`
 * Localized bodies: `/src/content/company*.js`
 * Grid spans: `gridClass` / `ctaGridClass` in services.js
 * Cards: `./services/ServiceCard.jsx`
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ctaGridClass, services as servicesData } from '@/data/services'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'
import SectionHeading from '@/components/ui/SectionHeading'
import { CtaCard, ServiceCard } from './services/ServiceCard'
import ServiceModal from './services/ServiceModal'
import ServicesBackgroundLine from './services/ServicesBackgroundLine'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const { t } = useTranslation()
  const company = useCompanyContent()
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)
  const pathRef = useRef(null)
  const [modalIndex, setModalIndex] = useState(null)
  const [entered, setEntered] = useState(reduced)

  const items = useMemo(
    () =>
      servicesData.map((service) => {
        const localized = company.services.find((entry) => entry.id === service.id)
        const fullText = localized?.body || service.fullText
        return {
          ...service,
          cardTitle: localized?.cardTitle || service.cardTitle,
          fullTitle: localized?.title || service.fullTitle,
          shortText: localized?.summary || service.shortText || fullText,
          fullText,
          title: localized?.title || service.fullTitle,
        }
      }),
    [company.services],
  )

  // Stagger indices: Air(0), CTA(1), MICE(2), Hotels(3), Corp(4), Visa(5), Training(6)
  const staggerIndex = {
    'air-ticketing': 0,
    mice: 2,
    'hospitality-tours': 3,
    corporate: 4,
    'visa-admissions': 5,
    training: 6,
  }

  const inView = useInView(sectionRef, { once: true, amount: 0.18 })
  useEffect(() => {
    if (inView) setEntered(true)
  }, [inView])

  useEffect(() => {
    const section = sectionRef.current
    const path = pathRef.current
    if (!section || !path) return undefined
    if (reduced) {
      gsap.set(path, { strokeDashoffset: 0 })
      return undefined
    }
    gsap.set(path, { strokeDashoffset: 1 })
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'services-bento-line',
        trigger: section,
        start: 'top 80%',
        end: 'bottom 50%',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(path, { strokeDashoffset: 1 - self.progress })
        },
      })
    }, section)
    return () => ctx.revert()
  }, [reduced])

  const openModal = useCallback((index) => setModalIndex(index), [])
  const closeModal = useCallback(() => setModalIndex(null), [])
  const modalService = modalIndex != null ? items[modalIndex] : null

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-pad relative overflow-hidden bg-[var(--bg)]"
      aria-labelledby="services-heading"
    >
      <ServicesBackgroundLine pathRef={pathRef} />

      <div className="container-shell relative z-[1] w-full max-w-[1280px]">
        <SectionHeading
          titleId="services-heading"
          eyebrow={t('home.servicesEyebrow')}
          title={t('home.servicesHeadline')}
          description={t('home.servicesLead')}
          className="mb-8 sm:mb-10 lg:mb-12"
        />

        <ul
          className={cn(
            'services-bento grid w-full gap-4',
            'grid-cols-1',
            'sm:grid-cols-2 sm:gap-5',
            'lg:grid-cols-12 lg:grid-rows-3 lg:gap-5',
            'lg:h-[min(720px,82vh)] lg:min-h-[640px]',
          )}
        >
          {items.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={staggerIndex[service.id] ?? index}
              reduced={reduced}
              entered={entered}
              onOpen={() => openModal(index)}
            />
          ))}
          <CtaCard
            gridClass={ctaGridClass}
            reduced={reduced}
            entered={entered}
            index={1}
          />
        </ul>
      </div>

      <ServiceModal
        open={modalIndex != null}
        onClose={closeModal}
        service={modalService}
      />
    </section>
  )
}
