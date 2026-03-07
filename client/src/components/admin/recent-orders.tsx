import React from 'react'
import { Link } from 'wouter'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

const mockOrders = [
  { id: 'ORD-001', customer: 'Sarah Johnson', amount: '$1,250.00', status: 'pending', date: 'Mar 4, 2025' },
  { id: 'ORD-002', customer: 'Michael Chen', amount: '$892.50', status: 'processing', date: 'Mar 3, 2025' },
  { id: 'ORD-003', customer: 'Emma Wilson', amount: '$2,100.00', status: 'shipped', date: 'Mar 2, 2025' },
  { id: 'ORD-004', customer: 'James Rodriguez', amount: '$650.75', status: 'delivered', date: 'Mar 1, 2025' },
]

const statusConfig = {
  pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pending' },
  processing: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Processing' },
  shipped: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Shipped' },
  delivered: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Delivered' },
}

export function RecentOrders() {
  return (
    <Card className="p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Recent Orders</h2>
          <p className="text-sm text-muted-foreground">Latest transactions from your store</p>
        </div>
        <Link href="/orders" className="inline-block">
          <Button variant="outline" size="sm" className="gap-2">
            View All
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Order ID</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Customer</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => {
              const config = statusConfig[order.status as keyof typeof statusConfig]
              return (
                <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4 text-foreground font-medium">
                    <Link href={`/orders/${order.id}`}>
                      <span className="hover:text-primary cursor-pointer">{order.id}</span>
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-foreground">{order.customer}</td>
                  <td className="py-4 px-4 text-foreground">{order.amount}</td>
                  <td className="py-4 px-4">
                    <Badge className={`${config.bg} ${config.text}`}>{config.label}</Badge>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{order.date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}