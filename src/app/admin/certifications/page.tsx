'use client'

import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { CertificationRow } from '@/lib/types'

export default function AdminCertificationsPage() {
  const columns: ColumnDef<CertificationRow>[] = [
    { key: 'name', label: 'Certification', render: (c) => (
      <div className="flex items-center gap-3">
        {c.image_url ? <img src={c.image_url} alt="" className="h-8 w-8 rounded-lg object-cover" /> : <div className="h-8 w-8 rounded-lg bg-navy-100 dark:bg-navy-800" />}
        <div>
          <p className="font-medium text-navy-900 dark:text-white">{c.name}</p>
          <p className="text-xs text-navy-400 dark:text-gray-400">{c.category}</p>
        </div>
      </div>
    )},
    { key: 'sort_order', label: 'Order', width: '80px', hideOnMobile: true },
  ]

  const formFields: FormFieldDef[] = [
    { key: 'name', label: 'Name', required: true },
    { key: 'image_url', label: 'Image', type: 'image' },
    { key: 'category', label: 'Category', half: true },
    { key: 'is_active', label: 'Status', type: 'select', options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }] },
    { key: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0', hint: 'Lower numbers appear first' },
  ]

  return <AdminCrud title="Certifications" entity="certifications" columns={columns} formFields={formFields} emptyState="No certifications yet. Add your first certification!" />
}
