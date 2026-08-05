'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ProjectRow } from '@/lib/types'

interface ProjectMarkerProps {
  project: ProjectRow
  active: boolean
  onClick: () => void
}

const projectCoords: Record<string, [number, number]> = {
  'IRCON International Ltd — Fire Extinguishers & Sprinkler Systems': [0, 0.5],
  'DLF NTH, Kolkata — Fire Extinguishers': [1.2, -0.2],
  'ITPL Road, Bengaluru — HVAC Ventilation': [0.6, -1.5],
  'IT Project, Bengaluru — Structured Cabling & Surveillance': [0.6, -1.5],
  'Sadguru Hospital, Cuttack — Fire Safety Equipment': [1.0, -0.5],
  'Orchid Residency, Bhubaneswar — STP & WTP': [1.0, -0.5],
  'Hospital, Jagatpur, Cuttack — Sprinkler System': [1.0, -0.5],
  'Industrial Project, Jharsuguda — Dry Sprinkler & Deluge Valve': [0.7, -0.3],
  'Residential Project, Navi Mumbai — Electrical & BMS': [-0.2, -1.0],
  'Residential Building, Bengaluru — Fire Alarm System': [0.6, -1.5],
  'IT Building, Bhubaneswar — Fire Alarm System': [1.0, -0.5],
  'GOAW, Neemuch — Fire Fighting Items': [0.3, -0.1],
  'Commercial Buildings, Airports & Hospitals — Fire Rated Metal Doors': [0, 0.5],
}

function ProjectMarker({ project, active, onClick }: ProjectMarkerProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)
  const coords = projectCoords[project.title] || [Math.random() * 2 - 1, Math.random() * 2 - 1]

  useFrame((_, delta) => {
    if (!mesh.current) return
    elapsed.current += delta
    const pulse = Math.sin(elapsed.current * 2 + coords[0]) * 0.08 + 0.15
    mesh.current.scale.setScalar(active ? 1.5 : 0.8 + pulse)
    if (glow.current) {
      glow.current.scale.setScalar(active ? 1.2 + Math.sin(elapsed.current * 3) * 0.15 : 0.8 + pulse)
      const mat = glow.current.material
      if (mat && !Array.isArray(mat)) mat.opacity = active ? 0.15 : 0.05
    }
  })

  return (
    <group position={[coords[0], 0.05, coords[1]]}>
      <mesh ref={glow}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={active ? '#c8a45c' : '#ef4444'} transparent opacity={0.05} />
      </mesh>
      <mesh ref={mesh} onClick={onClick}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color={active ? '#c8a45c' : '#ef4444'}
          emissive={active ? '#c8a45c' : '#ef4444'}
          emissiveIntensity={active ? 0.5 : 0.2}
        />
      </mesh>
      {active && (
        <mesh position={[0, -0.15, 0]}>
          <planeGeometry args={[0.6, 0.15]} />
          <meshBasicMaterial color="#c8a45c" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  )
}

function IndiaOutline() {
  const outline = useMemo(() => {
    const shape = new THREE.Shape()
    const pts: [number, number][] = [
      [-1.0, 0.8], [-0.6, 1.0], [0.0, 1.2], [0.5, 1.1],
      [1.0, 0.9], [1.4, 0.4], [1.5, -0.2], [1.3, -0.8],
      [1.0, -1.3], [0.5, -1.6], [0.0, -1.7], [-0.5, -1.5],
      [-1.0, -1.2], [-1.3, -0.8], [-1.4, -0.3], [-1.2, 0.2],
      [-1.0, 0.5], [-1.0, 0.8],
    ]
    shape.moveTo(pts[0][0], pts[0][1])
    pts.slice(1).forEach(([x, y]) => shape.lineTo(x, y))
    return shape
  }, [])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <shapeGeometry args={[outline]} />
        <meshStandardMaterial color="#243b53" roughness={0.7} metalness={0.2} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <edgesGeometry args={[new THREE.ShapeGeometry(outline)]} />
        <lineBasicMaterial color="#c8a45c" transparent opacity={0.15} />
      </lineSegments>
    </group>
  )
}

function AmbientGrid() {
  return (
    <group>
      {[-2, -1, 0, 1, 2].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.01, 4]} />
          <meshBasicMaterial color="#c8a45c" transparent opacity={0.03} />
        </mesh>
      ))}
      {[-2, -1, 0, 1, 2].map((z) => (
        <mesh key={z} position={[0, 0, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 0.01]} />
          <meshBasicMaterial color="#c8a45c" transparent opacity={0.03} />
        </mesh>
      ))}
    </group>
  )
}

interface IndiaMapProps {
  projects: ProjectRow[]
  onSelect: (project: ProjectRow) => void
}

export default function IndiaMap({ projects, onSelect }: IndiaMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl bg-navy-50 md:h-96">
        <p className="text-navy-400">Project Locations Map</p>
      </div>
    )
  }

  const unique = projects.filter((p, i, a) => {
    const key = `${p.city || ''}${p.state || ''}`
    return i === a.findIndex((x) => `${x.city || ''}${x.state || ''}` === key)
  })

  return (
    <div className="h-80 w-full rounded-2xl bg-gradient-to-b from-navy-900/5 to-navy-950 md:h-96">
      <Canvas
        camera={{ position: [0, 2.5, 3.5], fov: 40 }}
        dpr={[0.3, 0.8]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 5, 3]} intensity={0.4} />
        <fog attach="fog" args={['#0b1d2e', 2, 5]} />
        <IndiaOutline />
        <AmbientGrid />
        {unique.map((p) => (
          <ProjectMarker
            key={p.id}
            project={p}
            active={activeId === p.id}
            onClick={() => {
              setActiveId(p.id)
              onSelect(p)
            }}
          />
        ))}
      </Canvas>
    </div>
  )
}
