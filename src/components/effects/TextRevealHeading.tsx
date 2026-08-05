'use client'

import TextReveal from './TextReveal'

interface TextRevealHeadingProps {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export default function TextRevealHeading({ children, delay, className, as }: TextRevealHeadingProps) {
  return (
    <TextReveal delay={delay} className={className} as={as}>
      {children}
    </TextReveal>
  )
}
