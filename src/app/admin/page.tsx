'use client'

import { useEffect, useState } from 'react'
import {
  Package, FolderOpen, FileText, Star, Briefcase,
  HandshakeIcon, Award, Building2, Wrench, Users, MessageSquare, Settings,
} from 'lucide-react'
import Link from 'next/link'
import { Search } from 'lucide-react'

const entities = [
  { key: 'Products', entity: 'products', icon: Package, color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', href: '/admin/products' },
  { key: 'Projects', entity: 'projects', icon: FolderOpen, color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400', href: '/admin/projects' },
  { key: 'Services', entity: 'services', icon: Wrench, color: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400', href: '/admin/services' },
  { key: 'Why Pro-Tech', entity: 'whychoose', icon: FileText, color: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', href: '/admin/blog' },
  { key: 'Testimonials', entity: 'testimonials', icon: Star, color: 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400', href: '/admin/testimonials' },
  { key: 'Clients', entity: 'clients', icon: HandshakeIcon, color: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400', href: '/admin/clients' },
  { key: 'Certifications', entity: 'certifications', icon: Award, color: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400', href: '/admin/certifications' },
  { key: 'Industries', entity: 'industries', icon: Building2, color: 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400', href: '/admin/industries' },
  { key: 'Careers', entity: 'jobs', icon: Briefcase, color: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400', href: '/admin/careers' },
  { key: 'Enquiries', entity: 'enquiries', icon: MessageSquare, color: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400', href: '/admin/enquiries' },
  { key: 'Leads', entity: 'leads', icon: Users, color: 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400', href: '/admin/leads' },
]

export default function AdminPage() {
  const [counts, setCounts] = useState<Record<string, string>>({})

  useEffect(() => {
    entities.forEach(({ key, entity }) => {
      if (entity === 'leads') { setCounts(c => ({ ...c, [key]: '—' })); return }
      fetch(`/api/cms/${entity}`)
        .then(r => r.ok ? r.json() : [])
        .then(data => setCounts(c => ({ ...c, [key]: String(data.length) })))
        .catch(() => setCounts(c => ({ ...c, [key]: '0' })))
    })
  }, [])

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Welcome back, Admin. Here&apos;s your overview.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..."
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
            </div>
            <Link href="/admin/settings"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 transition-colors hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-900 dark:hover:text-white">
              <Settings size={20} />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {entities.map(({ key, icon: Icon, color, href }) => (
            <Link key={key} href={href}
              className="group rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                <Icon size={24} />
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{counts[key] ?? '...'}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{key}</p>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Enquiries</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">View and manage contact form submissions from the Enquiries page.</p>
          </div>
          <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Quick Stats</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {['Projects', 'Products', 'Why Pro-Tech', 'Testimonials'].map(label => (
                <div key={label} className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{counts[label] ?? '...'}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
