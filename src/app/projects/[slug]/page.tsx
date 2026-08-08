import type { Metadata } from 'next'
import { ArrowLeft, MapPin, Calendar, Crosshair, Building2 } from 'lucide-react'
import { getProjects, getProjectBySlug } from '@/lib/cms'
import TextRevealHeading from '@/components/effects/TextRevealHeading'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://protechfiresafety.com'
  const title = `${project.title} - Fire Safety Engineering Project`
  const description = `${project.scope} project in ${project.location} for ${project.client || 'Client'}. ${project.details.slice(0, 100)}`

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Pro-Tech Project Portfolio`,
      description,
      url: `${baseUrl}/projects/${project.slug}`,
      type: 'website',
      images: project.image_url ? [{ url: project.image_url }] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://protechfiresafety.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.details,
    creator: {
      '@type': 'Organization',
      name: 'Pro-Tech Fire & Safety',
    },
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
    dateCreated: project.completion_year?.toString() || undefined,
  }

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${baseUrl}/projects` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${baseUrl}/projects/${project.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <section className="relative flex min-h-[50vh] items-center bg-navy-900 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <Container className="relative z-10">
          <Button href="/projects" variant="ghost" className="mb-6 text-white/50 hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
          <TextRevealHeading as="h1" className="font-heading text-4xl font-bold text-white md:text-6xl">
            {project.title}
          </TextRevealHeading>
          <div className="mt-6 flex flex-wrap gap-4">
            <span className="inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-medium text-gold-700">
              {project.industry}
            </span>
            {project.status && (
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                project.status === 'COMPLETED'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {project.status}
              </span>
            )}
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-16 md:grid-cols-5">
            <div className="md:col-span-3">
              <TextRevealHeading as="h2" className="font-heading text-2xl font-bold text-navy-900">
                Project Details
              </TextRevealHeading>
              <p className="mt-6 text-base leading-relaxed text-navy-500">
                {project.details}
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-2xl border border-gray-100 bg-navy-50 p-8">
                <h3 className="font-heading text-lg font-bold text-navy-900">
                  Project Information
                </h3>
                <div className="mt-6 space-y-5">
                  {project.client && (
                    <div className="flex items-start gap-3">
                      <Building2 size={18} className="mt-0.5 shrink-0 text-navy-400" />
                      <div>
                        <p className="text-xs font-semibold tracking-wider text-navy-400 uppercase">Client</p>
                        <p className="text-sm text-navy-700">{project.client}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-navy-400" />
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-navy-400 uppercase">Location</p>
                      <p className="text-sm text-navy-700">{project.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="mt-0.5 shrink-0 text-navy-400" />
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-navy-400 uppercase">Year</p>
                      <p className="text-sm text-navy-700">{project.completion_year}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Crosshair size={18} className="mt-0.5 shrink-0 text-navy-400" />
                    <div>
                      <p className="text-xs font-semibold tracking-wider text-navy-400 uppercase">Scope</p>
                      <p className="text-sm text-navy-700">{project.scope}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button href="/contact" variant="primary" size="lg">
                  Discuss Similar Project
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
