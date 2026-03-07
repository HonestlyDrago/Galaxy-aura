import React, { useState } from 'react'
import { Link } from 'wouter';
import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart, Star, ChevronLeft, Truck, RotateCcw, Shield } from 'lucide-react'

interface ProductPageProps {
  params: {
    id: string
  }
}

// Mock product data
const PRODUCTS: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Mystical Aurora Sphere',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: 'Experience the enchanting glow of our Mystical Aurora Sphere. Handcrafted with premium crystal, this lamp creates an ethereal ambiance perfect for meditation, relaxation, or ambient room lighting.',
    images: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565636192335-14f0159cce3c?w=800&h=800&fit=crop',
    ],
    specifications: {
      material: 'Premium Crystal',
      diameter: '4 inches',
      weight: '2.5 lbs',
      lightSource: 'LED (USB rechargeable)',
      colorTemperature: 'Warm white (3000K)',
      features: ['Dimmable', 'Touch control', 'USB rechargeable', '8-hour battery life']
    },
    category: 'Premium',
    brand: 'Galaxy Aura',
    sku: 'GA-AURORA-001',
  },
  '2': {
    id: '2',
    name: 'Ethereal Glow Lamp',
    price: 129.99,
    rating: 4.9,
    reviews: 98,
    inStock: true,
    description: 'Bring celestial beauty into your home with our Ethereal Glow Lamp. Perfect for creating a mystical atmosphere in any room.',
    images: [
      'https://images.unsplash.com/photo-1565636192335-14f0159cce3c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=800&h=800&fit=crop',
    ],
    specifications: {
      material: 'Crystal Glass',
      diameter: '3.5 inches',
      weight: '2 lbs',
      lightSource: 'LED (USB rechargeable)',
      colorTemperature: 'Adjustable (3000K-6000K)',
      features: ['Color adjustable', 'Touch control', 'USB rechargeable', '10-hour battery life']
    },
    category: 'Popular',
    brand: 'Galaxy Aura',
    sku: 'GA-ETHEREAL-001',
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCTS[params.id] || PRODUCTS['1']
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <PublicLayout cartCount={0}>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link href="/shop" className="flex items-center gap-2 text-sm text-muted-foreground mb-8 hover:text-primary transition-colors">
          <ChevronLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted flex items-center justify-center">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ... Rest of code unchanged ... */}

          {/* Details */}
          <div className="flex flex-col gap-6">
            {/* Category & Title */}
            <div>
              <Badge className="mb-3">{product.category}</Badge>
              <h1 className="text-4xl font-serif font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted'}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="border-y border-border py-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-sm text-destructive font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold">Quantity:</label>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1 gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="w-14 p-0">
                  <Heart size={20} />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-primary" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={20} className="text-primary" />
                <div>
                  <p className="font-semibold">30-Day Returns</p>
                  <p className="text-sm text-muted-foreground">Hassle-free returns</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-primary" />
                <div>
                  <p className="font-semibold">Secure Checkout</p>
                  <p className="text-sm text-muted-foreground">100% secure transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <Card className="p-8 mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]: [string, any]) => (
              <div key={key}>
                <p className="text-sm text-muted-foreground capitalize mb-2">{key.replace(/([A-Z])/g, ' $1')}</p>
                {Array.isArray(value) ? (
                  <ul className="space-y-1">
                    {value.map((item, i) => (
                      <li key={i} className="text-sm">• {item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-semibold">{value}</p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Reviews Section */}
        <Card className="p-8">
          <h2 className="text-2xl font-serif font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">Customer {i}</p>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={14} className="fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">2 weeks ago</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  This lamp is absolutely beautiful! The quality is outstanding and it creates such a peaceful ambiance. Highly recommend!
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PublicLayout>
  )
}
