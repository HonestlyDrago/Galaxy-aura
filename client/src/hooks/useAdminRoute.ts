import { useLocation } from 'wouter';

export function useAdminRoute() {
  const [pathname] = useLocation()
  return pathname
}
