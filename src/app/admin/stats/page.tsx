'use client'

import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { StatsRow } from '@/lib/types'

export default function AdminStatsPage() {
  const columns: ColumnDef<StatsRow>[] = [
    { key: 'heading', label: 'Heading', render: (s) => <span className="font-medium text-gray-900 dark:text-white">{s.heading}</span> },
    { key: 'subtitle', label: 'Subtitle', render: (s) => <p className="max-w-md truncate text-gray-500 dark:text-gray-400">{s.subtitle}</p> },
    { key: 'stats', label: 'Stats', render: (s) => (
      <div className="flex flex-wrap gap-2">
        {(s.stats || []).map((st, i) => (
          <span key={i} className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
            {st.number}{st.suffix} {st.label}
          </span>
        ))}
      </div>
    )},
    { key: 'is_active', label: 'Status', render: (s) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
        {s.is_active ? 'Active' : 'Inactive'}
      </span>
    )},
  ]

  const formFields: FormFieldDef[] = [
    { key: 'heading', label: 'Heading', required: true, hint: 'Main CTA title (e.g. Ready to Secure Your Facility?)' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea', rows: 2, hint: 'Description below heading' },
    { key: 'stats', label: 'Stats', type: 'stats-list', hint: 'Add stat entries with number, suffix and label' },
    { key: 'is_active', label: 'Status', type: 'select', half: true, options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }] },
  ]

  return <AdminCrud title="Home CTA Stats" entity="stats" columns={columns} formFields={formFields} singleton emptyState="No stats yet. Add your first CTA section!" />
}
