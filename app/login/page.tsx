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

  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'login') {
        const { error } = await signIn.email({ email, password, callbackURL: callbackUrl })
        if (error) throw new Error(error.message)
        window.location.href = callbackUrl
      } else if (mode === 'signup') {
        const { error } = await signUp.email({ email, password, name, callbackURL: callbackUrl })
        if (error) throw new Error(error.message)
        window.location.href = callbackUrl
      } else {
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
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── LEFT: Brand panel — dark maroon like site's dark sections ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-16 relative overflow-hidden"
        style={{ background: '#1C0805' }}
      >
        {/* Subtle gold orb */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-[0.06]"
          style={{ background: 'radial-gradient(circle at top right, #B8882A 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none opacity-[0.04]"
          style={{ background: 'radial-gradient(circle at bottom left, #B8882A 0%, transparent 65%)' }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="font-serif text-2xl font-light tracking-wide hover:opacity-80 transition-opacity"
            style={{ color: '#E8D0B8' }}>
            Sell Your Brilliance
          </Link>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          {/* Gold line — matches site's accent lines */}
          <span className="gold-line" />
          <blockquote
            className="font-serif text-3xl font-light leading-relaxed mb-6"
            style={{ color: '#E8D0B8' }}
          >
            "You don't have a visibility problem. You have an identity expression problem."
          </blockquote>
          <p className="text-xs tracking-[0.18em] uppercase" style={{ color: '#B8882A' }}>
            — Michele Parad
          </p>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-xs" style={{ color: 'rgba(232,208,184,0.3)' }}>
          © {new Date().getFullYear()} Sell Your Brilliance
        </p>
      </div>

      {/* ── RIGHT: Form panel — warm blush background ── */}
      <div
        className="flex-1 flex items-center justify-center px-8 py-16 lg:py-0"
        style={{ background: '#F5E8DC' }}
      >
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="font-serif text-2xl font-light tracking-wide text-maroon hover:text-gold transition-colors">
              Sell Your Brilliance
            </Link>
          </div>

          {/* Eyebrow */}
          <p className="eyebrow mb-3">
            {mode === 'login' ? 'Member Access' : mode === 'signup' ? 'Join Us' : 'Account Recovery'}
          </p>

          {/* Heading */}
          <h1 className="font-serif text-4xl font-light text-maroon leading-tight mb-2">
            {mode === 'login'  ? 'Welcome back.' :
             mode === 'signup' ? 'Create your account.' :
                                 'Reset your password.'}
          </h1>
          <p className="text-sm text-stone mb-8 leading-relaxed">
            {mode === 'login'  && 'Sign in to access your courses and programs.'}
            {mode === 'signup' && 'Join thousands of brilliant experts already enrolled.'}
            {mode === 'reset'  && "Enter your email and we'll send you a reset link."}
          </p>

          {/* Error / Success */}
          {error && (
            <div className="mb-5 px-4 py-3 border text-sm"
              style={{ background: '#FFF5F5', borderColor: '#E8B4B4', color: '#8B2020', borderRadius: '2px' }}>
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 px-4 py-3 border text-sm"
              style={{ background: '#F0F7F0', borderColor: '#A8C8A8', color: '#2D5A2D', borderRadius: '2px' }}>
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs tracking-[0.12em] uppercase text-stone mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  className="field"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-xs tracking-[0.12em] uppercase text-stone mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="field"
                required
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs tracking-[0.12em] uppercase text-stone">Password</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => { setMode('reset'); setError(null) }}
                      className="text-xs text-gold hover:text-gold-light transition-colors tracking-wide">
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
                    className="field pr-11"
                    required
                    minLength={8}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone/60 hover:text-stone transition-colors">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-gold justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {loading
                  ? <><Loader2 size={14} className="animate-spin" /> Please wait…</>
                  : mode === 'login'  ? <>Sign In <ArrowRight size={14} /></>
                  : mode === 'signup' ? <>Create Account <ArrowRight size={14} /></>
                  :                    <>Send Reset Link <ArrowRight size={14} /></>
                }
              </button>
            </div>
          </form>

          {/* Divider + Google */}
          {mode !== 'reset' && (
            <>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs tracking-[0.1em] uppercase text-stone/60">or</span>
                <div className="flex-1 border-t border-border" />
              </div>

              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-border text-xs font-medium tracking-[0.1em] uppercase text-stone hover:border-gold transition-colors disabled:opacity-60"
                style={{ borderRadius: '2px' }}
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

          {/* Mode switcher */}
          <div className="mt-8 text-center">
            {mode === 'login' && (
              <p className="text-sm text-stone">
                Don't have an account?{' '}
                <button onClick={() => { setMode('signup'); setError(null) }}
                  className="text-gold hover:text-gold-light font-medium transition-colors">
                  Sign up
                </button>
              </p>
            )}
            {mode === 'signup' && (
              <p className="text-sm text-stone">
                Already have an account?{' '}
                <button onClick={() => { setMode('login'); setError(null) }}
                  className="text-gold hover:text-gold-light font-medium transition-colors">
                  Sign in
                </button>
              </p>
            )}
            {mode === 'reset' && (
              <button onClick={() => { setMode('login'); setError(null); setSuccess(null) }}
                className="text-sm text-gold hover:text-gold-light transition-colors tracking-wide">
                ← Back to sign in
              </button>
            )}
          </div>

          {mode === 'signup' && (
            <p className="text-center text-xs text-stone/50 mt-4 leading-relaxed">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="underline hover:text-gold transition-colors">Terms</Link> and{' '}
              <Link href="/privacy" className="underline hover:text-gold transition-colors">Privacy Policy</Link>.
            </p>
          )}

        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: '#F5E8DC' }} />}>
      <LoginForm />
    </Suspense>
  )
}
