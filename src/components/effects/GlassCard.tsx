'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'heavy'
}

export default function GlassCard({ children, className, intensity = 'medium' }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md',
        intensity === 'light' && 'border-white/20 bg-white/10',
        intensity === 'medium' && 'border-white/30 bg-white/20',
        intensity === 'heavy' && 'border-white/40 bg-white/30',
        className
      )}
    >
      {children}
    </div>
  )
}
