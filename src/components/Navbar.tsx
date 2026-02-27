import { NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-brand" aria-label="IT Asset Request Portal home">
          <svg className="navbar-logo" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="6" fill="var(--color-primary)" />
            <rect x="6" y="8" width="10" height="7" rx="1.5" fill="white" />
            <rect x="8" y="17" width="6" height="1.5" rx="0.75" fill="white" opacity="0.7" />
            <rect x="18" y="8" width="4" height="4" rx="1" fill="white" opacity="0.6" />
            <rect x="18" y="14" width="4" height="1.5" rx="0.75" fill="white" opacity="0.6" />
            <rect x="18" y="17" width="4" height="1.5" rx="0.75" fill="white" opacity="0.4" />
          </svg>
          <span className="navbar-brand-text">IT Asset Portal</span>
        </NavLink>

        <nav className="navbar-nav" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
          >
            Asset Catalog
          </NavLink>
          <NavLink
            to="/request"
            className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
          >
            Submit Request
          </NavLink>
          <NavLink
            to="/status"
            className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
          >
            My Requests
          </NavLink>
        </nav>

        <div className="navbar-end">
          <NavLink
            to="/admin"
            className={({ isActive }) => `navbar-admin-link${isActive ? ' navbar-admin-link--active' : ''}`}
            aria-label="IT Admin Dashboard"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path d="M7.5 1a6.5 6.5 0 100 13A6.5 6.5 0 007.5 1zM5.5 5.5a2 2 0 114 0 2 2 0 01-4 0zm2 8.4A5.48 5.48 0 012.1 10a4.5 4.5 0 0110.8 0 5.48 5.48 0 01-5.4 3.9z" fill="currentColor" />
            </svg>
            Admin
          </NavLink>
        </div>
      </div>
    </header>
  )
}
