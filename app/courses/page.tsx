import { courses } from '@/lib/courses'
import CourseCard from '@/components/CourseCard'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'All Programs — Sell Your Brilliance',
  description: 'Courses, retreats, and programs for established experts ready to amplify their voice and impact.',
}

export default function CoursesPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const activeCategory: 'all' | 'course' | 'retreat' =
    searchParams.category === 'retreat' ? 'retreat'
    : searchParams.category === 'course' ? 'course'
    : 'all'
  const filtered = activeCategory === 'all'
    ? courses
    : courses.filter(c => c.category === activeCategory)

  const online = courses.filter(c => c.category === 'course')
  const retreats = courses.filter(c => c.category === 'retreat')

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="section-label mb-3">All Programs</p>
          <h1 className="font-serif text-5xl font-light text-ink leading-tight mb-4">
            Choose your path.
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            Whether you want to find your voice, build your course, or go deep in an immersive retreat — there's a container here for your next evolution.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-12">
          {(['all', 'course', 'retreat'] as const).map(cat => (
            <Link
              key={cat}
              href={cat === 'all' ? '/courses' : `/courses?category=${cat}`}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                (cat === 'all' && activeCategory === 'all') || cat === activeCategory
                  ? 'bg-ink text-cream'
                  : 'bg-white border border-line text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {cat === 'all' ? 'All Programs' : cat === 'course' ? 'Online Courses' : 'Retreats'}
            </Link>
          ))}
        </div>

        {/* Online Courses */}
        {(activeCategory === 'all' || activeCategory === 'course') && (
          <section className="mb-20">
            {activeCategory === 'all' && (
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl font-light text-ink">Online Courses</h2>
                <span className="section-label">{online.length} programs</span>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === 'all' ? online : filtered).map(course => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Retreats */}
        {(activeCategory === 'all' || activeCategory === 'retreat') && (
          <section>
            {activeCategory === 'all' && (
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-serif text-3xl font-light text-ink">Immersive Retreats</h2>
                  <p className="text-sm text-muted mt-1">Small group, in-person experiences</p>
                </div>
                <span className="section-label">{retreats.length} events</span>
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              {(activeCategory === 'all' ? retreats : filtered).map(course => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Bundle CTA */}
        <div className="mt-20 bg-ink rounded-lg p-10 md:p-14 text-center">
          <p className="section-label mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Not sure where to start?</p>
          <h3 className="font-serif text-3xl font-light text-cream mb-4">
            Start with Channel Your Voice.
          </h3>
          <p className="text-cream/60 mb-8 max-w-md mx-auto">
            It's the foundation everything else is built on. Most students take it first — and many say it's the most transformative work they've ever done.
          </p>
          <Link href="/courses/channel-your-voice" className="btn-gold">
            Start Here <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  )
}
