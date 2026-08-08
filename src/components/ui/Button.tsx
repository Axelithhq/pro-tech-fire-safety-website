'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  target?: string
  rel?: string
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
  disabled,
  target,
  rel,
}: ButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const base = cn(
    'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50',
    disabled && 'pointer-events-none opacity-50',
    {
      'bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-900':
        variant === 'primary',
      'bg-gold-500 text-navy-900 hover:bg-gold-400 active:bg-gold-600':
        variant === 'secondary',
      'border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-navy-900':
        variant === 'outline',
      'text-navy-900 hover:text-gold-600': variant === 'ghost',
    },
    {
      'px-5 py-2 text-sm': size === 'sm',
      'px-8 py-3 text-sm': size === 'md',
      'px-10 py-4 text-base': size === 'lg',
    },
    className
  )

  const inner = href ? (
    <Link href={href} className={base} target={target} rel={rel}>
      {children}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={base} disabled={disabled}>
      {children}
    </button>
  )

  if (reduced) return inner

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      onMouseMove={(e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {inner}
    </motion.div>
  )
}
