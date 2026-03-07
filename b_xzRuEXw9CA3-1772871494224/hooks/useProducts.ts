'use client'

import { useState, useMemo } from 'react'
import { Product } from '@/types/product'

// Mock data - replace with tRPC queries
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Crystal Aura Lamp - Large',
    description: 'A stunning large crystal lamp that creates a mesmerizing light show',
    sku: 'CAL-001',
    price: 499.99,
    cost: 200.00,
    stock: 12,
    category: 'Lamps & Lighting',
    published: true,
  },
  {
    id: '2',
    name: 'Moonstone Sphere',
    description: 'Elegant moonstone sphere with soft ambient lighting',
    sku: 'MS-002',
    price: 249.99,
    cost: 100.00,
    stock: 8,
    category: 'Decorative Items',
    published: true,
  },
  {
    id: '3',
    name: 'Aurora Pendant Light',
    description: 'Hanging pendant with aurora borealis effect',
    sku: 'APL-003',
    price: 189.99,
    cost: 75.00,
    stock: 15,
    category: 'Lamps & Lighting',
    published: true,
  },
  {
    id: '4',
    name: 'Nebula Table Lamp',
    description: 'Table lamp featuring nebula-inspired design',
    sku: 'NTL-004',
    price: 299.99,
    cost: 130.00,
    stock: 6,
    category: 'Lamps & Lighting',
    published: false,
  },
  {
    id: '5',
    name: 'Stellar Accent Light',
    description: 'Compact accent light perfect for shelves and desks',
    sku: 'SAL-005',
    price: 89.99,
    cost: 40.00,
    stock: 28,
    category: 'Decorative Items',
    published: true,
  },
  {
    id: '6',
    name: 'Galaxy Mirror',
    description: 'Decorative mirror with galaxy-themed frame',
    sku: 'GM-006',
    price: 199.99,
    cost: 85.00,
    stock: 4,
    category: 'Accessories',
    published: true,
  },
]

export function useProducts() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS)
  const [isLoading] = useState(false)
  const [error] = useState<Error | null>(null)

  return {
    products,
    isLoading,
    error,
  }
}
