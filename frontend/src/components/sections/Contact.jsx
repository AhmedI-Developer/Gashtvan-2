import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, MapPin, Mail, Phone, Clock } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { site } from '@/config/site'

const initial = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email required'
    if (!form.phone.trim()) next.phone = 'Phone is required'
    if (form.message.trim().length < 10) next.message = 'Please share a bit more detail'
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
            eyebrow="Contact"
            title="Let’s plan your next journey"
            description="Share a season, destination, or corporate brief — we typically reply within one business day."
          />

          <form
            onSubmit={onSubmit}
            className="surface space-y-4 rounded-[22px] p-4 sm:rounded-[28px] sm:p-6 md:p-8"
            noValidate
          >
            {[
              { name: 'name', label: 'Name', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'phone', label: 'Phone', type: 'tel' },
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
              Message
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

            <Button type="submit">Send message</Button>

            <AnimatePresence>
              {sent ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-[var(--accent-text)]"
                >
                  <CheckCircle2 size={18} /> Message prepared — thank you.
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
                    <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block hover:text-[var(--accent)]">
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

          <div
            className="flex min-h-[200px] items-end rounded-[22px] border border-[var(--border)] bg-[var(--surface-2)] p-4 sm:min-h-[240px] sm:rounded-[28px] sm:p-5"
            style={{
              backgroundImage:
                'linear-gradient(rgba(4,32,58,0.55), rgba(4,32,58,0.75)), url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=70)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <p className="rounded-[18px] bg-white/10 px-4 py-3 text-sm text-white backdrop-blur">
              Map placeholder — Empire Business Tower, 100m Road, Erbil
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
