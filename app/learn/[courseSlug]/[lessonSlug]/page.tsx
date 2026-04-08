'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getCourse } from '@/lib/courses'
import { notFound } from 'next/navigation'
import {
  Play, ChevronLeft, ChevronRight, CheckCircle,
  Circle, Lock, List, X, BookOpen, MessageSquare
} from 'lucide-react'

export default function LessonPage({
  params,
}: {
  params: { courseSlug: string; lessonSlug: string }
}) {
  const course = getCourse(params.courseSlug)
  if (!course) notFound()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(['welcome', 'your-brilliance-baseline'])
  )
  const [activeTab, setActiveTab] = useState<'notes' | 'transcript'>('notes')

  // Find current lesson
  let currentLesson = null
  let currentModuleTitle = ''
  let prevLesson: { courseSlug: string; slug: string } | null = null
  let nextLesson: { courseSlug: string; slug: string } | null = null
  let allLessons: { slug: string; title: string; moduleTitle: string; preview: boolean }[] = []

  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (lesson.slug === params.lessonSlug) {
        currentLesson = lesson
        currentModuleTitle = mod.title
        // find prev/next
        const flat = course.modules.flatMap(m => m.lessons)
        const idx = flat.findIndex(l => l.slug === lesson.slug)
        if (idx > 0) prevLesson = { courseSlug: course.slug, slug: flat[idx - 1].slug }
        if (idx < flat.length - 1) nextLesson = { courseSlug: course.slug, slug: flat[idx + 1].slug }
      }
      allLessons.push({ slug: lesson.slug, title: lesson.title, moduleTitle: mod.title, preview: lesson.preview })
    }
  }

  if (!currentLesson) notFound()

  const toggleComplete = (slug: string) => {
    setCompletedLessons(prev => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const totalLessons = allLessons.length
  const completedCount = completedLessons.size
  const progressPct = Math.round((completedCount / totalLessons) * 100)

  return (
    <div className="h-screen flex flex-col bg-cream overflow-hidden">
      {/* ── TOP BAR ── */}
      <header className="bg-ink text-cream flex items-center px-4 h-14 gap-4 shrink-0 border-b border-white/10">
        <Link href={`/courses/${course.slug}`} className="flex items-center gap-2 text-cream/70 hover:text-cream transition-colors text-sm">
          <ChevronLeft size={16} /> Back to course
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-cream truncate hidden md:block">{course.title}</p>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="w-32 progress-bar hidden md:block">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-xs text-cream/60">{progressPct}%</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-1.5 text-cream/70 hover:text-cream transition-colors text-xs ml-2"
        >
          <List size={16} />
          <span className="hidden md:inline">Curriculum</span>
        </button>
      </header>

      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── VIDEO + CONTENT ── */}
        <div className="flex-1 overflow-y-auto">

          {/* Video player placeholder */}
          <div className="video-placeholder flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors border border-white/30">
                <Play size={28} className="text-white ml-1" />
              </div>
              <p className="text-cream/70 text-sm">{currentLesson.title}</p>
              <p className="text-cream/40 text-xs mt-1">{currentLesson.duration}</p>
            </div>
          </div>

          {/* Lesson info + nav */}
          <div className="max-w-3xl mx-auto px-6 py-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs text-muted mb-1">{currentModuleTitle}</p>
                <h1 className="font-serif text-3xl font-light text-ink">{currentLesson.title}</h1>
              </div>
              <button
                onClick={() => toggleComplete(currentLesson!.slug)}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded transition-all shrink-0 ${
                  completedLessons.has(currentLesson.slug)
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-white border border-line text-muted hover:border-gold hover:text-gold'
                }`}
              >
                {completedLessons.has(currentLesson.slug)
                  ? <><CheckCircle size={15} /> Completed</>
                  : <><Circle size={15} /> Mark Complete</>
                }
              </button>
            </div>

            {/* Prev / Next nav */}
            <div className="flex gap-3 mb-10">
              {prevLesson ? (
                <Link href={`/learn/${prevLesson.courseSlug}/${prevLesson.slug}`} className="btn-outline text-sm">
                  <ChevronLeft size={16} /> Previous
                </Link>
              ) : <div />}
              {nextLesson && (
                <Link href={`/learn/${nextLesson.courseSlug}/${nextLesson.slug}`} className="btn-primary text-sm ml-auto">
                  Next <ChevronRight size={16} />
                </Link>
              )}
            </div>

            {/* Tabs: Notes / Transcript */}
            <div className="border-b border-line mb-6 flex gap-6">
              {(['notes', 'transcript'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'border-gold text-ink'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {tab === 'notes' ? <span className="flex items-center gap-2"><BookOpen size={14} /> Notes</span>
                    : <span className="flex items-center gap-2"><MessageSquare size={14} /> Transcript</span>}
                </button>
              ))}
            </div>

            {activeTab === 'notes' && (
              <div className="prose prose-sm max-w-none text-muted">
                <p className="leading-relaxed">{currentLesson.description}</p>
                <div className="mt-6 bg-gold-dim border border-gold/20 rounded-lg p-4">
                  <p className="text-sm font-medium text-ink mb-2">📝 Lesson notes will appear here</p>
                  <p className="text-xs text-muted">
                    Download the companion workbook to follow along with this lesson's exercises. Your notes and answers are saved automatically.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'transcript' && (
              <div className="text-sm text-muted leading-relaxed space-y-4">
                <p className="text-xs text-muted/60 italic">Transcript will be available after video is uploaded.</p>
                <p className="leading-loose">[00:00] Welcome to this lesson. In the next {currentLesson.duration}, we're going to explore {currentLesson.title.toLowerCase()}...</p>
                <p className="leading-loose">[01:30] Let's start with the foundation. Before we can build anything else, we need to understand...</p>
                <p className="leading-loose">[03:45] Now I want you to think about your own experience. When was the last time you felt truly aligned with your message?</p>
              </div>
            )}
          </div>
        </div>

        {/* ── SIDEBAR: Curriculum ── */}
        {sidebarOpen && (
          <aside className="w-80 bg-white border-l border-line overflow-y-auto shrink-0 hidden md:flex flex-col">
            <div className="p-4 border-b border-line flex items-center justify-between sticky top-0 bg-white z-10">
              <p className="text-sm font-medium text-ink">Course Content</p>
              <button onClick={() => setSidebarOpen(false)} className="text-muted hover:text-ink transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Progress */}
            <div className="px-4 py-3 border-b border-line">
              <div className="flex items-center justify-between text-xs text-muted mb-1.5">
                <span>{completedCount} / {totalLessons} lessons</span>
                <span>{progressPct}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            {/* Module list */}
            <div className="flex-1">
              {course.modules.map((mod, mi) => (
                <div key={mi}>
                  <div className="px-4 py-3 bg-cream/50 border-b border-line">
                    <p className="text-xs font-medium text-ink">{mod.title}</p>
                  </div>
                  {mod.lessons.map(lesson => {
                    const isCurrent = lesson.slug === params.lessonSlug
                    const isDone = completedLessons.has(lesson.slug)

                    return (
                      <Link
                        key={lesson.slug}
                        href={`/learn/${course.slug}/${lesson.slug}`}
                        className={`flex items-start gap-3 px-4 py-3 border-b border-line transition-colors text-sm ${
                          isCurrent ? 'bg-gold-dim border-l-2 border-l-gold' : 'hover:bg-cream/50'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {isDone
                            ? <CheckCircle size={15} className="text-gold" />
                            : lesson.preview
                              ? <Circle size={15} className="text-muted/40" />
                              : <Lock size={15} className="text-muted/30" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`leading-snug truncate ${isCurrent ? 'text-ink font-medium' : 'text-muted'}`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-muted/60 mt-0.5">{lesson.duration}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
