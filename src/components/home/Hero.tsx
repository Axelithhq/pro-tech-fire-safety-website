'use client'

import ScrollCanvasSequence from '@/components/effects/ScrollCanvasSequence'

interface HeroProps {
  projectCount: number
}

export default function Hero({ projectCount }: HeroProps) {
  return (
    <section className="relative">
      <ScrollCanvasSequence
        totalFrames={128}
        pathPrefix="/hero-sequence-webp/ezgif-frame-"
        format="webp"
        padLength={3}
        projectCount={projectCount}
      />
    </section>
  )
}
