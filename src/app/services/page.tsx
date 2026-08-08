import type { Metadata } from 'next'
import { Check, ArrowRight, ShieldAlert } from 'lucide-react'
import { getServices } from '@/lib/cms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextRevealHeading from '@/components/effects/TextRevealHeading'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import HeroParticles from '@/components/effects/HeroParticles'
import TiltCard from '@/components/effects/TiltCard'

export const metadata: Metadata = {
  title: 'Fire Protection & Engineering Services | Pro-Tech Fire & Safety',
  description: 'Turnkey fire protection engineering services including automatic fire sprinklers, fire alarm detection, CO2 suppression, hydrants, LP gas piping, HVAC, and NBC safety audits across India.',
}

const hero = {
  title: 'Comprehensive Fire Protection',
  subtitle: 'From detection to suppression, every service is engineered with precision.',
}

const serviceImages: Record<string, string> = {
  'Fire Alarm Systems': '/images/products/smoke-detector.jpg',
  'Sprinkler Systems': '/images/products/sprinkler-head.jpg',
  'Fire Extinguishers': '/images/products/fire-extinguisher.jpg',
  'Deluge Valve Systems': '/images/products/industrial-pipes.jpg',
  'LP Gas Piping Systems': '/images/services/lp-gas.jpg',
  'HVAC Ventilation Systems': '/images/services/hvac.jpg',
  'STP & WTP Systems': '/images/services/stp-wtp.jpg',
  'Fire Rated Metal Doors': '/images/products/fire-door.jpg',
  'CCTV & Surveillance Systems': '/images/services/cctv.jpg',
  'Building Management System (BMS)': '/images/services/bms.jpg',
  'Structured Cabling': '/images/services/structured-cabling.jpg',
  'Fuel Oil Handling Systems': '/images/services/fuel-oil.jpg',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-center bg-navy-900 pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <HeroParticles count={30} color="rgba(200,164,92," />
        <Container className="relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">Our Services</span>
          </ScrollReveal>
          <TextRevealHeading as="h1" className="mt-6 font-heading text-5xl font-bold text-white md:text-7xl">
            {hero.title}
          </TextRevealHeading>
          <TextRevealHeading delay={0.2} as="p" className="mt-4 max-w-2xl text-lg text-white/70">
            {hero.subtitle}
          </TextRevealHeading>
        </Container>
      </section>

      {/* Service sections */}
      {services.map((service, i) => {
        const imgSrc = serviceImages[service.title] || null
        const isOdd = i % 2 === 1
        return (
          <Section key={service.id} className={i % 2 === 0 ? 'bg-white dark:bg-navy-950' : 'bg-navy-50 dark:bg-navy-900/50'}>
            <Container>
              <div className={`grid items-center gap-12 md:grid-cols-2 ${isOdd ? 'md:grid-flow-dense' : ''}`}>
                <div className={isOdd ? 'md:col-start-2' : ''}>
                  <ScrollReveal delay={0.1}>
                    <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">{service.subtitle}</span>
                    <h2 className="mt-3 font-heading text-3xl font-bold text-navy-900 dark:text-white md:text-4xl">{service.title}</h2>
                    <p className="mt-4 leading-relaxed text-navy-500 dark:text-navy-300">{service.description}</p>
                    <ul className="mt-6 space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check size={18} className="mt-0.5 shrink-0 text-gold-600" />
                          <span className="text-sm text-navy-700 dark:text-navy-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button href="/contact" variant="primary">
                        Enquire About This Service
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </ScrollReveal>
                </div>
                <div className={`${isOdd ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <div className="relative h-80 w-full md:h-96">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={service.title}
                        className="h-full w-full rounded-3xl object-cover shadow-lg"
                        style={{ display: 'block' }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-3xl bg-navy-100 dark:bg-navy-800 shadow-lg">
                        <ShieldAlert size={48} className="text-navy-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        )
      })}

      {/* CTA */}
      <Section dark>
        <Container className="text-center">
          <ScrollReveal>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Need a Custom Solution?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50">Every facility is unique. Our engineers will design a solution specifically for your requirements.</p>
            <div className="mt-8">
              <Button href="/contact" variant="secondary" size="lg">Request Consultation</Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
