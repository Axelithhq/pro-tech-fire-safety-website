'use client'

import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { WhyChooseRow } from '@/lib/types'

export default function AdminWhyChoosePage() {
  const columns: ColumnDef<WhyChooseRow>[] = [
    { key: 'title', label: 'Title', render: (w) => <span className="font-medium text-gray-900 dark:text-white">{w.title}</span> },
    { key: 'description', label: 'Description', render: (w) => <p className="max-w-md truncate text-gray-500 dark:text-gray-400">{w.description}</p> },
    { key: 'icon', label: 'Icon', width: '80px', render: (w) => (
      w.icon && (w.icon.startsWith('/') || w.icon.startsWith('http')) ? (
        <img src={w.icon} alt="" className="h-8 w-8 rounded-lg object-cover" />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30 text-sm text-orange-600">{w.icon || '-'}</div>
      )
    )},
    { key: 'is_active', label: 'Status', render: (w) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${w.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
        {w.is_active ? 'Active' : 'Inactive'}
      </span>
    )},
    { key: 'sort_order', label: 'Order', width: '70px', hideOnMobile: true },
  ]

  const formFields: FormFieldDef[] = [
    { key: 'title', label: 'Title', required: true },
    { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
    { key: 'icon', label: 'Icon', type: 'image', hint: 'Upload icon image (SVG or PNG)' },
    { key: 'sort_order', label: 'Order', type: 'number', half: true, hint: 'Lower numbers appear first' },
    { key: 'is_active', label: 'Status', type: 'select', half: true, options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }] },
  ]

  return <AdminCrud title="Why Pro-Tech" entity="whychoose" columns={columns} formFields={formFields} emptyState="No items yet. Add your first Why Pro-Tech entry!" />
}
