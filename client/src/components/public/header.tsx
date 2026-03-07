import React, { useState } from 'react'
import { Link, useLocation } from 'wouter';
import { ShoppingCart, Search, Menu, X, User, LogOut, LayoutDashboard, Sparkles, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useAuth } from '@/_core/hooks/useAuth'

interface HeaderProps {
  cartCount?: number
}

export function Header({ cartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { isAuthenticated, user, logout, loading } = useAuth()
  const [, navigate] = useLocation()

  const handleLogout = async () => {
    setIsUserMenuOpen(false)
    setIsMenuOpen(false)
    await logout()
    navigate('/')
  }

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles size={18} className="text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold hidden sm:inline tracking-tight">Galaxy Aura</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {label}
              </Link>
            ))}
            {isAuthenticated && user?.role === 'admin' && (
              <Link
                href="/admin"
                className="px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors flex items-center gap-1.5"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
            )}
            {isAuthenticated && (
              <Link
                href="/account"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors flex items-center gap-1.5"
              >
                <User size={15} />
                Account
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <div className={cn(
              'relative transition-all duration-300 hidden md:block',
              isSearchOpen ? 'w-56' : 'w-10'
            )}>
              {isSearchOpen ? (
                <Input
                  type="search"
                  autoFocus
                  placeholder="Search products..."
                  className="h-9 pl-9 pr-4 rounded-lg text-sm"
                  onBlur={() => setIsSearchOpen(false)}
                />
              ) : null}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-md transition-colors',
                  isSearchOpen ? 'left-0' : 'left-0 right-0'
                )}
              >
                <Search size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-muted rounded-md transition-colors">
              <ShoppingCart size={20} className="text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth area */}
            {!loading && (
              isAuthenticated ? (
                /* User menu */
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-muted rounded-lg transition-colors text-sm font-medium"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-[11px] font-bold text-primary-foreground">
                        {(user?.name ?? 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:inline text-foreground max-w-[100px] truncate">{user?.name ?? 'Account'}</span>
                    <ChevronDown size={14} className="hidden md:inline text-muted-foreground" />
                  </button>

                  {/* Dropdown */}
                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 py-1">
                        <div className="px-3 py-2 border-b border-border mb-1">
                          <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                        {user?.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors w-full text-left"
                          >
                            <LayoutDashboard size={15} className="text-muted-foreground" />
                            Dashboard
                          </Link>
                        )}
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors w-full text-left"
                        >
                          <User size={15} className="text-muted-foreground" />
                          My Account
                        </Link>
                        <div className="border-t border-border mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors w-full text-left text-destructive"
                          >
                            <LogOut size={15} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Sign in button */
                <Link href="/login">
                  <Button size="sm" className="hidden sm:inline-flex h-9">
                    Sign In
                  </Button>
                </Link>
              )
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-md transition-colors ml-1"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-3">
            <nav className="flex flex-col gap-0.5 mb-3">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2.5 text-sm font-medium hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </Link>
              )}
            </nav>
            {/* Mobile auth actions */}
            {isAuthenticated ? (
              <div className="border-t border-border pt-3 flex flex-col gap-0.5">
                <Link href="/account" className="px-4 py-2.5 text-sm font-medium hover:bg-muted rounded-md transition-colors flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <User size={15} className="text-muted-foreground" />
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 text-sm font-medium hover:bg-muted rounded-md transition-colors flex items-center gap-2 text-destructive w-full text-left"
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="border-t border-border pt-3">
                <Link href="/login" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full" size="sm">Sign In</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
