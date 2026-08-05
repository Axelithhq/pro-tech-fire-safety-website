'use client'

import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { ClientRow } from '@/lib/types'

export default function AdminClientsPage() {
  const columns: ColumnDef<ClientRow>[] = [
    { key: 'name', label: 'Client', render: (c) => (
      <div className="flex items-center gap-3">
        {c.logo_url ? <img src={c.logo_url} alt="" className="h-8 w-8 rounded-lg object-contain" /> : <div className="h-8 w-8 rounded-lg bg-navy-100 dark:bg-navy-800" />}
        <div>
          <p className="font-medium text-navy-900 dark:text-white">{c.name}</p>
          <p className="text-xs text-navy-400 dark:text-gray-400">{c.slug}</p>
        </div>
      </div>
    )},
    { key: 'is_featured', label: 'Featured', render: (c) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.is_featured ? 'bg-gold-100 text-gold-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
        {c.is_featured ? 'Featured' : 'Standard'}
      </span>
    )},
    { key: 'is_active', label: 'Status', render: (c) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
        {c.is_active ? 'Active' : 'Inactive'}
      </span>
    )},
    { key: 'sort_order', label: 'Order', width: '80px', hideOnMobile: true },
  ]

  const formFields: FormFieldDef[] = [
    { key: 'name', label: 'Name', required: true },
    { key: 'logo_url', label: 'Logo', type: 'image', hint: 'Client logo displayed on homepage' },
    { key: 'is_featured', label: 'Featured', type: 'select', options: [{ value: 'true', label: 'Featured' }, { value: 'false', label: 'Standard' }] },
    { key: 'is_active', label: 'Status', type: 'select', options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }] },
    { key: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0', hint: 'Lower numbers appear first' },
  ]

  return <AdminCrud title="Clients" entity="clients" columns={columns} formFields={formFields} emptyState="No clients yet. Add your first client!" />
}
