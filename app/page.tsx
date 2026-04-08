import Link from 'next/link'
import Image from 'next/image'
import { courses, getFeaturedCourses } from '@/lib/courses'
import CourseCard from '@/components/CourseCard'
import { ArrowRight, Star, BookOpen, Users, Award } from 'lucide-react'

const stats = [
  { icon: Users, value: '2,000+', label: 'Students Enrolled' },
  { icon: BookOpen, value: '3', label: 'Signature Courses' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
  { icon: Award, value: '5', label: 'Years of Programs' },
]

const testimonials = [
  {
    quote: "Michele's Voice & Message course gave me the clarity I'd been searching for for years. I finally know what I stand for — and more importantly, how to say it.",
    name: 'Sarah K.',
    title: 'Executive Coach',
    avatar: 'SK',
  },
  {
    quote: "I launched my signature course six weeks after completing Build Your Signature Course. It made $22K in the first week. This framework works.",
    name: 'Danielle R.',
    title: 'Nutritional Therapist',
    avatar: 'DR',
  },
  {
    quote: "The Hawaii retreat changed everything. I left with a body of work, a book outline, and 11 new best friends. Worth every penny.",
    name: 'Joanna M.',
    title: 'Leadership Consultant',
    avatar: 'JM',
  },
]

export default function HomePage() {
  const featured = getFeaturedCourses()

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-cream">
        {/* Gold orb */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #C9973A 0%, transparent 70%)' }}
        />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-5">Sell Your Brilliance — with Michele Parad</p>
            <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight text-ink mb-6">
              Build the inner architecture that holds your full body of work.
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-8 max-w-lg">
              Find your voice. Structure your ideas. Build an ecosystem where everything you know compounds into influence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/courses" className="btn-primary">
                Explore Programs <ArrowRight size={16} />
              </Link>
              <Link href="/#about" className="btn-outline">
                Meet Michele
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative hidden md:block">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Michele Parad"
                fill
                className="object-cover"
                priority
              />
              {/* Gold border accent */}
              <div className="absolute inset-0 ring-1 ring-gold/30 rounded-lg pointer-events-none" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-line">
              <p className="text-2xl font-serif font-light text-gold">2,000+</p>
              <p className="text-xs text-muted mt-0.5">Brilliant humans enrolled</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-line bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon size={20} className="mx-auto mb-2 text-gold" />
                <p className="font-serif text-3xl font-light text-ink">{value}</p>
                <p className="text-xs text-muted mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label mb-3">Programs & Experiences</p>
              <h2 className="font-serif text-4xl font-light text-ink">
                Choose your transformation.
              </h2>
            </div>
            <Link href="/courses" className="hidden md:flex items-center gap-1 text-sm text-gold hover:text-gold-dark transition-colors">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(course => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/courses" className="btn-outline">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ── id="about" ── */}
      <section id="about" className="py-24 px-6 bg-white border-y border-line">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden max-w-md">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="Michele Parad"
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Gold accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/30 rounded-lg pointer-events-none hidden md:block" />
          </div>

          <div>
            <p className="section-label mb-4">About Michele</p>
            <h2 className="font-serif text-4xl font-light text-ink leading-snug mb-6">
              Your guide to building a body of work that outlasts any algorithm.
            </h2>
            <blockquote className="border-l-2 border-gold pl-4 text-muted italic text-lg leading-relaxed mb-6">
              "My brain moved across disciplines like a hummingbird in a field of flowers. To me, it felt natural. To everyone else, it looked scattered."
            </blockquote>
            <p className="text-muted leading-relaxed mb-6">
              Michele Parad is a message architect, author, and educator who helps established experts find the through-line of their work and build the language, systems, and influence ecosystem to carry it into the world.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Through her S.E.L.L. Framework, her courses, retreats, and coaching, she has helped over 2,000 thought leaders claim their voice and build businesses that reflect the full depth of who they are.
            </p>
            <Link href="/courses" className="btn-gold">
              Work with Michele <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Student Stories</p>
            <h2 className="font-serif text-4xl font-light text-ink">
              What happens when you sell your brilliance.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white border border-line rounded-lg p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#C9973A" className="text-gold" />
                  ))}
                </div>
                <p className="text-muted leading-relaxed text-sm mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-dim flex items-center justify-center text-xs font-medium text-gold-dark">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK SECTION ── id="book" ── */}
      <section id="book" className="py-24 px-6 bg-ink text-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>The Book</p>
            <h2 className="font-serif text-4xl font-light text-cream leading-snug mb-6">
              Read the book that started the movement.
            </h2>
            <p className="text-cream/60 leading-relaxed mb-8">
              <em>Sell Your Brilliance</em> is the foundational text for experts who want to stop playing small and start building the body of work they were born to create. Available everywhere books are sold.
            </p>
            <Link href="#" className="btn-gold">
              Get the Book <ArrowRight size={16} />
            </Link>
          </div>
          <div className="relative flex justify-center">
            <div className="w-56 h-72 bg-gold/20 rounded border border-gold/30 flex items-center justify-center shadow-2xl">
              <p className="font-serif text-gold text-center px-4 leading-tight">
                Sell Your<br />Brilliance<br /><span className="text-sm text-gold/60 mt-2 block">Michele Parad</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6 bg-gold-dim border-y border-gold/20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-4">Ready to Begin?</p>
          <h2 className="font-serif text-4xl font-light text-ink mb-6">
            You don't have a visibility problem.<br />You have an identity expression problem.
          </h2>
          <p className="text-muted mb-8">Let's fix that together.</p>
          <Link href="/courses" className="btn-primary">
            Explore All Programs <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
