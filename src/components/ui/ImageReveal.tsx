'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ImageRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function ImageReveal({
  children,
  className = '',
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
        transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
