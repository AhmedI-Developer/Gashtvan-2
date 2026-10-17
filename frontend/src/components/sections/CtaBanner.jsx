import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MagneticButton from '@/components/ui/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import ctaPoster from '@/assets/backgroundImage/contact/globalTravels.jpg'
import homePageVideo from '@/assets/backgroundVdeos/homePage.mp4'

export default function CtaBanner() {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  const [videoFailed, setVideoFailed] = useState(false)
  const showVideo = !reducedMotion && !videoFailed

  return (
    <section className="relative min-h-[18rem] overflow-hidden py-14 sm:min-h-0 sm:py-16 md:py-20">
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            className="media-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={ctaPoster}
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
          >
            <source src={homePageVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={ctaPoster}
            alt=""
            loading="lazy"
            className="media-cover"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,58,0.62),rgba(4,32,58,0.78))]" />
      <div className="container-shell relative z-10 text-center text-white">
        <p className="eyebrow !text-[var(--accent)]">{t('home.ctaEyebrow')}</p>
        <h2 className="mx-auto mt-3 max-w-3xl font-display text-[1.65rem] font-bold sm:text-3xl md:text-5xl">
          {t('home.cta')}
        </h2>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
          <MagneticButton to="/offers" className="w-full sm:w-auto">
            {t('common.viewOffers')}
          </MagneticButton>
          <MagneticButton
            to="/contact"
            variant="ghost"
            className="w-full sm:w-auto"
          >
            {t('common.contactUs')}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
