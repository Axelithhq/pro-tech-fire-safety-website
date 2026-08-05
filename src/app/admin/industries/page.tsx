'use client'

import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { IndustryRow } from '@/lib/types'

export default function AdminIndustriesPage() {
  const columns: ColumnDef<IndustryRow>[] = [
    { key: 'name', label: 'Industry', render: (i) => (
      <div className="flex items-center gap-3">
        {i.icon ? (
          i.icon.startsWith('/') || i.icon.startsWith('http') ? (
            <img src={i.icon} alt="" className="h-8 w-8 rounded-lg object-cover" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-100 dark:bg-navy-800 text-lg">{i.icon}</div>
          )
        ) : (
          <div className="h-8 w-8 rounded-lg bg-navy-100 dark:bg-navy-800" />
        )}
        <div>
          <p className="font-medium text-navy-900 dark:text-white">{i.name}</p>
          <p className="text-xs text-navy-400 dark:text-gray-400">{i.slug}</p>
        </div>
      </div>
    )},
    { key: 'project_count', label: 'Projects', width: '80px', hideOnMobile: true },
    { key: 'is_active', label: 'Status', render: (i) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${i.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
        {i.is_active ? 'Active' : 'Inactive'}
      </span>
    )},
    { key: 'sort_order', label: 'Order', width: '80px', hideOnMobile: true },
  ]

  const formFields: FormFieldDef[] = [
    { key: 'name', label: 'Name', required: true },
    { key: 'description', label: 'Description', type: 'textarea', rows: 3 },
    { key: 'icon', label: 'Icon', type: 'image', hint: 'Upload industry icon image (SVG or PNG)' },
    { key: 'sort_order', label: 'Order', type: 'number', half: true, hint: 'Lower numbers appear first' },
    { key: 'is_active', label: 'Status', type: 'select', half: true, options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }] },
  ]

  return <AdminCrud title="Industries" entity="industries" columns={columns} formFields={formFields} emptyState="No industries yet. Add your first industry!" />
}
