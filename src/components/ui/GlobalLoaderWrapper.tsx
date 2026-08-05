'use client'

import dynamic from 'next/dynamic'

const GlobalLoader = dynamic(() => import('@/components/ui/GlobalLoader'), { ssr: false })

export default function GlobalLoaderWrapper() {
  return <GlobalLoader />
}
