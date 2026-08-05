import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { getPosts } from '@/lib/cms'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <section className="relative flex min-h-[40vh] items-center bg-navy-900 pt-32">
        <Container className="relative z-10">
          <ScrollReveal>
            <span className="inline-block text-xs font-semibold tracking-widest text-gold-500 uppercase">
              Blog
            </span>
            <h1 className="mt-6 font-heading text-5xl font-bold text-white md:text-7xl">
              Insights & Updates
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/50">
              Expert insights on fire protection engineering, safety compliance,
              and industry best practices.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <Section>
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-navy-500">No posts yet. Check back soon.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <ScrollReveal key={post.id} delay={i * 0.08}>
                  <article className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="inline-block self-start rounded-full bg-gold-100 px-3 py-1 text-xs font-medium text-gold-700">
                      {post.category}
                    </span>
                    <h2 className="mt-4 font-heading text-lg font-bold text-navy-900 transition-colors group-hover:text-gold-600">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-500">
                      {post.summary}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-4 text-xs text-navy-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.published_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.reading_time_min} min read
                        </span>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-navy-300 transition-all group-hover:translate-x-1 group-hover:text-gold-600"
                      />
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
