'use client'

import { usePathname } from 'next/navigation'
import { useLenis } from '@/hooks/useLenis'

function LenisEffect() {
  useLenis()
  return null
}

export default function SmoothScroll() {
  const pathname = usePathname()
  
  // Disable Lenis on admin pages to avoid scrolling conflicts and hijacking
  if (pathname.startsWith('/admin')) {
    return null
  }
  
  return <LenisEffect />
}

