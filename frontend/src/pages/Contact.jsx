export default function Contact() {
  return (
    <main className="page">
      <header className="page__header">
        <p className="eyebrow">Contact</p>
        <h1>Tell us where you want to go</h1>
        <p>
          Share a season, a region, or a feeling. We will help shape a route
          that fits your pace.
        </p>
      </header>

      <div className="contact">
        <form
          className="contact__form"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="5"
              placeholder="Where, when, and how you like to travel..."
              required
            />
          </label>
          <button className="btn btn--primary" type="submit">
            Send message
          </button>
        </form>

        <aside className="contact__aside">
          <div>
            <h2>Direct line</h2>
            <p>hello@gashtvan.travel</p>
            <p>+98 21 0000 0000</p>
          </div>
          <div>
            <h2>Studio hours</h2>
            <p>Saturday – Thursday</p>
            <p>10:00 – 18:00 (IRST)</p>
          </div>
          <div className="contact__note">
            <img src="/Gashtvan.svg" alt="" width="48" height="36" />
            <p>We usually reply within one business day.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
