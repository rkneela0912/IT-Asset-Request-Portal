import { type ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './Layout.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-layout">
      <Navbar />
      <main className="site-main" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
