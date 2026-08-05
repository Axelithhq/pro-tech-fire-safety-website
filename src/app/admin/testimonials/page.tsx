'use client'

import { Star } from 'lucide-react'
import AdminCrud from '@/components/admin/AdminCrud'
import type { ColumnDef, FormFieldDef } from '@/components/admin/AdminCrud'
import type { TestimonialRow } from '@/lib/types'

export default function AdminTestimonialsPage() {
  const columns: ColumnDef<TestimonialRow>[] = [
    { key: 'author', label: 'Author', render: (t) => (
      <div className="flex items-center gap-3">
        {t.avatar_url ? <img src={t.avatar_url} alt="" className="h-8 w-8 rounded-full object-cover" /> : <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 dark:bg-amber-900/30 text-xs font-bold text-gold-700 dark:text-amber-300">{t.author.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>}
        <div>
          <p className="font-medium text-navy-900 dark:text-white">{t.author}</p>
          <p className="text-xs text-navy-400 dark:text-gray-400">{t.role} at {t.company}</p>
        </div>
      </div>
    )},
    { key: 'quote', label: 'Quote', hideOnMobile: true, render: (t) => <p className="max-w-xs truncate text-navy-500 dark:text-gray-400">{t.quote}</p> },
    { key: 'rating', label: 'Rating', render: (t) => (
      <div className="flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="fill-gold-500 text-gold-500 dark:fill-amber-400 dark:text-amber-400" />)}
      </div>
    )},
    { key: 'is_featured', label: 'Featured', render: (t) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${t.is_featured ? 'bg-gold-100 text-gold-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'}`}>
        {t.is_featured ? 'Featured' : 'Standard'}
      </span>
    )},
    { key: 'sort_order', label: 'Order', width: '80px', hideOnMobile: true },
  ]

  const formFields: FormFieldDef[] = [
    { key: 'author', label: 'Author', required: true, half: true },
    { key: 'role', label: 'Role', half: true },
    { key: 'company', label: 'Company', half: true },
    { key: 'rating', label: 'Rating', type: 'number', half: true, hint: '1-5 stars' },
    { key: 'quote', label: 'Quote', type: 'textarea', rows: 4 },
    { key: 'is_featured', label: 'Featured', type: 'select', options: [{ value: 'true', label: 'Featured' }, { value: 'false', label: 'Standard' }] },
    { key: 'sort_order', label: 'Sort Order', type: 'number', placeholder: '0', hint: 'Lower numbers appear first' },
  ]

  return <AdminCrud title="Testimonials" entity="testimonials" columns={columns} formFields={formFields} emptyState="No testimonials yet. Add your first testimonial!" />
}
