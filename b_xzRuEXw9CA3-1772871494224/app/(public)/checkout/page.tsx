'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Lock, CheckCircle2 } from 'lucide-react'

const CART_ITEMS = [
  {
    id: '1',
    name: 'Mystical Aurora Sphere',
    price: 149.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Celestial Crystal Orb',
    price: 179.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=100&h=100&fit=crop'
  }
]

type CheckoutStep = 'shipping' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const [step, setStep] = useState<CheckoutStep>('shipping')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  })
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('confirmation')
  }

  return (
    <PublicLayout cartCount={CART_ITEMS.length}>
      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center gap-3 ${step === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step === 'shipping' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                1
              </div>
              <span className="font-semibold">Shipping</span>
            </div>
            <div className="flex-1 h-1 bg-muted mx-2"></div>
            <div className={`flex items-center gap-3 ${step === 'payment' || step === 'confirmation' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                (step === 'payment' || step === 'confirmation') ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                2
              </div>
              <span className="font-semibold">Payment</span>
            </div>
            <div className="flex-1 h-1 bg-muted mx-2"></div>
            <div className={`flex items-center gap-3 ${step === 'confirmation' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                step === 'confirmation' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                ✓
              </div>
              <span className="font-semibold">Confirmation</span>
            </div>
          </div>
        </div>

        {step === 'confirmation' ? (
          // Confirmation Page
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center">
              <CheckCircle2 size={64} className="mx-auto text-primary mb-6" />
              <h1 className="text-4xl font-serif font-bold mb-3">Order Confirmed!</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for your purchase. Your order has been placed successfully.
              </p>

              <div className="bg-muted p-6 rounded-lg mb-8 text-left">
                <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                <p className="text-2xl font-bold font-mono mb-6">#ORD-2024-{Math.random().toString().slice(2, 8)}</p>

                <p className="text-sm text-muted-foreground mb-2">Estimated Delivery</p>
                <p className="text-lg font-semibold">March 15 - March 18, 2024</p>
              </div>

              <p className="text-muted-foreground mb-8">
                A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/account/orders">
                  <Button size="lg">Track Your Order</Button>
                </Link>
                <Link href="/shop">
                  <Button size="lg" variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {step === 'shipping' && (
                <Card className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">Shipping Address</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>

                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />

                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />

                    <Input
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        required
                      />
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="px-4 py-2 border border-border rounded-lg bg-background"
                        required
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <Button type="submit" size="lg" className="w-full mt-6">
                      Continue to Payment
                    </Button>
                  </form>
                </Card>
              )}

              {step === 'payment' && (
                <Card className="p-8">
                  <h2 className="text-2xl font-serif font-bold mb-6">Payment Information</h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <Input
                      placeholder="Cardholder Name"
                      value={paymentData.cardName}
                      onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                      required
                    />

                    <Input
                      placeholder="Card Number"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      required
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="MM/YY"
                        value={paymentData.expiry}
                        onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                        required
                      />
                      <Input
                        placeholder="CVV"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                        required
                      />
                    </div>

                    <div className="bg-primary/10 text-primary text-sm p-4 rounded flex items-center gap-3">
                      <Lock size={18} />
                      Your payment information is secure and encrypted
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => setStep('shipping')}
                      >
                        Back
                      </Button>
                      <Button type="submit" size="lg" className="flex-1">
                        Complete Purchase
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <Card className="p-6 h-fit sticky top-20">
              <h3 className="text-lg font-serif font-bold mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                {CART_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
