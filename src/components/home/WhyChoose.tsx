'use client'

import { Award, Map, ShieldCheck, Building2, Users, Clock, Star, Target } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import CountUp from '@/components/ui/CountUp'
import RichText from '@/components/ui/RichText'
import TiltCard from '@/components/effects/TiltCard'
import type { WhyChooseRow, StatsRow } from '@/lib/types'

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award size={24} />,
  Map: <Map size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  Building2: <Building2 size={24} />,
  Users: <Users size={24} />,
  Clock: <Clock size={24} />,
  Star: <Star size={24} />,
  Target: <Target size={24} />,
}

interface WhyChooseProps {
  items: WhyChooseRow[]
  stats?: StatsRow | null
}

export default function WhyChoose({ items, stats }: WhyChooseProps) {
  return (
    <Section id="why-choose">
      <Container>
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">
            Why Pro-Tech
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-navy-900 dark:text-white md:text-5xl">
            Engineered for Excellence
          </h2>
          <RichText as="p" className="mt-4 max-w-2xl text-base leading-relaxed text-navy-500 dark:text-navy-300"
            text="What sets us apart is not just what we do, but how we do it — with <<precision>>, <<integrity>>, and an unwavering focus on {safety}."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <TiltCard className="h-full rounded-2xl">
                <div className="group h-full rounded-2xl border border-gray-100 dark:border-navy-800 bg-white dark:bg-navy-900 p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/5 hover:border-gold-200/50 dark:hover:border-gold-700/50">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-navy-200 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-gold-500 group-hover:to-amber-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold-500/30">
                    {item.icon && (item.icon.startsWith('/') || item.icon.startsWith('http')) ? (
                      <img src={item.icon} alt={item.title} className="h-6 w-6 object-contain" />
                    ) : (
                      iconMap[item.icon] || <Award size={24} />
                    )}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy-900 dark:text-white group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500 dark:text-navy-300">
                    {item.description}
                  </p>
                  <div className="mt-4 h-0.5 w-0 rounded-full bg-gradient-to-r from-gold-500 to-amber-500 transition-all duration-500 group-hover:w-full opacity-50" />
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-20 rounded-2xl bg-navy-900 p-12 text-center md:p-20">
            <h3 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {stats?.heading || 'Ready to Secure Your Facility?'}
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/50">
              {stats?.subtitle || 'Schedule a consultation with our engineering team for a comprehensive safety assessment.'}
            </p>
            <div className="mt-8 flex items-center justify-center gap-8">
              {(stats?.stats || [
                { number: 4, suffix: '+', label: 'Years of Experience' },
                { number: 18, suffix: '+', label: 'States Served' },
              ]).map((s, i) => (
                <div key={i} className="text-center">
                  <span className="inline-block font-heading text-5xl font-bold text-gold-500 md:text-6xl">
                    <CountUp end={s.number} suffix={s.suffix} />
                  </span>
                  <p className="mt-1 text-sm text-white/40">{s.label}</p>
                </div>
              )).reduce<React.ReactNode[]>((acc, el, i, arr) => {
                if (i > 0) acc.push(<div key={`sep-${i}`} className="h-12 w-px bg-white/10" />)
                acc.push(el)
                return acc
              }, [])}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  )
}
