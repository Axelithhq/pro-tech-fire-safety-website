'use client'

import { useState, FormEvent } from 'react'
import { Send } from 'lucide-react'
import { submitEnquiry } from '@/lib/cms-client'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Button from '@/components/ui/Button'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const formData = new FormData(form)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => { data[key] = value.toString() })
    const result = await submitEnquiry(data)
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
        <div className="rounded-2xl bg-emerald-50 p-8 text-center">
          <p className="text-lg font-medium text-emerald-800">Message sent!</p>
          <p className="mt-2 text-sm text-emerald-600">We&apos;ll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          {status === 'error' && (
            <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1.5 w-full rounded-lg border border-gray-200 dark:border-navy-600 dark:bg-navy-800 dark:text-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
                Company *
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                className="mt-1.5 w-full rounded-lg border border-gray-200 dark:border-navy-600 dark:bg-navy-800 dark:text-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                placeholder="Company name"
              />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-lg border border-gray-200 dark:border-navy-600 dark:bg-navy-800 dark:text-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                placeholder="email@company.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
                Phone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1.5 w-full rounded-lg border border-gray-200 dark:border-navy-600 dark:bg-navy-800 dark:text-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div>
              <label htmlFor="subject" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="mt-1.5 w-full rounded-lg border border-gray-200 dark:border-navy-600 dark:bg-navy-800 dark:text-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
              >
                <option value="">Select a subject</option>
                <option value="New Installation">New Installation</option>
                <option value="Safety Audit">Safety Audit</option>
                <option value="Maintenance Request">Maintenance Request</option>
                <option value="Product Enquiry">Product Enquiry</option>
                <option value="Emergency Support">Emergency Support</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-navy-700 dark:text-navy-200">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-1.5 w-full rounded-lg border border-gray-200 dark:border-navy-600 dark:bg-navy-800 dark:text-white px-4 py-3 text-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 resize-none"
              placeholder="Tell us about your requirements..."
            />
          </div>
          <Button type="submit" variant="primary" size="lg" disabled={status === 'loading'}>
            <Send size={16} />
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      )}
    </ScrollReveal>
  )
}
