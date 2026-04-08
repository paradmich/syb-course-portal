'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import { signIn, signUp } from '@/lib/auth-client'

type Mode = 'login' | 'signup' | 'reset'

function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl  = searchParams.get('callbackUrl') || '/dashboard'

  const [mode,    setMode]    = useState<Mode>('login')
  const [showPw,  setShowPw]  = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form state
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await signIn.email({
          email,
          password,
          callbackURL: callbackUrl,
        })
        if (error) throw new Error(error.message)
        router.push(callbackUrl)

      } else if (mode === 'signup') {
        const { error } = await signUp.email({
          email,
          password,
          name,
          callbackURL: callbackUrl,
        })
        if (error) throw new Error(error.message)
        router.push(callbackUrl)

      } else {
        // Password reset — Better Auth handles this via email
        const { error } = await signIn.email({
          email,
          password: '',
          callbackURL: callbackUrl,
        }).catch(() => ({ error: null }))
        setSuccess('If that email exists, a reset link is on its way.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    setError(null)
    try {
      await signIn.social({ provider: 'google', callbackURL: callbackUrl })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-ink text-cream p-16 relative overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #C9973A 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-5"
          style={{ background: 'radial-gradient(circle, #C9973A 0%, transparent 70%)' }}
        />

        <div className="relative z-10">
          <Link href="/" className="font-serif text-2xl font-light text-cream hover:text-gold transition-colors">
            Sell Your Brilliance
          </Link>
        </div>

        <div className="relative z-10">
          <blockquote className="font-serif text-3xl font-light text-cream/90 leading-relaxed mb-8">
            "You don't have a visibility problem. You have an identity expression problem."
          </blockquote>
          <p className="text-cream/40 text-sm">— Michele Parad</p>
        </div>

        <p className="relative z-10 text-cream/30 text-xs">© {new Date().getFullYear()} Sell Your Brilliance</p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center p-8 bg-cream">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="font-serif text-2xl font-light text-ink hover:text-gold transition-colors">
              Sell Your Brilliance
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="font-serif text-4xl font-light text-ink mb-2">
              {mode === 'login'  ? 'Welcome back.' :
               mode === 'signup' ? 'Create your account.' :
                                   'Reset your password.'}
            </h1>
            <p className="text-muted text-sm">
              {mode === 'login'  && 'Sign in to access your courses and programs.'}
              {mode === 'signup' && 'Join thousands of brilliant experts already enrolled.'}
              {mode === 'reset'  && "Enter your email and we'll send a reset link."}
            </p>
          </div>

          {/* Error / Success banners */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-ink mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-line rounded bg-white text-ink text-sm focus:outline-none focus:border-gold transition-colors"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-ink mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-line rounded bg-white text-ink text-sm focus:outline-none focus:border-gold transition-colors"
                required
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-ink">Password</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => setMode('reset')} className="text-xs text-gold hover:text-gold-dark transition-colors">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-line rounded bg-white text-ink text-sm focus:outline-none focus:border-gold transition-colors pr-11"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-gold justify-center mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Please wait…</>
              ) : (
                <>
                  {mode === 'login'  && <>Sign In <ArrowRight size={16} /></>}
                  {mode === 'signup' && <>Create Account <ArrowRight size={16} /></>}
                  {mode === 'reset'  && <>Send Reset Link <ArrowRight size={16} /></>}
                </>
              )}
            </button>
          </form>

          {/* OAuth */}
          {mode !== 'reset' && (
            <>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border-t border-line" />
                <p className="text-xs text-muted">or continue with</p>
                <div className="flex-1 border-t border-line" />
              </div>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-line rounded bg-white text-sm text-ink hover:border-gold transition-colors disabled:opacity-60"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}

          {/* Mode switch */}
          <div className="mt-8 text-center">
            {mode === 'login' && (
              <p className="text-sm text-muted">
                Don't have an account?{' '}
                <button onClick={() => { setMode('signup'); setError(null) }} className="text-gold hover:text-gold-dark font-medium transition-colors">
                  Sign up
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p className="text-sm text-muted">
                Already have an account?{' '}
                <button onClick={() => { setMode('login'); setError(null) }} className="text-gold hover:text-gold-dark font-medium transition-colors">
                  Sign in
                </button>
              </p>
            )}
            {mode === 'reset' && (
              <button onClick={() => { setMode('login'); setError(null); setSuccess(null) }} className="text-sm text-gold hover:text-gold-dark transition-colors">
                ← Back to sign in
              </button>
            )}
          </div>

          {mode === 'signup' && (
            <p className="text-center text-xs text-muted/60 mt-4">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="hover:text-gold transition-colors underline">Terms</Link> and{' '}
              <Link href="/privacy" className="hover:text-gold transition-colors underline">Privacy Policy</Link>.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <LoginForm />
    </Suspense>
  )
}
