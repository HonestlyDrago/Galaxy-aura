import { useState } from 'react'
import { Order } from '@/types/order'

// Mock data - replace with tRPC queries
const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customer: 'Sarah Johnson',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@example.com',
    amount: 1250.00,
    total: 1250.00,
    status: 'pending',
    date: 'Mar 4, 2025',
    items: [],
  },
  {
    id: 'ORD-002',
    customer: 'Michael Chen',
    customerName: 'Michael Chen',
    customerEmail: 'michael.c@example.com',
    amount: 892.50,
    total: 892.50,
    status: 'processing',
    date: 'Mar 3, 2025',
    items: [],
  },
  {
    id: 'ORD-003',
    customer: 'Emma Wilson',
    customerName: 'Emma Wilson',
    customerEmail: 'emma.w@example.com',
    amount: 2100.00,
    total: 2100.00,
    status: 'shipped',
    date: 'Mar 2, 2025',
    items: [],
  },
  {
    id: 'ORD-004',
    customer: 'James Rodriguez',
    customerName: 'James Rodriguez',
    customerEmail: 'james.r@example.com',
    amount: 650.75,
    total: 650.75,
    status: 'delivered',
    date: 'Mar 1, 2025',
    items: [],
  },
  {
    id: 'ORD-005',
    customer: 'Jessica Lee',
    customerName: 'Jessica Lee',
    customerEmail: 'jess.lee@example.com',
    amount: 1549.99,
    total: 1549.99,
    status: 'processing',
    date: 'Feb 28, 2025',
    items: [],
  },
  {
    id: 'ORD-006',
    customer: 'David Martinez',
    customerName: 'David Martinez',
    customerEmail: 'david.m@example.com',
    amount: 799.00,
    total: 799.00,
    status: 'shipped',
    date: 'Feb 27, 2025',
    items: [],
  },
  {
    id: 'ORD-007',
    customer: 'Amanda Brown',
    customerName: 'Amanda Brown',
    customerEmail: 'amanda.b@example.com',
    amount: 459.50,
    total: 459.50,
    status: 'delivered',
    date: 'Feb 26, 2025',
    items: [],
  },
  {
    id: 'ORD-008',
    customer: 'Robert Taylor',
    customerName: 'Robert Taylor',
    customerEmail: 'robert.t@example.com',
    amount: 1875.00,
    total: 1875.00,
    status: 'pending',
    date: 'Feb 25, 2025',
    items: [],
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
