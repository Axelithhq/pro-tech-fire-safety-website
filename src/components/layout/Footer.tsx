import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="border-b border-white/10 py-16">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500">
                  <span className="text-lg font-bold text-navy-900">PF</span>
                </div>
                <div>
                  <p className="text-base font-bold">Pro-Tech</p>
                  <p className="text-[10px] font-medium tracking-widest text-gold-500 uppercase">
                    Fire & Safety
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                India&apos;s premier fire protection engineering company, delivering
                comprehensive safety solutions for over two decades.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider text-gold-500 uppercase">
                Quick Links
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Services', href: '/services' },
                  { label: 'Products', href: '/products' },
                  { label: 'Projects', href: '/projects' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold-500"
                  >
                    <ArrowUpRight
                      size={12}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider text-gold-500 uppercase">
                Services
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  'Fire Detection Systems',
                  'Fire Suppression',
                  'Emergency Evacuation',
                  'Safety Audits',
                  'Maintenance & Support',
                ].map((service) => (
                  <Link
                    key={service}
                    href="/services"
                    prefetch={true}
                    className="text-sm text-white/60 transition-colors hover:text-gold-500"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider text-gold-500 uppercase">
                Contact
              </h4>
              <div className="flex flex-col gap-4 text-sm text-white/60">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gold-500" />
                  <span>
                    Cuttack, Odisha
                    <br />
                    (Pan-India Operations)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-gold-500" />
                  <a
                    href="tel:+918249785871"
                    className="hover:text-gold-500 transition-colors"
                  >
                    +91 82497 85871
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-gold-500" />
                  <a
                    href="mailto:info.jayanthprotechfire@gmail.com"
                    className="hover:text-gold-500 transition-colors"
                  >
                    info.jayanthprotechfire@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="shrink-0 text-gold-500" />
                  <span>Mon–Sat: 9:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="py-6">
        <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Pro-Tech Fire & Safety. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link href="/terms" prefetch={true} className="hover:text-gold-500 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" prefetch={true} className="hover:text-gold-500 transition-colors">
              Privacy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
