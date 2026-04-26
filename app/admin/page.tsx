'use client'

import { useState } from 'react'
import { courses } from '@/lib/courses'
import { Search, CheckCircle, XCircle, Loader2 } from 'lucide-react'

const COURSES = courses.filter(c => c.category === 'course')

interface UserRecord {
  id: string
  name: string
  email: string
  purchasedCourses: string[]
}

export default function AdminPage() {
  const [email,   setEmail]   = useState('')
  const [user,    setUser]    = useState<UserRecord | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [searching, setSearching] = useState(false)
  const [saving,  setSaving]  = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  async function search(e: React.FormEvent) {
    e.preventDefault()
    setSearching(true)
    setUser(null)
    setNotFound(false)
    setMessage(null)

    const res  = await fetch(`/api/admin/users?email=${encodeURIComponent(email)}`)
    const data = await res.json()
    setSearching(false)

    if (res.status === 401) { setMessage('Not authorised.'); return }
    if (!data.user) { setNotFound(true); return }
    setUser(data.user)
  }

  async function toggle(courseSlug: string, currentlyGranted: boolean) {
    if (!user) return
    setSaving(courseSlug)
    setMessage(null)

    const res = await fetch('/api/admin/grant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, courseSlug, grant: !currentlyGranted }),
    })
    const data = await res.json()
    setSaving(null)

    if (!res.ok) { setMessage(data.error || 'Something went wrong.'); return }

    setUser(u => u ? { ...u, purchasedCourses: data.purchasedCourses } : u)
    setMessage(
      !currentlyGranted
        ? `✓ Access granted to "${COURSES.find(c => c.slug === courseSlug)?.title}"`
        : `✓ Access revoked for "${COURSES.find(c => c.slug === courseSlug)?.title}"`
    )
  }

  return (
    <div className="pt-28 pb-24 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto">

        <p className="section-label mb-2">Admin</p>
        <h1 className="font-serif text-4xl font-light text-maroon mb-10">Course Access</h1>

        {/* Search */}
        <form onSubmit={search} className="flex gap-3 mb-8">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Student email address"
            className="field flex-1"
            required
          />
          <button type="submit" disabled={searching} className="btn-gold shrink-0">
            {searching
              ? <Loader2 size={15} className="animate-spin" />
              : <><Search size={15} /> Look up</>}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className="mb-6 px-4 py-3 text-sm border"
            style={{ background: '#F0F7F0', borderColor: '#A8C8A8', color: '#2D5A2D', borderRadius: '2px' }}>
            {message}
          </div>
        )}

        {/* Not found */}
        {notFound && (
          <p className="text-stone text-sm">No account found for <strong>{email}</strong>. They may not have signed up yet.</p>
        )}

        {/* User card */}
        {user && (
          <div className="border border-border bg-white" style={{ borderRadius: '2px' }}>

            {/* User header */}
            <div className="px-6 py-4 border-b border-border">
              <p className="font-medium text-maroon">{user.name}</p>
              <p className="text-sm text-stone">{user.email}</p>
            </div>

            {/* Courses */}
            <div className="divide-y divide-border">
              {COURSES.map(course => {
                const granted = user.purchasedCourses.includes(course.slug)
                const loading = saving === course.slug
                return (
                  <div key={course.slug}
                    className="flex items-center justify-between px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-maroon">{course.title}</p>
                      <p className="text-xs text-stone mt-0.5">${course.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => toggle(course.slug, granted)}
                      disabled={!!saving}
                      className={`flex items-center gap-2 text-xs font-medium px-4 py-2 border transition-colors ${
                        granted
                          ? 'border-green-300 bg-green-50 text-green-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700'
                          : 'border-border bg-white text-stone hover:border-gold hover:text-gold'
                      } disabled:opacity-50`}
                      style={{ borderRadius: '2px' }}
                    >
                      {loading
                        ? <Loader2 size={13} className="animate-spin" />
                        : granted
                          ? <><CheckCircle size={13} /> Enrolled — click to revoke</>
                          : <><XCircle size={13} /> Not enrolled — click to grant</>
                      }
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
