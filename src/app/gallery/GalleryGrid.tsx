'use client'

import { useState } from 'react'
import { Image, X } from 'lucide-react'
import type { GalleryRow } from '@/lib/types'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

interface GalleryGridProps {
  items: GalleryRow[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const categories = ['All', ...new Set(items.map((item) => item.category))]
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<number | null>(null)

  const filtered =
    active === 'All'
      ? items
      : items.filter((item) => item.category === active)

  return (
    <>
      <Section>
        <Container>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  active === cat
                    ? 'bg-navy-900 text-white'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.05}>
                <button
                  onClick={() => setSelected(i)}
                  className="group relative w-full overflow-hidden rounded-2xl bg-navy-50 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-64 items-center justify-center md:h-72">
                    <Image size={48} className="text-navy-300 transition-all group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                  </div>
                  <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium text-navy-700">
                    {item.category}
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute right-6 top-6 text-white/60 transition-colors hover:text-white"
          >
            <X size={32} />
          </button>
          <div
            className="max-h-[80vh] max-w-4xl overflow-hidden rounded-2xl bg-navy-900 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-96 items-center justify-center rounded-xl bg-navy-800">
              <Image size={64} className="text-navy-600" />
            </div>
            <p className="mt-4 text-center text-lg font-medium text-white">
              {filtered[selected]?.title}
            </p>
            <p className="text-center text-sm text-white/40">
              {filtered[selected]?.category}
            </p>
            {filtered[selected]?.description && (
              <p className="mt-2 text-center text-sm text-white/60">
                {filtered[selected]?.description}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
