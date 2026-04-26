'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(245,232,220,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: scrolled ? '1px solid #E0CFC4' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/courses" className="font-serif text-xl font-light tracking-wide text-maroon hover:text-gold transition-colors">
          Sell Your Brilliance
        </Link>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login"
            className="text-xs tracking-[0.14em] uppercase text-maroon/60 hover:text-gold transition-colors">
            Sign In
          </Link>
          <Link href="/dashboard" className="btn-gold text-xs px-5 py-2.5">
            My Dashboard
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-maroon" onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border px-6 py-4 space-y-1"
          style={{ background: '#F5E8DC' }}>
          <div className="flex gap-3 pt-1">
            <Link href="/login" className="btn-outline text-xs flex-1 justify-center py-2.5"
              onClick={() => setMobileOpen(false)}>Sign In</Link>
            <Link href="/dashboard" className="btn-gold text-xs flex-1 justify-center py-2.5"
              onClick={() => setMobileOpen(false)}>My Dashboard</Link>
          </div>
        </div>
      )}
    </header>
  )
}
