'use client'

import dynamic from 'next/dynamic'

const ThreeBackground = dynamic(
  () => import('@/components/three/ThreeBackground'),
  { ssr: false }
)

export default function ThreeBackgroundWrapper() {
  return <ThreeBackground particleCount={40} />
}
