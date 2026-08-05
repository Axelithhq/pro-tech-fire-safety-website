'use client'

import { useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MouseParallaxProps {
  children: ReactNode
  factor?: number
  className?: string
}

export default function MouseParallax({ children, factor = 0.02, className }: MouseParallaxProps) {
  const { x, y } = useMousePosition()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        x: (x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * factor,
        y: (y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * factor,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
