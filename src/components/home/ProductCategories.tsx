'use client'

import { ArrowRight, Shield } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import RichText from '@/components/ui/RichText'
import TiltCard from '@/components/effects/TiltCard'
import type { CategoryRow } from '@/lib/types'

const categoryImages: Record<string, string> = {
  'Fire Detection Systems': '/images/products/smoke-detector.jpg',
  'Fire Alarm Panels': '/images/products/fire-alarm-panel.jpg',
  'Sprinkler Components': '/images/products/sprinkler-head.jpg',
  'Fire Extinguishers': '/images/products/fire-extinguisher.jpg',
  'Deluge & Special Systems': '/images/products/industrial-pipes.jpg',
  'Fire Rated Doors': '/images/products/fire-door.jpg',
}

interface ProductCategoriesProps {
  categories: CategoryRow[]
}

export default function ProductCategories({ categories }: ProductCategoriesProps) {
  return (
    <Section id="products">
      <Container>
        <ScrollReveal>
          <span className="inline-block text-xs font-semibold tracking-widest text-gold-600 uppercase">
            Product Range
          </span>
          <h2 className="mt-4 font-heading text-4xl font-bold text-navy-900 dark:text-white md:text-5xl">
            Premium Fire Safety Equipment
          </h2>
          <RichText as="p" className="mt-4 max-w-2xl text-base leading-relaxed text-navy-500 dark:text-navy-300"
            text="Curated selection of <<industry-leading>> fire protection products from the world&apos;s most {trusted manufacturers}."
          />
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category, i) => {
            const imgSrc = categoryImages[category.name] || null
            return (
              <ScrollReveal key={category.id} delay={i * 0.08}>
                <TiltCard className="h-full rounded-2xl">
                  <a
                    href={`/products#${category.slug}`}
                    className="group relative block h-full cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-navy-900 border border-gray-100 dark:border-navy-800 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/10 hover:border-gold-200/50 dark:hover:border-gold-700/50"
                  >
                    <div className="relative h-48 overflow-hidden bg-navy-100 dark:bg-navy-800">
                        {imgSrc ? (
                        <div
                          className="absolute inset-0 h-full w-full bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${imgSrc})` }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Shield size={48} className="text-navy-300 dark:text-navy-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent dark:from-navy-900/80 dark:via-navy-900/20" />
                    </div>
                    <div className="relative p-6 -mt-12">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-navy-800 shadow-lg backdrop-blur-sm border border-white/50 dark:border-navy-700 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-gold-500/20">
                        <span className="text-lg font-bold text-gold-600">{category.name.split(' ')[0][0]}{category.name.split(' ')[1]?.[0] || ''}</span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-navy-900 dark:text-white group-hover:text-gold-700 dark:group-hover:text-gold-400 transition-colors">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="mt-2 text-sm leading-relaxed text-navy-500 dark:text-navy-300">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium">
                        <span className="text-gold-600 group-hover:text-gold-700 transition-colors">Explore</span>
                        <ArrowRight
                          size={14}
                          className="text-gold-600 transition-all group-hover:translate-x-1 group-hover:text-gold-700"
                        />
                      </div>
                    </div>
                  </a>
                </TiltCard>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Button href="/products" variant="outline">
              Browse All Products
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  )
}
