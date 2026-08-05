'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function FireExtinguisher() {
  const group = useRef<THREE.Group>(null)
  const innerRing = useRef<THREE.Mesh>(null)
  const outerRing = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (!group.current) return
    elapsed.current += delta
    group.current.rotation.y = elapsed.current * 0.08
    group.current.position.y = Math.sin(elapsed.current * 0.15) * 0.06
    if (innerRing.current) innerRing.current.rotation.z = elapsed.current * 0.2
    if (outerRing.current) outerRing.current.rotation.x = elapsed.current * 0.15
  })

  return (
    <group ref={group} position={[0, 0.3, 0]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.9, 32]} />
        <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.12, 16]} />
        <meshStandardMaterial color="#c8a45c" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.12, 1.45, 0]} castShadow>
        <boxGeometry args={[0.2, 0.04, 0.04]} />
        <meshStandardMaterial color="#c8a45c" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.15, 1.0, 0]} rotation={[0, 0, 0.3]}>
        <torusGeometry args={[0.1, 0.025, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.85, 0.31]}>
        <planeGeometry args={[0.15, 0.25]} />
        <meshBasicMaterial color="#fef3c7" />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.38, 0.04, 8, 32]} />
        <meshStandardMaterial color="#c8a45c" roughness={0.2} metalness={0.7} />
      </mesh>
      <mesh ref={innerRing} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.55, 32]} />
        <meshBasicMaterial color="#c8a45c" transparent opacity={0.15} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={outerRing} position={[0, 1.0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[0.45, 0.48, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  )
}

function SprinklerMist() {
  const count = 300
  const ref = useRef<THREE.Points>(null)
  const elapsed = useRef(0)

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 3
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = 2 + Math.random() * 0.8
      pos[i * 3 + 2] = Math.sin(angle) * radius
      spd[i] = 0.2 + Math.random() * 0.6
    }
    return [pos, spd]
  }, [])

  useFrame(() => {
    if (!ref.current) return
    elapsed.current
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= speeds[i] * 0.01
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 2 + Math.random() * 0.8
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 3
        positions[i * 3] = Math.cos(angle) * radius
        positions[i * 3 + 2] = Math.sin(angle) * radius
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#60a5fa"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function DetectionBeam() {
  const beam = useRef<THREE.Mesh>(null)
  const beam2 = useRef<THREE.Mesh>(null)
  const glow = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)

  useFrame((_, delta) => {
    if (!beam.current) return
    elapsed.current += delta
    const t = elapsed.current
    beam.current.rotation.y = t * 0.12
    beam.current.scale.x = 1 + Math.sin(t * 1.5) * 0.15
    if (beam2.current) {
      beam2.current.rotation.y = t * 0.12 + Math.PI / 2
    }
    if (glow.current) {
      glow.current.scale.setScalar(0.8 + Math.sin(t * 2) * 0.2)
    }
  })

  return (
    <group>
      <mesh ref={beam} position={[0, 0.5, 0]}>
        <planeGeometry args={[2.5, 0.01]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={beam2} position={[0, 0.5, 0]}>
        <planeGeometry args={[2.5, 0.01]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={glow} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function HeatRiseParticles() {
  const count = 120
  const ref = useRef<THREE.Points>(null)

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2
      pos[i * 3 + 1] = Math.random() * 0.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2
      spd[i] = 0.15 + Math.random() * 0.5
    }
    return [pos, spd]
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += speeds[i] * 0.008
      if (positions[i * 3 + 1] > 1) {
        positions[i * 3 + 1] = 0
        positions[i * 3] = (Math.random() - 0.5) * 2
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#f97316" transparent opacity={0.2} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  )
}

function FloatingParticles() {
  const count = 60
  const ref = useRef<THREE.Points>(null)
  const elapsed = useRef(0)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    elapsed.current += delta
    ref.current.rotation.y = elapsed.current * 0.02
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(elapsed.current * 0.5 + i) * 0.001
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#c8a45c" transparent opacity={0.15} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function BaseShield() {
  const elapsed = useRef(0)
  const innerRef = useRef<THREE.Mesh>(null)
  const outerRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    elapsed.current += delta
    if (innerRef.current) innerRef.current.rotation.z = elapsed.current * 0.05
    if (outerRef.current) outerRef.current.rotation.z = -elapsed.current * 0.03
  })

  return (
    <group>
      <mesh ref={outerRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[1.2, 3.5, 64]} />
        <meshBasicMaterial color="#c8a45c" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={innerRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <ringGeometry args={[1.5, 2.2, 64]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={0.5} castShadow />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#c8a45c" />
      <pointLight position={[0, 1, 0]} intensity={0.4} color="#ef4444" />
      <pointLight position={[-2, 2, -2]} intensity={0.3} color="#3b82f6" />
      <fog attach="fog" args={['#0b1d2e', 3, 8]} />
      <FireExtinguisher />
      <SprinklerMist />
      <DetectionBeam />
      <HeatRiseParticles />
      <FloatingParticles />
      <BaseShield />
    </>
  )
}

export default function HeroScene() {
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 42 }}
        dpr={[0.3, 0.8]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Scene />
      </Canvas>
    </div>
  )
}
