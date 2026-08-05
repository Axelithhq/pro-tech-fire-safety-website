'use client'

import { useState, FormEvent } from 'react'
import { X, Send, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitEnquiry } from '@/lib/cms-client'
import Button from './Button'

interface QuoteModalProps {
  open: boolean
  onClose: () => void
}

export default function QuoteModal({ open, onClose }: QuoteModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const formData = new FormData(form)
    const data: Record<string, string> = { subject: 'Request a Quote' }
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
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-navy-900 p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-navy-50 dark:bg-navy-800 text-navy-500 hover:text-navy-900 dark:hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            {status === 'success' ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Send size={28} className="text-emerald-600" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900 dark:text-white">Quote Request Sent!</h3>
                <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">Our team will get back to you within 24 hours with a customized quote.</p>
                <p className="mt-4 text-xs text-navy-400">For urgent inquiries, call <a href="tel:+918249785871" className="text-gold-600 font-medium">+91 82497 85871</a></p>
                <div className="mt-6">
                  <Button variant="primary" onClick={onClose}>Close</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">Request a Quote</h3>
                  <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">Tell us your requirements and get a customized quote within 24 hours.</p>
                </div>

                {status === 'error' && (
                  <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">Something went wrong. Please try again or call us directly.</p>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="q-name" className="block text-xs font-medium text-navy-700 dark:text-navy-300">Full Name *</label>
                      <input id="q-name" name="name" type="text" required
                        className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-navy-900 dark:text-white"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="q-company" className="block text-xs font-medium text-navy-700 dark:text-navy-300">Company *</label>
                      <input id="q-company" name="company" type="text" required
                        className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-navy-900 dark:text-white"
                        placeholder="Company name" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="q-email" className="block text-xs font-medium text-navy-700 dark:text-navy-300">Email *</label>
                      <input id="q-email" name="email" type="email" required
                        className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-navy-900 dark:text-white"
                        placeholder="email@company.com" />
                    </div>
                    <div>
                      <label htmlFor="q-phone" className="block text-xs font-medium text-navy-700 dark:text-navy-300">Phone *</label>
                      <input id="q-phone" name="phone" type="tel" required
                        className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-navy-900 dark:text-white"
                        placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="q-service" className="block text-xs font-medium text-navy-700 dark:text-navy-300">Service Interested In</label>
                    <select id="q-service" name="service"
                      className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-navy-900 dark:text-white">
                      <option value="">Select a service</option>
                      <option value="Fire Alarm Systems">Fire Alarm Systems</option>
                      <option value="Sprinkler Systems">Sprinkler Systems</option>
                      <option value="Fire Extinguishers">Fire Extinguishers</option>
                      <option value="HVAC Ventilation">HVAC Ventilation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="q-message" className="block text-xs font-medium text-navy-700 dark:text-navy-300">Project Details *</label>
                    <textarea id="q-message" name="message" required rows={3}
                      className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 resize-none text-navy-900 dark:text-white"
                      placeholder="Describe your project requirements..." />
                  </div>
                  <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
                    <Send size={16} />
                    {status === 'loading' ? 'Sending...' : 'Request Free Quote'}
                  </Button>
                  <p className="text-center text-xs text-navy-400 dark:text-navy-500">
                    Or call us directly: <a href="tel:+918249785871" className="text-gold-600 font-medium">+91 82497 85871</a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
