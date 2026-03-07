import React, { useState } from 'react'
import { Menu, X, LogOut, User } from 'lucide-react'
import { Sidebar } from './sidebar'
import { useAuth } from '@/_core/hooks/useAuth'
import { useLocation } from 'wouter'

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  // Start open on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const [, navigate] = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar isOpen={sidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top bar */}
        <header className="bg-card border-b border-border h-16 flex items-center px-4 md:px-6 gap-4 flex-shrink-0">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Desktop sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu size={22} />
          </button>
          {/* Right side: user info + logout */}
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-[11px] font-bold text-primary-foreground">
                  {(user?.name ?? 'A').charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-foreground">{user?.name ?? 'Admin'}</p>
                <p className="text-xs text-muted-foreground">{user?.email ?? ''}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign out"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed top-16 left-0 z-50 md:hidden">
            <Sidebar isOpen={true} />
          </div>
        )}

        {/* Content area */}
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
