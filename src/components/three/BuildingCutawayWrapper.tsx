'use client'

import dynamic from 'next/dynamic'

const BuildingCutaway = dynamic(() => import('./BuildingCutaway'), { ssr: false })

export default function BuildingCutawayWrapper() {
  return <BuildingCutaway />
}
