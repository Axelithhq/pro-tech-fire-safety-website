'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  // Mouse coordinates using motion values
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring settings for trailing effect
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 }
  const trailingX = useSpring(cursorX, springConfig)
  const trailingY = useSpring(cursorY, springConfig)

  useEffect(() => {
    setIsMounted(true)
    
    // Check if device is touch-based
    const checkTouch = () => {
      const match = window.matchMedia('(pointer: coarse)').matches
      setIsTouch(match)
      if (!match) setIsVisible(true)
    }
    
    checkTouch()

    const moveCursor = (e: PointerEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible && !isTouch) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Listen to move events
    window.addEventListener('pointermove', moveCursor, { passive: true })
    document.addEventListener('pointerleave', handleMouseLeave)
    document.addEventListener('pointerenter', handleMouseEnter)

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')

      setIsHovered(!!isInteractive)
    }

    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('pointermove', moveCursor)
      document.removeEventListener('pointerleave', handleMouseLeave)
      document.removeEventListener('pointerenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, isVisible, isTouch])

  if (!isMounted || isTouch || reducedMotion) return null

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Trailing Outer Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/80 mix-blend-difference"
        style={{
          x: trailingX,
          y: trailingY,
          scale: isHovered ? 2.0 : 1,
          backgroundColor: isHovered ? 'rgba(200, 164, 92, 0.15)' : 'rgba(200, 164, 92, 0)',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}
