'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import type { Course } from '@/lib/courses'

interface Props {
  course: Course
  installments?: boolean
  className?: string
  label?: string
}

export default function PurchaseButton({
  course,
  installments = false,
  className,
  label,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)
  const router = useRouter()

  const isRetreat = course.category === 'retreat'

  async function handleClick() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ courseSlug: course.slug, installments }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Could not start checkout.')
      }

      // Redirect to Stripe Checkout
      router.push(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setLoading(false)
    }
  }

  const defaultLabel = isRetreat ? 'Apply for a Seat' : installments ? `Pay in 3 × $${Math.ceil(course.price / 3).toLocaleString()}` : 'Enroll Now'

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={loading}
        className={className || `w-full btn-gold justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Redirecting…
          </>
        ) : (
          <>
            {label || defaultLabel} <ArrowRight size={16} />
          </>
        )}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-600 text-center">{error}</p>
      )}
    </div>
  )
}
