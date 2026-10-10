import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main>
      <section className="hero" aria-label="Gashtvan">
        <div className="hero__media" aria-hidden="true" />
        <div className="hero__veil" aria-hidden="true" />

        <div className="hero__content">
          <h1 className="hero__brand">
            <img src="/Gashtvan.svg" alt="Gashtvan" />
          </h1>
          <p className="hero__headline">Travel shaped by the road ahead.</p>
          <p className="hero__lead">
            Curated routes, quiet stops, and local rhythm — so every journey
            feels intentional.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/destinations">
              Explore routes
            </Link>
            <Link className="btn btn--ghost" to="/about">
              Our story
            </Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="band__inner">
          <h2>How Gashtvan guides you</h2>
          <p className="band__intro">
            Less noise, more direction. We map journeys around time, terrain,
            and the moments that make a place memorable.
          </p>

          <ul className="pillars">
            <li>
              <span className="pillars__mark">01</span>
              <h3>Route-first planning</h3>
              <p>
                Day-by-day paths with realistic pacing, not packed checklists.
              </p>
            </li>
            <li>
              <span className="pillars__mark">02</span>
              <h3>Local texture</h3>
              <p>
                Markets, viewpoints, and detours chosen with people who know
                the ground.
              </p>
            </li>
            <li>
              <span className="pillars__mark">03</span>
              <h3>Calm logistics</h3>
              <p>
                Clear timing, lodging notes, and transport cues so you stay
                present on the road.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}
