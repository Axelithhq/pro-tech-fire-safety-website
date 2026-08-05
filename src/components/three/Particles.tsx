'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ParticlesProps {
  count?: number
  color?: string
  speed?: number
}

export default function Particles({ count = 200, color = '#c8a45c', speed = 0.05 }: ParticlesProps) {
  const reduced = useReducedMotion()
  const mesh = useRef<THREE.Points>(null)
  const elapsed = useRef(0)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (!mesh.current || reduced) return
    elapsed.current += delta
    mesh.current.rotation.y = elapsed.current * speed * 0.1
    mesh.current.rotation.x = Math.sin(elapsed.current * speed * 0.05) * 0.05
  })

  if (reduced) return null

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
