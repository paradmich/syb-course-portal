import { courses } from '@/lib/courses'
import { auth } from '@/lib/auth'
import CourseCard from '@/components/CourseCard'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { headers } from 'next/headers'

export const metadata = {
  title: 'My Courses — Sell Your Brilliance',
  description: 'Your learning library. Access enrolled courses and discover new ones.',
}

export default async function CoursesPage() {
  // Read the logged-in user's purchased courses from the session
  const session = await auth.api.getSession({ headers: headers() }).catch(() => null)
  const purchased: string[] = JSON.parse(
    (session?.user as any)?.purchasedCourses || '[]'
  )

  const allCourses = courses.filter(c => c.category === 'course')

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="section-label mb-3">My Courses</p>
          <h1 className="font-serif text-5xl font-light text-maroon leading-tight mb-4">
            Your learning library.
          </h1>
          <p className="text-stone text-lg leading-relaxed">
            Courses you&apos;ve enrolled in are ready to continue. Unlock more to expand your brilliance.
          </p>
        </div>

        {/* Course grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {allCourses.map(course => {
            const enrolled = purchased.includes(course.slug)
            return enrolled
              ? <CourseCard key={course.slug} course={course} enrolled />
              : <CourseCard key={course.slug} course={course} locked />
          })}
        </div>

        {/* Retreat CTA */}
        <div className="bg-dark rounded-sm p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="section-label mb-3" style={{ color: 'rgba(184,136,42,0.7)' }}>
              Want to go deeper?
            </p>
            <h3 className="font-serif text-3xl font-light text-parchment mb-4 leading-snug">
              Continue your transformation in person. Join one of our upcoming retreats.
            </h3>
            <p className="text-parchment/45 leading-relaxed">
              Small group, immersive experiences in Hawaii and Santa Fe — where the work you&apos;ve started in these courses becomes a fully embodied reality.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link href="/#retreats" className="btn-gold">
              View Upcoming Retreats <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
