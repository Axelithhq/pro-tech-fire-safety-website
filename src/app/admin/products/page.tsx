'use client'

import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { ProductRow } from '@/lib/types'

const categoryOptions = [
  { value: '1', label: 'Fire Detection Systems' },
  { value: '2', label: 'Fire Alarm Panels' },
  { value: '3', label: 'Sprinkler Components' },
  { value: '4', label: 'Fire Extinguishers' },
  { value: '5', label: 'Deluge & Special Systems' },
  { value: '6', label: 'Fire Rated Doors' },
]

export default function AdminProductsPage() {
  const columns: ColumnDef<ProductRow>[] = [
    { key: 'title', label: 'Product', render: (p) => (
      <div className="flex items-center gap-3">
        {p.image_url ? <img src={p.image_url} alt="" className="h-8 w-8 rounded-lg object-cover" /> : <div className="h-8 w-8 rounded-lg bg-navy-100 dark:bg-navy-800" />}
        <div>
          <p className="font-medium text-navy-900 dark:text-white">{p.title}</p>
          <p className="text-xs text-navy-400 dark:text-gray-400">{categoryOptions.find(c => c.value === p.category_id)?.label || p.category_id}</p>
        </div>
      </div>
    )},
    { key: 'is_active', label: 'Status', render: (p) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${p.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
        {p.is_active ? 'Active' : 'Inactive'}
      </span>
    )},
    { key: 'sort_order', label: 'Order', width: '80px', hideOnMobile: true },
    { key: 'created_at', label: 'Created', width: '120px', hideOnMobile: true },
  ]

  const formFields: FormFieldDef[] = [
    { key: 'title', label: 'Title', required: true },
    { key: 'slug', label: 'Slug', required: true, hint: 'URL identifier — auto-generated from title' },
    { key: 'category_id', label: 'Category', type: 'select', options: categoryOptions },
    { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
    { key: 'applications', label: 'Applications', type: 'array', hint: 'One item per line' },
    { key: 'specifications', label: 'Specifications', type: 'array', hint: 'One spec per line — e.g. Operating Voltage: 24 VDC',
      parse: (val: string) => {
        const arr = val.split('\n').map(s => s.trim()).filter(Boolean)
        const obj: Record<string, string> = {}
        arr.forEach(line => {
          const idx = line.indexOf(':')
          if (idx > 0) obj[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
          else obj[line] = line
        })
        return obj
      },
      format: (val: any) => {
        if (!val || typeof val !== 'object') return ''
        return Object.entries(val).map(([k, v]) => `${k}: ${v}`).join('\n')
      },
    },
    { key: 'image_url', label: 'Image', type: 'image', hint: 'Upload product image' },
    { key: 'brochure_url', label: 'Brochure', type: 'file', hint: 'Upload product brochure PDF' },
    { key: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0', hint: 'Lower numbers appear first' },
    { key: 'is_active', label: 'Status', type: 'select', options: [{ value: 'true', label: 'Active' }, { value: 'false', label: 'Inactive' }] },
  ]

  return <AdminCrud title="Products" entity="products" columns={columns} formFields={formFields} emptyState="No products yet. Add your first product!" />
}
