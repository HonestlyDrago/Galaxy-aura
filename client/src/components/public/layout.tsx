import React from 'react'
import { Header } from './header'
import { Footer } from './footer'

interface PublicLayoutProps {
  children: React.ReactNode
  cartCount?: number
}

export function PublicLayout({ children, cartCount = 0 }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cartCount} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
