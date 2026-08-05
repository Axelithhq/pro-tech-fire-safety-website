import { getGallery } from '@/lib/cms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import GalleryGrid from './GalleryGrid'

export default async function GalleryPage() {
  const items = await getGallery()

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center bg-navy-900 pt-32">
        <Container className="relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">
              Gallery
            </span>
            <h1 className="mt-6 font-heading text-5xl font-bold text-white md:text-7xl">
              Photo Gallery
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/50">
              A visual journey through our projects, products, and team.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <GalleryGrid items={items} />
    </>
  )
}
