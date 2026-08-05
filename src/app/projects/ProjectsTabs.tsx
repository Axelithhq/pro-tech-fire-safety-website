'use client'

import { useState } from 'react'
import { MapPin, Building2, Calendar, Crosshair, CheckCircle, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { cn } from '@/lib/utils'
import type { ProjectRow } from '@/lib/types'

interface ProjectsTabsProps {
  completed: ProjectRow[]
  ongoing: ProjectRow[]
}

function ProjectCard({ project, isCompleted, index }: { project: ProjectRow; isCompleted: boolean; index: number }) {
  return (
    <ScrollReveal key={project.id} delay={index * 0.08}>
      <div className={cn(
        'group rounded-2xl bg-white dark:bg-navy-900 p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-12',
        isCompleted ? 'border border-gray-100 dark:border-navy-800' : 'border border-amber-100 dark:border-amber-900/30'
      )}>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className={cn(
              'flex h-48 items-center justify-center rounded-xl md:h-56 border overflow-hidden',
              isCompleted
                ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/10'
                : 'bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/10'
            )}>
              {project.image_url ? (
                <img src={project.image_url} alt={project.client || project.title} className="h-full w-full object-contain p-6" />
              ) : (
                <Building2 size={48} className={isCompleted ? 'text-emerald-400' : 'text-amber-400'} />
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={cn(
                  'inline-block rounded-full px-3 py-1 text-xs font-medium',
                  isCompleted
                    ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400'
                    : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400'
                )}>
                  {project.industry}
                </span>
                <h2 className="mt-3 font-heading text-2xl font-bold text-navy-900 dark:text-white">{project.title}</h2>
                <p className="mt-1 text-sm font-medium text-navy-500 dark:text-navy-400">Client: {project.client || 'Confidential'}</p>
              </div>
              <span className={cn(
                'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
                isCompleted
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400'
                  : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400'
              )}>
                {isCompleted ? <CheckCircle size={12} /> : <Clock size={12} />}
                {isCompleted ? 'Completed' : 'Ongoing'}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-navy-400 dark:text-navy-400">
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {project.location}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {project.completion_year}</span>
              <span className="flex items-center gap-1.5"><Crosshair size={14} /> {project.scope}</span>
            </div>
            <p className="mt-4 leading-relaxed text-navy-500 dark:text-navy-300">{project.details}</p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function ProjectsTabs({ completed, ongoing }: ProjectsTabsProps) {
  const [tab, setTab] = useState<'completed' | 'ongoing'>(completed.length > 0 ? 'completed' : 'ongoing')
  const projects = tab === 'completed' ? completed : ongoing

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <ScrollReveal>
            <div className="flex items-center gap-3">
              {tab === 'completed'
                ? <CheckCircle size={28} className="text-emerald-500" />
                : <Clock size={28} className="text-amber-500" />
              }
              <h2 className="font-heading text-3xl font-bold text-navy-900 dark:text-white md:text-4xl">
                {tab === 'completed' ? 'Completed Projects' : 'Ongoing Projects'}
              </h2>
            </div>
            <p className="mt-2 text-navy-500 dark:text-navy-300">
              {tab === 'completed'
                ? `${completed.length} successfully delivered projects`
                : `${ongoing.length} projects currently in progress`
              }
            </p>
          </ScrollReveal>

          <div className="flex shrink-0 rounded-xl bg-navy-50 dark:bg-navy-800 p-1">
            <button
              onClick={() => setTab('completed')}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                tab === 'completed'
                  ? 'bg-white dark:bg-navy-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-navy-500 dark:text-navy-400 hover:text-navy-700 dark:hover:text-navy-200'
              )}
            >
              <CheckCircle size={16} />
              Completed ({completed.length})
            </button>
            <button
              onClick={() => setTab('ongoing')}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                tab === 'ongoing'
                  ? 'bg-white dark:bg-navy-900 text-amber-700 dark:text-amber-400 shadow-sm'
                  : 'text-navy-500 dark:text-navy-400 hover:text-navy-700 dark:hover:text-navy-200'
              )}
            >
              <Clock size={16} />
              Ongoing ({ongoing.length})
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-10 space-y-8"
          >
            {projects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 dark:border-navy-700 p-12 text-center">
                <p className="text-navy-400 dark:text-navy-500">
                  {tab === 'ongoing' ? 'No ongoing projects at the moment.' : 'No completed projects yet.'}
                </p>
              </div>
            ) : (
              projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} isCompleted={tab === 'completed'} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  )
}
