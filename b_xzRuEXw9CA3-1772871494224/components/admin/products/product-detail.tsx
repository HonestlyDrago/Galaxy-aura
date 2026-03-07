'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useProducts } from '@/hooks/useProducts'
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react'

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { products } = useProducts()
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="space-y-8">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={20} />
            Back to Products
          </Button>
        </Link>
        <Card className="p-12 border border-border text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
        <Link href="/admin/products">
            <Button>Back to Products</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const profit = (product.price - product.cost) * product.stock
  const profitMargin = ((product.price - product.cost) / product.price) * 100

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin/products">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={20} />
            Back to Products
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Link href={`/products/${productId}/edit`}>
            <Button variant="outline" className="gap-2">
              <Edit2 size={20} />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            className="gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 size={20} />
            Delete
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <Card className="p-8 border border-border">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-3">
              <Badge
                className={`${
                  product.published
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {product.published ? 'Published' : 'Draft'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                SKU: {product.sku}
              </span>
            </div>
          </div>
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">
              {product.name.charAt(0)}
            </span>
          </div>
        </div>

        <p className="text-foreground mb-8 leading-relaxed">
          {product.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pricing */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Pricing
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                <span className="text-muted-foreground">Sale Price</span>
                <span className="text-xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                <span className="text-muted-foreground">Cost Price</span>
                <span className="text-lg font-semibold text-foreground">
                  ${product.cost.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                <span className="text-muted-foreground">Profit Margin</span>
                <span className="text-lg font-semibold text-accent">
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Inventory
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                <span className="text-muted-foreground">Current Stock</span>
                <span
                  className={`text-xl font-bold ${
                    product.stock > 10
                      ? 'text-green-400'
                      : product.stock > 5
                        ? 'text-yellow-400'
                        : 'text-red-400'
                  }`}
                >
                  {product.stock} units
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                <span className="text-muted-foreground">Category</span>
                <span className="text-lg font-semibold text-foreground">
                  {product.category}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
                <span className="text-muted-foreground">Total Value</span>
                <span className="text-lg font-semibold text-accent">
                  ${(product.price * product.stock).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profit Analysis */}
        <div className="mt-8 p-4 rounded-lg bg-accent/10 border border-accent/20">
          <h3 className="font-semibold text-foreground mb-2">
            Profit Analysis
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Based on current inventory and pricing
          </p>
          <div className="text-2xl font-bold text-accent">
            ${profit.toFixed(2)} total profit potential
          </div>
        </div>
      </Card>
    </div>
  )
}
