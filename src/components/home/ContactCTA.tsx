'use client'

import { useState } from 'react'
import { Phone, Mail, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import CtaModal from '@/components/ui/CtaModal'

export default function ContactCTA() {
  const [showModal, setShowModal] = useState(false)
  return (
    <Section className="dark:bg-navy-950">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-12 md:p-20">
          {/* Animated glow orbs */}
          <motion.div
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 h-48 w-48 rounded-full bg-gold-500/5 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          <div className="relative z-10">
            <ScrollReveal>
              <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                Let&apos;s Protect Your Next Project
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/50">
                Share your project requirements and our engineering team will
                prepare a tailored fire protection solution.
              </p>
            </ScrollReveal>

            <div className="mt-10 flex flex-wrap gap-6">
              <ScrollReveal delay={0.1}>
                <Button onClick={() => setShowModal(true)} variant="secondary" size="lg" className="shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40 transition-shadow">
                  Schedule Consultation
                </Button>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Button
                  href="tel:+918249785871"
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white hover:text-navy-900 shadow-lg shadow-black/20"
                >
                  <Phone size={16} />
                  Call Us
                </Button>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.3}>
              <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/40">
                <motion.a
                  href="mailto:info.jayanthprotechfire@gmail.com"
                  className="flex items-center gap-2 transition-colors hover:text-gold-500"
                  whileHover={{ x: 4 }}
                >
                  <Mail size={14} />
                  info.jayanthprotechfire@gmail.com
                </motion.a>
                <span className="flex items-center gap-2">
                  <MessageSquare size={14} />
                  Available 24/7 for emergencies
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
      <CtaModal open={showModal} onClose={() => setShowModal(false)} type="consultation" />
    </Section>
  )
}
