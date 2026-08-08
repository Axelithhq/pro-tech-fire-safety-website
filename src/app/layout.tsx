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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://protechfiresafety.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pro-Tech Fire & Safety | Premier Fire Protection & Safety Engineering',
    template: '%s | Pro-Tech Fire & Safety',
  },
  description:
    'Pro-Tech Fire & Safety is India\'s leading turnkey fire protection engineering enterprise. Specialized in NFPA & NBC compliant fire detection, automatic sprinkler systems, CO2 suppression, hydrants, and safety audits.',
  keywords: [
    'fire safety engineering',
    'fire protection systems India',
    'automatic fire sprinklers',
    'fire alarm detection system',
    'CO2 fire suppression system',
    'fire hydrants installation',
    'NBC compliant fire audit',
    'NFPA fire safety contractor',
    'turnkey EPC fire safety',
    'Kolkata fire safety engineering',
    'industrial fire safety solutions',
  ],
  authors: [{ name: 'Pro-Tech Fire & Safety Engineering', url: siteUrl }],
  creator: 'Pro-Tech Fire & Safety',
  publisher: 'Pro-Tech Fire & Safety',
  category: 'Engineering & Construction Safety',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Pro-Tech Fire & Safety | Turnkey Fire Protection Engineering',
    description:
      'Turnkey fire detection, sprinkler systems, hydrants, gas suppression, and safety engineering for commercial, industrial, and infrastructure projects across India.',
    url: siteUrl,
    siteName: 'Pro-Tech Fire & Safety',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${siteUrl}/icon.svg`,
        width: 1200,
        height: 630,
        alt: 'Pro-Tech Fire & Safety Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro-Tech Fire & Safety Engineering',
    description:
      'India\'s premier turnkey fire safety engineering and protection systems contractor.',
    images: [`${siteUrl}/icon.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FireProtectionService',
  name: 'Pro-Tech Fire & Safety',
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/icon.svg`,
  description:
    'India\'s premier fire protection engineering company. Turnkey fire detection, automatic sprinklers, hydrants, CO2 flooding systems, and NFPA/NBC safety compliance.',
  telephone: '+91-9830000000',
  email: 'info@protechfire.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pro-Tech House, Sector 5',
    addressLocality: 'Kolkata',
    addressRegion: 'West Bengal',
    postalCode: '700091',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.5726',
    longitude: '88.4331',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$$$',
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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

