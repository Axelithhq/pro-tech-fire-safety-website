'use client'

import { useEffect } from 'react'

export default function SuppressWarnings() {
  useEffect(() => {
    const originalWarn = console.warn
    console.warn = (...args: unknown[]) => {
      const msg = typeof args[0] === 'string' ? args[0] : ''
      if (msg.includes('THREE.Clock') || msg.includes('deprecated')) return
      originalWarn.apply(console, args)
    }
    return () => { console.warn = originalWarn }
  }, [])

  return null
}
