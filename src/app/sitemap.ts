import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.protechfire.com'

  const routes = [
    '/',
    '/about',
    '/services',
    '/products',
    '/projects',
    '/contact',
    '/gallery',
    '/blog',
    '/careers',
    '/terms',
    '/privacy',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'monthly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
