import Link from 'next/link'
import Image from 'next/image'
import { enrolledCourses, courses } from '@/lib/courses'
import { ArrowRight, BookOpen, Clock, Award, Play } from 'lucide-react'

export const metadata = {
  title: 'My Dashboard — Sell Your Brilliance',
}

export default function DashboardPage() {
  const unenrolled = courses.filter(
    c => !enrolledCourses.find(e => e.course.slug === c.slug)
  )

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="section-label mb-2">Welcome back</p>
            <h1 className="font-serif text-4xl font-light text-maroon">
              Your learning journey
            </h1>
          </div>
          <Link href="/courses" className="btn-outline text-sm hidden md:flex">
            Browse more programs <ArrowRight size={15} />
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {[
            { icon: BookOpen, label: 'Enrolled', value: enrolledCourses.length },
            { icon: Clock,    label: 'Hours learned', value: '18h' },
            { icon: Award,    label: 'Completed', value: 0 },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white border border-border rounded-lg p-5 text-center">
              <Icon size={20} className="mx-auto mb-2 text-gold" />
              <p className="font-serif text-3xl font-light text-maroon">{value}</p>
              <p className="text-xs text-stone mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* My Courses */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-light text-maroon mb-6">Continue learning</h2>
          <div className="space-y-4">
            {enrolledCourses.map(({ course, progress, lastLesson, lastModule, enrolledAt }) => (
              <div key={course.slug} className="bg-white border border-border rounded-lg overflow-hidden flex flex-col md:flex-row">
                {/* Thumbnail */}
                <div className="relative w-full md:w-52 h-36 md:h-auto shrink-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-dark/30 flex items-center justify-center">
                    <Link
                      href={`/learn/${course.slug}/${lastLesson}`}
                      className="w-11 h-11 rounded-full bg-white/25 border border-white/50 flex items-center justify-center hover:bg-white/40 transition-colors"
                    >
                      <Play size={18} className="text-white ml-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-serif text-xl font-light text-maroon">{course.title}</h3>
                        <p className="text-xs text-stone mt-0.5">
                          Last watched: <span className="text-maroon">{lastModule}</span>
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gold shrink-0">{progress}%</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="progress-bar mb-3">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-stone">Enrolled {enrolledAt}</p>
                      <Link
                        href={`/learn/${course.slug}/${lastLesson}`}
                        className="text-xs font-medium text-gold hover:text-gold-dark transition-colors flex items-center gap-1"
                      >
                        Continue <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unenrolled courses */}
        {unenrolled.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-light text-maroon">Explore more programs</h2>
              <Link href="/courses" className="text-sm text-gold hover:text-gold-dark transition-colors flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unenrolled.slice(0, 3).map(course => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="bg-white border border-border rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {course.badge && (
                      <span className="absolute top-2 left-2 bg-gold text-maroon text-xs font-medium px-2 py-0.5 rounded">
                        {course.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base font-light text-maroon group-hover:text-gold transition-colors leading-snug mb-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-stone mb-3">{course.tagline}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg text-maroon">${course.price.toLocaleString()}</span>
                      <span className="text-xs text-gold">Enroll →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}
