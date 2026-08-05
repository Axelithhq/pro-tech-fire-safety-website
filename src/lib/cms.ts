import { supabase, isSupabaseConfigured } from './supabase'
import { unstable_cache } from 'next/cache'
import { FALLBACK } from './cms-data'
import type {
  IndustryRow, ServiceRow, CategoryRow, ProductRow,
  ProjectRow, GalleryRow, CertificationRow, ClientRow,
  TestimonialRow, WhyChooseRow, TeamRow, PostRow, JobOpeningRow,
  StatsRow,
} from './types'

function useSupabase() {
  return isSupabaseConfigured && supabase
}

async function fromJSON<T extends { id: string }>(name: string, fallback: T[]): Promise<T[]> {
  try {
    const Data = await import('./data')
    const store = (Data as any)[name]
    if (!store) return fallback
    const all: T[] = await store.getAll()
    if (all.length > 0) return (all as any[]).filter((i: any) => i.is_active !== false).sort((a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0)) as T[]
  } catch { /* fallback */ }
  return fallback
}

export const getIndustries = unstable_cache(
  async (): Promise<IndustryRow[]> => {
    if (!useSupabase()) return fromJSON('Industries', FALLBACK.industries)
    const { data, error } = await supabase!.from('industries').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.industries
    return data as IndustryRow[]
  },
  ['industries'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getServices = unstable_cache(
  async (): Promise<ServiceRow[]> => {
    if (!useSupabase()) return fromJSON('Services', FALLBACK.services)
    const { data, error } = await supabase!.from('services').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.services
    return data as ServiceRow[]
  },
  ['services'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getService = unstable_cache(
  async (slug: string): Promise<ServiceRow | null> => {
    if (!useSupabase()) {
      const all = await fromJSON('Services', FALLBACK.services)
      return all.find((s: ServiceRow) => s.slug === slug) || null
    }
    const { data, error } = await supabase!.from('services').select('*').eq('slug', slug).single()
    if (error || !data) return null
    return data as ServiceRow
  },
  ['service'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getServiceBySlug = getService

export const getCategories = unstable_cache(
  async (): Promise<CategoryRow[]> => {
    if (!useSupabase()) return fromJSON('Categories', FALLBACK.categories)
    const { data, error } = await supabase!.from('categories').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.categories
    return data as CategoryRow[]
  },
  ['categories'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getProducts = unstable_cache(
  async (): Promise<ProductRow[]> => {
    if (!useSupabase()) return fromJSON('Products', FALLBACK.products)
    const { data, error } = await supabase!.from('products').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.products
    return data as ProductRow[]
  },
  ['products'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getProductsByCategory = unstable_cache(
  async (categorySlug: string): Promise<ProductRow[]> => {
    const all = await getProducts()
    return all.filter(p => p.category_id === categorySlug)
  },
  ['products-by-category'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getProduct = unstable_cache(
  async (slug: string): Promise<ProductRow | null> => {
    if (!useSupabase()) {
      const all = await fromJSON('Products', FALLBACK.products)
      return all.find((p: ProductRow) => p.slug === slug) || null
    }
    const { data, error } = await supabase!.from('products').select('*').eq('slug', slug).single()
    if (error || !data) return null
    return data as ProductRow
  },
  ['product'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getProductBySlug = getProduct

export const getProjects = unstable_cache(
  async (): Promise<ProjectRow[]> => {
    if (!useSupabase()) return fromJSON('Projects', FALLBACK.projects)
    const { data, error } = await supabase!.from('projects').select('*').eq('is_active', true).order('completion_year', { ascending: false })
    if (error || !data?.length) return FALLBACK.projects
    return data as ProjectRow[]
  },
  ['projects'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getProject = unstable_cache(
  async (slug: string): Promise<ProjectRow | null> => {
    if (!useSupabase()) {
      const all = await fromJSON('Projects', FALLBACK.projects)
      return all.find((p: ProjectRow) => p.slug === slug) || null
    }
    const { data, error } = await supabase!.from('projects').select('*').eq('slug', slug).single()
    if (error || !data) return null
    return data as ProjectRow
  },
  ['project'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getProjectBySlug = getProject

export const getFeaturedProjects = unstable_cache(
  async (): Promise<ProjectRow[]> => {
    const all = await getProjects()
    return all.filter(p => p.is_featured)
  },
  ['featured-projects'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getGallery = unstable_cache(
  async (): Promise<GalleryRow[]> => {
    if (!useSupabase()) return fromJSON('Gallery', FALLBACK.gallery)
    const { data, error } = await supabase!.from('gallery').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.gallery
    return data as GalleryRow[]
  },
  ['gallery'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getCertifications = unstable_cache(
  async (): Promise<CertificationRow[]> => {
    if (!useSupabase()) return fromJSON('Certifications', FALLBACK.certifications)
    const { data, error } = await supabase!.from('certifications').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.certifications
    return data as CertificationRow[]
  },
  ['certifications'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getClients = unstable_cache(
  async (): Promise<ClientRow[]> => {
    if (!useSupabase()) return fromJSON('Clients', FALLBACK.clients)
    const { data, error } = await supabase!.from('clients').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.clients
    return data as ClientRow[]
  },
  ['clients'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getTestimonials = unstable_cache(
  async (): Promise<TestimonialRow[]> => {
    if (!useSupabase()) return fromJSON('Testimonials', FALLBACK.testimonials)
    const { data, error } = await supabase!.from('testimonials').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.testimonials
    return data as TestimonialRow[]
  },
  ['testimonials'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getWhyChoose = unstable_cache(
  async (): Promise<WhyChooseRow[]> => {
    if (!useSupabase()) return fromJSON('WhyChoose', FALLBACK.whyChoose)
    const { data, error } = await supabase!.from('why_choose').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.whyChoose
    return data as WhyChooseRow[]
  },
  ['why-choose'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getTeam = unstable_cache(
  async (): Promise<TeamRow[]> => {
    if (!useSupabase()) return fromJSON('Team', FALLBACK.team)
    const { data, error } = await supabase!.from('team').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.team
    return data as TeamRow[]
  },
  ['team'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getPosts = unstable_cache(
  async (): Promise<PostRow[]> => {
    if (!useSupabase()) return fromJSON('Posts', FALLBACK.posts)
    const { data, error } = await supabase!.from('posts').select('*').order('created_at', { ascending: false })
    if (error || !data?.length) return FALLBACK.posts
    return data as PostRow[]
  },
  ['posts'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getPost = unstable_cache(
  async (slug: string): Promise<PostRow | null> => {
    if (!useSupabase()) {
      const all = await fromJSON('Posts', FALLBACK.posts)
      return all.find((p: PostRow) => p.slug === slug && p.is_published) || null
    }
    const { data, error } = await supabase!.from('posts').select('*').eq('slug', slug).eq('is_published', true).single()
    if (error || !data) return null
    return data as PostRow
  },
  ['post'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getPostBySlug = getPost

export const getJobOpenings = unstable_cache(
  async (): Promise<JobOpeningRow[]> => {
    if (!useSupabase()) return fromJSON('Jobs', FALLBACK.jobOpenings)
    const { data, error } = await supabase!.from('job_openings').select('*').eq('is_active', true).order('sort_order')
    if (error || !data?.length) return FALLBACK.jobOpenings
    return data as JobOpeningRow[]
  },
  ['job-openings'],
  { revalidate: 300, tags: ['cms-data'] }
)

export const getStats = unstable_cache(
  async (): Promise<StatsRow | null> => {
    const all = await fromJSON('Stats', FALLBACK.stats)
    return all.find((s: StatsRow) => s.is_active) || all[0] || null
  },
  ['stats'],
  { revalidate: 300, tags: ['cms-data'] }
)

