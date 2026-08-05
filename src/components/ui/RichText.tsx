'use client'

import type { ReactNode } from 'react'

interface RichTextProps {
  text: string
  className?: string
  as?: 'p' | 'span' | 'div'
}

/**
 * Renders text with `<<highlight>>` markers for multi-font, multi-color words.
 */
export default function RichText({ text, className, as: Tag = 'span' }: RichTextProps) {
  const parts = text.split(/(<<[^>]+>>)/g)
  const rendered: ReactNode[] = parts.map((part, i) => {
    if (part.startsWith('<<') && part.endsWith('>>')) {
      const word = part.slice(2, -2)
      return (
        <span
          key={i}
          className="font-heading text-gold-600 dark:text-gold-400 italic"
        >
          {word}
        </span>
      )
    }
    if (part.startsWith('{') && part.endsWith('}')) {
      const word = part.slice(1, -1)
      return (
        <span
          key={i}
          className="font-mono text-amber-600 dark:text-amber-400 text-[0.9em] tracking-wide uppercase"
        >
          {word}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })

  return <Tag className={className}>{rendered}</Tag>
}
