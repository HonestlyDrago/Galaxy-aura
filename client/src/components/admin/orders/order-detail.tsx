import React, { useState } from 'react'
import { Link } from 'wouter'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useOrders } from '@/hooks/useOrders'
import { ArrowLeft, Package, Clock, CheckCircle, Truck, MapPin, Mail, Phone, Download } from 'lucide-react'

interface OrderDetailProps {
  orderId: string
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const { orders } = useOrders()
  const order = orders.find((o: any) => o.id === orderId)
  const [selectedStatus, setSelectedStatus] = useState(order?.status || '')

  if (!order) {
    return (
      <div className="space-y-8">
        <Link href="/orders">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={20} />
            Back to Orders
          </Button>
        </Link>
        <Card className="p-12 border border-border text-center">
          <p className="text-muted-foreground mb-4">Order not found</p>
          <Link href="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const statusSteps = [
    { status: 'pending', label: 'Order Placed', icon: Package },
    { status: 'processing', label: 'Processing', icon: Clock },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle },
  ]

  const currentStepIndex = statusSteps.findIndex(
    (s) => s.status === order.status
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/orders">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={20} />
            Back to Orders
          </Button>
        </Link>
        <Button variant="outline" className="gap-2">
          <Download size={20} />
          Export PDF
        </Button>
      </div>

      {/* Order Header */}
      <Card className="p-8 border border-border">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {order.id}
            </h1>
            <p className="text-muted-foreground">Placed on {order.date}</p>
          </div>
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Package size={40} className="text-primary-foreground" />
          </div>
        </div>

        {/* Status Progress */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Order Status
          </h2>
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = index <= currentStepIndex
              const isCurrent = index === currentStepIndex

              return (
                <div key={step.status} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                      } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  >
                    <Icon size={24} />
                  </div>
                  <span
                    className={`text-sm font-medium text-center ${isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Update Status */}
        <div className="pt-8 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Update Status
          </h3>
          <div className="flex flex-wrap gap-2">
            {statusSteps.map((step) => (
              <Button
                key={step.status}
                variant={
                  selectedStatus === step.status ? 'default' : 'outline'
                }
                size="sm"
                onClick={() => setSelectedStatus(step.status)}
              >
                {step.label}
              </Button>
            ))}
          </div>
          <Button className="mt-4" onClick={() => console.log('Status updated')}>
            Confirm Status Update
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Order Items
            </h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Crystal Aura Lamp - Large',
                  quantity: 1,
                  price: 499.99,
                },
                {
                  name: 'Moonstone Sphere - Medium',
                  quantity: 2,
                  price: 249.99,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Order Summary */}
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">$999.97</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">$15.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">$80.00</span>
              </div>
              <div className="border-t border-border pt-3 flex items-center justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  $1,094.97
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Customer & Shipping Info */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Customer Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Full Name
                </p>
                <p className="font-medium text-foreground">
                  {order.customer}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Mail size={16} />
                  <p className="text-sm">Email</p>
                </div>
                <p className="font-medium text-foreground">
                  customer@example.com
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Phone size={16} />
                  <p className="text-sm">Phone</p>
                </div>
                <p className="font-medium text-foreground">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </Card>

          {/* Shipping Address */}
          <Card className="p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Shipping Address
            </h2>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">
                  123 Crystal Lane
                </p>
                <p className="text-sm text-muted-foreground">
                  San Francisco, CA 94105
                </p>
                <p className="text-sm text-muted-foreground">USA</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
