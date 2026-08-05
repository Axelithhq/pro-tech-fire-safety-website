import { getProjects } from '@/lib/cms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextRevealHeading from '@/components/effects/TextRevealHeading'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ProjectsMapEmbed from './ProjectsMapEmbed'
import ProjectsTabs from './ProjectsTabs'
import HeroParticles from '@/components/effects/HeroParticles'

export default async function ProjectsPage() {
  const projects = await getProjects()
  const completed = projects.filter((p) => p.status === 'COMPLETED')
  const ongoing = projects.filter((p) => p.status !== 'COMPLETED')

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center bg-navy-900 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <HeroParticles count={25} color="rgba(34,197,94," />
        <Container className="relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">Our Work</span>
          </ScrollReveal>
          <TextRevealHeading as="h1" className="mt-6 font-heading text-5xl font-bold text-white md:text-7xl">Featured Projects</TextRevealHeading>
          <TextRevealHeading delay={0.2} as="p" className="mt-4 max-w-2xl text-lg text-white/70">
            Over 1,050 projects completed across India — each one a testament to our engineering excellence.
          </TextRevealHeading>
        </Container>
      </section>

      {/* Where We Work - Real Google Map */}
      <Section className="bg-navy-50 dark:bg-navy-900/50">
        <Container>
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">Project Locations</span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-navy-900 dark:text-white md:text-4xl">Where We Work</h2>
            <p className="mt-4 text-navy-500 dark:text-navy-300">Pan-India presence with projects across 15+ states.</p>
          </ScrollReveal>
          <div className="mt-10">
            <ProjectsMapEmbed />
          </div>
        </Container>
      </Section>

      {/* Projects Tabs - Completed / Ongoing */}
      <ProjectsTabs completed={completed} ongoing={ongoing} />

      {/* CTA */}
      <Section dark>
        <Container className="text-center">
          <ScrollReveal>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">Have a Project in Mind?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50">Let our engineering team evaluate your requirements and provide a tailored solution.</p>
            <div className="mt-8">
              <Button href="/contact" variant="secondary" size="lg">Start Your Project</Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
