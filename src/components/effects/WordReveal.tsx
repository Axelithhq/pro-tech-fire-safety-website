'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function WordItem({
  word,
  startPct,
  endPct,
  scrollYProgress,
}: {
  word: string
  startPct: number
  endPct: number
  scrollYProgress: MotionValue<number>
}) {
  const opacity = useTransform(scrollYProgress, [startPct, endPct], [0, 1])
  const y = useTransform(scrollYProgress, [startPct, endPct], [18, 0])
  const blur = useTransform(scrollYProgress, [startPct, endPct], [6, 0])
  const scale = useTransform(scrollYProgress, [startPct, endPct], [0.92, 1])

  return (
    <motion.span
      style={{ opacity, y, filter: blur ? `blur(${blur}px)` : 'none', scale }}
      className="inline-block mr-[0.22em] last:mr-0"
    >
      {word}
    </motion.span>
  )
}

interface WordRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  scrollYProgress: MotionValue<number>
  range?: [number, number]
}

export default function WordReveal({
  text,
  className,
  as: Tag = 'p',
  scrollYProgress,
  range = [0, 0.35],
}: WordRevealProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  const [rangeStart, rangeEnd] = range
  const scrollSpan = rangeEnd - rangeStart

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        const start = rangeStart + (i / words.length) * scrollSpan
        const end = rangeStart + ((i + 1) / words.length) * scrollSpan
        return (
          <WordItem
            key={`${word}-${i}`}
            word={word}
            startPct={start}
            endPct={end}
            scrollYProgress={scrollYProgress}
          />
        )
      })}
    </Tag>
  )
}
