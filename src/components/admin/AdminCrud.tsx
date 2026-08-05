'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Plus, Pencil, Trash2, Search, X, Save, Upload, ImageIcon, Check, Loader2, AlertTriangle, FileText } from 'lucide-react'
import { useToast } from './Toast'

export interface ColumnDef<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
  hideOnMobile?: boolean
  width?: string
}

export interface FormFieldDef {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'select' | 'image' | 'file' | 'array' | 'stats-list'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  rows?: number
  half?: boolean
  hint?: string
  parse?: (val: string) => any
  format?: (val: any) => string
}

interface AdminCrudProps<T extends { id: string }> {
  title: string
  entity: string
  columns: ColumnDef<T>[]
  formFields: FormFieldDef[]
  emptyState?: string
  singleton?: boolean
}

function parseArrayInput(val: string): string[] {
  const lines = val.split('\n').map(s => s.trim())
  // Keep trailing empty entry so "Add item" row stays visible
  if (lines.length > 1 && !lines[lines.length - 1]) return lines
  return lines.filter(Boolean)
}

function ListInput({ values, onChange }: { values: string[]; onChange: (vals: string[]) => void }) {
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <input type="text" value={v} onChange={e => { const nv = [...values]; nv[i] = e.target.value; onChange(nv) }}
            className="flex-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
          <button onClick={() => onChange(values.filter((_, j) => j !== i))} type="button" className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">&times;</button>
        </div>
      ))}
      <button onClick={() => onChange([...values, ''])} type="button"
        className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-500 font-medium">+ Add item</button>
    </div>
  )
}

function parseVal(field: FormFieldDef, val: string): any {
  if (field.type === 'number') return Number(val) || 0
  if (field.type === 'select') return val === 'true' ? true : val === 'false' ? false : val
  if (field.type === 'array') return parseArrayInput(val)
  if (field.type === 'stats-list') {
    try { return JSON.parse(val) } catch { return [] }
  }
  return val
}

function formatVal(val: any): string {
  if (typeof val === 'boolean') return val ? 'true' : 'false'
  if (Array.isArray(val)) {
    if (val.length > 0 && typeof val[0] === 'object') return JSON.stringify(val)
    return val.join('\n')
  }
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    return Object.entries(val).map(([k, v]) => `${k}: ${v}`).join('\n')
  }
  return String(val ?? '')
}

interface StatEntry { number: number; suffix: string; label: string }

function StatsListInput({ values, onChange }: { values: StatEntry[]; onChange: (vals: StatEntry[]) => void }) {
  function update(i: number, field: keyof StatEntry, value: string | number) {
    const next = [...values]
    next[i] = { ...next[i], [field]: value }
    onChange(next)
  }
  return (
    <div className="space-y-3">
      {values.map((v, i) => (
        <div key={i} className="flex items-end gap-2 rounded-lg border border-gray-200 dark:border-gray-600 p-3 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex-1 grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Number</label>
              <input type="number" value={v.number} onChange={e => update(i, 'number', Number(e.target.value))}
                className="mt-0.5 w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Suffix</label>
              <input type="text" value={v.suffix} onChange={e => update(i, 'suffix', e.target.value)} placeholder="+"
                className="mt-0.5 w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">Label</label>
              <input type="text" value={v.label} onChange={e => update(i, 'label', e.target.value)} placeholder="e.g. Years of Experience"
                className="mt-0.5 w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
            </div>
          </div>
          <button onClick={() => onChange(values.filter((_, j) => j !== i))} type="button"
            className="mb-0.5 p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">&times;</button>
        </div>
      ))}
      <button onClick={() => onChange([...values, { number: 0, suffix: '', label: '' }])} type="button"
        className="flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-500">
        <Plus size={14} /> Add stat
      </button>
    </div>
  )
}

export default function AdminCrud<T extends { id: string }>({ title, entity, columns, formFields, emptyState, singleton }: AdminCrudProps<T>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<T | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<Record<string, any>>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [deleting, setDeleting] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const uploadKey = useRef<string>('')
  const firstInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/cms/${entity}`)
      if (res.ok) setItems(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }, [entity])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    if (showForm && firstInputRef.current) {
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
    if (showForm) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
        document.documentElement.style.overflow = ''
      }
    }
  }, [showForm])

  const filtered = items.filter(item =>
    columns.some(col => String((item as any)[col.key] || '').toLowerCase().includes(search.toLowerCase()))
  )

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0
    const av = String((a as any)[sortKey] ?? '')
    const bv = String((b as any)[sortKey] ?? '')
    const cmp = av.localeCompare(bv)
    return sortDir === 'asc' ? cmp : -cmp
  })

  function resetForm() {
    const initial: Record<string, any> = {}
    formFields.forEach(f => { initial[f.key] = '' })
    setForm(initial)
    setErrors({})
    setEditing(null)
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}
    formFields.forEach(f => {
      if (f.required && !form[f.key]?.toString().trim()) {
        errs[f.key] = `${f.label} is required`
      }
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSave() {
    if (!validate()) return
    setSaving(true)
    try {
      const body: Record<string, any> = {}
      formFields.forEach(f => {
        body[f.key] = f.parse ? f.parse(form[f.key] ?? '') : parseVal(f, form[f.key] ?? '')
      })
      if (editing) body.id = editing.id
      const method = editing ? 'PUT' : 'POST'
      const res = await fetch(`/api/cms/${entity}`, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      if (res.ok) {
        // Optimistic update
        const saved = await res.json()
        if (editing) {
          setItems(prev => prev.map(i => i.id === editing.id ? { ...i, ...body } as T : i))
        } else {
          setItems(prev => [...prev, saved])
        }
        setShowForm(false)
        resetForm()
        toast('success', editing ? 'Item updated successfully' : 'Item created successfully')
        await load()
      } else {
        const err = await res.text()
        toast('error', 'Save failed: ' + err)
      }
    } catch { toast('error', 'Save failed') }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    setDeleting(id)
    setItems(prev => prev.filter(i => i.id !== id)) // optimistic
    const res = await fetch(`/api/cms/${entity}?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast('success', 'Item deleted')
    } else {
      toast('error', 'Delete failed')
      await load() // rollback
    }
    setDeleting(null)
  }

  function startEdit(item: T) {
    const editForm: Record<string, any> = {}
    formFields.forEach(f => { editForm[f.key] = f.format ? f.format((item as any)[f.key]) : formatVal((item as any)[f.key] ?? '') })
    setForm(editForm)
    setErrors({})
    setEditing(item)
    setShowForm(true)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast('error', 'File too large. Max 5MB')
      return
    }
    const key = uploadKey.current
    setUploading(key)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (res.ok) {
        const { url } = await res.json()
        setForm(f => ({ ...f, [key]: url }))
        toast('success', 'Image uploaded')
      } else toast('error', 'Upload failed')
    } catch { toast('error', 'Upload failed') }
    setUploading(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  function triggerUpload(key: string) {
    uploadKey.current = key
    fileRef.current?.click()
  }

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setShowForm(false)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    }
  }

  return (
    <div>
      {/* Hidden file input */}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{items.length} total records</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="w-48 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400" />
          </div>
          <button onClick={() => { resetForm(); setShowForm(true) }}
            disabled={singleton && items.length > 0}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-400 transition-all active:scale-95 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-amber-500 disabled:active:scale-100">
            <Plus size={16} /> Add New
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && createPortal(
        <>
          {/* Backdrop — separate fixed layer, never scrolls */}
          <div className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          {/* Fixed wrapper — positioning only, no overflow */}
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            {/* Scroll container — regular div, fills viewport, handles mouse wheel */}
            <div className="h-full overflow-y-auto overscroll-contain pointer-events-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                {/* Card */}
                <div
                  className="w-full max-w-2xl rounded-2xl bg-white dark:bg-gray-900 shadow-2xl animate-scale-in"
                  onClick={e => e.stopPropagation()}
                  onKeyDown={handleKeyDown}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-8 py-5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{editing ? 'Edit' : 'Add'} {title}</h2>
                    <button onClick={() => setShowForm(false)} className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="px-8 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {formFields.map((f, i) => (
                      <div key={f.key} className={f.half ? '' : 'sm:col-span-2'}>
                        <label className="flex items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">
                          {f.label}
                          {f.required && <span className="text-red-500">*</span>}
                        </label>
                        {f.hint && <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5">{f.hint}</p>}
                        {f.type === 'textarea' ? (
                          <textarea value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })} rows={f.rows || 3}
                            className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-shadow resize-y" />
                        ) : f.type === 'select' ? (
                          <select value={form[f.key] || ''} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-shadow">
                            <option value="">Select...</option>
                            {f.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        ) : f.type === 'image' ? (
                          <div>
                            {form[f.key] ? (
                              <div className="relative group">
                                <img src={form[f.key]} alt="Preview" className="h-40 w-full rounded-lg object-cover border border-gray-200 dark:border-gray-600" />
                                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                  <button onClick={() => triggerUpload(f.key)} type="button" disabled={uploading === f.key}
                                    className="rounded-lg bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-white transition-all disabled:opacity-50">
                                    {uploading === f.key ? <Loader2 size={16} className="animate-spin" /> : 'Replace'}
                                  </button>
                                  <button onClick={() => setForm({ ...form, [f.key]: '' })} type="button"
                                    className="rounded-lg bg-red-500/90 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-all">Remove</button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => triggerUpload(f.key)} type="button" disabled={uploading === f.key}
                                className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 px-4 py-8 text-gray-500 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all disabled:opacity-50">
                                {uploading === f.key ? <Loader2 size={24} className="animate-spin" /> : <><Upload size={28} /><span className="text-sm font-semibold">Click to upload image</span><span className="text-xs">PNG, JPG, WEBP &middot; Max 5MB</span></>}
                              </button>
                            )}
                          </div>
                        ) : f.type === 'file' ? (
                          <div>
                            {form[f.key] ? (
                              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 px-4 py-3">
                                <FileText size={20} className="text-amber-500 shrink-0" />
                                <span className="flex-1 truncate text-sm text-gray-700 dark:text-gray-300">{form[f.key].split('/').pop()}</span>
                                <button onClick={() => triggerUpload(f.key)} type="button" disabled={uploading === f.key}
                                  className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-500 disabled:opacity-50 shrink-0">
                                  {uploading === f.key ? <Loader2 size={14} className="animate-spin" /> : 'Replace'}
                                </button>
                                <button onClick={() => setForm({ ...form, [f.key]: '' })} type="button" className="text-xs font-medium text-red-500 hover:text-red-600 shrink-0">Remove</button>
                              </div>
                            ) : (
                              <button onClick={() => triggerUpload(f.key)} type="button" disabled={uploading === f.key}
                                className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 px-4 py-6 text-gray-500 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all disabled:opacity-50">
                                {uploading === f.key ? <Loader2 size={24} className="animate-spin" /> : <><FileText size={24} /><span className="text-sm font-semibold">Click to upload PDF</span><span className="text-xs">PDF &middot; Max 5MB</span></>}
                              </button>
                            )}
                          </div>
                        ) : f.type === 'array' ? (
                          <ListInput values={parseArrayInput(form[f.key] || '')} onChange={vals => setForm({ ...form, [f.key]: vals.join('\n') })} />
                        ) : f.type === 'stats-list' ? (
                          <StatsListInput values={(() => { try { return Array.isArray(form[f.key]) ? form[f.key] : JSON.parse(form[f.key] || '[]') } catch { return [] } })()}
                            onChange={vals => setForm({ ...form, [f.key]: JSON.stringify(vals) })} />
                        ) : (
                          <div>
                            <input ref={i === 0 ? firstInputRef : undefined} type={f.type || 'text'} value={form[f.key] || ''}
                              onChange={e => { setForm({ ...form, [f.key]: e.target.value }); if (errors[f.key]) setErrors({ ...errors, [f.key]: '' }) }}
                              placeholder={f.placeholder}
                              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-shadow" />
                            {errors[f.key] && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={11} /> {errors[f.key]}</p>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 px-8 py-5">
                    <p className="text-xs text-gray-400 dark:text-gray-500">Ctrl+Enter to save</p>
                    <div className="flex gap-3">
                      <button onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Cancel</button>
                      <button onClick={handleSave} disabled={saving}
                        className="flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-bold text-gray-900 hover:bg-amber-400 disabled:opacity-50 transition-all active:scale-95 shadow-sm">
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Table */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-16 text-gray-400 gap-3">
            <Loader2 size={24} className="animate-spin text-amber-500" />
            <p className="text-sm">Loading...</p>
          </div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-gray-400 gap-2">
            <Search size={32} className="text-gray-300 dark:text-gray-600" />
            <p className="text-sm">{emptyState || 'No records found.'}</p>
            {search && <p className="text-xs">Try a different search term</p>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  {columns.map(col => (
                    <th key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className={`px-4 py-3.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200 transition-colors ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}
                      style={{ width: col.width }}>
                      <div className="flex items-center gap-1.5">
                        {col.label}
                        {sortKey === col.key && (
                          <span className="text-amber-500">{sortDir === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {sorted.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                    {columns.map(col => (
                      <td key={col.key} className={`px-4 py-3 text-gray-700 dark:text-gray-200 ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}>
                        {col.render ? col.render(item) : String((item as any)[col.key] ?? '')}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(item)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-amber-600 dark:hover:text-amber-400 transition-colors" title="Edit">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} disabled={deleting === item.id}
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors disabled:opacity-50" title="Delete">
                          {deleting === item.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
