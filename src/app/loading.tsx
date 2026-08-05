'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame: number
    const start = Date.now()
    const animate = () => {
      const t = Math.min((Date.now() - start) / 3000, 1)
      setProgress(t)
      if (t < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950">
      <div className="relative mb-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <svg viewBox="0 0 100 100" className="h-12 w-12">
            <defs>
              <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c8a45c" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <path d="M50 15 L65 45 L50 38 L35 45 Z" fill="url(#lg)" />
            <path d="M50 35 L70 55 L50 50 L30 55 Z" fill="url(#lg)" opacity="0.7" />
            <path d="M50 55 L65 85 L50 78 L35 85 Z" fill="url(#lg)" />
          </svg>
        </div>
        <div
          className="absolute -inset-4 animate-spin rounded-full border border-dashed border-gold-500/20"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="absolute -inset-6 animate-spin rounded-full border border-dashed border-amber-400/10"
          style={{ animationDuration: '6s', animationDirection: 'reverse' }}
        />
      </div>

      <p className="font-heading text-xl font-bold text-white">Pro-Tech Fire & Safety</p>
      <p className="mt-1 text-xs text-white/30">Loading experience</p>

      <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-200 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-white/30">{Math.round(progress * 100)}%</p>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        .particle-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(200, 164, 92, 0.2);
          animation: dot-pulse 3s ease-in-out infinite;
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.5); }
        }
      `}</style>
    </div>
  )
}
