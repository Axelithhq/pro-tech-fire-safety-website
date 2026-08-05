'use client'

import { Plus, Edit3, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'

const users = [
  { name: 'Admin User', email: 'admin@protechfire.com', role: 'OWNER' },
  { name: 'Sales Manager', email: 'sales@protechfire.com', role: 'SALES' },
  { name: 'Engineer 1', email: 'engineer@protechfire.com', role: 'ENGINEER' },
  { name: 'Editor', email: 'editor@protechfire.com', role: 'EDITOR' },
]

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">Manage team accounts and permissions</p>
        </div>
        <Button variant="primary" size="sm"><Plus size={16} /> Add User</Button>
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">Role</th>
              <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr key={u.email} className="transition-colors hover:bg-gray-50/50">
                <td className="px-6 py-4 text-sm font-medium text-navy-900">{u.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-700">{u.role}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-navy-900"><Edit3 size={16} /></button>
                    <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
