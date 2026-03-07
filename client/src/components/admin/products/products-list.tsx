import React from 'react'
import { Link } from 'wouter'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit2, Trash2, Eye } from 'lucide-react'
import { Product } from '@/types/product'

interface ProductsListProps {
  products: Product[]
}

export function ProductsList({ products }: ProductsListProps) {
  if (products.length === 0) {
    return (
      <Card className="p-12 border border-border text-center">
        <p className="text-muted-foreground mb-4">No products found</p>
        <Link href="/products/create">
          <Button>Create first product</Button>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Product</th>
              <th className="text-left py-4 px-6 text-muted-foreground font-semibold">SKU</th>
              <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Price</th>
              <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Stock</th>
              <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Status</th>
              <th className="text-left py-4 px-6 text-muted-foreground font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`border-b transition-colors hover:bg-muted/20 ${
                  index % 2 === 0 ? 'bg-muted/10' : ''
                }`}
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-foreground">{product.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-foreground font-mono text-xs">{product.sku}</td>
                <td className="py-4 px-6 text-foreground font-semibold">${product.price.toFixed(2)}</td>
                <td className="py-4 px-6">
                  <span className={`font-semibold ${
                    product.stock > 10 ? 'text-green-400' : product.stock > 5 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="py-4 px-6">
                  <Badge className={`${
                    product.published ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {product.published ? 'Published' : 'Draft'}
                  </Badge>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <Link href={`/products/${product.id}`}>
                      <Button variant="ghost" size="sm"><Eye size={16} /></Button>
                    </Link>
                    <Link href={`/products/${product.id}/edit`}>
                      <Button variant="ghost" size="sm"><Edit2 size={16} /></Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}