import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, MapPin, Mail, Phone, Clock, ExternalLink } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { site } from '@/config/site'

const initial = { name: '', email: '', phone: '', message: '' }

function mapEmbedSrc({ lat, lng }) {
  return `https://www.google.com/maps?q=${lat},${lng}&z=16&hl=en&output=embed`
}

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Required'
    if (!form.phone.trim()) next.phone = 'Required'
    if (form.message.trim().length < 10) next.message = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    console.info('Gashtvan contact stub', form)
    const mailto = `mailto:${site.emails[0]}?subject=${encodeURIComponent(
      `Inquiry from ${form.name}`,
    )}&body=${encodeURIComponent(
      `${form.message}\n\nPhone: ${form.phone}\nEmail: ${form.email}`,
    )}`
    window.location.href = mailto
    setSent(true)
    setForm(initial)
  }

  return (
    <section id="contact" className="section-pad bg-[var(--bg)]">
      <div className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="min-w-0">
          <SectionHeading
            eyebrow={t('contact.eyebrow')}
            title={t('contact.title')}
            description={t('contact.description')}
          />

          <form
            onSubmit={onSubmit}
            className="surface space-y-4 rounded-[22px] p-4 sm:rounded-[28px] sm:p-6 md:p-8"
            noValidate
          >
            {[
              { name: 'name', label: t('contact.name'), type: 'text' },
              { name: 'email', label: t('contact.email'), type: 'email' },
              { name: 'phone', label: t('contact.phone'), type: 'tel' },
            ].map((field) => (
              <label key={field.name} className="block text-sm font-semibold text-[var(--text)]">
                {field.label}
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field.name]: e.target.value }))
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
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="mt-1.5 w-full rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
              />
              {errors.message ? (
                <span className="mt-1 block text-xs text-[var(--accent-text)]">
                  {errors.message}
                </span>
              ) : null}
            </label>

            <Button type="submit">{t('common.sendMessage')}</Button>

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
        </div>

        <aside className="space-y-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="rounded-[22px] bg-[var(--navy)] p-5 text-white sm:rounded-[28px] sm:p-6 md:p-8">
            <ul className="space-y-5">
              <li className="flex gap-3">
                <Phone className="mt-0.5 shrink-0 text-[var(--accent)]" size={18} />
                <div>
                  {site.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, '')}`}
                      className="block hover:text-[var(--accent)]"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 shrink-0 text-[var(--accent)]" size={18} />
                <div>
                  {site.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="block hover:text-[var(--accent)]">
                      {e}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-[var(--accent)]" size={18} />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 shrink-0 text-[var(--accent)]" size={18} />
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] sm:rounded-[28px]">
            <div className="relative aspect-[4/3] min-h-[220px] w-full sm:min-h-[260px]">
              <iframe
                title={site.location.label}
                src={mapEmbedSrc(site.location)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] px-4 py-3">
              <p className="text-sm font-semibold text-[var(--text)]">
                {site.location.label}
              </p>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-text)] transition hover:underline"
              >
                {t('contact.openMap')}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
