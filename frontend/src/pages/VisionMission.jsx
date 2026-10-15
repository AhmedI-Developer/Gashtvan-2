import { Link } from 'react-router-dom'
import Seo from '@/components/layout/Seo'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import Reveal from '@/components/motion/Reveal'
import GreenShape from '@/components/brand/GreenShape'
import { company } from '@/content/company'
import globalNetwork from '@/assets/backgroundImage/Global_network.jpg'
import worldMap from '@/assets/backgroundImage/World_map.jpg'
import planeWing from '@/assets/backgroundImage/Left-wing-plane.jpg'
import kurdistanMountain from '@/assets/backgroundImage/Kurdistan-Mountain.jpg'

const statements = [
  {
    ...company.vision,
    kicker: 'Where we are going',
    image: worldMap,
    imageAlt: 'A world map marked with connected routes',
    imageFirst: false,
  },
  {
    ...company.mission,
    kicker: 'What we do every day',
    image: planeWing,
    imageAlt: 'Airplane wing above the clouds at sunset',
    imageFirst: true,
  },
]

export default function VisionMission() {
  return (
    <main>
      <Seo
        title="Vision & Mission"
        description="Gashtvan’s vision connects Erbil with the world. Our mission is precise, personalized travel — ticketing, MICE, tours, visas, and training."
        path="/vision"
      />

      <section className="relative min-h-[78svh] overflow-hidden text-white">
        <img
          src={globalNetwork}
          alt="Earth at night, linked by routes of light"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,32,58,0.45)_0%,rgba(4,32,58,0.72)_55%,rgba(4,32,58,0.92)_100%)]" />
        <div className="container-shell relative z-10 flex min-h-[78svh] flex-col justify-end pb-12 pt-28 sm:pb-16 sm:pt-32">
          <p className="eyebrow !text-[var(--accent)]">About Gashtvan</p>
          <h1 className="mt-3 max-w-3xl font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Vision & Mission
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            Two ideas guide every journey we plan. The vision is the future we
            are building from Erbil. The mission is the work we do for travelers
            and partners today.
          </p>
        </div>
      </section>

      <section className="container-shell -mt-8 grid gap-4 sm:-mt-10 sm:grid-cols-2">
        {statements.map((item) => (
          <a
            key={item.title}
            href={`#${item.title.toLowerCase()}`}
            className="surface rounded-[22px] p-5 transition hover:border-[var(--accent)] sm:rounded-[26px] sm:p-6"
          >
            <div className="mb-3 flex items-center gap-2">
              <GreenShape size={10} />
              <p className="eyebrow">{item.kicker}</p>
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--text)]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
              {item.body}
            </p>
          </a>
        ))}
      </section>

      {statements.map((item) => (
        <section
          key={item.title}
          id={item.title.toLowerCase()}
          className="section-pad scroll-mt-24"
        >
          <div className="container-shell grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <Reveal className={item.imageFirst ? 'lg:order-2' : undefined}>
              <p className="eyebrow">{item.kicker}</p>
              <h2 className="mt-3 font-display text-[1.75rem] font-bold tracking-tight text-[var(--text)] sm:text-4xl md:text-5xl">
                {item.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                {item.body}
              </p>
              <ul className="mt-6 space-y-3">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-[var(--text)]"
                  >
                    <GreenShape size={8} className="mt-2" />
                    <span className="text-sm leading-relaxed sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal
              delay={0.08}
              className={`overflow-hidden rounded-[22px] sm:rounded-[28px] ${
                item.imageFirst ? 'lg:order-1' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section-pad bg-[var(--bg-alt)]">
        <div className="container-shell">
          <SectionHeading
            eyebrow={company.coreValues.title}
            title="The standards behind both"
            description="Vision sets the direction. Mission sets the work. These values keep both honest."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {company.coreValues.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-5 sm:rounded-[26px] sm:p-6">
                  <h3 className="font-display text-xl font-bold text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 text-white sm:py-20">
        <img
          src={kurdistanMountain}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(4,32,58,0.72)]" />
        <div className="container-shell relative z-10 max-w-3xl text-center">
          <p className="eyebrow !text-[var(--accent)]">From Erbil, beyond boundaries</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to travel with that standard?
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/offers">View Offers</Button>
            <Button to="/contact" variant="ghost">
              Contact Us
            </Button>
          </div>
          <p className="mt-6 text-sm text-white/75">
            Or read the full{' '}
            <Link to="/company" className="font-semibold text-[var(--accent)] hover:underline">
              company profile
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
