import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from '@/components/ui/SectionHeading'
import GreenShape from '@/components/brand/GreenShape'
import { useCompanyContent } from '@/hooks/useCompanyContent'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
  const { management } = useCompanyContent()
  const lineRef = useRef(null)
  const wrapRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!lineRef.current || !wrapRef.current || reduced) return undefined
    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 70%',
          end: 'bottom 55%',
          scrub: true,
        },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  return (
    <section id="team" className="section-pad scroll-mt-28 bg-[var(--bg)]">
      <div className="container-shell grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="min-w-0">
          <SectionHeading
            eyebrow={management.eyebrow}
            title={management.title}
          />
          <div className="space-y-4 text-[0.95rem] text-[var(--text-muted)] sm:text-base">
            {management.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>

        <div ref={wrapRef} className="relative ps-6 sm:ps-8">
          <div
            ref={lineRef}
            className="absolute start-2 top-0 h-full w-0.5 origin-top bg-[var(--accent)]"
            aria-hidden="true"
          />
          <ol className="space-y-6">
            {management.timeline.map((item) => (
              <li key={item.title} className="relative">
                <span className="absolute -start-[1.65rem] top-1">
                  <GreenShape size={12} />
                </span>
                <div className="surface rounded-[22px] p-5">
                  <h3 className="font-display text-lg font-bold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[var(--text-muted)]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
