'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltMaxAngle?: number
  scale?: number
}

export default function TiltCard({
  children,
  className = '',
  tiltMaxAngle = 12,
  scale = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // Motion values for x/y mouse coordinates relative to the card dimensions
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  // Map relative position to angles
  const rotateX = useTransform(y, [0, 1], [tiltMaxAngle, -tiltMaxAngle])
  const rotateY = useTransform(x, [0, 1], [-tiltMaxAngle, tiltMaxAngle])

  // Glare position mappings
  const glareX = useTransform(x, [0, 1], ['0%', '100%'])
  const glareY = useTransform(y, [0, 1], ['0%', '100%'])
  const glareOpacity = useMotionValue(0)

  // Spring animations for ultra-smooth responsiveness
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  const springScale = useSpring(1, springConfig)
  const springGlareOpacity = useSpring(glareOpacity, springConfig)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    // Calculate relative mouse coordinates (0 to 1)
    x.set(mouseX / width)
    y.set(mouseY / height)

    glareOpacity.set(0.4)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
    springScale.set(1)
    glareOpacity.set(0)
  }

  const handleMouseEnter = () => {
    springScale.set(scale)
  }

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`relative transform-3d select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
      }}
    >
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit]"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle 250px at ${gx} ${gy}, rgba(255,255,255,0.12), transparent 80%)`
          ),
          opacity: springGlareOpacity,
        }}
      />
      {children}
    </motion.div>
  )
}
