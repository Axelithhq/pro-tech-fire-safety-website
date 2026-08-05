'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function BlueprintBuilding() {
  const mesh = useRef<THREE.Group>(null)
  const glowMesh = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)

  const lines = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const w = 2, h = 3, d = 1.5
    pts.push(new THREE.Vector3(-w, 0, -d), new THREE.Vector3(w, 0, -d))
    pts.push(new THREE.Vector3(w, 0, -d), new THREE.Vector3(w, 0, d))
    pts.push(new THREE.Vector3(w, 0, d), new THREE.Vector3(-w, 0, d))
    pts.push(new THREE.Vector3(-w, 0, d), new THREE.Vector3(-w, 0, -d))
    pts.push(new THREE.Vector3(-w, 0, -d), new THREE.Vector3(-w, h, -d))
    pts.push(new THREE.Vector3(w, 0, -d), new THREE.Vector3(w, h, -d))
    pts.push(new THREE.Vector3(w, 0, d), new THREE.Vector3(w, h, d))
    pts.push(new THREE.Vector3(-w, 0, d), new THREE.Vector3(-w, h, d))
    pts.push(new THREE.Vector3(-w, h, -d), new THREE.Vector3(w, h, -d))
    pts.push(new THREE.Vector3(w, h, -d), new THREE.Vector3(w, h, d))
    pts.push(new THREE.Vector3(w, h, d), new THREE.Vector3(-w, h, d))
    pts.push(new THREE.Vector3(-w, h, d), new THREE.Vector3(-w, h, -d))
    for (let i = 1; i < 4; i++) {
      const y = (h / 4) * i
      pts.push(new THREE.Vector3(-w, y, -d), new THREE.Vector3(w, y, -d))
      pts.push(new THREE.Vector3(-w, y, d), new THREE.Vector3(w, y, d))
    }
    return pts
  }, [])

  const positions = useMemo(() => {
    const arr: number[] = []
    lines.forEach((v) => arr.push(v.x, v.y, v.z))
    return new Float32Array(arr)
  }, [lines])

  useFrame((_, delta) => {
    if (!mesh.current) return
    elapsed.current += delta
    const t = elapsed.current
    mesh.current.rotation.y = Math.sin(t * 0.08) * 0.15
    mesh.current.position.y = Math.sin(t * 0.15) * 0.08
    if (glowMesh.current) {
      const mat = glowMesh.current.material
      if (mat && !Array.isArray(mat)) mat.opacity = 0.03 + Math.sin(t * 0.5) * 0.02
    }
  })

  return (
    <group ref={mesh}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#c8a45c" opacity={0.6} transparent />
      </lineSegments>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[4, 3, 3]} />
        <meshStandardMaterial color="#c8a45c" transparent opacity={0.04} wireframe />
      </mesh>
      <mesh ref={glowMesh} position={[0, 1.5, 0]}>
        <boxGeometry args={[4.2, 3.2, 3.2]} />
        <meshBasicMaterial color="#c8a45c" transparent opacity={0.04} />
      </mesh>
    </group>
  )
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null)
  const elapsed = useRef(0)

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(60 * 3)
    const spd = new Float32Array(60)
    for (let i = 0; i < 60; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
      spd[i] = 0.1 + Math.random() * 0.2
    }
    return [pos, spd]
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    elapsed.current += delta
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < 60; i++) {
      pos[i * 3 + 1] += Math.sin(elapsed.current * 0.3 + i) * 0.002
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#c8a45c" transparent opacity={0.15} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function BlueprintTransition() {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl bg-navy-50 md:h-96">
        <p className="text-navy-400">Company Timeline</p>
      </div>
    )
  }

  return (
    <div className="h-80 w-full rounded-2xl bg-gradient-to-b from-navy-900/10 to-navy-950 md:h-96">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        dpr={[0.3, 0.8]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 3, 3]} intensity={0.6} color="#c8a45c" />
        <BlueprintBuilding />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
