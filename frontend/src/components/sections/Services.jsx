import { useRef, useState } from 'react'
import {
  Plane,
  Users,
  Hotel,
  Briefcase,
  FileCheck,
  GraduationCap,
} from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Modal from '@/components/ui/Modal'
import { company } from '@/content/company'
import { cn } from '@/lib/cn'

const icons = { Plane, Users, Hotel, Briefcase, FileCheck, GraduationCap }

function TiltCard({ service, onOpen }) {
  const ref = useRef(null)
  const Icon = icons[service.icon] || Plane

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const rx = ((y - r.height / 2) / r.height) * -8
    const ry = ((x - r.width / 2) / r.width) * 8
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`
    el.style.setProperty('--gx', `${x}px`)
    el.style.setProperty('--gy', `${y}px`)
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform =
      'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <button
      type="button"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen(service)}
      className={cn(
        'tilt-card group relative overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 text-start shadow-[var(--shadow)] transition-[border-color,box-shadow,transform] duration-300 sm:rounded-[26px] sm:p-6',
        'hover:border-[var(--accent)] hover:shadow-[0_16px_40px_rgba(160,194,58,0.18)]',
      )}
      style={{
        backgroundImage:
          'radial-gradient(220px circle at var(--gx, 50%) var(--gy, 50%), var(--accent-soft), transparent 55%)',
      }}
    >
      <span className="mb-4 inline-flex rounded-[18px] border border-[var(--border)] bg-[var(--surface-2)] p-3 text-[var(--text)] transition group-hover:border-[var(--accent)] group-hover:text-[var(--accent-text)]">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <h3 className="font-display text-xl font-bold text-[var(--text)]">
        {service.title}
      </h3>
      <p className="mt-2 text-[var(--text-muted)]">{service.summary}</p>
      <span className="mt-4 inline-flex text-sm font-semibold text-[var(--accent-text)]">
        Read more →
      </span>
    </button>
  )
}

export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <section id="services" className="section-pad bg-[var(--bg)]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Services"
          title="Expertise across every mile"
          description="Six pillars of travel care — open a card for the full description."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {company.services.map((service) => (
            <TiltCard key={service.id} service={service} onOpen={setActive} />
          ))}
        </div>
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.title}
      >
        {active ? (
          <p className="text-[var(--text-muted)] leading-relaxed">{active.body}</p>
        ) : null}
      </Modal>
    </section>
  )
}
