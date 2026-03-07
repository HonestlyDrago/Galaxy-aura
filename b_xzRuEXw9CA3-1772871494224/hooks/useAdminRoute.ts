'use client'

import { usePathname } from 'next/navigation'

export function useAdminRoute() {
  const pathname = usePathname()
  return pathname
}
