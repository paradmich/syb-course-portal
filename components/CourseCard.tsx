import Link from 'next/link'
import Image from 'next/image'
import type { Course } from '@/lib/courses'
import { Clock, Users, BookOpen } from 'lucide-react'

interface Props {
  course: Course
  variant?: 'default' | 'compact'
}

export default function CourseCard({ course, variant = 'default' }: Props) {
  const isRetreat = course.category === 'retreat'

  return (
    <Link href={`/courses/${course.slug}`} className="card group block">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge */}
        {course.badge && (
          <span className="absolute top-3 left-3 bg-gold text-ink text-xs font-medium px-2.5 py-1 rounded">
            {course.badge}
          </span>
        )}
        {/* Category tag */}
        <span className="absolute top-3 right-3 bg-ink/70 text-cream text-xs px-2.5 py-1 rounded backdrop-blur-sm">
          {isRetreat ? 'Retreat' : 'Course'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="section-label mb-2">{course.level}</p>
        <h3 className="font-serif text-xl font-light text-ink leading-snug mb-2 group-hover:text-gold transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
          {course.tagline}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted mb-4">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {course.duration}
          </span>
          {!isRetreat && (
            <span className="flex items-center gap-1">
              <BookOpen size={12} /> {course.lessons} lessons
            </span>
          )}
          <span className="flex items-center gap-1">
            <Users size={12} /> {course.students.toLocaleString()}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-4 border-t border-line">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-serif font-light text-ink">
              ${course.price.toLocaleString()}
            </span>
            {course.originalPrice && (
              <span className="text-sm text-muted line-through">
                ${course.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-gold group-hover:underline transition-all">
            {isRetreat ? 'Learn More →' : 'Enroll Now →'}
          </span>
        </div>
      </div>
    </Link>
  )
}
