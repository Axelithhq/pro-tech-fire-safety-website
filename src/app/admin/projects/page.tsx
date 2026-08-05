'use client'

import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { ProjectRow } from '@/lib/types'

export default function AdminProjectsPage() {
  const columns: ColumnDef<ProjectRow>[] = [
    { key: 'title', label: 'Project', render: (p) => (
      <div>
        <p className="font-medium text-navy-900 dark:text-white">{p.title}</p>
        <p className="text-xs text-navy-400 dark:text-gray-400">{p.client} &middot; {p.location}</p>
      </div>
    )},
    { key: 'status', label: 'Status', render: (p) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${p.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>
        {p.status}
      </span>
    )},
    { key: 'completion_year', label: 'Year', width: '80px', hideOnMobile: true },
    { key: 'is_featured', label: 'Featured', hideOnMobile: true, render: (p) => p.is_featured ? '★' : '—' },
  ]

  const formFields: FormFieldDef[] = [
    { key: 'title', label: 'Title', required: true },
    { key: 'client', label: 'Client' },
    { key: 'industry', label: 'Industry' },
    { key: 'location', label: 'Location' },
    { key: 'slug', label: 'Slug', required: true, hint: 'URL identifier' },
    { key: 'status', label: 'Status', type: 'select', options: [{ value: 'COMPLETED', label: 'Completed' }, { value: 'ONGOING', label: 'Ongoing' }] },
    { key: 'completion_year', label: 'Completion Year' },
    { key: 'scope', label: 'Scope', type: 'textarea', rows: 3 },
    { key: 'details', label: 'Details', type: 'textarea', rows: 5 },
    { key: 'image_url', label: 'Image', type: 'image' },
    { key: 'is_featured', label: 'Featured', type: 'select', options: [{ value: 'true', label: 'Featured' }, { value: 'false', label: 'Standard' }] },
    { key: 'is_active', label: 'Status', type: 'select', options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }] },
  ]

  return <AdminCrud title="Projects" entity="projects" columns={columns} formFields={formFields} emptyState="No projects yet. Add your first project!" />
}
