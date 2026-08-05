'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, FileText } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import ThemeToggle from '@/components/ui/ThemeToggle'
import QuoteModal from '@/components/ui/QuoteModal'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLDivElement>(null)

  if (pathname.startsWith('/admin')) return null

  const { scrollY } = useScroll()

  const pillOpacity = useTransform(scrollY, [0, 80], [0.85, 1])
  const pillY = useTransform(scrollY, [0, 80], [-8, 0])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12 pt-4">
        <motion.div
          ref={headerRef}
          className="flex items-center justify-between rounded-full px-5 py-2.5 border border-white/20 bg-black/20 shadow-lg shadow-black/30 backdrop-blur-2xl"
          style={{
            opacity: pillOpacity,
            y: pillY,
          }}
        >
          {/* Logo */}
          <Link href="/" prefetch={true} className="group flex items-center gap-2.5 shrink-0">
            <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-gold-500/40 transition-transform duration-300 group-hover:scale-105">
              <Image src="/images/logo.png" alt="Pro-Tech Fire & Safety" fill sizes="36px" className="object-contain" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight tracking-tight text-white drop-shadow-sm">
                Pro-Tech
              </p>
              <p className="text-[9px] font-semibold leading-tight tracking-[0.2em] text-gold-400 uppercase drop-shadow-sm">
                Fire & Safety
              </p>
            </div>
          </Link>

          {/* Nav + CTA */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={cn(
                    'relative px-3 py-1.5 text-sm font-medium tracking-wide transition-all duration-300 rounded-full drop-shadow-sm',
                    isActive
                      ? 'text-gold-400 bg-white/15'
                      : 'text-white/80 hover:text-gold-400 hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="ml-2 pl-2 border-l border-white/20 flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setQuoteOpen(true)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 px-4 py-2 text-xs font-bold text-navy-900 uppercase tracking-wider shadow-lg shadow-gold-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/40 hover:scale-105"
              >
                <FileText size={14} />
                Free Quote
              </button>
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex lg:hidden items-center justify-center h-9 w-9 rounded-full bg-white/15 text-white backdrop-blur-sm"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className={cn(
          'fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-navy-950/98 backdrop-blur-2xl transition-all duration-500 lg:hidden',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        {navLinks.map((link, idx) => {
          const isActive = pathname === link.href
          return (
            <motion.div
              key={link.href}
              variants={{
                open: { opacity: 1, y: 0, transition: { delay: idx * 0.05, duration: 0.3, ease: 'easeOut' } },
                closed: { opacity: 0, y: 15, transition: { duration: 0.15 } }
              }}
            >
              <Link
                href={link.href}
                prefetch={true}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-3xl font-bold tracking-wide transition-colors',
                  isActive ? 'text-gold-400' : 'text-white/60 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          )
        })}
        <motion.div
          variants={{
            open: { opacity: 1, y: 0, transition: { delay: navLinks.length * 0.05, duration: 0.3, ease: 'easeOut' } },
            closed: { opacity: 0, y: 15, transition: { duration: 0.15 } }
          }}
          className="mt-4 flex flex-col items-center gap-6"
        >
          <button
            onClick={() => { setIsOpen(false); setQuoteOpen(true) }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 px-6 py-3 text-sm font-bold text-navy-900 uppercase tracking-wider shadow-lg shadow-gold-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/40"
          >
            <FileText size={16} />
            Free Quote
          </button>
          
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 border border-white/15 shadow-inner backdrop-blur-md">
            <span className="text-xs text-white/60 font-semibold tracking-wider uppercase">Theme</span>
            <ThemeToggle />
          </div>
        </motion.div>
      </motion.div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </header>
  )
}
