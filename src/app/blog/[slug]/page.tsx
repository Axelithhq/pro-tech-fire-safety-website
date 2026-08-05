import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { getPosts, getPostBySlug } from '@/lib/cms'
import TextRevealHeading from '@/components/effects/TextRevealHeading'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center bg-navy-900 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-700 via-navy-900 to-navy-950" />
        <Container className="relative z-10">
          <Button href="/blog" variant="ghost" className="mb-6 text-white/50 hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Button>
          <TextRevealHeading as="h1" className="font-heading text-4xl font-bold text-white md:text-6xl">
            {post.title}
          </TextRevealHeading>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <User size={14} />
              {post.author}
            </span>
            {post.published_at && (
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {post.published_at}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Clock size={14} />
              {post.reading_time_min} min read
            </span>
            <span className="rounded-full bg-gold-500/10 px-3 py-0.5 text-gold-400">
              {post.category}
            </span>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <article className="prose prose-navy mx-auto max-w-3xl">
            <div className="rounded-2xl bg-navy-50 p-8 mb-8">
              <p className="text-lg leading-relaxed text-navy-500">
                {post.summary}
              </p>
            </div>
            <div className="text-base leading-relaxed text-navy-500 whitespace-pre-line">
              {post.content}
            </div>
          </article>

          <div className="mt-16 border-t border-gray-100 pt-12 text-center">
            <TextRevealHeading as="h2" className="font-heading text-2xl font-bold text-navy-900">
              Want to Learn More?
            </TextRevealHeading>
            <p className="mx-auto mt-4 max-w-md text-navy-500">
              Contact our engineering team for expert advice on your fire protection needs.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Get in Touch
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
