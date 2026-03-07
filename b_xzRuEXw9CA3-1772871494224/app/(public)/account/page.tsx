'use client'

import React from 'react'
import Link from 'next/link'
import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, Heart, Settings, LogOut, ArrowRight, Clock } from 'lucide-react'

const RECENT_ORDERS = [
  {
    id: 'ORD-2024-001234',
    date: '2024-03-01',
    status: 'delivered',
    total: 509.97
  },
  {
    id: 'ORD-2024-005678',
    date: '2024-02-15',
    status: 'shipped',
    total: 279.97
  }
]

const WISHLIST_ITEMS = [
  {
    id: '1',
    name: 'Mystical Aurora Sphere',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=150&h=150&fit=crop'
  },
  {
    id: '5',
    name: 'Luminous Night Companion',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1585159375924-b2277b45d28d?w=150&h=150&fit=crop'
  }
]

export default function AccountPage() {
  return (
    <PublicLayout cartCount={0}>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Welcome Back, John</h1>
          <p className="text-muted-foreground">Manage your account and view your orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Account Stats */}
          <Card className="p-6">
            <Package size={32} className="text-primary mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
            <p className="text-3xl font-bold">12</p>
          </Card>

          <Card className="p-6">
            <Heart size={32} className="text-primary mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Wishlist Items</p>
            <p className="text-3xl font-bold">2</p>
          </Card>

          <Card className="p-6">
            <Clock size={32} className="text-primary mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Member Since</p>
            <p className="text-xl font-bold">Jan 2024</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold">Recent Orders</h2>
                <Link href="/account/orders" className="text-primary hover:underline text-sm font-semibold">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {RECENT_ORDERS.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={order.status === 'delivered' ? 'bg-green-500/20 text-green-700' : 'bg-blue-500/20 text-blue-700'}>
                        {order.status === 'delivered' ? 'Delivered' : 'In Transit'}
                      </Badge>
                      <p className="text-sm font-semibold mt-2">${order.total.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Wishlist */}
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-bold mb-6">Your Wishlist</h2>

              {WISHLIST_ITEMS.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {WISHLIST_ITEMS.map((item) => (
                    <div key={item.id} className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                      <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-semibold text-sm mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <p className="font-bold">${item.price}</p>
                          <Link href={`/product/${item.id}`}>
                            <Button size="sm" className="gap-2">
                              <ArrowRight size={14} />
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground">Your wishlist is empty</p>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <Card className="p-6">
              <h3 className="text-lg font-serif font-bold mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">john@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold">+1 (555) 123-4567</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-semibold text-sm">123 Main Street, New York, NY 10001</p>
                </div>
              </div>
            </Card>

            {/* Account Actions */}
            <div className="space-y-3">
              <Link href="/account/settings" className="block">
                <Button variant="outline" size="lg" className="w-full gap-2 justify-start">
                  <Settings size={18} />
                  Account Settings
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full gap-2 justify-start text-destructive hover:text-destructive">
                <LogOut size={18} />
                Sign Out
              </Button>
            </div>

            {/* Help Section */}
            <Card className="p-4 bg-primary/5">
              <p className="text-sm font-semibold mb-2">Need Help?</p>
              <p className="text-sm text-muted-foreground mb-3">
                Check out our FAQ or contact our support team
              </p>
              <div className="flex gap-2">
                <Link href="/faq" className="text-primary hover:underline text-sm font-semibold">
                  FAQ
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/contact" className="text-primary hover:underline text-sm font-semibold">
                  Contact
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
