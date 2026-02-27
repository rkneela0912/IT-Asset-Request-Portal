import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <span className="footer-copy">
          &copy; {new Date().getFullYear()} IT Asset Request Portal
        </span>
        <span className="footer-tagline">
          Powered by Power Pages
        </span>
      </div>
    </footer>
  )
}
