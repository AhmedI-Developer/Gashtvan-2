import { MessageCircle } from 'lucide-react'
import { site } from '@/config/site'

export default function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="safe-bottom safe-end fixed z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)] shadow-[0_10px_30px_rgba(160,194,58,0.45)] transition hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] sm:h-14 sm:w-14"
    >
      <MessageCircle size={22} className="sm:hidden" />
      <MessageCircle size={24} className="hidden sm:block" />
    </a>
  )
}
