'use client'

import { useState, useEffect, useCallback } from 'react'
import { Trash2, Search, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react'
import type { EnquiryRow } from '@/lib/types'

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<EnquiryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/cms/enquiries')
      if (res.ok) setItems(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function handleDelete(id: string) {
    if (!confirm('Delete this enquiry?')) return
    await fetch(`/api/cms/enquiries?id=${id}`, { method: 'DELETE' })
    await load()
  }

  const filtered = items.filter(item =>
    [item.name, item.email, item.subject, item.message].some(v =>
      (v || '').toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Enquiries</h1>
          <p className="text-sm text-navy-500">{items.length} contact form submissions</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="w-48 rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-navy-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-navy-400">No enquiries yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map(item => (
              <div key={item.id}>
                <div className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 text-xs font-bold text-gold-700 shrink-0">
                    {item.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy-900 truncate">{item.name}</p>
                    <p className="text-xs text-navy-400 truncate">{item.subject}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-3 text-xs text-navy-400">
                    <span className="flex items-center gap-1"><Mail size={12} /> {item.email}</span>
                    {item.phone && <span className="flex items-center gap-1"><Phone size={12} /> {item.phone}</span>}
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0 ${
                    item.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>{item.status || 'new'}</span>
                  <div className="text-navy-300">{expanded === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
                  <button onClick={e => { e.stopPropagation(); handleDelete(item.id) }}
                    className="rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </div>
                {expanded === item.id && (
                  <div className="px-6 pb-4 pt-0 ml-14">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-sm text-navy-700 whitespace-pre-wrap">{item.message}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-navy-400">
                      <span>Company: {item.company || '—'}</span>
                      <span>Phone: {item.phone || '—'}</span>
                      <span>Date: {item.created_at || '—'}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
