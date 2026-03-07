'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background opacity-50" />
      
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mb-6 inline-block">
          <span className="text-sm font-semibold text-primary px-4 py-2 bg-primary/10 rounded-full">
            Premium Crystal Sphere Lamps
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-pretty leading-tight">
          Illuminate Your <span className="text-primary">Universe</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Discover enchanting crystal sphere lamps that blend timeless elegance with modern mystique. Each piece is handcrafted to bring celestial wonder to your space.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/shop">
            <Button size="lg" className="gap-2">
              Explore Collection
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline">
              Learn Our Story
            </Button>
          </Link>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-muted-foreground">Authentic</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-primary">Free</div>
            <div className="text-muted-foreground">Shipping</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-primary">30-Day</div>
            <div className="text-muted-foreground">Returns</div>
          </div>
        </div>
      </div>
    </section>
  )
}
