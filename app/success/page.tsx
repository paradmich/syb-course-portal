import Link from 'next/link'
import { CheckCircle, ArrowRight, BookOpen } from 'lucide-react'
import { getCourse } from '@/lib/courses'

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { course?: string; session_id?: string }
}) {
  const course = searchParams.course ? getCourse(searchParams.course) : null

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-blush">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-gold-dim flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-gold" />
        </div>

        <h1 className="font-serif text-4xl font-light text-maroon mb-3">
          You're enrolled!
        </h1>
        <p className="text-stone leading-relaxed mb-2">
          {course
            ? `Welcome to ${course.title}. You now have full access to all lessons.`
            : "Your purchase was successful. You now have access to your course."}
        </p>
        <p className="text-sm text-stone mb-10">
          A confirmation email is on its way to your inbox.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {course && (
            <Link
              href={`/learn/${course.slug}/${course.modules[0]?.lessons[0]?.slug ?? 'welcome'}`}
              className="btn-gold justify-center"
            >
              Start Learning <ArrowRight size={16} />
            </Link>
          )}
          <Link href="/dashboard" className="btn-outline justify-center">
            <BookOpen size={16} /> My Dashboard
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-stone">
            Questions? Email us at{' '}
            <a href="mailto:hello@sellyourbrilliance.com" className="text-gold hover:underline">
              hello@sellyourbrilliance.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
