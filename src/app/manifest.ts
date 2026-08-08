import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pro-Tech Fire & Safety Engineering',
    short_name: 'Pro-Tech Fire',
    description: 'Premier turnkey fire protection, sprinkler, and safety engineering solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#d97706',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
