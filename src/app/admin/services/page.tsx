'use client'

import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { ServiceRow } from '@/lib/types'

export default function AdminServicesPage() {
  const columns: ColumnDef<ServiceRow>[] = [
    { key: 'title', label: 'Service', render: (s) => (
      <div className="flex items-center gap-3">
        {s.icon ? <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-100 dark:bg-navy-800 text-lg">{s.icon}</div> : <div className="h-8 w-8 rounded-lg bg-navy-100 dark:bg-navy-800" />}
        <div>
          <p className="font-medium text-navy-900 dark:text-white">{s.title}</p>
          <p className="text-xs text-navy-400 dark:text-gray-400">{s.subtitle}</p>
        </div>
      </div>
    )},
    { key: 'is_featured', label: 'Featured', render: (s) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s.is_featured ? 'bg-gold-100 text-gold-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
        {s.is_featured ? 'Featured' : 'Standard'}
      </span>
    )},
    { key: 'is_active', label: 'Status', render: (s) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
        {s.is_active ? 'Active' : 'Inactive'}
      </span>
    )},
    { key: 'sort_order', label: 'Order', width: '80px', hideOnMobile: true },
  ]

  const formFields: FormFieldDef[] = [
    { key: 'title', label: 'Title', required: true },
    { key: 'slug', label: 'Slug', required: true },
    { key: 'subtitle', label: 'Subtitle', half: true, hint: 'Short tagline shown below title' },
    { key: 'icon', label: 'Icon', half: true, hint: 'Icon name: Shield, Wrench, Building2, Bell, Users, Factory' },
    { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
    { key: 'image_url', label: 'Image', type: 'image', hint: 'Upload service image' },
    { key: 'features', label: 'Features', type: 'array', hint: 'One feature per line - shown as checkmark list' },
    { key: 'is_featured', label: 'Featured', type: 'select', options: [{ value: 'true', label: 'Featured' }, { value: 'false', label: 'Standard' }] },
    { key: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0', hint: 'Lower numbers appear first' },
    { key: 'is_active', label: 'Status', type: 'select', options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }] },
  ]

  return <AdminCrud title="Services" entity="services" columns={columns} formFields={formFields} emptyState="No services yet. Add your first service!" />
}
