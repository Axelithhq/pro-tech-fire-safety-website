import { ArrowLeft, Check } from 'lucide-react'
import { getServices, getServiceBySlug } from '@/lib/cms'
import TextRevealHeading from '@/components/effects/TextRevealHeading'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center bg-navy-900 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <Container className="relative z-10">
          <Button href="/services" variant="ghost" className="mb-6 text-white/50 hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Services
          </Button>
          <TextRevealHeading as="h1" className="font-heading text-5xl font-bold text-white md:text-7xl">
            {service.title}
          </TextRevealHeading>
          {service.subtitle && (
            <TextRevealHeading delay={0.2} as="p" className="mt-4 max-w-2xl text-xl text-gold-500">
              {service.subtitle}
            </TextRevealHeading>
          )}
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-16 md:grid-cols-5">
            <div className="md:col-span-3">
              <TextRevealHeading as="h2" className="font-heading text-3xl font-bold text-navy-900">
                Overview
              </TextRevealHeading>
              <p className="mt-6 text-base leading-relaxed text-navy-500">
                {service.description}
              </p>
            </div>

            {service.features.length > 0 && (
              <div className="md:col-span-2">
                <div className="rounded-2xl border border-gray-100 bg-navy-50 p-8">
                  <h3 className="font-heading text-lg font-bold text-navy-900">
                    Key Features
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check size={18} className="mt-0.5 shrink-0 text-gold-600" />
                        <span className="text-sm text-navy-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="mt-16">
            <Button href="/contact" variant="primary" size="lg">
              Enquire About {service.title}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
