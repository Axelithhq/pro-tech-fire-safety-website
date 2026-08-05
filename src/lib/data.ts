import { promises as fs } from 'node:fs'
import path from 'node:path'
import type {
  IndustryRow, ServiceRow, CategoryRow, ProductRow,
  ProjectRow, GalleryRow, CertificationRow, ClientRow,
  TestimonialRow, WhyChooseRow, TeamRow, PostRow, JobOpeningRow,
  EnquiryRow, StatsRow,
} from './types'
import type { AccreditedRow } from './types'
import { FALLBACK } from './cms-data'

const DATA_DIR = path.join(process.cwd(), 'data')

function entityFile(name: string) {
  return path.join(DATA_DIR, `${name}.json`)
}

async function ensureDir() {
  try { await fs.mkdir(DATA_DIR, { recursive: true }) } catch { /* ok */ }
}

async function readJSON<T>(name: string, fallback: T[]): Promise<T[]> {
  try {
    const raw = await fs.readFile(entityFile(name), 'utf-8')
    return JSON.parse(raw) as T[]
  } catch {
    await writeJSON(name, fallback)
    return fallback
  }
}

async function writeJSON<T>(name: string, data: T[]) {
  await ensureDir()
  await fs.writeFile(entityFile(name), JSON.stringify(data, null, 2), 'utf-8')
}

async function getNextId(items: { id: string }[]): Promise<string> {
  const max = items.reduce((m, i) => Math.max(m, parseInt(i.id, 10) || 0), 0)
  return String(max + 1)
}

// Generic CRUD factory
function createStore<T extends { id: string }>(name: string, fallback: T[]) {
  async function getAll(): Promise<T[]> {
    return readJSON<T>(name, fallback)
  }

  async function getById(id: string): Promise<T | undefined> {
    const items = await getAll()
    return items.find(i => i.id === id)
  }

  async function create(item: Partial<T>): Promise<T> {
    const items = await getAll()
    const id = await getNextId(items)
    const created_at = new Date().toISOString()
    const newItem = { ...item, id, created_at } as unknown as T
    items.push(newItem)
    await writeJSON(name, items)
    return newItem
  }

  async function update(id: string, updates: Partial<T>): Promise<T | null> {
    const items = await getAll()
    const idx = items.findIndex(i => i.id === id)
    if (idx === -1) return null
    items[idx] = { ...items[idx], ...updates }
    await writeJSON(name, items)
    return items[idx]
  }

  async function remove(id: string): Promise<boolean> {
    const items = await getAll()
    const idx = items.findIndex(i => i.id === id)
    if (idx === -1) return false
    items.splice(idx, 1)
    await writeJSON(name, items)
    return true
  }

  return { getAll, getById, create, update, remove }
}

// Admin credentials store
async function getAdminCreds() {
  const creds = await readJSON<{ email: string; password: string }>('admin', [
    { email: process.env.ADMIN_EMAIL || 'admin@protechfire.com', password: process.env.ADMIN_PASSWORD || 'Admin@2024' },
  ])
  return creds[0]
}

// Seed data files on first use
export async function seedAll() {
  await ensureDir()
  const stores = [
    ['industries', FALLBACK.industries],
    ['services', FALLBACK.services],
    ['categories', FALLBACK.categories],
    ['products', FALLBACK.products],
    ['projects', FALLBACK.projects],
    ['gallery', FALLBACK.gallery],
    ['certifications', FALLBACK.certifications],
    ['clients', FALLBACK.clients],
    ['testimonials', FALLBACK.testimonials],
    ['whychoose', FALLBACK.whyChoose],
    ['team', FALLBACK.team],
    ['posts', FALLBACK.posts],
    ['jobs', FALLBACK.jobOpenings],
    ['enquiries', []],
    ['accredited', FALLBACK.accredited],
    ['stats', FALLBACK.stats],
  ] as [string, any][]
  for (const [name, data] of stores) {
    const fp = entityFile(name)
    try { await fs.access(fp) } catch {
      await writeJSON(name, data)
    }
  }
}

// Export typed stores
export const Industries = createStore<IndustryRow>('industries', FALLBACK.industries)
export const Services = createStore<ServiceRow>('services', FALLBACK.services)
export const Categories = createStore<CategoryRow>('categories', FALLBACK.categories)
export const Products = createStore<ProductRow>('products', FALLBACK.products)
export const Projects = createStore<ProjectRow>('projects', FALLBACK.projects)
export const Gallery = createStore<GalleryRow>('gallery', FALLBACK.gallery)
export const Certifications = createStore<CertificationRow>('certifications', FALLBACK.certifications)
export const Clients = createStore<ClientRow>('clients', FALLBACK.clients)
export const Testimonials = createStore<TestimonialRow>('testimonials', FALLBACK.testimonials)
export const WhyChoose = createStore<WhyChooseRow>('whychoose', FALLBACK.whyChoose)
export const Team = createStore<TeamRow>('team', FALLBACK.team)
export const Posts = createStore<PostRow>('posts', FALLBACK.posts)
export const Jobs = createStore<JobOpeningRow>('jobs', FALLBACK.jobOpenings)
export const Enquiries = createStore<EnquiryRow>('enquiries', [])
export const Accredited = createStore<AccreditedRow>('accredited', FALLBACK.accredited)
export const Stats = createStore<StatsRow>('stats', FALLBACK.stats)
