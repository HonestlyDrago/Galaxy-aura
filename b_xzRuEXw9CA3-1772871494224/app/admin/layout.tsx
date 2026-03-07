import React from 'react'
import type { Metadata } from 'next'
import { AdminLayout } from '@/components/admin/layout'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Galaxy Aura',
  description: 'Manage products, orders, and store settings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}
