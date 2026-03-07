'use client'

import React from 'react'
import Link from 'next/link'
import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Truck, Package, MapPin, Calendar, CheckCircle2 } from 'lucide-react'

interface OrderDetailPageProps {
  params: {
    id: string
  }
}

const MOCK_ORDER = {
  id: 'ORD-2024-001234',
  date: '2024-03-01',
  status: 'delivered' as const,
  total: 509.97,
  subtotal: 450,
  shipping: 10,
  tax: 49.97,
  items: [
    {
      name: 'Mystical Aurora Sphere',
      price: 149.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=150&h=150&fit=crop'
    },
    {
      name: 'Celestial Crystal Orb',
      price: 179.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=150&h=150&fit=crop'
    }
  ],
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  },
  timeline: [
    { status: 'Order Placed', date: '2024-03-01', completed: true },
    { status: 'Processing', date: '2024-03-02', completed: true },
    { status: 'Shipped', date: '2024-03-03', completed: true },
    { status: 'Out for Delivery', date: '2024-03-07', completed: true },
    { status: 'Delivered', date: '2024-03-07', completed: true }
  ]
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  return (
    <PublicLayout cartCount={0}>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/account/orders" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ChevronLeft size={18} />
          Back to Orders
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <h1 className="text-3xl font-serif font-bold mb-2">{MOCK_ORDER.id}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(MOCK_ORDER.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge className="w-fit bg-green-500/20 text-green-700 gap-2 h-fit">
                  <CheckCircle2 size={16} />
                  Delivered
                </Badge>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h2 className="text-xl font-serif font-bold mb-6">Delivery Status</h2>
              <div className="space-y-4">
                {MOCK_ORDER.timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        item.completed ? 'bg-primary border-primary' : 'border-muted'
                      }`} />
                      {i !== MOCK_ORDER.timeline.length - 1 && (
                        <div className={`w-0.5 h-12 ${item.completed ? 'bg-primary' : 'bg-muted'}`} />
                      )}
                    </div>
                    <div className="flex-1 py-1">
                      <p className={`font-semibold ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {item.status}
                      </p>
                      <p className="text-sm text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Items */}
            <Card className="p-6">
              <h2 className="text-xl font-serif font-bold mb-6">Order Items</h2>
              <div className="space-y-4">
                {MOCK_ORDER.items.map((item, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b border-border last:border-0">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Quantity: {item.quantity}</p>
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Shipping Address */}
            <Card className="p-6">
              <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Shipping Address
              </h2>
              <div className="text-muted-foreground">
                <p className="font-semibold text-foreground mb-2">
                  {MOCK_ORDER.shippingAddress.firstName} {MOCK_ORDER.shippingAddress.lastName}
                </p>
                <p>{MOCK_ORDER.shippingAddress.address}</p>
                <p>{MOCK_ORDER.shippingAddress.city}, {MOCK_ORDER.shippingAddress.state} {MOCK_ORDER.shippingAddress.zipCode}</p>
                <p>{MOCK_ORDER.shippingAddress.country}</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-serif font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${MOCK_ORDER.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${MOCK_ORDER.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${MOCK_ORDER.tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4">
                <span>Total</span>
                <span>${MOCK_ORDER.total.toFixed(2)}</span>
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                Download Invoice
              </Button>
              <Button className="w-full" variant="outline">
                Return Items
              </Button>
              <Button className="w-full">
                Leave Review
              </Button>
            </div>

            {/* Help */}
            <Card className="p-4 bg-primary/5">
              <p className="text-sm font-semibold mb-2">Need Help?</p>
              <p className="text-sm text-muted-foreground mb-3">
                Contact our customer support team for any questions about your order.
              </p>
              <Link href="/contact" className="text-primary hover:underline text-sm font-semibold">
                Contact Support →
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
