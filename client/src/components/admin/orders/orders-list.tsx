import React from 'react'
import { Link } from 'wouter';
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Order } from '@/types/order'
import { Eye, ChevronRight } from 'lucide-react'

interface OrdersListProps {
  orders: Order[]
}

const statusConfig = {
  pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
  processing: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    label: 'Processing',
  },
  shipped: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Shipped' },
  delivered: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    label: 'Delivered',
  },
}

export function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <Card className="p-12 border border-border text-center">
        <p className="text-muted-foreground mb-4">No orders found</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {orders.map((order: any) => {
        const config = statusConfig[order.status as keyof typeof statusConfig]
        return (
          <Link key={order.id} href={`/orders/${order.id}`}>
            <Card className="p-5 border border-border hover:bg-muted/30 transition-all hover:border-primary cursor-pointer group">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-foreground">
                        {order.id.slice(-2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {order.id}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {order.customer}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:items-center gap-4 md:gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Amount
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {order.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Date
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {order.date}
                    </p>
                  </div>

                  <div>
                    <Badge className={`${config.bg} ${config.text}`}>
                      {config.label}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 self-end md:self-auto"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
