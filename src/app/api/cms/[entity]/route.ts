import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { validateSession } from '@/lib/auth'
import * as Data from '@/lib/data'

const storeMap: Record<string, any> = {
  industries: Data.Industries,
  services: Data.Services,
  categories: Data.Categories,
  products: Data.Products,
  projects: Data.Projects,
  gallery: Data.Gallery,
  certifications: Data.Certifications,
  clients: Data.Clients,
  testimonials: Data.Testimonials,
  whychoose: Data.WhyChoose,
  team: Data.Team,
  posts: Data.Posts,
  jobs: Data.Jobs,
  enquiries: Data.Enquiries,
  accredited: Data.Accredited,
  stats: Data.Stats,
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params
  const store = storeMap[entity]
  if (!store) return NextResponse.json({ error: 'Unknown entity' }, { status: 404 })
  const items = await store.getAll()
  return NextResponse.json(items)
}

const revalidateFrontend = (entity: string) => {
  revalidateTag('cms-data', { expire: 0 })
  const paths: string[] = ['/']
  const entityPaths: Record<string, string[]> = {
    services: ['/services'],
    products: ['/products'],
    projects: ['/projects'],
    industries: ['/'],
    certifications: ['/'],
    clients: ['/'],
    testimonials: ['/'],
    whychoose: ['/about', '/'],
    team: ['/about'],
    posts: ['/blog'],
    jobs: ['/careers'],
    stats: ['/about'],
  }
  paths.push(...(entityPaths[entity] || []))
  paths.forEach(p => revalidatePath(p, 'page'))
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  if (!await validateSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { entity } = await params
  const store = storeMap[entity]
  if (!store) return NextResponse.json({ error: 'Unknown entity' }, { status: 404 })
  const body = await request.json()
  const item = await store.create(body)
  revalidateFrontend(entity)
  return NextResponse.json(item, { status: 201 })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  if (!await validateSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { entity } = await params
  const store = storeMap[entity]
  if (!store) return NextResponse.json({ error: 'Unknown entity' }, { status: 404 })
  const body = await request.json()
  const { id, ...updates } = body
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const item = await store.update(id, updates)
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  revalidateFrontend(entity)
  return NextResponse.json(item)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  if (!await validateSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { entity } = await params
  const store = storeMap[entity]
  if (!store) return NextResponse.json({ error: 'Unknown entity' }, { status: 404 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const ok = await store.remove(id)
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  revalidateFrontend(entity)
  return NextResponse.json({ success: true })
}
