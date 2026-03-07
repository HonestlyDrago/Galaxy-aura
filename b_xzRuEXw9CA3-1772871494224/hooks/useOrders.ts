'use client'

import { useState } from 'react'
import { Order } from '@/types/order'

// Mock data - replace with tRPC queries
const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customer: 'Sarah Johnson',
    amount: '$1,250.00',
    status: 'pending',
    date: 'Mar 4, 2025',
  },
  {
    id: 'ORD-002',
    customer: 'Michael Chen',
    amount: '$892.50',
    status: 'processing',
    date: 'Mar 3, 2025',
  },
  {
    id: 'ORD-003',
    customer: 'Emma Wilson',
    amount: '$2,100.00',
    status: 'shipped',
    date: 'Mar 2, 2025',
  },
  {
    id: 'ORD-004',
    customer: 'James Rodriguez',
    amount: '$650.75',
    status: 'delivered',
    date: 'Mar 1, 2025',
  },
  {
    id: 'ORD-005',
    customer: 'Jessica Lee',
    amount: '$1,549.99',
    status: 'processing',
    date: 'Feb 28, 2025',
  },
  {
    id: 'ORD-006',
    customer: 'David Martinez',
    amount: '$799.00',
    status: 'shipped',
    date: 'Feb 27, 2025',
  },
  {
    id: 'ORD-007',
    customer: 'Amanda Brown',
    amount: '$459.50',
    status: 'delivered',
    date: 'Feb 26, 2025',
  },
  {
    id: 'ORD-008',
    customer: 'Robert Taylor',
    amount: '$1,875.00',
    status: 'pending',
    date: 'Feb 25, 2025',
  },
]

export function useOrders() {
  const [orders] = useState<Order[]>(MOCK_ORDERS)
  const [isLoading] = useState(false)
  const [error] = useState<Error | null>(null)

  return {
    orders,
    isLoading,
    error,
  }
}
