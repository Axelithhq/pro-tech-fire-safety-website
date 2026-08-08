import type { Metadata } from 'next'
import { Download, Check, Shield } from 'lucide-react'
import { getCategories, getProducts } from '@/lib/cms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextRevealHeading from '@/components/effects/TextRevealHeading'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import HeroParticles from '@/components/effects/HeroParticles'
import TiltCard from '@/components/effects/TiltCard'

export const metadata: Metadata = {
  title: 'Fire Safety Products & Systems Catalog | Pro-Tech Fire & Safety',
  description: 'Explore certified fire protection products: addressable smoke detectors, fire alarm control panels, sprinkler heads, deluge valves, ABC dry powder extinguishers, CO2 systems, and fire doors.',
}

const productImages: Record<string, string> = {
  'Intelligent Addressable Smoke Detector': '/images/products/smoke-detector.jpg',
  'Conventional Smoke Detector': '/images/products/Conventional Smoke Detector.jpg',
  'Heat Detector': '/images/products/Heat Detector.jpg',
  'Intelligent Addressable Fire Alarm Panel': '/images/products/fire-alarm-panel.jpg',
  'Conventional Fire Alarm Panel': '/images/products/alarm-panel-2.jpg',
  'Standard Response Sprinkler Head': '/images/products/sprinkler-head.jpg',
  'Deluge Valve Assembly': '/images/products/industrial-pipes.jpg',
  'ABC Dry Powder Extinguisher': '/images/products/fire-extinguisher.jpg',
  'CO2 Extinguisher': '/images/products/co2-extinguisher.jpg',
  'Foam Proportioning System': '/images/products/industrial-pipes.jpg',
  'Fire Rated Metal Door — Single Leaf': '/images/products/fire-door.jpg',
  'Fire Rated Metal Door — Double Leaf': '/images/products/emergency-exit.jpg',
}

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ])

  const grouped = categories.map((cat) => ({
    category: cat.name,
    slug: cat.slug,
    products: products.filter((p) => p.category_id === cat.id),
  })).filter((g) => g.products.length > 0)

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center bg-navy-900 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <HeroParticles count={25} color="rgba(59,130,246," />
        <Container className="relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">Products</span>
          </ScrollReveal>
          <TextRevealHeading as="h1" className="mt-6 font-heading text-5xl font-bold text-white md:text-7xl">
            Premium Fire Safety<br />Equipment
          </TextRevealHeading>
          <TextRevealHeading delay={0.2} as="p" className="mt-4 max-w-2xl text-lg text-white/50">
            Curated selection of industry-leading fire protection products. No prices listed — contact us for a customized quote.
          </TextRevealHeading>
        </Container>
      </section>

      {/* Product categories */}
      {grouped.map((group) => (
        <Section key={group.category} id={group.slug}>
          <Container>
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-navy-900 dark:text-white md:text-4xl">{group.category}</h2>
            </ScrollReveal>
            <div className="mt-8 space-y-16">
              {group.products.map((product, i) => {
                const imgSrc = productImages[product.title] || null
                return (
                  <ScrollReveal key={product.id} delay={i * 0.1}>
                    <div className="group rounded-2xl border border-gray-100 dark:border-navy-800 bg-white dark:bg-navy-900 p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-500/5 md:p-12">
                      <div className="grid gap-10 md:grid-cols-5">
                        <div className="md:col-span-2">
                          <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-navy-100 dark:bg-navy-800 shadow-lg transition-transform duration-500 group-hover:scale-[1.02]">
                            {imgSrc ? (
                              <img src={imgSrc} alt={product.title} className="absolute inset-0 h-full w-full object-cover" style={{ display: 'block' }} />
                            ) : (
                              <div className="flex h-full items-center justify-center">
                                <div className="text-center">
                                  <Shield size={40} className="mx-auto text-navy-400" />
                                  <p className="mt-3 text-xs font-medium text-navy-400">{product.title}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="md:col-span-3">
                          <h3 className="font-heading text-2xl font-bold text-navy-900 dark:text-white">{product.title}</h3>
                          <p className="mt-3 text-navy-500 dark:text-navy-300">{product.description}</p>
                          {product.specifications && Object.keys(product.specifications).length > 0 && (
                            <div className="mt-6">
                              <h4 className="text-xs font-semibold tracking-widest text-gold-600 uppercase">Specifications</h4>
                              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                  <li key={key} className="flex items-center gap-2 text-sm text-navy-700 dark:text-navy-300">
                                    <Check size={14} className="shrink-0 text-gold-600" />
                                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {product.applications && product.applications.length > 0 && (
                            <div className="mt-6">
                              <h4 className="text-xs font-semibold tracking-widest text-gold-600 uppercase">Applications</h4>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {product.applications.map((app) => (
                                  <span key={app} className="rounded-full bg-navy-50 dark:bg-navy-800 px-3 py-1 text-xs text-navy-600 dark:text-navy-300">{app}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="mt-8 flex flex-wrap gap-4">
                            <Button href="/contact" variant="primary" size="sm">Enquire Now</Button>
                            {product.brochure_url && (
                              <Button variant="outline" size="sm">
                                <Download size={14} /> Download Brochure
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </Container>
        </Section>
      ))}

      {/* CTA */}
      <Section dark>
        <Container className="text-center">
          <ScrollReveal>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Need a Product Not Listed Here?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50">We partner with leading global manufacturers. Contact us for any specific product requirement.</p>
            <div className="mt-8">
              <Button href="/contact" variant="secondary" size="lg">Send Enquiry</Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
