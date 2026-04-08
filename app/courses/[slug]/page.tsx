import { getCourse, courses } from '@/lib/courses'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Clock, Users, BookOpen, Award, Star, ChevronDown,
  Play, Lock, CheckCircle, Shield
} from 'lucide-react'
import PurchaseButton from '@/components/PurchaseButton'

export async function generateStaticParams() {
  return courses.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug)
  if (!course) return {}
  return {
    title: `${course.title} — Sell Your Brilliance`,
    description: course.description,
  }
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug)
  if (!course) notFound()

  const isRetreat = course.category === 'retreat'
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="bg-ink text-cream py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            {course.badge && (
              <span className="inline-block bg-gold text-ink text-xs font-medium px-3 py-1 rounded mb-4">
                {course.badge}
              </span>
            )}
            <p className="section-label mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isRetreat ? 'Immersive Retreat' : 'Online Course'} · {course.level}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-cream leading-tight mb-4">
              {course.title}
            </h1>
            <p className="text-cream/70 text-lg leading-relaxed mb-6">
              {course.tagline}
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-cream/60 mb-8">
              <span className="flex items-center gap-2"><Clock size={15} /> {course.duration}</span>
              {!isRetreat && <span className="flex items-center gap-2"><BookOpen size={15} /> {totalLessons} lessons</span>}
              <span className="flex items-center gap-2"><Users size={15} /> {course.students.toLocaleString()} enrolled</span>
              <span className="flex items-center gap-2"><Star size={15} fill="currentColor" className="text-gold" /> 4.9 rating</span>
            </div>

            <p className="text-sm text-cream/50">
              Taught by <span className="text-cream font-medium">{course.instructor}</span>
            </p>
          </div>

          {/* Hero image */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl hidden md:block" style={{ aspectRatio: '4/3' }}>
            <Image src={course.image} alt={course.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-ink/30" />
            {/* Preview play button */}
            {!isRetreat && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href={`/learn/${course.slug}/${course.modules[0]?.lessons[0]?.slug || 'welcome'}`}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 hover:bg-white/30 transition-colors"
                >
                  <Play size={24} className="text-white ml-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Left: Course details */}
        <div className="md:col-span-2 space-y-14">

          {/* What you'll learn */}
          <section>
            <h2 className="font-serif text-3xl font-light text-ink mb-6">What you'll learn</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {course.outcomes.map((outcome, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle size={16} className="text-gold mt-0.5 shrink-0" />
                  <p className="text-sm text-muted leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="font-serif text-3xl font-light text-ink mb-4">About this {isRetreat ? 'retreat' : 'course'}</h2>
            {course.longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="text-muted leading-relaxed mb-4">{para}</p>
            ))}
          </section>

          {/* Curriculum (courses only) */}
          {!isRetreat && course.modules.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-3xl font-light text-ink">Curriculum</h2>
                <p className="text-sm text-muted">{course.modules.length} modules · {totalLessons} lessons</p>
              </div>

              <div className="space-y-3">
                {course.modules.map((module, mi) => (
                  <details key={mi} className="border border-line rounded-lg overflow-hidden" open={mi === 0}>
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gold-dim transition-colors list-none">
                      <span className="font-medium text-sm text-ink">{module.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted">{module.lessons.length} lessons</span>
                        <ChevronDown size={16} className="text-muted" />
                      </div>
                    </summary>
                    <div className="divide-y divide-line">
                      {module.lessons.map(lesson => (
                        <div key={lesson.slug} className="flex items-center gap-4 px-5 py-3 bg-white/60">
                          <div className="shrink-0">
                            {lesson.preview
                              ? <Play size={14} className="text-gold" />
                              : <Lock size={14} className="text-muted/50" />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-ink truncate">{lesson.title}</p>
                            {lesson.description && (
                              <p className="text-xs text-muted truncate mt-0.5">{lesson.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {lesson.preview && (
                              <Link
                                href={`/learn/${course.slug}/${lesson.slug}`}
                                className="text-xs text-gold hover:underline"
                              >
                                Preview
                              </Link>
                            )}
                            <span className="text-xs text-muted">{lesson.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Instructor */}
          <section className="border-t border-line pt-12">
            <h2 className="font-serif text-3xl font-light text-ink mb-6">Your instructor</h2>
            <div className="flex gap-5 items-start">
              <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-gold/30">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
                  alt="Michele Parad"
                  fill className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-ink mb-1">Michele Parad</p>
                <p className="text-sm text-muted mb-3">Message Architect · Author · Educator</p>
                <p className="text-sm text-muted leading-relaxed">
                  Michele helps established experts find the through-line of their work and build the language, systems, and influence ecosystem to carry it into the world. She is the creator of the S.E.L.L. Framework and author of <em>Sell Your Brilliance</em>.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right: Purchase card (sticky) */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-white border border-line rounded-lg shadow-lg overflow-hidden">
            {/* Course image thumbnail */}
            <div className="relative h-36 overflow-hidden">
              <Image src={course.image} alt={course.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-ink/40" />
            </div>

            <div className="p-6">
              {/* Price */}
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-serif text-4xl font-light text-ink">
                  ${course.price.toLocaleString()}
                </span>
                {course.originalPrice && (
                  <span className="text-muted line-through">${course.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {course.originalPrice && (
                <p className="text-xs text-gold mb-6">
                  Save ${(course.originalPrice - course.price).toLocaleString()} — limited time
                </p>
              )}

              {/* CTA */}
              <PurchaseButton course={course} className="w-full btn-gold justify-center mb-3" />
              <Link
                href="mailto:hello@sellyourbrilliance.com"
                className="w-full btn-outline justify-center mb-6 text-sm flex items-center gap-2"
              >
                {isRetreat ? 'Request Info' : 'Have a question?'}
              </Link>

              {/* Guarantees */}
              <div className="space-y-3 pt-4 border-t border-line">
                <div className="flex items-start gap-3">
                  <Shield size={14} className="text-gold mt-0.5 shrink-0" />
                  <p className="text-xs text-muted">30-day money-back guarantee</p>
                </div>
                <div className="flex items-start gap-3">
                  <Award size={14} className="text-gold mt-0.5 shrink-0" />
                  <p className="text-xs text-muted">Certificate of completion</p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={14} className="text-gold mt-0.5 shrink-0" />
                  <p className="text-xs text-muted">Lifetime access</p>
                </div>
              </div>

              {/* Installment option */}
              {!isRetreat && course.price > 500 && (
                <div className="mt-4 pt-4 border-t border-line">
                  <p className="text-xs text-center text-muted mb-2">Or split the investment:</p>
                  <PurchaseButton
                    course={course}
                    installments
                    className="w-full btn-outline justify-center text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* "Have questions?" */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted">
              Have questions?{' '}
              <a href="mailto:hello@sellyourbrilliance.com" className="text-gold hover:underline">
                Email us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
