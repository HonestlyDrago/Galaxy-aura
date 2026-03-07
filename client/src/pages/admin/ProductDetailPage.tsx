import React from 'react'
import { Link, useParams } from 'wouter'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductDetail } from '@/components/admin/products/product-detail'

export default function AdminProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <div className="space-y-6">
      <Link href="/admin/products">
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft size={16} />
          Back to Products
        </Button>
      </Link>
      <ProductDetail productId={id!} />
    </div>
  )
}
