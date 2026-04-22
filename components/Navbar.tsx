'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const nav = [
  {
    label: 'Courses',
    href: '/courses',
    children: [
      { label: 'Channel Your Voice & Message',  href: '/courses/channel-your-voice' },
      { label: 'Build Your Signature Course',   href: '/courses/build-your-signature-course' },
      { label: 'Build Your Virtual Summit',     href: '/courses/build-your-virtual-summit' },
    ],
  },
  {
    label: 'Retreats',
    href: '/courses?category=retreat',
    children: [
      { label: 'Voice Activation Retreat — Hawaii', href: '/courses/voice-activation-retreat-hawaii' },
      { label: 'Writing Retreat — Santa Fe',        href: '/courses/writing-retreat-santa-fe' },
    ],
  },
  { label: 'About',         href: '/#about' },
  { label: 'Read the Book', href: '/#book' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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
        <Link href="/" className="font-serif text-xl font-light tracking-wide text-maroon hover:text-gold transition-colors">
          Sell Your Brilliance
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link href={item.href}
                className="flex items-center gap-1 text-xs tracking-[0.14em] uppercase text-maroon/70 hover:text-gold transition-colors py-2">
                {item.label}
                {item.children && <ChevronDown size={12} className="opacity-50" />}
              </Link>

              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-0 w-72 bg-blush border border-border shadow-lg overflow-hidden"
                  style={{ borderRadius: '2px' }}>
                  {item.children.map(child => (
                    <Link key={child.href} href={child.href}
                      className="block px-5 py-3 text-xs text-maroon/80 hover:bg-gold-dim hover:text-gold transition-colors border-b border-border last:border-0 tracking-wide">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login"
            className="text-xs tracking-[0.14em] uppercase text-maroon/60 hover:text-gold transition-colors">
            Sign In
          </Link>
          <Link href="/dashboard" className="btn-gold text-xs px-5 py-2.5">
            My Courses
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
          {nav.map(item => (
            <div key={item.label}>
              <Link href={item.href}
                className="block py-2 text-xs tracking-[0.14em] uppercase text-maroon font-medium"
                onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 space-y-1 mb-2">
                  {item.children.map(child => (
                    <Link key={child.href} href={child.href}
                      className="block py-1.5 text-xs text-stone hover:text-gold transition-colors tracking-wide"
                      onClick={() => setMobileOpen(false)}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 border-t border-border flex gap-3">
            <Link href="/login" className="btn-outline text-xs flex-1 justify-center py-2.5"
              onClick={() => setMobileOpen(false)}>Sign In</Link>
            <Link href="/dashboard" className="btn-gold text-xs flex-1 justify-center py-2.5"
              onClick={() => setMobileOpen(false)}>My Courses</Link>
          </div>
        </div>
      )}
    </header>
  )
}
