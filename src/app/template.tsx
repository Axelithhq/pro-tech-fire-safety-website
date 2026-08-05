'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Template({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotateX: 1.5, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1], // Premium cubic-bezier for "butter-like" entry
      }}
      style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}
