'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function GlobalLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    rail.classList.remove('animate-progress')
    requestAnimationFrame(() => {
      rail.classList.add('animate-progress')
    })
    const timer = setTimeout(() => {
      rail.classList.remove('animate-progress')
    }, 800)
    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <div className="pointer-events-none fixed top-0 left-0 right-0 z-[99999] h-0.5 bg-transparent overflow-hidden">
      <div
        ref={railRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 opacity-0 transition-all duration-300"
        style={{ transformOrigin: 'left' }}
      />
      <style>{`
        .animate-progress {
          animation: global-progress 1s ease-out forwards !important;
          opacity: 1 !important;
        }
        @keyframes global-progress {
          0% { transform: scaleX(0); opacity: 1; }
          30% { transform: scaleX(0.5); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
