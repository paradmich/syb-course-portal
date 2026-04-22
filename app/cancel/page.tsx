import Link from 'next/link'
import { XCircle, ArrowLeft } from 'lucide-react'

export default function CancelPage({
  searchParams,
}: {
  searchParams: { course?: string }
}) {
  const backHref = searchParams.course
    ? `/courses/${searchParams.course}`
    : '/courses'

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-blush">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-line flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-stone" />
        </div>

        <h1 className="font-serif text-4xl font-light text-maroon mb-3">
          Payment cancelled
        </h1>
        <p className="text-stone leading-relaxed mb-10">
          No worries — you haven't been charged. Your spot is still available whenever you're ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={backHref} className="btn-primary justify-center">
            <ArrowLeft size={16} /> Back to Course
          </Link>
          <Link href="/courses" className="btn-outline justify-center">
            Browse All Programs
          </Link>
        </div>
      </div>
    </div>
  )
}
