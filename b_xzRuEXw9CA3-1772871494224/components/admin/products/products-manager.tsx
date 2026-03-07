'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Filter,
  Eye,
} from 'lucide-react'
import { ProductsList } from './products-list'
import { useProducts } from '@/hooks/useProducts'

export function ProductsManager() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const { products } = useProducts()

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Products
          </h1>
          <p className="text-muted-foreground">
            Manage your store inventory
          </p>
        </div>
        <Link href="/admin/products/create">
          <Button className="gap-2">
            <Plus size={20} />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Search and filters */}
      <Card className="p-4 border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-3 text-muted-foreground"
            />
            <Input
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={20} />
            Filter
          </Button>
        </div>
      </Card>

      {/* Products list */}
      <ProductsList products={filteredProducts} />
    </div>
  )
}
