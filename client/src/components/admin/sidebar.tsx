import React from 'react'
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings,
  Sparkles 
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
}

// Paths are relative to the /admin nest — wouter prepends /admin automatically
const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ isOpen }: SidebarProps) {
  const [pathname] = useLocation()

  return (
    <aside
      className={cn(
        'bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col h-full',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'h-16 flex items-center px-6 border-b border-sidebar-border gap-3',
        !isOpen && 'px-2 justify-center'
      )}>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
          <Sparkles size={24} className="text-primary-foreground" />
        </div>
        {isOpen && (
          <div className="flex flex-col min-w-0">
            <span className="text-lg font-bold text-sidebar-foreground truncate">
              Galaxy Aura
            </span>
            <span className="text-xs text-sidebar-accent-foreground">
              Admin
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          // In nested wouter context useLocation returns path relative to /admin
          const isActive =
            item.href === '/'
              ? pathname === '/' || pathname === ''
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <Icon size={20} className="flex-shrink-0" />
              {isOpen && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={cn(
        'border-t border-sidebar-border p-3',
        !isOpen && 'text-center'
      )}>
        {isOpen && (
          <div className="text-xs text-sidebar-accent-foreground">
            <p>v1.0.0</p>
          </div>
        )}
      </div>
    </aside>
  )
}

