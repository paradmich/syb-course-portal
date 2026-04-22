import Link from 'next/link'

const links = {
  Programs: [
    { label: 'Channel Your Voice & Message',      href: '/courses/channel-your-voice' },
    { label: 'Build Your Signature Course',        href: '/courses/build-your-signature-course' },
    { label: 'Build Your Virtual Summit',          href: '/courses/build-your-virtual-summit' },
    { label: 'Hawaii Retreat',                     href: '/courses/voice-activation-retreat-hawaii' },
    { label: 'Santa Fe Retreat',                   href: '/courses/writing-retreat-santa-fe' },
  ],
  Company: [
    { label: 'About Michele',   href: '/#about' },
    { label: 'Read the Book',   href: '/#book' },
    { label: 'All Programs',    href: '/courses' },
    { label: 'My Dashboard',    href: '/dashboard' },
  ],
  Legal: [
    { label: 'Privacy Policy',  href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy',   href: '/refunds' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#1C0805' }} className="mt-24">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(184,136,42,0.15)' }}>

          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-2xl font-light mb-3" style={{ color: '#E8D0B8' }}>
              Sell Your Brilliance
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(232,208,184,0.45)' }}>
              Find your voice. Structure your ideas. Build an ecosystem where everything you know compounds into influence.
            </p>
            <div className="mt-6 flex gap-5">
              {['IG', 'LI', 'FB'].map(s => (
                <a key={s} href="#"
                  className="text-xs tracking-[0.18em] uppercase text-parchment/35 hover:text-gold transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs tracking-[0.18em] uppercase mb-4" style={{ color: '#B8882A' }}>
                {group}
              </h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href}
                      className="text-sm text-parchment/55 hover:text-gold transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: 'rgba(232,208,184,0.25)' }}>
            © {new Date().getFullYear()} Sell Your Brilliance. All rights reserved.
          </p>
          <a href="mailto:hello@sellyourbrilliance.com"
            className="text-xs text-parchment/25 hover:text-gold transition-colors">
            hello@sellyourbrilliance.com
          </a>
        </div>
      </div>
    </footer>
  )
}
