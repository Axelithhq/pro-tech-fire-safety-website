'use client'

import { useState } from 'react'
import { Shield, Bell, MapPin, LayoutDashboard, ClipboardCheck, CalendarCheck, Package, Users, FileText, LogIn, BellRing, ArrowRight, Sparkles, Activity, Wifi } from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import CtaModal from '@/components/ui/CtaModal'

const features = [
  { icon: Bell, title: 'One-Tap SOS', description: 'Instant emergency assistance request.' },
  { icon: MapPin, title: 'Live Incident Location', description: 'Location sharing for faster response.' },
  { icon: LayoutDashboard, title: 'Building Safety Dashboard', description: 'Track fire safety status digitally.' },
  { icon: ClipboardCheck, title: 'Inspection Management', description: 'Digital inspection records and reminders.' },
  { icon: CalendarCheck, title: 'AMC Management', description: 'Monitor annual maintenance contracts.' },
  { icon: Package, title: 'Fire Equipment Inventory', description: 'Track installed safety equipment.' },
  { icon: Users, title: 'Engineer Dispatch', description: 'Assign service engineers efficiently.' },
  { icon: FileText, title: 'Digital Reports', description: 'Generate inspection and service reports.' },
  { icon: LogIn, title: 'Client Portal', description: 'View projects, reports and certificates.' },
  { icon: BellRing, title: 'Smart Notifications', description: 'Renewal reminders and maintenance alerts.' },
]

export default function FuturePlatform() {
  const [modal, setModal] = useState<'early-access' | 'demo' | null>(null)
  return (
    <Section dark id="future-platform">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />

      {/* Animated network lines background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 100 50 L 50 100 L 0 50 Z" fill="none" stroke="rgba(200,164,92,0.3)" strokeWidth="0.5" />
              <circle cx="50" cy="0" r="1.5" fill="rgba(200,164,92,0.5)" />
              <circle cx="100" cy="50" r="1.5" fill="rgba(200,164,92,0.5)" />
              <circle cx="50" cy="100" r="1.5" fill="rgba(200,164,92,0.5)" />
              <circle cx="0" cy="50" r="1.5" fill="rgba(200,164,92,0.5)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1.5">
            <Sparkles size={14} className="text-gold-500" />
            <span className="text-xs font-semibold tracking-widest text-gold-500 uppercase">Coming Soon</span>
          </div>
          <h2 className="mt-6 font-heading text-4xl font-bold text-white md:text-6xl max-w-4xl">
            The Future of Fire Safety is{' '}
            <span className="bg-gradient-to-r from-gold-500 to-amber-400 bg-clip-text text-transparent">Intelligent</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/50">
            We&apos;re building a next-generation Fire Safety SaaS platform that connects businesses, citizens, engineers and emergency response through one intelligent ecosystem.
          </p>
        </ScrollReveal>

        {/* Phone mockup area with floating cards */}
        <div className="relative mt-16 mb-20">
          <div className="mx-auto max-w-sm">
            <div className="relative mx-auto h-[580px] w-[280px] rounded-[3rem] border-4 border-navy-600 bg-navy-900 shadow-2xl shadow-gold-500/10 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-28 rounded-b-2xl bg-navy-700 z-10" />
              <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-b from-navy-800 to-navy-950 overflow-hidden pt-8">
                <div className="px-4 py-2 flex items-center justify-between border-b border-white/5">
                  <span className="text-xs font-bold text-white">Safety Command</span>
                  <span className="text-[10px] text-gold-500 font-semibold">LIVE</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="rounded-xl bg-navy-800/80 p-3 border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-green-400">System Online</span>
                    </div>
                    <p className="mt-1 text-[10px] text-white/40">All sensors operational</p>
                  </div>
                  <div className="rounded-xl bg-navy-800/80 p-3 border border-gold-500/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white">Emergency Contacts</span>
                      <span className="text-[10px] text-gold-500">3 nearby</span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Bell size={14} className="text-red-400" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Shield size={14} className="text-blue-400" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <MapPin size={14} className="text-amber-400" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-gradient-to-r from-gold-500/10 to-amber-500/5 p-3 border border-gold-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gold-400">Safety Score</span>
                      <span className="text-sm font-bold text-gold-500">94%</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-navy-700">
                      <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-gold-500 to-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating cards — orbital pattern */}
          <motion.div
            className="absolute top-0 left-0 md:-left-6 lg:-left-12 hidden md:block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-4 shadow-xl">
              <Bell size={20} className="text-gold-500" />
              <p className="mt-1 text-xs text-white/70">SOS Ready</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-0 right-0 md:-right-6 lg:-right-12 hidden md:block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-4 shadow-xl">
              <BellRing size={20} className="text-emerald-400" />
              <p className="mt-1 text-xs text-white/70">Smart Alerts</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-8 lg:-left-16 hidden md:block"
            animate={{ y: [0, 6, 0], x: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-4 shadow-xl">
              <Wifi size={20} className="text-cyan-400" />
              <p className="mt-1 text-xs text-white/70">IoT Connected</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-8 lg:-right-16 hidden md:block"
            animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-4 shadow-xl">
              <Activity size={20} className="text-blue-400" />
              <p className="mt-1 text-xs text-white/70">Real-time Monitor</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:block"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-4 shadow-xl">
              <MapPin size={20} className="text-amber-400" />
              <p className="mt-1 text-xs text-white/70">Live Tracking</p>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-500 hover:border-gold-500/30 hover:bg-white/[0.06] hover:-translate-y-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-500 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-gold-500/20">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-sm font-bold text-white">{feature.title}</h3>
                <p className="mt-1 text-xs text-white/40">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-5 py-2 mb-6">
              <Sparkles size={14} className="text-gold-500" />
              <span className="text-sm font-medium text-gold-500">Future Platform — Under Development</span>
            </div>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              Be among the first to know when we launch. Join our early access list.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              <Button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => setModal('early-access'), 400) }} variant="primary" size="lg" className="px-16 py-7 text-xl tracking-wide shadow-2xl shadow-gold-500/30 hover:shadow-[0_0_40px_rgba(200,164,92,0.4)] hover:scale-110 transition-all duration-300 animate-pulse-glow">
                Join Early Access
                <ArrowRight size={24} />
              </Button>
              <Button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => setModal('demo'), 400) }} variant="secondary" size="lg" className="px-16 py-7 text-xl tracking-wide shadow-2xl hover:shadow-[0_0_40px_rgba(200,164,92,0.3)] hover:scale-110 transition-all duration-300">
                Request Demo
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
      <CtaModal open={modal === 'early-access'} onClose={() => setModal(null)} type="early-access" />
      <CtaModal open={modal === 'demo'} onClose={() => setModal(null)} type="demo" />
    </Section>
  )
}