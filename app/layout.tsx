import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sell Your Brilliance — Courses & Programs with Michele Parad',
  description: 'Find your voice. Structure your ideas. Build an ecosystem where everything you know compounds into influence.',
  openGraph: {
    title: 'Sell Your Brilliance',
    description: 'Courses, retreats, and programs for established experts ready to amplify their impact.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
