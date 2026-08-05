'use client'

import { Building2, Factory, Heart, Hotel, Home, GraduationCap, Shield, Server } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import RichText from '@/components/ui/RichText'
import type { IndustryRow } from '@/lib/types'

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 size={32} />,
  Factory: <Factory size={32} />,
  Heart: <Heart size={32} />,
  Hotel: <Hotel size={32} />,
  Home: <Home size={32} />,
  GraduationCap: <GraduationCap size={32} />,
  Shield: <Shield size={32} />,
  Server: <Server size={32} />,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cardVariants: any = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

interface IndustriesProps {
  industries: IndustryRow[]
}

export default function Industries({ industries }: IndustriesProps) {
  return (
    <Section id="industries">
      <Container>
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">
            Industries We Protect
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-navy-900 dark:text-white md:text-5xl">
            Expertise Across Sectors
          </h2>
          <RichText as="p" className="mt-4 max-w-2xl text-base leading-relaxed text-navy-600 dark:text-navy-300"
            text="From towering <<commercial complexes>> to <<critical healthcare facilities>>, our solutions are engineered for each sector&apos;s {unique challenges}."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => {
            const Icon = iconMap[industry.icon] || <Building2 size={32} />
            return (
              <motion.div
                key={industry.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-2xl bg-white dark:bg-navy-900 p-8 shadow-lg dark:shadow-navy-800/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 dark:hover:shadow-gold-500/5"
              >
                {/* Animated gradient border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(200,164,92,0.15), transparent 50%, rgba(200,164,92,0.05))',
                  }}
                />

                  {/* Subtle glow */}
                  <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-gold-500/5" />

                <div className="relative z-10">
                  <motion.div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-navy-200 shadow-sm"
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="transition-all duration-500 group-hover:scale-110 group-hover:text-gold-600 dark:group-hover:text-gold-400">
                      {industry.icon && (industry.icon.startsWith('/') || industry.icon.startsWith('http')) ? (
                        <img src={industry.icon} alt={industry.name} className="h-8 w-8 object-contain" />
                      ) : (
                        Icon
                      )}
                    </div>
                  </motion.div>

                  <h3 className="font-heading text-xl font-bold text-navy-900 dark:text-white group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors duration-300">
                    {industry.name}
                  </h3>

                  <p className="relative mt-3 text-sm leading-relaxed text-navy-500 dark:text-navy-300 flex-1">
                    {industry.description}
                  </p>

                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
