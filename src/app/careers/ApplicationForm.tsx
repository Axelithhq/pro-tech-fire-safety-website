'use client'

import { useState, FormEvent } from 'react'
import { Send } from 'lucide-react'
import { submitApplication } from '@/lib/cms-client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

export default function ApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const formData = new FormData(form)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => { data[key] = value.toString() })
    const result = await submitApplication(data)
    if (result.error) {
      setStatus('error')
    } else {
      setStatus('success')
      form.reset()
    }
  }

  return (
    <ScrollReveal delay={0.1}>
      {status === 'success' ? (
        <div className="mt-8 rounded-2xl bg-emerald-50 p-8 text-center">
          <p className="text-lg font-medium text-emerald-800">Application received!</p>
          <p className="mt-2 text-sm text-emerald-600">We&apos;ll review your application and get back to you.</p>
        </div>
      ) : (
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {status === 'error' && (
            <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy-700">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-700">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-navy-700">
              Position Interested In
            </label>
            <input
              id="position"
              name="position"
              type="text"
              className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              placeholder="e.g. Fire Protection Engineer"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-navy-700">
              Message / Cover Letter
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
          <Button type="submit" variant="primary" size="lg" disabled={status === 'loading'}>
            <Send size={16} />
            {status === 'loading' ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      )}
    </ScrollReveal>
  )
}
