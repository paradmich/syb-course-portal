'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

const nav = [
  {
    label: 'Courses',
    href: '/courses',
    children: [
      { label: 'Channel Your Voice & Message', href: '/courses/channel-your-voice' },
      { label: 'Build Your Signature Course', href: '/courses/build-your-signature-course' },
      { label: 'Build Your Virtual Summit', href: '/courses/build-your-virtual-summit' },
    ],
  },
  {
    label: 'Retreats',
    href: '/courses?category=retreat',
    children: [
      { label: 'Voice Activation Retreat — Hawaii', href: '/courses/voice-activation-retreat-hawaii' },
      { label: 'Writing Retreat — Santa Fe', href: '/courses/writing-retreat-santa-fe' },
    ],
  },
  { label: 'About', href: '/#about' },
  { label: 'Read the Book', href: '/#book' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-sm border-b border-line shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-col gap-1 group">
          <span className="font-serif text-xl font-light tracking-wide text-ink group-hover:text-gold transition-colors">
            Sell Your Brilliance
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map(item => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm text-ink/80 hover:text-ink transition-colors py-2"
              >
                {item.label}
                {item.children && <ChevronDown size={14} className="opacity-50" />}
              </Link>

              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-line rounded-lg shadow-lg overflow-hidden">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 text-sm text-ink/80 hover:bg-gold-dim hover:text-ink transition-colors border-b border-line last:border-0"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-muted hover:text-ink transition-colors">
            Sign In
          </Link>
          <Link href="/dashboard" className="btn-primary text-sm px-4 py-2">
            My Courses
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-ink"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-line px-6 py-4 space-y-1">
          {nav.map(item => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block py-2 text-sm font-medium text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 space-y-1 mb-2">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-1.5 text-sm text-muted hover:text-gold transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 border-t border-line flex gap-3">
            <Link href="/login" className="btn-outline text-sm flex-1 justify-center" onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm flex-1 justify-center" onClick={() => setMobileOpen(false)}>
              My Courses
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
