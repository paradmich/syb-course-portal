import Link from 'next/link'
import Image from 'next/image'
import type { Course } from '@/lib/courses'
import { Clock, BookOpen, Lock } from 'lucide-react'

interface Props {
  course: Course
  enrolled?: boolean
  locked?: boolean
  progress?: number
  lastLesson?: string
}

export default function CourseCard({ course, enrolled, locked, progress = 0, lastLesson }: Props) {
  const href = `/courses/${course.slug}`

  return (
    <Link href={href} className="card group block relative">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={course.image} alt={course.title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-maroon/20 group-hover:bg-maroon/10 transition-colors" />

        {/* Lock overlay */}
        {locked && (
          <div className="absolute inset-0 bg-dark/50 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center"
              style={{ background: 'rgba(28,8,5,0.7)' }}>
              <Lock size={16} className="text-gold/70" />
            </div>
          </div>
        )}

        {course.badge && !locked && (
          <span className="absolute top-3 left-3 bg-gold text-white text-xs font-medium px-3 py-1 tracking-[0.1em] uppercase"
            style={{ borderRadius: '2px' }}>
            {course.badge}
          </span>
        )}

        {/* Enrolled badge */}
        {enrolled && (
          <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 tracking-[0.1em] uppercase"
            style={{ background: 'rgba(184,136,42,0.15)', border: '1px solid rgba(184,136,42,0.4)', color: '#B8882A', borderRadius: '2px' }}>
            ✓ Enrolled
          </span>
        )}

        <span className="absolute top-3 right-3 text-xs tracking-[0.1em] uppercase px-2.5 py-1"
          style={{ background: 'rgba(28,8,5,0.6)', color: '#E8D0B8', borderRadius: '2px' }}>
          Course
        </span>
      </div>

      {/* Content */}
      <div className="p-5 bg-white">
        <p className="eyebrow mb-2">{course.level}</p>
        <h3 className="font-serif text-xl font-light text-maroon leading-snug mb-2 group-hover:text-gold transition-colors">
          {course.title}
        </h3>

        {/* Enrolled state: progress bar */}
        {enrolled ? (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-stone mb-1.5">
              <span>{lastLesson ? `Last: ${lastLesson}` : 'In progress'}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-[3px] bg-border rounded-full">
              <div className="h-[3px] bg-gold rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <p className="text-sm text-stone leading-relaxed mb-4 line-clamp-2">{course.tagline}</p>
        )}

        <div className="flex items-center gap-4 text-xs text-stone/70 mb-4">
          <span className="flex items-center gap-1.5"><Clock size={11} /> {course.duration}</span>
          <span className="flex items-center gap-1.5"><BookOpen size={11} /> {course.lessons} lessons</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          {enrolled ? (
            <>
              <span className="text-xs text-stone">Continue where you left off</span>
              <span className="eyebrow text-[10px] text-gold group-hover:underline">Continue →</span>
            </>
          ) : (
            <>
              <span className="font-serif text-xl font-light text-maroon">${course.price.toLocaleString()}</span>
              <span className="eyebrow text-[10px] text-gold group-hover:underline">
                {locked ? 'Enroll →' : 'Learn More →'}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
