import { Mail, Phone, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { site } from '@/config/site'

export default function InquirePanel({ offer }) {
  const { t } = useTranslation()
  const title = offer?.title || 'an offer'
  const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello Gashtvan, I'm inquiring about: ${title}`,
  )}`
  const mail = `mailto:${site.emails[1]}?subject=${encodeURIComponent(
    `Inquiry: ${title}`,
  )}&body=${encodeURIComponent(`Hello,\n\nI would like more information about ${title}.\n`)}`

  return (
    <aside className="space-y-3 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)] sm:rounded-[26px] sm:p-5 lg:sticky lg:top-24">
      <h2 className="font-display text-lg font-bold text-[var(--text)] sm:text-xl">
        {t('offers.inquireTitle')}
      </h2>
      <p className="text-sm text-[var(--text-muted)]">{t('offers.inquireLead')}</p>
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-[18px] bg-[var(--accent)] px-4 py-3 font-semibold text-[var(--navy)] transition hover:bg-[var(--accent-hover)]"
      >
        <MessageCircle size={18} /> {t('offers.whatsapp')}
      </a>
      <a
        href={`tel:${site.phones[0].replace(/\s/g, '')}`}
        className="flex items-center justify-center gap-2 rounded-[18px] border border-[var(--border)] px-4 py-3 font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
      >
        <Phone size={18} /> {t('offers.call')}
      </a>
      <a
        href={mail}
        className="flex items-center justify-center gap-2 rounded-[18px] border border-[var(--border)] px-4 py-3 font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
      >
        <Mail size={18} /> {t('offers.email')}
      </a>
    </aside>
  )
}
