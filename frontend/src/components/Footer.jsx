import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/Gashtvan.svg" alt="" width="36" height="27" />
          <div>
            <strong>Gashtvan</strong>
            <p>Routes worth taking — planned with care, walked with wonder.</p>
          </div>
        </div>

        <div className="footer__meta">
          <Link to="/destinations">Destinations</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <span>© {new Date().getFullYear()} Gashtvan</span>
        </div>
      </div>
    </footer>
  )
}
