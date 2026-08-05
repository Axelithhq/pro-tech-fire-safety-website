'use client'

import dynamic from 'next/dynamic'

const BlueprintTransition = dynamic(() => import('./BlueprintTransition'), { ssr: false })

export default function BlueprintTransitionWrapper() {
  return <BlueprintTransition />
}
