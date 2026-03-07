import React from 'react'

import { PublicLayout } from '@/components/public/layout'
import { HeroSection } from '@/components/public/home/hero-section'
import { FeaturedProducts } from '@/components/public/home/featured-products'
import { Testimonials } from '@/components/public/home/testimonials'



export default function HomePage() {
  return (
    <PublicLayout cartCount={0}>
      <HeroSection />
      <FeaturedProducts />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Illuminate Your World?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our complete collection and find the perfect crystal sphere lamp for your space.
          </p>
          <a href="/shop" className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Start Shopping
          </a>
        </div>
      </section>
    </PublicLayout>
  )
}
