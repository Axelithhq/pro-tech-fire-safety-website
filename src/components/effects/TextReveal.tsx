'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

export default function TextReveal({ children, delay = 0, className, as: Tag = 'div' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  )
}
