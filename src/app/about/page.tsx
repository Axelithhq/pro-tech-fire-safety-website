import { ShieldCheck, Target, Eye, Award, MapPin } from 'lucide-react'
import { getTeam } from '@/lib/cms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextRevealHeading from '@/components/effects/TextRevealHeading'
import GlassCard from '@/components/effects/GlassCard'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import RichText from '@/components/ui/RichText'
import HeroParticles from '@/components/effects/HeroParticles'

const hero = {
  title: 'Engineering Safety',
  subtitle: 'Since 2022',
  description: 'Pro-Tech Fire & Safety is India\'s emerging trusted partner in fire protection engineering — protecting lives, assets, and businesses with modern solutions.',
}

const mission = 'To protect lives and assets by delivering world-class fire protection engineering solutions that exceed regulatory standards and client expectations.'

const vision = 'To be India\'s most trusted fire protection partner — recognized globally for engineering excellence, innovation, and an unwavering commitment to safety.'

const values = [
  { title: 'Safety First', description: 'Every decision we make is guided by our commitment to protecting lives and property.' },
  { title: 'Engineering Excellence', description: 'We bring precision, expertise, and innovation to every project, large or small.' },
  { title: 'Integrity', description: 'Honest advice, transparent pricing, and unwavering ethical standards in every interaction.' },
  { title: 'Client Partnership', description: 'We don\'t just deliver projects — we build lasting relationships based on trust and results.' },
]

const timeline = [
  { year: '2022', event: 'Pro-Tech Fire & Safety founded in Cuttack, Odisha' },
  { year: '2023', event: 'Completed first major commercial and industrial projects' },
  { year: '2024', event: 'Crossed 50+ successful projects across 8 states' },
  { year: '2025', event: 'Expanded to 18+ states with 200+ projects and growing team' },
  { year: '2026', event: 'Launched digital presence — PROJECT AEGIS development begins' },
  { year: 'Future', event: 'PROJECT AEGIS — India\'s first integrated Fire Safety SaaS platform' },
]

const valuesIcons: Record<string, React.ReactNode> = {
  'Safety First': <ShieldCheck size={28} />,
  'Engineering Excellence': <Target size={28} />,
  Integrity: <ShieldCheck size={28} />,
  'Client Partnership': <Eye size={28} />,
}

export default async function AboutPage() {
  const team = await getTeam()

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center bg-navy-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <HeroParticles count={25} color="rgba(200,164,92," />
        <Container className="relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">About Us</span>
          </ScrollReveal>
          <TextRevealHeading as="h1" className="mt-6 font-heading text-5xl font-bold text-white md:text-7xl">
            {hero.title}
          </TextRevealHeading>
          <TextRevealHeading delay={0.2} as="p" className="mt-2 font-heading text-2xl text-gold-500">
            {hero.subtitle}
          </TextRevealHeading>
          <TextRevealHeading delay={0.3} as="p" className="mt-6 max-w-2xl text-lg text-white/50">
            {hero.description}
          </TextRevealHeading>
        </Container>
      </section>

      {/* Our Story with Founder Image */}
      <Section>
        <Container>
          <div className="grid gap-16 md:grid-cols-2">
            <ScrollReveal>
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-gold-500/10 transition-all duration-700 hover:shadow-gold-500/20">
                <div className="relative h-[500px] w-full overflow-hidden">
                  <img
                    src="/images/Founder-1.jpeg"
                    alt="Pro-Tech Fire & Safety Founder"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 transition-all duration-700" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-1 w-8 rounded-full bg-gold-500" />
                    <p className="text-sm font-medium tracking-widest text-gold-400 uppercase">Founder & CEO</p>
                  </div>
                  <p className="font-heading text-3xl font-bold text-white">Jayanth Mahapatra</p>
                  <p className="mt-1 text-sm text-white/50">Engineering Safety Since 2022</p>
                </div>
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-1000 group-hover:w-full" />
              </div>
            </ScrollReveal>
            <div className="flex flex-col justify-center">
              <ScrollReveal>
                <h2 className="font-heading text-3xl font-bold text-navy-900 dark:text-white md:text-4xl">
                  <RichText text="Our <<Story>>" />
                </h2>
                <div className="mt-6 space-y-4 text-navy-500 dark:text-navy-300 leading-relaxed">
                  <p>
                    <RichText text="Founded in <<2022>>, Pro-Tech Fire & Safety began with a simple mission: to make fire protection engineering {accessible}, {reliable}, and world-class in India." />
                  </p>
                  <p>
                    <RichText text="What started as a small team of passionate engineers has grown rapidly, with a presence across <<20+ states>> and over {200+ successful projects}." />
                  </p>
                  <p>
                    <RichText text="Today, we partner with India&apos;s leading corporations, developers, and institutions — protecting the buildings and facilities that {drive our nation&apos;s growth}." />
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Managing Director */}
      <Section className="bg-navy-50 dark:bg-navy-900/50">
        <Container>
          <div className="grid gap-16 md:grid-cols-2">
            <div className="flex flex-col justify-center md:order-1">
              <ScrollReveal>
                <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">Leadership</span>
                <h2 className="mt-4 font-heading text-3xl font-bold text-navy-900 dark:text-white md:text-4xl">Managing Director</h2>
                <div className="mt-6 space-y-4 text-navy-500 dark:text-navy-300 leading-relaxed">
                  <p>
                    Our Managing Director leads Pro-Tech Fire & Safety with a steadfast commitment to operational excellence,
                    strategic growth, and the well-being of every client and team member.
                  </p>
                  <p>
                    Under her leadership, the company has expanded across 20+ states, delivering trusted fire protection
                    solutions that safeguard businesses, institutions, and communities nationwide.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.1} className="md:order-2">
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-gold-500/10 transition-all duration-700 hover:shadow-gold-500/20">
                <div className="relative h-[500px] w-full overflow-hidden">
                  <img
                    src="/images/Director.jpeg"
                    alt="Kavita Mahapatra - Pro-Tech Fire & Safety Managing Director"
                    className="absolute inset-0 h-400px w-full object-cover transition-all duration-700 group-hover:scale-105"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-1 w-8 rounded-full bg-gold-500" />
                    <p className="text-sm font-medium tracking-widest text-gold-400 uppercase">Managing Director</p>
                  </div>
                  <p className="font-heading text-3xl font-bold text-white">Kavita Mahapatra</p>
                  <p className="mt-1 text-sm text-white/50">Leading with vision and dedication</p>
                </div>
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-1000 group-hover:w-full" />
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-navy-50 dark:bg-navy-900/50">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <ScrollReveal>
              <GlassCard className="rounded-2xl bg-white/60 p-8 shadow-sm dark:bg-navy-900/80">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-100 text-gold-700"><Target size={28} /></div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900 dark:text-white">Our Mission</h3>
                <p className="mt-4 leading-relaxed text-navy-500 dark:text-navy-300">{mission}</p>
              </GlassCard>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <GlassCard className="rounded-2xl bg-white/60 p-8 shadow-sm dark:bg-navy-900/80">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-100 text-gold-700"><Eye size={28} /></div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-navy-900 dark:text-white">Our Vision</h3>
                <p className="mt-4 leading-relaxed text-navy-500 dark:text-navy-300">{vision}</p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section>
        <Container>
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">Core Values</span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-navy-900 dark:text-white md:text-5xl">What We Stand For</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1}>
                <div className="rounded-xl border border-gray-100 dark:border-navy-800 bg-white dark:bg-navy-900 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-navy-200">{valuesIcons[value.title]}</div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-navy-900 dark:text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-500 dark:text-navy-300">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Our Journey Timeline */}
      <Section dark>
        <Container>
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">Our Journey</span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">Timeline</h2>
          </ScrollReveal>
          <div className="relative mt-16">
            <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-px" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.08}>
                  <div className={`relative flex flex-col gap-4 md:flex-row ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1" />
                    <div className="absolute left-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold-500 bg-navy-900 md:left-1/2 md:-translate-x-1/2">
                      <div className="h-2 w-2 rounded-full bg-gold-500" />
                    </div>
                    <div className={`flex-1 pl-14 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <span className="font-heading text-2xl font-bold text-gold-500">{item.year}</span>
                      <p className="mt-2 text-sm text-white/50">{item.event}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Our Vision — Future Platform Roadmap */}
      <Section className="bg-navy-50 dark:bg-navy-900/50">
        <Container>
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">Our Vision</span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-navy-900 dark:text-white md:text-5xl">Engineering the Future of Fire Safety</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-500 dark:text-navy-300">
              Pro-Tech Fire & Safety is evolving beyond traditional fire protection. Our vision is to build an intelligent digital platform that simplifies fire safety management for businesses, institutions and communities.
            </p>
          </ScrollReveal>

          <div className="relative mt-16">
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-gold-500 via-gold-500/50 to-transparent md:left-1/2 md:-translate-x-px" />
            <div className="space-y-16">
              {/* 2026 */}
              <ScrollReveal>
                <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex-1 md:text-right md:pr-16">
                    <div className="inline-block rounded-xl bg-white dark:bg-navy-900 p-6 shadow-lg border border-gray-100 dark:border-navy-800">
                      <span className="inline-block rounded-full bg-gold-100 dark:bg-gold-900/30 px-3 py-1 text-xs font-bold text-gold-700 dark:text-gold-400">2026</span>
                      <h3 className="mt-3 font-heading text-lg font-bold text-navy-900 dark:text-white">Website & Digital Presence</h3>
                      <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">Launched comprehensive website. PROJECT AEGIS development begins.</p>
                    </div>
                  </div>
                  <div className="absolute left-8 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold-500 bg-white dark:bg-navy-900 md:left-1/2 md:-translate-x-1/2">
                    <div className="h-3 w-3 rounded-full bg-gold-500" />
                  </div>
                  <div className="flex-1 md:pl-16" />
                </div>
              </ScrollReveal>

              {/* 2027 */}
              <ScrollReveal delay={0.1}>
                <div className="relative flex flex-col gap-6 md:flex-row md:flex-row-reverse md:items-center">
                  <div className="flex-1 md:pl-16">
                    <div className="inline-block rounded-xl bg-white dark:bg-navy-900 p-6 shadow-lg border border-gray-100 dark:border-navy-800">
                      <span className="inline-block rounded-full bg-gold-100 dark:bg-gold-900/30 px-3 py-1 text-xs font-bold text-gold-700 dark:text-gold-400">2027</span>
                      <h3 className="mt-3 font-heading text-lg font-bold text-navy-900 dark:text-white">MVP SaaS Platform Launch</h3>
                      <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">Pro-Tech Safety Command MVP — core features including SOS, dashboard, inspections, and maintenance management.</p>
                    </div>
                  </div>
                  <div className="absolute left-8 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold-500 bg-white dark:bg-navy-900 md:left-1/2 md:-translate-x-1/2">
                    <div className="h-3 w-3 rounded-full bg-gold-500" />
                  </div>
                  <div className="flex-1 md:text-right md:pr-16" />
                </div>
              </ScrollReveal>

              {/* Future */}
              <ScrollReveal delay={0.2}>
                <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex-1 md:text-right md:pr-16">
                    <div className="inline-block rounded-xl bg-gradient-to-br from-gold-500/10 to-amber-500/5 dark:from-gold-500/5 dark:to-amber-500/5 p-6 shadow-lg border border-gold-200 dark:border-gold-700/50">
                      <span className="inline-block rounded-full bg-gradient-to-r from-gold-500 to-amber-500 px-3 py-1 text-xs font-bold text-white">FUTURE</span>
                      <h3 className="mt-3 font-heading text-lg font-bold text-navy-900 dark:text-white">AI-powered Fire Safety Ecosystem</h3>
                      <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">Intelligent platform connecting businesses, citizens, engineers and emergency response through one unified ecosystem. Coming Soon.</p>
                      <div className="mt-4 flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-amber-700 dark:text-amber-400 font-medium">Under Development</span>
                        <span className="rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-blue-700 dark:text-blue-400 font-medium">Coming Soon</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-amber-500 shadow-lg shadow-gold-500/30 md:left-1/2 md:-translate-x-1/2">
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 md:pl-16" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Leadership Team - Founder & Team */}
      <Section>
        <Container>
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">Our Team</span>
            <h2 className="mt-4 font-heading text-4xl font-bold text-navy-900 dark:text-white md:text-5xl">Leadership</h2>
            <p className="mt-4 max-w-2xl text-navy-500 dark:text-navy-300">Meet the people behind Pro-Tech Fire & Safety.</p>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Founder Card */}
            <ScrollReveal>
              <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-navy-900 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/20 hover:-translate-y-1 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                <div className="grid md:grid-cols-2 h-full">
                  <div className="relative h-72 overflow-hidden md:h-full md:min-h-[400px]">
                    <img
                      src="/images/Founder.jpeg"
                      alt="Jayanth Mahapatra"
                      className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                      style={{ display: 'block' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/20 md:to-transparent" />
                    <div className="absolute bottom-6 left-6 md:hidden">
                      <p className="text-xs font-medium tracking-widest text-gold-400 uppercase">Founder & CEO</p>
                      <p className="font-heading text-xl font-bold text-white">Jayanth Mahapatra</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-amber-500 text-white shadow-lg shadow-gold-500/20 mb-4 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-gold-500/30">
                      <Award size={22} />
                    </div>
                    <p className="text-xs font-semibold tracking-widest text-gold-600 uppercase">Founder & CEO</p>
                    <h3 className="mt-1 font-heading text-2xl font-bold text-navy-900 dark:text-white">Jayanth Mahapatra</h3>
                    <div className="mt-2 h-0.5 w-10 rounded-full bg-gradient-to-r from-gold-500 to-amber-400" />
                    <p className="mt-3 text-sm leading-relaxed text-navy-500 dark:text-navy-300">
                      Visionary leader with extensive experience in fire protection engineering. Founded Pro-Tech to bring modern safety solutions to India.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-navy-400 dark:text-navy-400">
                      <span className="flex items-center gap-1 rounded-full bg-navy-50 dark:bg-navy-800 px-3 py-1.5"><MapPin size={12} /> Cuttack</span>
                      <span className="flex items-center gap-1 rounded-full bg-navy-50 dark:bg-navy-800 px-3 py-1.5"><Award size={12} /> 4+ Years</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Team Photo Card */}
            <ScrollReveal delay={0.1}>
              <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-navy-900 shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/20 hover:-translate-y-1 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                <div className="relative h-full min-h-[400px]">
                  <img
                    src="/images/team.jpeg"
                    alt="Pro-Tech Fire & Safety Team"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-1 w-8 rounded-full bg-gold-500" />
                      <p className="text-sm font-medium tracking-widest text-gold-400 uppercase">Our Team</p>
                    </div>
                    <p className="font-heading text-2xl font-bold text-white">Engineering & Operations</p>
                    <p className="mt-1 text-sm text-white/50">Dedicated professionals delivering excellence every day</p>
                  </div>
                  <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-1000 group-hover:w-full" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-navy-50 dark:bg-navy-900/50">
        <Container className="text-center">
          <ScrollReveal>
            <h2 className="font-heading text-4xl font-bold text-navy-900 dark:text-white md:text-5xl">Want to Join Our Team?</h2>
            <p className="mx-auto mt-4 max-w-xl text-navy-500 dark:text-navy-300">We&apos;re always looking for talented engineers and professionals who share our passion for safety.</p>
            <div className="mt-8">
              <Button href="/careers" variant="primary" size="lg">View Open Positions</Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  )
}
