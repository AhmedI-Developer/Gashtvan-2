import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Logo from '@/components/brand/Logo'
import Button from '@/components/ui/Button'
import { Field } from '@/components/admin/Field'
import { useAuth } from '@/hooks/useAuth'
import { AdminApiError } from '@/lib/adminApi'

export default function AdminLogin() {
  const { login, isAuthenticated, booting } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@gashtvan.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (booting) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[var(--bg)] text-[var(--text-muted)]">
        Checking session…
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email.trim(), password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : 'Login failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main lang="en" dir="ltr" className="flex min-h-svh items-center justify-center bg-[var(--bg)] px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <Logo className="w-11" />
          <div>
            <h1 className="font-display text-2xl font-bold text-[var(--text)]">Admin login</h1>
            <p className="text-sm text-[var(--text-muted)]">Manage offers and destinations</p>
          </div>
        </div>

        <div className="space-y-4">
          <Field
            label="Email"
            type="email"
            name="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Field
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error ? (
          <p className="mt-4 rounded-[14px] border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="mt-6 w-full" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </main>
  )
}
