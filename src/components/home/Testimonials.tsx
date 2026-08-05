'use client'

import { Star } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import type { TestimonialRow } from '@/lib/types'

interface TestimonialsProps {
  testimonials: TestimonialRow[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <Section dark className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-navy-950" />
      <Container className="relative z-10">
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">
            Testimonials
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
            What Our Clients Say
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {testimonials.filter((t) => t.is_featured).map((testimonial, i) => (
            <ScrollReveal key={testimonial.id} delay={i * 0.12}>
              <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/30 hover:bg-white/10 hover:shadow-2xl hover:shadow-gold-500/10">
                <div className="absolute -top-3 -right-2 text-5xl text-gold-500/10 font-serif leading-none select-none">
                  &ldquo;
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-gold-500 text-gold-500 transition-all duration-300 hover:scale-110"
                    />
                  ))}
                </div>
                <p className="relative mt-5 text-base leading-relaxed text-white/70 z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="relative mt-6 flex items-center gap-4 z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-500 to-amber-600 shadow-lg shadow-gold-500/30 transition-transform duration-500 group-hover:scale-110">
                    <span className="text-sm font-bold text-white drop-shadow-sm">
                      {testimonial.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-white/40">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
