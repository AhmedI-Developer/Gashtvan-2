import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from '@/components/layout/Seo'
import InquirePanel from '@/components/offers/InquirePanel'
import OfferCard from '@/components/offers/OfferCard'
import Skeleton from '@/components/ui/Skeleton'
import { useOffers } from '@/hooks/useOffers'
import { daysUntil, formatPrice } from '@/lib/offers'

export default function OfferDetail() {
  const { slug } = useParams()
  const { offers, loading } = useOffers()
  const offer = offers.find((o) => o.slug === slug)
  const [lightbox, setLightbox] = useState(null)
  const [openDay, setOpenDay] = useState(0)

  const related = useMemo(() => {
    if (!offer) return []
    return offers
      .filter((o) => o.category === offer.category && o.id !== offer.id)
      .slice(0, 3)
  }, [offers, offer])

  if (loading) {
    return (
      <main className="container-shell section-pad pt-28">
        <Skeleton className="mb-6 h-72 w-full" />
        <Skeleton className="h-40 w-full max-w-xl" />
      </main>
    )
  }

  if (!offer) {
    return (
      <main className="container-shell section-pad pt-28 text-center">
        <h1 className="font-display text-3xl font-bold text-[var(--text)]">
          Offer not found
        </h1>
        <p className="mt-3 text-[var(--text-muted)]">
          It may have expired or the link is incorrect.
        </p>
        <Link to="/offers" className="mt-6 inline-block text-[var(--accent-text)] underline">
          Back to offers
        </Link>
      </main>
    )
  }

  const days = daysUntil(offer.validUntil)
  const includes = offer.includes || []
  const excludes = offer.excludes || []

  return (
    <main className="pt-24">
      <Seo
        title={offer.title}
        description={offer.shortDescription}
        path={`/offers/${offer.slug}`}
        image={offer.coverImage}
      />

      <section className="relative min-h-[42svh] overflow-hidden text-white sm:min-h-[46vh]">
        <img
          src={offer.coverImage}
          alt={offer.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,58,0.35),rgba(4,32,58,0.88))]" />
        <div className="container-shell relative z-10 flex min-h-[42svh] flex-col justify-end pb-8 pt-24 sm:min-h-[46vh] sm:pb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)] sm:text-sm">
            {offer.category} · {offer.destination}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-[1.75rem] font-bold leading-tight sm:text-4xl md:text-5xl">
            {offer.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            {offer.shortDescription}
          </p>
        </div>
      </section>

      <div className="container-shell grid gap-8 py-8 sm:py-12 lg:grid-cols-[1.4fr_0.75fr]">
        <div className="min-w-0 space-y-6 sm:space-y-8">
          <div className="flex flex-wrap gap-2 text-sm text-[var(--text-muted)] sm:gap-4">
            <span className="rounded-full border border-[var(--border)] px-3 py-1">
              {formatPrice(offer)}
            </span>
            {offer.duration ? (
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                {offer.duration}
              </span>
            ) : null}
            {days != null ? (
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                {days < 0 ? 'Expired' : `Valid ${days} days`}
              </span>
            ) : null}
          </div>

          <section>
            <h2 className="font-display text-2xl font-bold text-[var(--text)]">Overview</h2>
            <p className="mt-3 text-[var(--text-muted)]">{offer.fullDescription}</p>
          </section>

          {offer.gallery?.length ? (
            <section>
              <h2 className="mb-3 font-display text-2xl font-bold text-[var(--text)]">
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {offer.gallery.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setLightbox(src)}
                    className="overflow-hidden rounded-[20px]"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] h-full w-full object-cover transition hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {includes.length || excludes.length ? (
            <section className="grid gap-4 md:grid-cols-2">
              {includes.length ? (
                <div className="surface rounded-[24px] p-5">
                  <h3 className="font-display text-lg font-bold text-[var(--text)]">Includes</h3>
                  <ul className="mt-3 list-disc space-y-1 ps-5 text-[var(--text-muted)]">
                    {includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {excludes.length ? (
                <div className="surface rounded-[24px] p-5">
                  <h3 className="font-display text-lg font-bold text-[var(--text)]">Excludes</h3>
                  <ul className="mt-3 list-disc space-y-1 ps-5 text-[var(--text-muted)]">
                    {excludes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}

          {offer.itinerary?.length ? (
            <section>
              <h2 className="mb-3 font-display text-2xl font-bold text-[var(--text)]">
                Itinerary
              </h2>
              <div className="space-y-2">
                {offer.itinerary.map((day, i) => (
                  <div key={`${day.day}-${day.title}`} className="surface overflow-hidden rounded-[20px]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-5 py-4 text-start font-semibold text-[var(--text)]"
                      onClick={() => setOpenDay(openDay === i ? -1 : i)}
                      aria-expanded={openDay === i}
                    >
                      <span>
                        Day {day.day}: {day.title}
                      </span>
                      <span className="text-[var(--accent-text)]">{openDay === i ? '−' : '+'}</span>
                    </button>
                    {openDay === i ? (
                      <p className="border-t border-[var(--border)] px-5 py-4 text-[var(--text-muted)]">
                        {day.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {offer.terms ? (
            <section className="surface rounded-[24px] p-5">
              <h3 className="font-display text-lg font-bold text-[var(--text)]">Terms</h3>
              <p className="mt-2 text-[var(--text-muted)]">{offer.terms}</p>
            </section>
          ) : null}
        </div>

        <InquirePanel offer={offer} />
      </div>

      {related.length ? (
        <section className="container-shell pb-16">
          <h2 className="mb-5 font-display text-2xl font-bold text-[var(--text)]">
            Related offers
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <OfferCard key={item.id} offer={item} />
            ))}
          </div>
        </section>
      ) : null}

      <AnimatePresence>
        {lightbox ? (
          <motion.button
            type="button"
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(4,32,58,0.88)] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <img
              src={lightbox}
              alt=""
              className="max-h-[85vh] max-w-full rounded-[20px] object-contain"
            />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </main>
  )
}
