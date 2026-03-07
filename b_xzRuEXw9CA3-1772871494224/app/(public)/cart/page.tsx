'use client'

import React from 'react'
import Link from 'next/link'
import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingCart, X } from 'lucide-react'

// Mock cart data
const MOCK_ITEMS = [
  {
    productId: '1',
    name: 'Mystical Aurora Sphere',
    price: 149.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=200&h=200&fit=crop'
  },
  {
    productId: '3',
    name: 'Celestial Crystal Orb',
    price: 179.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=200&h=200&fit=crop'
  }
]

export default function CartPage() {
  const [items, setItems] = React.useState(MOCK_ITEMS)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const removeItem = (productId: string) => {
    setItems(items.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      setItems(items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ))
    }
  }

  if (items.length === 0) {
    return (
      <PublicLayout cartCount={0}>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h1 className="text-3xl font-serif font-bold mb-3">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Explore our collection and find the perfect crystal sphere lamp for your space.
            </p>
            <Link href="/shop">
              <Button size="lg" className="gap-2">
                Continue Shopping
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout cartCount={items.length}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.productId} className="p-4 flex gap-4">
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded object-cover"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <Link href={`/product/${item.productId}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-3">SKU: GA-{item.productId}</p>
                    <p className="font-bold">${item.price}</p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 hover:bg-muted rounded transition-colors"
                    >
                      <X size={18} />
                    </button>

                    <div className="flex items-center border border-border rounded">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-muted transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-muted transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Link href="/shop" className="text-primary hover:underline text-sm mt-6 inline-block">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <Card className="p-6 h-fit sticky top-20">
            <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {shipping === 0 && (
              <div className="bg-primary/10 text-primary text-xs p-3 rounded mb-6">
                ✓ Free shipping on this order!
              </div>
            )}

            <Link href="/checkout" className="block w-full mb-3">
              <Button size="lg" className="w-full gap-2">
                Proceed to Checkout
                <ArrowRight size={18} />
              </Button>
            </Link>

            <Button variant="outline" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}
