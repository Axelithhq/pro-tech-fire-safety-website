import type { MetadataRoute } from 'next'
import { getServices, getProducts, getPosts, getProjects, getIndustries } from '@/lib/cms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://protechfiresafety.com'

  // Static core routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/products',
    '/projects',
    '/contact',
    '/gallery',
    '/blog',
    '/careers',
    '/industries',
    '/terms',
    '/privacy',
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/services' || route === '/products' || route === '/contact' ? 0.9 : 0.8,
  }))

  // Dynamic CMS routes
  const [services, products, posts, projects, industries] = await Promise.all([
    getServices(),
    getProducts(),
    getPosts(),
    getProjects(),
    getIndustries(),
  ])

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const postEntries: MetadataRoute.Sitemap = posts
    .filter((post) => post.is_published !== false)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [
    ...staticEntries,
    ...serviceEntries,
    ...productEntries,
    ...postEntries,
    ...projectEntries,
  ]
}
