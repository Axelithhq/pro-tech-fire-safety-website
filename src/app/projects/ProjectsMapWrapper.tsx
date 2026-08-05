'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { ProjectRow } from '@/lib/types'

const IndiaMap = dynamic(() => import('@/components/three/IndiaMap'), { ssr: false })

interface ProjectsMapWrapperProps {
  projects: ProjectRow[]
}

export default function ProjectsMapWrapper({ projects }: ProjectsMapWrapperProps) {
  const [selected, setSelected] = useState<ProjectRow | null>(null)

  return (
    <div>
      <IndiaMap projects={projects} onSelect={setSelected} />
      {selected && (
        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-navy-900">{selected.title}</p>
          <p className="mt-1 text-xs text-navy-500">{selected.location || `${selected.city}, ${selected.state}`}</p>
        </div>
      )}
    </div>
  )
}
