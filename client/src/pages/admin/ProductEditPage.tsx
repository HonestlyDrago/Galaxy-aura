import React from 'react'
import { Link, useParams } from 'wouter'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductForm } from '@/components/admin/products/product-form'

export default function AdminProductEditPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <div className="space-y-6">
      <Link href={`/admin/products/${id}`}>
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft size={16} />
          Back to Product
        </Button>
      </Link>
      <ProductForm productId={id} mode="edit" />
    </div>
  )
}
