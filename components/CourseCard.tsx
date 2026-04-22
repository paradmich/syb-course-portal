import Link from 'next/link'
import Image from 'next/image'
import type { Course } from '@/lib/courses'
import { Clock, Users, BookOpen } from 'lucide-react'

interface Props { course: Course }

export default function CourseCard({ course }: Props) {
  const isRetreat = course.category === 'retreat'

  return (
    <Link href={`/courses/${course.slug}`} className="card group block">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={course.image} alt={course.title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gold overlay tint */}
        <div className="absolute inset-0 bg-maroon/20 group-hover:bg-maroon/10 transition-colors" />

        {course.badge && (
          <span className="absolute top-3 left-3 bg-gold text-white text-xs font-medium px-3 py-1 tracking-[0.1em] uppercase"
            style={{ borderRadius: '2px' }}>
            {course.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 text-xs tracking-[0.1em] uppercase px-2.5 py-1"
          style={{ background: 'rgba(28,8,5,0.6)', color: '#E8D0B8', borderRadius: '2px' }}>
          {isRetreat ? 'Retreat' : 'Course'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 bg-white">
        <p className="eyebrow mb-2">{course.level}</p>
        <h3 className="font-serif text-xl font-light text-maroon leading-snug mb-2 group-hover:text-gold transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-stone leading-relaxed mb-4 line-clamp-2">{course.tagline}</p>

        <div className="flex items-center gap-4 text-xs text-stone/70 mb-4">
          <span className="flex items-center gap-1.5"><Clock size={11} /> {course.duration}</span>
          {!isRetreat && <span className="flex items-center gap-1.5"><BookOpen size={11} /> {course.lessons} lessons</span>}
          <span className="flex items-center gap-1.5"><Users size={11} /> {course.students.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-light text-maroon">${course.price.toLocaleString()}</span>
            {course.originalPrice && (
              <span className="text-sm text-stone/50 line-through">${course.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <span className="eyebrow text-[10px] group-hover:underline transition-all">
            {isRetreat ? 'Learn More →' : 'Enroll →'}
          </span>
        </div>
      </div>
    </Link>
  )
}
