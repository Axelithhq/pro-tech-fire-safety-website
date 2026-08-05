'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search } from 'lucide-react'

export default function AdminLeadsPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => { setLoading(false) }, [])

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Leads</h1>
          <p className="text-sm text-navy-500">Early access and demo requests</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input placeholder="Search..." className="w-48 rounded-lg border border-gray-200 bg-white pl-9 pr-3 py-2 text-sm" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="p-12 text-center text-navy-400">
          {loading ? 'Loading...' : 'No leads yet. Early access and demo submissions will appear here once configured.'}
        </div>
      </div>
    </div>
  )
}
