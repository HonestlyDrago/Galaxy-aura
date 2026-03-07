import React from 'react'
import { Link, useParams } from 'wouter'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OrderDetail } from '@/components/admin/orders/order-detail'

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  return (
    <div className="space-y-6">
      <Link href="/admin/orders">
        <Button variant="outline" size="sm" className="gap-2">
          <ArrowLeft size={16} />
          Back to Orders
        </Button>
      </Link>
      <OrderDetail orderId={id!} />
    </div>
  )
}
