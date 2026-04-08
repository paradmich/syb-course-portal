import Link from 'next/link'

const links = {
  Programs: [
    { label: 'Channel Your Voice & Message', href: '/courses/channel-your-voice' },
    { label: 'Build Your Signature Course', href: '/courses/build-your-signature-course' },
    { label: 'Build Your Virtual Summit', href: '/courses/build-your-virtual-summit' },
    { label: 'Hawaii Retreat', href: '/courses/voice-activation-retreat-hawaii' },
    { label: 'Santa Fe Retreat', href: '/courses/writing-retreat-santa-fe' },
  ],
  Company: [
    { label: 'About Michele', href: '/#about' },
    { label: 'Read the Book', href: '/#book' },
    { label: 'All Courses', href: '/courses' },
    { label: 'My Dashboard', href: '/dashboard' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refunds' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/80 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-2xl font-light text-cream mb-3">Sell Your Brilliance</p>
            <p className="text-sm text-cream/50 leading-relaxed">
              Find your voice. Structure your ideas. Build an ecosystem where everything you know compounds into influence.
            </p>
            <div className="mt-6 flex gap-4">
              {/* Social icons — link to your actual accounts */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-gold transition-colors text-xs tracking-widest uppercase">IG</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-gold transition-colors text-xs tracking-widest uppercase">LI</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-cream/40 hover:text-gold transition-colors text-xs tracking-widest uppercase">FB</a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-cream/40 mb-4">{group}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-cream/60 hover:text-gold transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/30">
            © {new Date().getFullYear()} Sell Your Brilliance. All rights reserved.
          </p>
          <p className="text-xs text-cream/30">
            Michele Parad · <a href="mailto:hello@sellyourbrilliance.com" className="hover:text-gold transition-colors">hello@sellyourbrilliance.com</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
