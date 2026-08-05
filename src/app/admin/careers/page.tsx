'use client'

import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { JobOpeningRow } from '@/lib/types'

export default function AdminCareersPage() {
  const columns: ColumnDef<JobOpeningRow>[] = [
    { key: 'title', label: 'Position', render: (j) => <span className="font-medium text-navy-900 dark:text-white">{j.title}</span> },
    { key: 'location', label: 'Location', hideOnMobile: true },
    { key: 'department', label: 'Department', render: (j) => <span className="rounded-full bg-navy-50 dark:bg-navy-800 px-2.5 py-0.5 text-xs font-medium text-navy-600 dark:text-gray-300">{j.department}</span> },
    { key: 'type', label: 'Type', hideOnMobile: true },
    { key: 'is_active', label: 'Status', render: (j) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${j.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
        {j.is_active ? 'Active' : 'Closed'}
      </span>
    )},
  ]

  const formFields: FormFieldDef[] = [
    { key: 'title', label: 'Title', required: true },
    { key: 'department', label: 'Department', half: true },
    { key: 'location', label: 'Location', half: true },
    { key: 'type', label: 'Type', half: true },
    { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
    { key: 'is_active', label: 'Status', type: 'select', options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Closed' }] },
  ]

  return <AdminCrud title="Careers" entity="jobs" columns={columns} formFields={formFields} emptyState="No job openings yet. Add your first opening!" />
}
