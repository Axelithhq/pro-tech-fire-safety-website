import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/lib/ThemeProvider'
import ThreeBackgroundWrapper from '@/components/three/ThreeBackgroundWrapper'
import GlobalLoaderWrapper from '@/components/ui/GlobalLoaderWrapper'
import SuppressWarnings from '@/lib/suppressWarnings'
import SmoothScroll from '@/components/effects/SmoothScroll'
import CustomCursor from '@/components/effects/CustomCursor'

function LoadingFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
        <p className="text-sm text-navy-400">Loading...</p>
      </div>
    </div>
  )
}

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://protechfiresafety.com'),
  title: {
    default: 'Pro-Tech Fire & Safety | Premier Fire Protection Engineering',
    template: '%s | Pro-Tech Fire & Safety',
  },
  description:
    'India\'s premier fire protection engineering company. Comprehensive fire detection, suppression, and safety solutions for commercial, industrial, and residential projects.',
  keywords: [
    'fire safety',
    'fire protection',
    'fire detection',
    'fire suppression',
    'safety engineering',
    'India',
  ],
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>
          <SuppressWarnings />
          <SmoothScroll />
          <CustomCursor />
          <ThreeBackgroundWrapper />
          <GlobalLoaderWrapper />
          <Header />
          <main className="relative z-10" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
            <Suspense fallback={<LoadingFallback />}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
