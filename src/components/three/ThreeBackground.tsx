'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function FloatingParticles({ count = 120 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)
  const elapsed = useRef(0)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const siz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
      siz[i] = 0.05 + Math.random() * 0.15
    }
    return [pos, siz]
  }, [count])

  // Dynamically generate a circular glow texture
  const dotTexture = useMemo(() => {
    if (typeof window === 'undefined') return null
    const c = document.createElement('canvas')
    c.width = 32
    c.height = 32
    const ctx = c.getContext('2d')
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 32, 32)
    }
    const tex = new THREE.CanvasTexture(c)
    return tex
  }, [])

  useFrame((state, delta) => {
    if (!mesh.current) return
    elapsed.current += delta
    const pos = mesh.current.geometry.attributes.position.array as Float32Array
    
    // Project mouse coordinates to 3D space
    const targetX = state.pointer.x * 6.5
    const targetY = state.pointer.y * 6.5

    for (let i = 0; i < count; i++) {
      // Base natural drift
      pos[i * 3 + 1] += Math.sin(elapsed.current * 0.25 + i) * 0.0008
      pos[i * 3] += Math.cos(elapsed.current * 0.25 + i * 0.5) * 0.0008
      
      // Interactive mouse attraction
      const dx = targetX - pos[i * 3]
      const dy = targetY - pos[i * 3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < 4.5) {
        // Gently sway towards pointer
        pos[i * 3] += (dx / dist) * 0.004 * (4.5 - dist)
        pos[i * 3 + 1] += (dy / dist) * 0.004 * (4.5 - dist)
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = elapsed.current * 0.006
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        map={dotTexture || undefined}
        color="#c8a45c"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingRings() {
  const group = useRef<THREE.Group>(null)
  const elapsed = useRef(0)

  const rings = useMemo(() => {
    const r: { radius: number; color: string; speed: number; tilt: number }[] = []
    for (let i = 0; i < 5; i++) {
      r.push({
        radius: 1.8 + i * 1.5,
        color: i % 2 === 0 ? '#c8a45c' : '#3b82f6',
        speed: 0.04 + i * 0.015,
        tilt: (i / 5) * Math.PI,
      })
    }
    return r
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    elapsed.current += delta
    group.current.rotation.y = elapsed.current * 0.04
    group.current.rotation.x = Math.sin(elapsed.current * 0.02) * 0.04
  })

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[ring.tilt * 0.25, 0, 0]} position={[0, 0, -i * 0.6]}>
          <ringGeometry args={[ring.radius - 0.015, ring.radius, 64]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.05} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

interface ThreeBackgroundProps {
  className?: string
  particleCount?: number
  showRings?: boolean
  opacity?: number
}

export default function ThreeBackground({
  className = '',
  particleCount = 120,
  showRings = true,
  opacity = 0.45,
}: ThreeBackgroundProps) {
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{ opacity }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.8) : 1}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        style={{ background: 'transparent' }}
      >
        <FloatingParticles count={particleCount} />
        {showRings && <FloatingRings />}
      </Canvas>
    </div>
  )
}
