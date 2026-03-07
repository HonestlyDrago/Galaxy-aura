'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Heart } from 'lucide-react'

interface FeaturedProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: '1',
    name: 'Mystical Aurora Sphere',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 124,
    category: 'Premium'
  },
  {
    id: '2',
    name: 'Ethereal Glow Lamp',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1565636192335-14f0159cce3c?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 98,
    category: 'Popular'
  },
  {
    id: '3',
    name: 'Celestial Crystal Orb',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=500&h=500&fit=crop',
    rating: 5.0,
    reviews: 156,
    category: 'Best Seller'
  },
  {
    id: '4',
    name: 'Cosmic Dream Sphere',
    price: 159.99,
    originalPrice: 189.99,
    image: 'https://images.unsplash.com/photo-1577993453173-c985f2b31ba3?w=500&h=500&fit=crop',
    rating: 4.7,
    reviews: 87,
    category: 'New'
  }
]

export function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Featured Collection</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated selection of our most sought-after crystal sphere lamps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="overflow-hidden group cursor-pointer h-full flex flex-col hover:border-primary transition-colors">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-muted h-64 flex items-center justify-center">
                  {/* Badge */}
                  {product.originalPrice && (
                    <Badge className="absolute top-3 left-3 z-10 bg-destructive">
                      Sale
                    </Badge>
                  )}
                  {product.category && !product.originalPrice && (
                    <Badge className="absolute top-3 left-3 z-10">
                      {product.category}
                    </Badge>
                  )}

                  {/* Wishlist Button */}
                  <button className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">
                    <Heart size={18} />
                  </button>

                  {/* Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4 mt-auto">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button size="sm" className="w-full gap-2">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
