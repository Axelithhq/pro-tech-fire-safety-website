import { Building2, Factory, Heart, Hotel, Home, GraduationCap, Shield, Server, ArrowRight } from 'lucide-react'
import { getIndustries } from '@/lib/cms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 size={28} />,
  Factory: <Factory size={28} />,
  Heart: <Heart size={28} />,
  Hotel: <Hotel size={28} />,
  Home: <Home size={28} />,
  GraduationCap: <GraduationCap size={28} />,
  Shield: <Shield size={28} />,
  Server: <Server size={28} />,
}

export default async function IndustriesPage() {
  const industries = await getIndustries()

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center bg-navy-900 pt-32">
        <Container className="relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">
              Industries We Protect
            </span>
            <h1 className="mt-6 font-heading text-5xl font-bold text-white md:text-7xl">
              Industries We Protect
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/50">
              From towering commercial complexes to critical healthcare facilities,
              our solutions are engineered for each sector&apos;s unique challenges.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <Container>
          {industries.length === 0 ? (
            <p className="text-center text-navy-500">No industries listed yet.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, i) => {
                const Icon = iconMap[industry.icon] || <Building2 size={28} />
                return (
                  <ScrollReveal key={industry.id} delay={i * 0.08}>
                    <article className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-navy-700 dark:bg-navy-900 dark:hover:shadow-navy-800/50">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-900 dark:bg-navy-800 dark:text-navy-200">
                        {industry.icon && (industry.icon.startsWith('/') || industry.icon.startsWith('http')) ? (
                          <img src={industry.icon} alt={industry.name} className="h-7 w-7 object-contain" />
                        ) : (
                          Icon
                        )}
                      </div>
                      <h2 className="font-heading text-lg font-bold text-navy-900 transition-colors group-hover:text-gold-600 dark:text-white">
                        {industry.name}
                      </h2>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-500 dark:text-navy-300">
                        {industry.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-navy-700">
                        <span className="text-xs font-medium text-navy-400 dark:text-navy-500">
                          {industry.project_count} project{industry.project_count !== 1 ? 's' : ''}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-navy-300 transition-all group-hover:translate-x-1 group-hover:text-gold-600 dark:text-navy-500"
                        />
                      </div>
                    </article>
                  </ScrollReveal>
                )
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
