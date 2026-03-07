import React from 'react'
import { Link } from 'wouter';
import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, ArrowRight, Clock, CheckCircle2, Truck } from 'lucide-react'

const MOCK_ORDERS = [
  {
    id: 'ORD-2024-001234',
    date: '2024-03-01',
    status: 'delivered' as const,
    total: 509.97,
    items: [
      { name: 'Mystical Aurora Sphere', quantity: 1, price: 149.99 },
      { name: 'Celestial Crystal Orb', quantity: 2, price: 179.99 }
    ],
    estimatedDelivery: '2024-03-08',
    actualDelivery: '2024-03-07'
  },
  {
    id: 'ORD-2024-005678',
    date: '2024-02-15',
    status: 'shipped' as const,
    total: 279.97,
    items: [
      { name: 'Ethereal Glow Lamp', quantity: 1, price: 129.99 }
    ],
    estimatedDelivery: '2024-03-15'
  },
  {
    id: 'ORD-2024-009012',
    date: '2024-01-20',
    status: 'delivered' as const,
    total: 149.99,
    items: [
      { name: 'Cosmic Dream Sphere', quantity: 1, price: 159.99 }
    ],
    estimatedDelivery: '2024-02-05',
    actualDelivery: '2024-02-03'
  }
]

const STATUS_CONFIG = {
  pending: { color: 'bg-yellow-500/20 text-yellow-700', icon: Clock, label: 'Processing' },
  processing: { color: 'bg-blue-500/20 text-blue-700', icon: Clock, label: 'Processing' },
  shipped: { color: 'bg-blue-500/20 text-blue-700', icon: Truck, label: 'In Transit' },
  delivered: { color: 'bg-green-500/20 text-green-700', icon: CheckCircle2, label: 'Delivered' },
  cancelled: { color: 'bg-red-500/20 text-red-700', icon: Package, label: 'Cancelled' }
}

export default function OrdersPage() {
  return (
    <PublicLayout cartCount={0}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Order History</h1>
          <p className="text-muted-foreground">View and track your orders</p>
        </div>

        <div className="space-y-4">
          {MOCK_ORDERS.map((order: any) => {
            const config = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]
            const StatusIcon = config.icon

            return (
              <Card key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 pb-4 border-b border-border">
                  {/* Order Info */}
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-2">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Ordered on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status & Total */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div>
                      <Badge className={`gap-2 ${config.color}`}>
                        <StatusIcon size={14} />
                        {config.label}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4 pb-4 border-b border-border">
                  <p className="text-sm font-semibold mb-3">Items</p>
                  <div className="space-y-2">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="text-sm flex justify-between">
                        <span>{item.name} (Qty: {item.quantity})</span>
                        <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mb-4 pb-4 border-b border-border text-sm">
                  {order.actualDelivery ? (
                    <div>
                      <p className="text-muted-foreground mb-1">Delivered on</p>
                      <p className="font-semibold">{new Date(order.actualDelivery).toLocaleDateString()}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-muted-foreground mb-1">Estimated Delivery</p>
                      <p className="font-semibold">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/account/orders/${order.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      View Details
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                  {order.status === 'delivered' && (
                    <Button variant="outline" size="sm">
                      Leave Review
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {MOCK_ORDERS.length === 0 && (
          <Card className="p-12 text-center">
            <Package size={64} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-serif font-bold mb-2">No Orders Yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Link href="/shop">
              <Button size="lg" className="gap-2">
                Shop Now
                <ArrowRight size={18} />
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </PublicLayout>
  )
}
