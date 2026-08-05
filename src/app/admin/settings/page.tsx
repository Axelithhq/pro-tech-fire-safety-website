'use client'

export default function AdminSettingsPage() {
  return (
    <div className="p-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Configure application settings</p>
      </div>
      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-navy-900">General</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-navy-700">Company Name</label>
              <input type="text" defaultValue="Pro-Tech Fire & Safety" className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700">Support Email</label>
              <input type="email" defaultValue="support@protechfire.com" className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy-700">Phone</label>
              <input type="text" defaultValue="+91 22 1234 5678" className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">Cancel</button>
          <button className="rounded-lg bg-navy-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-800">Save Settings</button>
        </div>
      </div>
    </div>
  )
}
