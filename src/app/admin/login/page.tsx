'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error || 'Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-amber-500 shadow-lg mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-navy-400">Pro-Tech Fire & Safety</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="rounded-lg bg-red-900/50 p-3 text-sm text-red-400">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-navy-300 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full rounded-lg border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-300 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full rounded-lg border border-navy-700 bg-navy-900 px-4 py-3 text-sm text-white focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-lg bg-gold-500 px-4 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-400 disabled:opacity-50 transition-colors">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <p className="text-center text-xs text-navy-500">Authorized Personnel Only • Enterprise Portal</p>
        </form>
      </div>
    </div>
  )
}
