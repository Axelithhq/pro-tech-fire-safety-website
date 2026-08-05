import { MapPin, Briefcase, Clock } from 'lucide-react'
import { getJobOpenings } from '@/lib/cms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import ApplicationForm from './ApplicationForm'

export default async function CareersPage() {
  const positions = await getJobOpenings()

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center bg-navy-900 pt-32">
        <Container className="relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">
              Careers
            </span>
            <h1 className="mt-6 font-heading text-5xl font-bold text-white md:text-7xl">
              Join Our Team
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/50">
              Be part of India&apos;s premier fire protection engineering team.
              We&apos;re looking for passionate professionals who share our
              commitment to safety.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <Container>
          {positions.length === 0 ? (
            <p className="text-center text-navy-500">No open positions right now. Check back soon.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {positions.map((position, i) => (
                <ScrollReveal key={position.id} delay={i * 0.08}>
                  <div className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="inline-block self-start rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-600">
                      {position.department}
                    </span>
                    <h2 className="mt-4 font-heading text-xl font-bold text-navy-900">
                      {position.title}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-navy-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={12} />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {position.department}
                      </span>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-500">
                      {position.description}
                    </p>
                    <div className="mt-6">
                      <Button variant="outline" size="sm" className="w-full">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section className="bg-navy-50">
        <Container>
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-navy-900 md:text-4xl text-center">
                Don&apos;t See the Right Role?
              </h2>
              <p className="mt-4 text-center text-navy-500">
                We&apos;re always open to connecting with talented professionals.
                Send us your resume and we&apos;ll keep you in mind.
              </p>
            </ScrollReveal>
            <ApplicationForm />
          </div>
        </Container>
      </Section>
    </>
  )
}
