import React, { useState, useMemo } from 'react'
import { Link } from 'wouter';

import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Star, Heart, ChevronDown, X } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  brand: string
  inStock: boolean
}

const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mystical Aurora Sphere',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 124,
    category: 'Premium',
    brand: 'Galaxy Aura',
    inStock: true
  },
  {
    id: '2',
    name: 'Ethereal Glow Lamp',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1565636192335-14f0159cce3c?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 98,
    category: 'Popular',
    brand: 'Galaxy Aura',
    inStock: true
  },
  {
    id: '3',
    name: 'Celestial Crystal Orb',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=500&h=500&fit=crop',
    rating: 5.0,
    reviews: 156,
    category: 'Best Seller',
    brand: 'Galaxy Aura',
    inStock: true
  },
  {
    id: '4',
    name: 'Cosmic Dream Sphere',
    price: 159.99,
    originalPrice: 189.99,
    image: 'https://images.unsplash.com/photo-1577993453173-c985f2b31ba3?w=500&h=500&fit=crop',
    rating: 4.7,
    reviews: 87,
    category: 'New',
    brand: 'Galaxy Aura',
    inStock: true
  },
  {
    id: '5',
    name: 'Luminous Night Companion',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1585159375924-b2277b45d28d?w=500&h=500&fit=crop',
    rating: 4.6,
    reviews: 45,
    category: 'Budget',
    brand: 'Galaxy Aura',
    inStock: true
  },
  {
    id: '6',
    name: 'Enchanted Galaxy Orb',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1576193538326-cdcc6b89ace1?w=500&h=500&fit=crop',
    rating: 5.0,
    reviews: 203,
    category: 'Premium',
    brand: 'Galaxy Aura',
    inStock: true
  },
  {
    id: '7',
    name: 'Starlight Essence',
    price: 139.99,
    image: 'https://images.unsplash.com/photo-1519915212567-fef9c4a30a00?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 112,
    category: 'Popular',
    brand: 'Galaxy Aura',
    inStock: false
  },
  {
    id: '8',
    name: 'Prism Light Sphere',
    price: 169.99,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 178,
    category: 'Best Seller',
    brand: 'Galaxy Aura',
    inStock: true
  }
]

const CATEGORIES = ['All', 'Premium', 'Popular', 'Best Seller', 'New', 'Budget']
const BRANDS = ['Galaxy Aura']
const PRICE_RANGES = [
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 - $150', min: 100, max: 150 },
  { label: '$150 - $200', min: 150, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity }
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [sortBy, setSortBy] = useState('popularity')
  const [showFilters, setShowFilters] = useState(true)

  const filteredAndSorted = useMemo(() => {
    let results = ALL_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesPrice = !selectedPriceRange || (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max)
      
      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort results
    if (sortBy === 'price-low') {
      results.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'newest') {
      results.reverse()
    }

    return results
  }, [searchQuery, selectedCategory, selectedPriceRange, sortBy])

  return (
    <PublicLayout cartCount={0}>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Shop Our Collection</h1>
          <p className="text-muted-foreground">Browse our complete selection of crystal sphere lamps</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="space-y-6 sticky top-20">
              {/* Search */}
              <div>
                <h3 className="font-semibold mb-3">Search</h3>
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPriceRange(range.min === selectedPriceRange?.min ? null : range)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        selectedPriceRange?.min === range.min
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== 'All' || selectedPriceRange || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSelectedPriceRange(null)
                    setSearchQuery('')
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAndSorted.length} products
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                >
                  Filters
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-border rounded bg-background text-foreground"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSorted.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSorted.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <Card className="overflow-hidden group cursor-pointer h-full flex flex-col hover:border-primary transition-colors">
                      {/* Image */}
                      <div className="relative overflow-hidden bg-muted h-64 flex items-center justify-center">
                        {!product.inStock && (
                          <Badge variant="destructive" className="absolute top-3 left-3 z-10">
                            Out of Stock
                          </Badge>
                        )}
                        {product.originalPrice && (
                          <Badge className="absolute top-3 left-3 z-10 bg-destructive">
                            Sale
                          </Badge>
                        )}

                        <button className="absolute top-3 right-3 z-10 p-2 bg-background/80 backdrop-blur hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">
                          <Heart size={18} />
                        </button>

                        <img
                          src={product.image}
                          alt={product.name}
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${!product.inStock ? 'opacity-50' : ''}`}
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

                        {/* Add to Cart */}
                        <Button
                          size="sm"
                          className="w-full gap-2"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart size={16} />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All')
                    setSelectedPriceRange(null)
                    setSearchQuery('')
                  }}
                  className="text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
