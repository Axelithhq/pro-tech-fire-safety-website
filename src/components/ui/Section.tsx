import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  dark?: boolean
}

export default function Section({
  children,
  className,
  id,
  dark,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-24 md:py-32',
        dark && 'bg-navy-900 text-white dark:bg-navy-950',
        !dark && 'bg-white dark:bg-navy-950',
        className
      )}
      style={{ contentVisibility: 'auto' }}
    >
      {children}
    </section>
  )
}
