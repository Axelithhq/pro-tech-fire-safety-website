'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import RichText from '@/components/ui/RichText'
import CertificationCarousel from '@/components/effects/CertificationCarousel'
import type { CertificationRow } from '@/lib/types'

interface CertificationsProps {
  certifications: CertificationRow[]
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <Section className="border-b border-gray-100 dark:border-navy-800">
      <Container>
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">
            Accredited & Compliant
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-navy-900 dark:text-white md:text-5xl">
            Built to the Highest Standards
          </h2>
          <RichText as="p" className="mt-4 max-w-2xl text-base leading-relaxed text-navy-500 dark:text-navy-300"
            text="Every system we engineer, supply, and install meets rigorous <<national>> and <<international>> quality and {safety standards}."
          />
        </ScrollReveal>

        <div className="mt-10">
          <CertificationCarousel certifications={certifications} />
        </div>
      </Container>
    </Section>
  )
}
