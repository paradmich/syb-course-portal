import { getCourse, courses } from '@/lib/courses'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, BookOpen, Star, ChevronDown, Play, Lock, FileText, Headphones, PenLine } from 'lucide-react'

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

// Sample module resources — in production these come from the DB per module
const moduleResources: Record<number, { icon: string; label: string; meta: string }[]> = {
  0: [
    { icon: 'pdf',   label: 'Module Workbook',  meta: 'PDF · 6 pages' },
    { icon: 'audio', label: 'Audio Version',     meta: 'MP3 · 78 min' },
  ],
  1: [
    { icon: 'pdf',   label: 'S.E.L.L. Framework PDF',          meta: 'PDF · 4 pages' },
    { icon: 'edit',  label: 'Positioning Statement Template',   meta: 'PDF · 2 pages' },
    { icon: 'audio', label: 'Audio Version',                    meta: 'MP3 · 93 min' },
  ],
  2: [
    { icon: 'pdf',   label: 'Language Ecosystem Worksheet',  meta: 'PDF · 3 pages' },
    { icon: 'audio', label: 'Audio Version',                 meta: 'MP3 · 68 min' },
  ],
}

function ResourceIcon({ type }: { type: string }) {
  if (type === 'audio') return <Headphones size={15} className="text-gold/70" />
  if (type === 'edit')  return <PenLine    size={15} className="text-gold/70" />
  return                       <FileText   size={15} className="text-gold/70" />
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourse(params.slug)
  if (!course) notFound()

  const isRetreat   = course.category === 'retreat'
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)

  return (
    <div className="pt-20">

      {/* ── HERO ── */}
      <section className="bg-dark text-parchment py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            {course.badge && (
              <span className="inline-block bg-gold text-white text-xs font-medium px-3 py-1 mb-4 tracking-[0.1em] uppercase"
                style={{ borderRadius: '2px' }}>
                {course.badge}
              </span>
            )}
            <p className="section-label mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isRetreat ? 'Immersive Retreat' : 'Online Course'} · {course.level}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-parchment leading-tight mb-4">
              {course.title}
            </h1>
            <p className="text-parchment/70 text-lg leading-relaxed mb-6">{course.tagline}</p>

            <div className="flex flex-wrap gap-6 text-sm text-parchment/60 mb-8">
              <span className="flex items-center gap-2"><Clock size={15} /> {course.duration}</span>
              {!isRetreat && <span className="flex items-center gap-2"><BookOpen size={15} /> {totalLessons} lessons</span>}
              <span className="flex items-center gap-2"><Users size={15} /> {course.students.toLocaleString()} enrolled</span>
              <span className="flex items-center gap-2"><Star size={15} fill="currentColor" className="text-gold" /> 4.9</span>
            </div>
            <p className="text-sm text-parchment/50">
              Taught by <span className="text-parchment font-medium">{course.instructor}</span>
            </p>
          </div>

          {/* Hero image */}
          <div className="relative rounded-sm overflow-hidden shadow-2xl hidden md:block" style={{ aspectRatio: '4/3' }}>
            <Image src={course.image} alt={course.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-dark/30" />
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

      {/* ── BODY ── */}
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-14">

        {/* About */}
        <section>
          <h2 className="font-serif text-3xl font-light text-maroon mb-4">
            About this {isRetreat ? 'retreat' : 'course'}
          </h2>
          {course.longDescription.split('\n\n').map((para, i) => (
            <p key={i} className="text-stone leading-relaxed mb-4">{para}</p>
          ))}
        </section>

        {/* Curriculum */}
        {!isRetreat && course.modules.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl font-light text-maroon">Curriculum</h2>
              <p className="text-sm text-stone">{course.modules.length} modules · {totalLessons} lessons</p>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, mi) => (
                <details key={mi} className="border border-border overflow-hidden" open={mi === 0}
                  style={{ borderRadius: '2px' }}>
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gold-dim transition-colors list-none">
                    <span className="font-medium text-sm text-maroon">{module.title}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-stone">{module.lessons.length} lessons</span>
                      <ChevronDown size={16} className="text-stone" />
                    </div>
                  </summary>

                  {/* Lessons */}
                  <div className="divide-y divide-border">
                    {module.lessons.map(lesson => (
                      <div key={lesson.slug} className="flex items-center gap-4 px-5 py-3 bg-white/60">
                        <div className="shrink-0">
                          {lesson.preview
                            ? <Play size={14} className="text-gold" />
                            : <Lock size={14} className="text-stone/50" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-maroon truncate">{lesson.title}</p>
                          {lesson.description && (
                            <p className="text-xs text-stone truncate mt-0.5">{lesson.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {lesson.preview && (
                            <Link href={`/learn/${course.slug}/${lesson.slug}`}
                              className="text-xs text-gold hover:underline">
                              Preview
                            </Link>
                          )}
                          <span className="text-xs text-stone">{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Module resources */}
                  {moduleResources[mi] && (
                    <div className="px-5 py-3 flex flex-wrap gap-2"
                      style={{ background: 'rgba(245,232,220,0.5)', borderTop: '1px solid #E0CFC4' }}>
                      {moduleResources[mi].map(r => (
                        <span key={r.label}
                          className="inline-flex items-center gap-2 text-xs text-stone border border-border bg-white px-3 py-1.5 hover:border-gold hover:text-gold transition-colors cursor-pointer"
                          style={{ borderRadius: '2px' }}>
                          <ResourceIcon type={r.icon} />
                          {r.label}
                          <span className="text-stone/40">{r.meta}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Instructor */}
        <section className="border-t border-border pt-12">
          <h2 className="font-serif text-3xl font-light text-maroon mb-6">Your instructor</h2>
          <div className="flex gap-5 items-start">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-gold/30">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80"
                alt="Michele Parad" fill className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-maroon mb-1">Michele Parad</p>
              <p className="text-sm text-stone mb-3">Message Architect · Author · Educator</p>
              <p className="text-sm text-stone leading-relaxed">
                Michele helps established experts find the through-line of their work and build the language, systems, and influence ecosystem to carry it into the world. She is the creator of the S.E.L.L. Framework and author of <em>Sell Your Brilliance</em>.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
