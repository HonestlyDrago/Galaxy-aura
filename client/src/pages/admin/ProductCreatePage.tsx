import React from 'react'
import { Link } from 'wouter'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductForm } from '@/components/admin/products/product-form'

export default function AdminProductCreatePage() {
  return (
    <div className="space-y-6">
      <Link href="/admin/products">
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft size={16} />
          Back to Products
        </Button>
      </Link>
      <ProductForm mode="create" />
    </div>
  )
}
