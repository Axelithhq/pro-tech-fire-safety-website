'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import type { ClientRow } from '@/lib/types'

interface ClientsProps {
  clients: ClientRow[]
}

export default function Clients({ clients }: ClientsProps) {
  const duplicated = [...clients, ...clients, ...clients]

  return (
    <Section>
      <Container>
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">
            Our Clients
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-navy-900 dark:text-white md:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-500 dark:text-navy-300">
            We are proud to partner with India&apos;s most respected organizations
            across every sector.
          </p>
        </ScrollReveal>

        <div className="relative mt-12 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white dark:from-navy-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white dark:from-navy-950 to-transparent pointer-events-none" />

          <motion.div
            className="flex gap-6"
            animate={{
              x: ['0%', '-33.33%'],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {duplicated.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="group flex h-[140px] w-[200px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 dark:border-navy-800 bg-white dark:bg-navy-900 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold-200/50 dark:hover:border-gold-700/50 hover:bg-gradient-to-br hover:from-gold-500/[0.03] hover:to-transparent"
              >
                {client.logo_url ? (
                  <img
                    src={client.logo_url}
                    alt={`${client.name} logo`}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <div className="flex h-10 w-20 items-center justify-center rounded-lg bg-navy-50 dark:bg-navy-800">
                    <span className="text-lg font-bold text-navy-300 dark:text-navy-500">
                      {client.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                    </span>
                  </div>
                )}
                <span className="text-center font-heading text-sm font-bold text-navy-300 dark:text-navy-400 transition-colors duration-300 group-hover:text-gold-600 leading-tight">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}