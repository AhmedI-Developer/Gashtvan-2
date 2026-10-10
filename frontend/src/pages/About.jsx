export default function About() {
  return (
    <main className="page page--split">
      <header className="page__header">
        <p className="eyebrow">About</p>
        <h1>Built around the mark of the journey</h1>
        <p>
          Gashtvan began as a simple idea: travel should feel like a continuous
          line — not a scatter of bookings and rushed photos.
        </p>
      </header>

      <div className="about-grid">
        <aside className="about-mark" aria-hidden="true">
          <div className="about-mark__panel">
            <img src="/Gashtvan.svg" alt="" />
          </div>
        </aside>

        <div className="about-copy">
          <section>
            <h2>What the logo holds</h2>
            <p>
              The deep navy is the path — steady, grounded, sure of where it
              bends. The lime accent is the spark of discovery: the turn you
              did not expect, the view that stops the conversation.
            </p>
          </section>

          <section>
            <h2>How we work</h2>
            <p>
              We research routes with locals, test timing on the ground, and
              write guides that respect both the landscape and your energy.
              Details matter: when the light is best, where to pause, what to
              leave for another day.
            </p>
          </section>

          <section>
            <h2>Who it is for</h2>
            <p>
              Travelers who want direction without a rigid script — couples,
              friends, and solo wanderers who prefer a thoughtful map over a
              crowded itinerary.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
