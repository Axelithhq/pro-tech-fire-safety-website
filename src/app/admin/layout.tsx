'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, FolderOpen, FileText,
  MessageSquare, Star, Briefcase, Settings, LogOut,
  Award, HandshakeIcon, Building2, Wrench, Menu, Sun, Moon, BarChart3,
} from 'lucide-react'
import { useTheme } from '@/lib/ThemeProvider'
import { ToastProvider } from '@/components/admin/Toast'
import { useState } from 'react'

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Services', href: '/admin/services', icon: Wrench },
  { label: 'Why Pro-Tech', href: '/admin/blog', icon: FileText },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Clients', href: '/admin/clients', icon: HandshakeIcon },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Industries', href: '/admin/industries', icon: Building2 },
  { label: 'Home CTA Stats', href: '/admin/stats', icon: BarChart3 },

  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { label: 'Careers', href: '/admin/careers', icon: Briefcase },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (path === '/admin/login') return <>{children}</>

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center border-b border-gray-100 dark:border-gray-800 px-6">
        <Link href="/admin" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 dark:bg-white">
            <span className="text-xs font-bold text-amber-500 dark:text-gray-900">PF</span>
          </div>
          <div>
            <p className="text-sm font-bold leading-tight text-gray-900 dark:text-white">Admin Panel</p>
            <p className="text-[9px] font-medium tracking-widest text-amber-600 dark:text-amber-400 uppercase">Pro-Tech Fire & Safety</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = path === link.href || path.startsWith(link.href + '/')
            return (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}>
                <link.icon size={18} />
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
      <div className="border-t border-gray-100 dark:border-gray-800 p-4">
        <Link href="/" onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
          <LogOut size={18} />
          Back to Website
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 lg:block">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative h-full w-72 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
            {sidebar}
          </aside>
        </div>
      )}

      {/* Top header bar */}
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md lg:left-64">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Menu size={20} />
            </button>
            <div className="lg:hidden">
              <p className="text-sm font-bold text-gray-900 dark:text-white">Admin Panel</p>
              <p className="text-[8px] font-medium tracking-widest text-amber-600 dark:text-amber-400 uppercase">Pro-Tech Fire & Safety</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/api/admin/logout"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-600 transition-colors">
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 lg:pl-64 px-6 lg:px-8 pt-20 pb-6 lg:pb-8">
        <ToastProvider>
          {children}
        </ToastProvider>
      </main>
    </div>
  )
}
