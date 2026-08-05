'use client'

import { useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  as?: 'button' | 'a'
  href?: string
}

export default function MagneticButton({ children, className, onClick, as = 'button', href }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  if (reduced) {
    const Tag = as === 'a' ? 'a' : 'button'
    return <Tag href={href} className={className} onClick={onClick}>{children}</Tag>
  }

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      onMouseMove={(e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {as === 'a' ? (
        <a href={href} className={className} onClick={onClick}>{children}</a>
      ) : (
        <button className={className} onClick={onClick}>{children}</button>
      )}
    </motion.div>
  )
}
