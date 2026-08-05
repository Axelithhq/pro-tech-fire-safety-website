'use client'

import { Bell, Flame, ArrowRightFromLine, ClipboardCheck, Wrench, PenTool, Shield } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import RichText from '@/components/ui/RichText'
import TiltCard from '@/components/effects/TiltCard'
import type { ServiceRow } from '@/lib/types'

const iconMap: Record<string, React.ReactNode> = {
  Bell: <Bell size={24} />,
  Flame: <Flame size={24} />,
  ArrowRightFromLine: <ArrowRightFromLine size={24} />,
  ClipboardCheck: <ClipboardCheck size={24} />,
  Wrench: <Wrench size={24} />,
  PenTool: <PenTool size={24} />,
}

const serviceImageMap: Record<string, string> = {
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

interface ServicesSectionProps {
  services: ServiceRow[]
  featuredOnly?: boolean
}

export default function ServicesSection({ services, featuredOnly = false }: ServicesSectionProps) {
  const display = featuredOnly ? services.filter((s) => s.is_featured) : services

  return (
    <Section dark id="services">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-900" />
      <Container className="relative z-10">
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">
            Our Services
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
            End-to-End Fire Protection
          </h2>
          <RichText as="p" className="mt-4 max-w-2xl text-base leading-relaxed text-white/50"
            text="Every service is delivered with <<engineering precision>>, <<regulatory compliance>>, and an unwavering commitment to {safety}."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {display.map((service, i) => {
            const imgSrc = serviceImageMap[service.title] || null
            return (
              <ScrollReveal key={service.id} delay={i * 0.08}>
                <TiltCard className="h-full rounded-xl">
                  <div className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-gold-500/10">
                    <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-gold-500/0 via-transparent to-gold-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                    <div className="relative h-44 overflow-hidden bg-navy-800/50">
                      {imgSrc ? (
                        <div
                          className="absolute inset-0 h-full w-full bg-cover bg-center opacity-60 transition-all duration-700 group-hover:opacity-80"
                          style={{ backgroundImage: `url(${imgSrc})` }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Shield size={40} className="text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
                    </div>
                    <div className="relative p-6 pt-0 -mt-8">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 text-gold-500 backdrop-blur-md border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-white shadow-sm group-hover:shadow-lg group-hover:shadow-gold-500/30">
                        {iconMap[service.icon] || <Bell size={24} />}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/50">
                        {service.description}
                      </p>
                      <div className="mt-6">
                        <Button
                          href={`/services#${service.slug}`}
                          variant="ghost"
                          size="sm"
                          className="p-0 text-gold-500 hover:text-gold-400 group-hover:translate-x-1 transition-transform"
                        >
                          Learn more →
                        </Button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            )
          })}
        </div>

        {featuredOnly && (
          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Button href="/services" variant="secondary">
                View All Services
              </Button>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </Section>
  )
}
