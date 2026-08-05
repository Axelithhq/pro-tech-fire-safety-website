import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import TextRevealHeading from '@/components/effects/TextRevealHeading'
import GlassCard from '@/components/effects/GlassCard'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import ContactForm from './ContactForm'
import ContactMapEmbed from './ContactMapEmbed'
import HeroParticles from '@/components/effects/HeroParticles'

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center bg-navy-900 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <HeroParticles count={25} color="rgba(59,130,246," />
        <Container className="relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">Contact</span>
          </ScrollReveal>
          <TextRevealHeading as="h1" className="mt-6 font-heading text-5xl font-bold text-white md:text-7xl">
            Let&apos;s Talk<br />About Safety
          </TextRevealHeading>
          <TextRevealHeading delay={0.2} as="p" className="mt-4 max-w-2xl text-lg text-white/70">
            Ready to protect your facility? Our team is here to help.
          </TextRevealHeading>
        </Container>
      </section>

      {/* Form + Details */}
      <Section>
        <Container>
          <div className="grid gap-16 md:grid-cols-2">
            {/* Form */}
            <div className="space-y-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl font-bold text-navy-900 dark:text-white">Get in Touch</h2>
                <p className="text-navy-500 dark:text-navy-300">Fill out the form and our team will get back to you within 24 hours. For urgent inquiries, please call us.</p>
              </ScrollReveal>
              <ContactForm />
            </div>

            {/* Contact Details + Map */}
            <div className="space-y-8">
              <ScrollReveal delay={0.2}>
                <ContactMapEmbed />
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <GlassCard className="rounded-2xl border border-gray-100 dark:border-navy-800 bg-white dark:bg-navy-900 p-8 shadow-sm">
                  <h3 className="font-heading text-xl font-bold text-navy-900 dark:text-white">Contact Details</h3>
                  <div className="mt-6 space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 dark:bg-navy-800">
                        <MapPin size={18} className="text-navy-700 dark:text-navy-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900 dark:text-white">Office Location</p>
                        <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">Plot No- 3612/7649, Siris (K)<br />Cuttack, Odisha - 753014</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 dark:bg-navy-800">
                        <Phone size={18} className="text-navy-700 dark:text-navy-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900 dark:text-white">Phone</p>
                        <a href="tel:+918249785871" className="mt-1 block text-sm text-gold-600 transition-colors hover:text-gold-700">+91 82497 85871</a>
                        <p className="text-xs text-navy-400 mt-0.5">Contact Person: Jayanth Mahapatra</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 dark:bg-navy-800">
                        <Mail size={18} className="text-navy-700 dark:text-navy-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900 dark:text-white">Email</p>
                        <a href="mailto:info.jayanthprotechfire@gmail.com" className="mt-1 block text-sm text-gold-600 transition-colors hover:text-gold-700">info.jayanthprotechfire@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 dark:bg-navy-800">
                        <Clock size={18} className="text-navy-700 dark:text-navy-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900 dark:text-white">Business Hours</p>
                        <p className="mt-1 text-sm text-navy-500 dark:text-navy-300">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                        <p className="text-sm text-navy-500 dark:text-navy-300">Closed on Sundays & Public Holidays</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
