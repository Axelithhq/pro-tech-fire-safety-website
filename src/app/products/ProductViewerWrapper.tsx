'use client'

import { Suspense, lazy } from 'react'
import type { ProductRow } from '@/lib/types'

const ProductViewer = lazy(() => import('@/components/three/ProductViewer'))

interface ProductViewerWrapperProps {
  products: ProductRow[]
}

export default function ProductViewerWrapper({ products }: ProductViewerWrapperProps) {
  if (products.length === 0) return null

  return (
    <Suspense fallback={<div className="h-80 animate-pulse rounded-2xl bg-navy-100 md:h-96" />}>
      <ProductViewer products={products} />
    </Suspense>
  )
}
