import type { Metadata } from 'next'
import { ArrowLeft, Check, Download } from 'lucide-react'
import { getProducts, getProductBySlug } from '@/lib/cms'
import TextRevealHeading from '@/components/effects/TextRevealHeading'
import GlassCard from '@/components/effects/GlassCard'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://protechfiresafety.com'
  const title = `${product.title} - Fire Safety Equipment`
  const description = product.description.slice(0, 160)

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | Pro-Tech Fire & Safety`,
      description,
      url: `${baseUrl}/products/${product.slug}`,
      type: 'website',
      images: product.image_url ? [{ url: product.image_url }] : [],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://protechfiresafety.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image_url ? [product.image_url] : [`${baseUrl}/icon.svg`],
    brand: {
      '@type': 'Brand',
      name: 'Pro-Tech Fire & Safety',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      price: 'Contact for Quote',
      availability: 'https://schema.org/InStock',
    },
  }

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${baseUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.title, item: `${baseUrl}/products/${product.slug}` },
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
          <Button href="/products" variant="ghost" className="mb-6 text-white/50 hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Button>
          <TextRevealHeading as="h1" className="font-heading text-4xl font-bold text-white md:text-6xl">
            {product.title}
          </TextRevealHeading>
          <TextRevealHeading delay={0.2} as="p" className="mt-4 max-w-2xl text-lg text-white/50">
            {product.description}
          </TextRevealHeading>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <TextRevealHeading as="h2" className="font-heading text-2xl font-bold text-navy-900">
                Specifications
              </TextRevealHeading>
              <div className="mt-6 space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <Check size={16} className="shrink-0 text-gold-600" />
                    <span className="min-w-[120px] text-sm font-medium capitalize text-navy-700">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-sm text-navy-500">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {product.applications.length > 0 && (
                <GlassCard className="rounded-2xl border border-gray-100 bg-white/60 p-8 shadow-sm">
                  <h3 className="font-heading text-lg font-bold text-navy-900">
                    Applications
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span key={app} className="rounded-full bg-navy-50 px-3 py-1 text-xs text-navy-600">
                        {app}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" variant="primary">
                  Enquire About This Product
                </Button>
                {product.brochure_url && (
                  <Button href={product.brochure_url} variant="outline" target="_blank" rel="noopener noreferrer">
                    <Download size={14} className="mr-2" />
                    Download Brochure
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
