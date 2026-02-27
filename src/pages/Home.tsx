import { Link } from 'react-router-dom'
import './Home.css'

const announcements = [
  { id: 1, date: 'Feb 24', text: 'New MacBook Pro M4 models now available in the catalog.' },
  { id: 2, date: 'Feb 20', text: 'Peripheral requests under $150 now auto-approved within 24h.' },
  { id: 3, date: 'Feb 15', text: 'Software licenses for Adobe Creative Cloud have been renewed.' },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-text animate-in">
            <span className="hero-eyebrow">Enterprise IT Portal</span>
            <h1 id="hero-heading" className="hero-heading">
              Request &amp; manage<br />your IT assets
            </h1>
            <p className="hero-description">
              Browse the catalog, submit requests, and track approvals — all in one place.
              Fast, transparent, and built for enterprise teams.
            </p>
            <div className="hero-actions">
              <Link to="/request" className="btn btn-primary">
                Submit a Request
              </Link>
              <Link to="/catalog" className="btn btn-secondary">
                Browse Catalog
              </Link>
            </div>
          </div>
          <div className="hero-image animate-in" style={{ animationDelay: '0.15s' }}>
            <img
              src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&h=480&fit=crop"
              alt="Clean enterprise IT workspace with monitors and peripherals"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* Quick-action cards */}
      <section className="quick-actions" aria-labelledby="quick-heading">
        <div className="container">
          <h2 id="quick-heading" className="section-title">Get started</h2>
          <div className="quick-grid">
            <Link to="/catalog" className="quick-card card animate-in" aria-label="Browse Asset Catalog">
              <div className="quick-card-icon quick-card-icon--blue" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="2" width="8" height="8" rx="2" fill="currentColor" opacity="0.9"/>
                  <rect x="12" y="2" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
                  <rect x="2" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
                  <rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.3"/>
                </svg>
              </div>
              <h3 className="quick-card-title">Browse Catalog</h3>
              <p className="quick-card-desc">Explore available laptops, monitors, peripherals, and software licenses.</p>
              <span className="quick-card-cta" aria-hidden="true">View catalog →</span>
            </Link>

            <Link to="/request" className="quick-card card animate-in" aria-label="Submit a new IT asset request">
              <div className="quick-card-icon quick-card-icon--green" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="11" y1="7" x2="11" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="7" y1="11" x2="15" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="quick-card-title">Submit Request</h3>
              <p className="quick-card-desc">Fill out a request form with asset type, quantity, and business justification.</p>
              <span className="quick-card-cta" aria-hidden="true">Start request →</span>
            </Link>

            <Link to="/status" className="quick-card card animate-in" aria-label="Track your request status">
              <div className="quick-card-icon quick-card-icon--amber" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <polyline points="11,6 11,11 14,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="quick-card-title">Track My Requests</h3>
              <p className="quick-card-desc">Check the status of your submitted requests and view approval history.</p>
              <span className="quick-card-cta" aria-hidden="true">View status →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="stats-strip" aria-label="Portal statistics">
        <div className="container stats-grid">
          <div className="stat-item">
            <span className="stat-value mono">1,247</span>
            <span className="stat-label">Requests this year</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-value mono">94%</span>
            <span className="stat-label">Approval rate</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-value mono">2.4d</span>
            <span className="stat-label">Avg. fulfillment time</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-value mono">86</span>
            <span className="stat-label">Assets in catalog</span>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="announcements" aria-labelledby="announce-heading">
        <div className="container">
          <h2 id="announce-heading" className="section-title">Announcements</h2>
          <div className="announce-list">
            {announcements.map(a => (
              <div key={a.id} className="announce-item animate-in">
                <span className="announce-date mono">{a.date}</span>
                <p className="announce-text">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
