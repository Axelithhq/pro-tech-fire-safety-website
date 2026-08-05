'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, AdaptiveDpr, AdaptiveEvents, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ProductRow } from '@/lib/types'

interface MeshProps {
  product: ProductRow
}

function productGeometry(product: ProductRow) {
  const slug = product.slug
  if (slug.includes('extinguisher')) return 'cylinder'
  if (slug.includes('sprinkler')) return 'torus'
  if (slug.includes('panel') || slug.includes('door')) return 'box'
  if (slug.includes('detector')) return 'sphere'
  return 'box'
}

function ProductMesh({ product }: MeshProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const elapsed = useRef(0)
  const geo = productGeometry(product)

  useFrame((_, delta) => {
    if (!mesh.current) return
    elapsed.current += delta
    mesh.current.rotation.y = elapsed.current * 0.3
  })

  const color = '#c8a45c'

  if (geo === 'cylinder') {
    return (
      <mesh ref={mesh} castShadow>
        <cylinderGeometry args={[0.6, 0.5, 1.2, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
      </mesh>
    )
  }
  if (geo === 'torus') {
    return (
      <mesh ref={mesh} castShadow>
        <torusGeometry args={[0.8, 0.2, 16, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} />
      </mesh>
    )
  }
  if (geo === 'box') {
    return (
      <mesh ref={mesh} castShadow>
        <boxGeometry args={[1.4, 0.9, 0.4]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
      </mesh>
    )
  }
  return (
    <mesh ref={mesh} castShadow>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
    </mesh>
  )
}

interface ProductViewerProps {
  products: ProductRow[]
}

export default function ProductViewer({ products }: ProductViewerProps) {
  const [idx, setIdx] = useState(0)
  const product = products[idx]
  const reduced = useReducedMotion()

  if (!product || reduced) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl bg-navy-50 md:h-96">
        <p className="text-navy-400">3D Viewer</p>
      </div>
    )
  }

  return (
    <div>
      <div className="h-80 w-full rounded-2xl bg-gradient-to-b from-navy-900/5 to-navy-900/10 md:h-96">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 40 }}
          dpr={[0.5, 1]}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
        >
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <pointLight position={[-3, 3, -3]} intensity={0.3} color="#c8a45c" />
          <ProductMesh product={product} />
          <OrbitControls enableZoom enableRotate autoRotate={false} />
          <Environment preset="city" />
        </Canvas>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setIdx(i)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              i === idx ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>
    </div>
  )
}
