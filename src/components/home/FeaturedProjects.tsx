'use client'

import { MapPin, Building2, Calendar } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ParallaxSection from '@/components/ui/ParallaxSection'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import TiltCard from '@/components/effects/TiltCard'
import type { ProjectRow } from '@/lib/types'

interface FeaturedProjectsProps {
  projects: ProjectRow[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <Section id="projects" dark>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950" />
      <Container className="relative z-10">
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">
            Featured Projects
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
            Our Work Speaks
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50">
            Every project is a testament to our commitment to excellence in fire
            protection engineering.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.slice(0, 4).map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <ParallaxSection speed={0.1 + i * 0.05}>
                <TiltCard className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-gold-500/20">
                  <div className="group relative overflow-hidden transition-all duration-500">
                    <div className="relative h-64 overflow-hidden md:h-72">
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent z-10" />
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-navy-800 transition-all duration-700 group-hover:scale-105">
                          <Building2 size={48} className="text-navy-600 transition-all duration-700 group-hover:scale-125 group-hover:text-gold-500/50" />
                        </div>
                      )}
                      {/* Fire glow overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                      <span className="inline-block rounded-full bg-gold-500/20 px-3 py-1 text-xs font-medium text-gold-400 backdrop-blur-sm">
                        {project.industry}
                      </span>
                      <h3 className="mt-3 font-heading text-xl font-bold text-white drop-shadow-sm">
                        {project.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/50">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {project.completion_year}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-white/60">{project.scope}</p>
                    </div>
                  </div>
                </TiltCard>
              </ParallaxSection>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Button href="/projects" variant="secondary">
              View All Projects
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  )
}
