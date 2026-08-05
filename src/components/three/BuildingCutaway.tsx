'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SystemZone {
  id: string
  label: string
  color: string
  position: [number, number, number]
  size: [number, number, number]
}

const systems: SystemZone[] = [
  { id: 'alarm', label: 'Fire Alarm', color: '#ef4444', position: [-1.2, 1.5, 1.1], size: [0.6, 0.3, 0.3] },
  { id: 'sprinkler', label: 'Sprinkler', color: '#3b82f6', position: [1.2, 2.2, 1.1], size: [0.6, 0.3, 0.3] },
  { id: 'hydrant', label: 'Hydrant', color: '#22c55e', position: [0, 0.5, 1.1], size: [0.6, 0.6, 0.3] },
  { id: 'smoke', label: 'Smoke Detection', color: '#eab308', position: [-1.2, 2.8, 1.1], size: [0.6, 0.2, 0.3] },
  { id: 'lighting', label: 'Emergency Lighting', color: '#f97316', position: [1.2, 0.8, 1.1], size: [0.6, 0.2, 0.3] },
]

function BuildingShell() {
  const elapsed = useRef(0)
  const shellRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    elapsed.current += delta
    if (shellRef.current) {
      shellRef.current.rotation.y = Math.sin(elapsed.current * 0.1) * 0.02
    }
  })

  const floors = useMemo(() => {
    const f = []
    for (let i = 0; i < 3; i++) {
      f.push(
        <mesh key={`floor-${i}`} position={[0, -1 + (i + 0.5) * 1.5, 0]}>
          <boxGeometry args={[2.8, 0.02, 1.8]} />
          <meshBasicMaterial color="#c8a45c" transparent opacity={0.08} />
        </mesh>
      )
    }
    return f
  }, [])

  return (
    <group ref={shellRef}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[3, 3, 2]} />
        <meshStandardMaterial
          color="#243b53"
          roughness={0.4}
          metalness={0.3}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3, 3, 2)]} />
        <lineBasicMaterial color="#c8a45c" opacity={0.15} transparent />
      </lineSegments>
      {floors}
    </group>
  )
}

function HighlightedZone({ zone, active }: { zone: SystemZone; active: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (!mesh.current) return
    elapsed.current += delta
    const pulse = Math.sin(elapsed.current * 2) * 0.15 + 0.35
    const mat = mesh.current.material
    if (mat && !Array.isArray(mat)) mat.opacity = active ? pulse : 0.08
    if (glow.current) {
      glow.current.scale.setScalar(active ? 1 + Math.sin(elapsed.current * 3) * 0.1 : 1)
    }
  })

  return (
    <group>
      <mesh ref={mesh} position={zone.position}>
        <boxGeometry args={zone.size} />
        <meshStandardMaterial
          color={zone.color}
          transparent
          opacity={0.3}
          emissive={zone.color}
          emissiveIntensity={active ? 0.4 : 0}
        />
      </mesh>
      {active && (
        <mesh ref={glow} position={zone.position}>
          <boxGeometry args={[zone.size[0] + 0.3, zone.size[1] + 0.3, zone.size[2] + 0.3]} />
          <meshBasicMaterial color={zone.color} transparent opacity={0.06} />
        </mesh>
      )}
    </group>
  )
}

function ConnectionLines() {
  const linesRef = useRef<THREE.Group>(null)
  const elapsed = useRef(0)

  const linePositions = useMemo(() => {
    const pts: number[] = []
    systems.forEach((s) => {
      const [x, y, z] = s.position
      pts.push(0, 1.5, 0, x, y, z)
    })
    return new Float32Array(pts)
  }, [])

  useFrame((_, delta) => {
    elapsed.current += delta
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.LineSegments) {
          const mat = child.material as THREE.LineBasicMaterial
          mat.opacity = 0.05 + Math.sin(elapsed.current * 0.5 + i) * 0.03
        }
      })
    }
  })

  return (
    <group ref={linesRef}>
      {systems.map((_, i) => (
        <lineSegments key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions.slice(i * 6, i * 6 + 6), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#c8a45c" transparent opacity={0.06} />
        </lineSegments>
      ))}
    </group>
  )
}

function AmbientParticles() {
  const ref = useRef<THREE.Points>(null)
  const elapsed = useRef(0)

  const positions = useMemo(() => {
    const pos = new Float32Array(50 * 3)
    for (let i = 0; i < 50; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5
      pos[i * 3 + 1] = Math.random() * 4
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    elapsed.current += delta
    if (!ref.current) return
    ref.current.rotation.y = elapsed.current * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#c8a45c" transparent opacity={0.1} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function BuildingCutaway() {
  const [active, setActive] = useState<string>('alarm')
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl bg-navy-50 md:h-96">
        <p className="text-navy-400">Building Cutaway View</p>
      </div>
    )
  }

  return (
    <div>
      <div className="h-80 w-full rounded-2xl bg-gradient-to-b from-navy-900/5 to-navy-900/10 md:h-96">
        <Canvas
          camera={{ position: [4, 2, 4], fov: 40 }}
          dpr={[0.3, 0.8]}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <pointLight position={[0, 3, 0]} intensity={0.3} color="#c8a45c" />
          <BuildingShell />
          <ConnectionLines />
          <AmbientParticles />
          {systems.map((s) => (
            <HighlightedZone key={s.id} zone={s} active={s.id === active} />
          ))}
          <OrbitControls enableZoom enableRotate autoRotate={false} />
        </Canvas>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {systems.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
              s.id === active ? 'text-white' : 'text-navy-600 hover:bg-navy-100 dark:text-navy-300 dark:hover:bg-navy-800'
            }`}
            style={{
              backgroundColor: s.id === active ? s.color : undefined,
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}
