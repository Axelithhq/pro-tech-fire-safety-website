'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { X, Send, Sparkles, Monitor, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitEnquiry } from '@/lib/cms-client'
import Button from './Button'

interface CtaModalProps {
  open: boolean
  onClose: () => void
  type: 'early-access' | 'demo' | 'consultation'
}

const config = {
  'early-access': {
    icon: Sparkles,
    title: 'Join Early Access',
    desc: 'Be the first to know when we launch our platform. Drop your email and we\'ll keep you posted.',
    subject: 'Early Access - Pro-Tech Safety Command',
    buttonLabel: 'Join Waitlist',
  },
  'demo': {
    icon: Monitor,
    title: 'Request a Demo',
    desc: 'See our future platform in action. Our team will reach out to schedule a personalized demo.',
    subject: 'Demo Request - Pro-Tech Safety Command',
    buttonLabel: 'Request Demo',
  },
  'consultation': {
    icon: Calendar,
    title: 'Schedule a Consultation',
    desc: 'Tell us about your project and our engineering team will prepare a tailored solution.',
    subject: 'Consultation Request',
    buttonLabel: 'Schedule Consultation',
  },
}

export default function CtaModal({ open, onClose, type }: CtaModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const nameRef = useRef<HTMLInputElement>(null)
  const cfg = config[type]
  const Icon = cfg.icon

  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 100)
    }
  }, [open])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const formData = new FormData(form)
    const data: Record<string, string> = { subject: cfg.subject }
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
                <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900 dark:text-white">Thank You!</h3>
                <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">We&apos;ve received your request. Our team will get back to you within 24 hours.</p>
                <div className="mt-6">
                  <Button variant="primary" onClick={onClose}>Close</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-amber-500 text-white shadow-lg">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-navy-900 dark:text-white">{cfg.title}</h3>
                    <p className="mt-0.5 text-sm text-navy-500 dark:text-navy-300">{cfg.desc}</p>
                  </div>
                </div>

                {status === 'error' && (
                  <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">Something went wrong. Please try again or call us directly.</p>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-navy-700 dark:text-navy-300">Full Name *</label>
                      <input ref={nameRef} name="name" type="text" required
                        className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-navy-900 dark:text-white"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-navy-700 dark:text-navy-300">Company</label>
                      <input name="company" type="text"
                        className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-navy-900 dark:text-white"
                        placeholder="Company name" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-navy-700 dark:text-navy-300">Email *</label>
                      <input name="email" type="email" required
                        className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-navy-900 dark:text-white"
                        placeholder="email@company.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-navy-700 dark:text-navy-300">Phone *</label>
                      <input name="phone" type="tel" required
                        className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 text-navy-900 dark:text-white"
                        placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-700 dark:text-navy-300">Message *</label>
                    <textarea name="message" required rows={3}
                      className="mt-1 w-full rounded-lg border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 resize-none text-navy-900 dark:text-white"
                      placeholder={type === 'consultation' ? 'Describe your project requirements...' : 'Any specific questions or requirements?'} />
                  </div>
                  <Button type="submit" variant="primary" className="w-full" disabled={status === 'loading'}>
                    <Send size={16} />
                    {status === 'loading' ? 'Sending...' : cfg.buttonLabel}
                  </Button>
                  <p className="text-center text-xs text-navy-400 dark:text-navy-500">
                    Or call us: <a href="tel:+918249785871" className="text-gold-600 font-medium">+91 82497 85871</a>
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