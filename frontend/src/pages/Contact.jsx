import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Clock, Mail, MapPin, Phone, Share2 } from 'lucide-react'
import Seo from '@/components/layout/Seo'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'
import { useTheme } from '@/hooks/useTheme'
import { site, apiBase } from '@/config/site'
import { cn } from '@/lib/cn'
import erbilSkyline from '@/assets/backgroundImage/contact/erbilSkyline.jpg'
import office from '@/assets/backgroundImage/contact/office.jpg'
import globalTravels from '@/assets/backgroundImage/contact/globalTravels.jpg'
import consultantReview from '@/assets/backgroundImage/contact/consultantReview.jpg'

const initial = { name: '', email: '', phone: '', message: '' }

/** Named place query loads a proper pin; bare lat/lng often breaks “Place info”. */
function mapEmbedSrc({ lat, lng, label }) {
  const query = encodeURIComponent(`${label} @${lat},${lng}`)
  return `https://www.google.com/maps?q=${query}&z=16&hl=en&output=embed`
}

function telHref(phone) {
  return `tel:${phone.replace(/\s/g, '')}`
}

export default function Contact() {
  const { t } = useTranslation()
  const { theme, isDark } = useTheme()
  const [mapShareNote, setMapShareNote] = useState('')
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = t('contact.required')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t('contact.required')
    if (!form.phone.trim()) next.phone = t('contact.required')
    if (form.message.trim().length < 10) next.message = t('contact.required')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return
    setSending(true)
    setFormError('')
    setSent(false)
    try {
      const res = await fetch(`${apiBase}/contact`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
      setForm(initial)
    } catch {
      setFormError(t('contact.sendFailed'))
    } finally {
      setSending(false)
    }
  }

  const fields = [
    { name: 'name', label: t('contact.name'), type: 'text' },
    { name: 'email', label: t('contact.email'), type: 'email' },
    { name: 'phone', label: t('contact.phone'), type: 'tel' },
  ]

  return (
    <main>
      <Seo
        title={t('nav.contact')}
        description={t('contact.heroLead')}
        path="/contact"
      />

      <section className="relative min-h-[70svh] overflow-hidden text-white sm:min-h-[72svh]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={erbilSkyline}
            alt="Erbil citadel and city skyline at night"
            className="media-cover media-cover--contact"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,58,0.42)_0%,rgba(4,32,58,0.7)_58%,rgba(4,32,58,0.92)_100%)]" />
        <div className="container-shell relative z-10 flex min-h-[70svh] flex-col justify-end pb-12 pt-28 sm:min-h-[72svh] sm:pb-16 sm:pt-32">
          <p className="eyebrow !text-[var(--accent)]">{t('contact.eyebrow')}</p>
          <h1 className="mt-3 max-w-3xl font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            {t('contact.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            {t('contact.heroLead')}
          </p>
        </div>
      </section>

      <section id="reach" className="section-pad scroll-mt-24">
        <div className="container-shell grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal className="overflow-hidden rounded-[22px] sm:rounded-[28px]">
            <img
              src={office}
              alt="Gashtvan travel office desk and reception"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">{t('contact.reachEyebrow')}</p>
            <h2 className="mt-3 font-display text-[1.75rem] font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              {t('contact.reachTitle')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              {t('contact.reachDescription')}
            </p>
            <div className="mt-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
                {t('contact.phonesLabel')}
              </p>
              {site.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="flex items-center gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 transition hover:border-[var(--accent)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
                    <Phone size={18} />
                  </span>
                  <span className="font-display text-base font-bold text-[var(--text)] sm:text-lg">
                    {phone}
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
                {t('contact.emailsLabel')}
              </p>
              {site.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 transition hover:border-[var(--accent)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
                    <Mail size={18} />
                  </span>
                  <span className="min-w-0 break-all font-display text-base font-bold text-[var(--text)] sm:text-lg">
                    {email}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="map" className="section-pad scroll-mt-24 bg-[var(--bg-alt)]">
        <div className="container-shell grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <p className="eyebrow">{t('contact.mapEyebrow')}</p>
            <h2 className="mt-3 font-display text-[1.75rem] font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              {t('contact.mapTitle')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              {t('contact.mapDescription')}
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3 text-[var(--text)]">
                <MapPin className="mt-1 shrink-0 text-[var(--accent)]" size={18} />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
                    {t('contact.addressLabel')}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed sm:text-base">{t('home.address')}</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-[var(--text)]">
                <Clock className="mt-1 shrink-0 text-[var(--accent)]" size={18} />
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-text)]">
                    {t('contact.hoursLabel')}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed sm:text-base">{t('home.hours')}</span>
                </span>
              </li>
            </ul>
            <div className="mt-6 flex flex-col items-start gap-2">
              <button
                type="button"
                onClick={async () => {
                  const shareData = {
                    title: site.location.label,
                    text: `${site.location.label} — ${t('home.address')}`,
                    url: site.mapsUrl,
                  }
                  try {
                    if (navigator.share) {
                      await navigator.share(shareData)
                      return
                    }
                    await navigator.clipboard.writeText(site.mapsUrl)
                    setMapShareNote(t('contact.shareMapCopied'))
                    window.setTimeout(() => setMapShareNote(''), 2500)
                  } catch (err) {
                    if (err?.name === 'AbortError') return
                    try {
                      await navigator.clipboard.writeText(site.mapsUrl)
                      setMapShareNote(t('contact.shareMapCopied'))
                      window.setTimeout(() => setMapShareNote(''), 2500)
                    } catch {
                      setMapShareNote(t('contact.shareMapFailed'))
                      window.setTimeout(() => setMapShareNote(''), 2500)
                    }
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--text)] shadow-[var(--shadow)] transition hover:border-[var(--accent)] hover:text-[var(--accent-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <Share2 size={16} strokeWidth={2.25} className="text-[var(--accent-text)]" />
                {t('contact.shareMap')}
              </button>
              {mapShareNote ? (
                <p className="text-xs font-medium text-[var(--text-muted)]" role="status">
                  {mapShareNote}
                </p>
              ) : null}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="overflow-hidden rounded-[22px] sm:rounded-[28px]">
            <img
              src={globalTravels}
              alt="Global travel routes connecting destinations worldwide"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>
        <div className="container-shell mt-8 sm:mt-10">
          <div className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] sm:rounded-[28px]">
            <div className="relative aspect-[16/9] min-h-[240px] w-full overflow-hidden bg-[var(--navy)] sm:min-h-[360px]">
              <iframe
                key={theme}
                title={site.location.label}
                src={mapEmbedSrc(site.location)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
              {/* Tint only — invert filters break Google’s place-info panel */}
              <div
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute inset-0 transition-opacity duration-300',
                  isDark
                    ? 'bg-[color-mix(in_srgb,var(--navy)_28%,transparent)] opacity-100'
                    : 'opacity-0',
                )}
              />
            </div>
            <div className="border-t border-[var(--border)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--text)]">{site.location.label}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="message" className="section-pad scroll-mt-24">
        <div className="container-shell grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <p className="eyebrow">{t('contact.formEyebrow')}</p>
            <h2 className="mt-3 font-display text-[1.75rem] font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
              {t('contact.formTitle')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              {t('contact.formDescription')}
            </p>
            <form
              onSubmit={onSubmit}
              className="surface mt-6 space-y-4 rounded-[22px] p-4 sm:rounded-[28px] sm:p-6 md:p-8"
              noValidate
            >
              {fields.map((field) => (
                <label key={field.name} className="block text-sm font-semibold text-[var(--text)]">
                  {field.label}
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, [field.name]: event.target.value }))
                    }
                    className="mt-1.5 w-full rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                  />
                  {errors[field.name] ? (
                    <span className="mt-1 block text-xs text-[var(--accent-text)]">
                      {errors[field.name]}
                    </span>
                  ) : null}
                </label>
              ))}
              <label className="block text-sm font-semibold text-[var(--text)]">
                {t('contact.message')}
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, message: event.target.value }))
                  }
                  className="mt-1.5 w-full rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                />
                {errors.message ? (
                  <span className="mt-1 block text-xs text-[var(--accent-text)]">
                    {errors.message}
                  </span>
                ) : null}
              </label>
              <Button type="submit" disabled={sending}>
                {sending ? t('contact.sending') : t('common.sendMessage')}
              </Button>
              {formError ? (
                <p className="text-sm text-red-400">{formError}</p>
              ) : null}
              <AnimatePresence>
                {sent ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-[var(--accent-text)]"
                  >
                    <CheckCircle2 size={18} /> {t('contact.success')}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </form>
          </Reveal>
          <Reveal delay={0.08} className="overflow-hidden rounded-[22px] sm:rounded-[28px] lg:sticky lg:top-28">
            <img
              src={consultantReview}
              alt="Travel consultants reviewing a journey plan together"
              className="aspect-[4/3] w-full object-cover lg:aspect-[3/4]"
            />
          </Reveal>
        </div>
      </section>
    </main>
  )
}
