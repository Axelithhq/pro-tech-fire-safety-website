'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  distance?: number
  once?: boolean
  scale?: boolean
}

const variants = {
  hidden: (dir: string, dist: number, scale: boolean) => ({
    opacity: 0,
    ...(dir === 'up' && { y: dist }),
    ...(dir === 'down' && { y: -dist }),
    ...(dir === 'left' && { x: dist }),
    ...(dir === 'right' && { x: -dist }),
    ...(dir === 'none' && {}),
    ...(scale && { scale: 0.95 }),
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
  distance = 60,
  once = true,
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      custom={[direction, distance, scale]}
      animate={isInView ? 'visible' : 'hidden'}
      variants={{ hidden: variants.hidden(direction, distance, scale), visible: variants.visible }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
