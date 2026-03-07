'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductForm } from '@/components/admin/products/product-form'

export default function AdminProductEditPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="space-y-6">
      <Link href={`/admin/products/${params.id}`}>
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft size={16} />
          Back to Product
        </Button>
      </Link>
      <ProductForm productId={params.id} mode="edit" />
    </div>
  )
}
