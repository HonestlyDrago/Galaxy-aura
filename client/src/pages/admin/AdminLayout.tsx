import React from 'react'
import { Redirect } from 'wouter'
import { AdminLayout as LayoutComponent } from '@/components/admin/layout'
import { useAuth } from '@/_core/hooks/useAuth'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return <LayoutComponent>{children}</LayoutComponent>
}
