import React, { useState } from 'react'
import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Quote, ThumbsUp, Filter } from 'lucide-react'

const ALL_REVIEWS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    rating: 5,
    date: 'Feb 28, 2026',
    product: 'Aurora Celestial Sphere',
    review:
      "Absolutely breathtaking! The light it casts on the walls at night is like nothing I've ever seen. My living room has been completely transformed. Worth every penny.",
    helpful: 42,
    tag: 'Verified Purchase',
  },
  {
    id: 2,
    name: 'James Chen',
    location: 'London, UK',
    rating: 5,
    date: 'Feb 20, 2026',
    product: 'Nebula Crystal Globe',
    review:
      "The craftsmanship on this lamp is extraordinary. The crystal is flawless and the glow is warm and calming. I've received so many compliments from guests. Highly recommend!",
    helpful: 31,
    tag: 'Verified Purchase',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    location: 'Sydney, Australia',
    rating: 5,
    date: 'Feb 12, 2026',
    product: 'Moonrise Sphere',
    review:
      'I bought this as a birthday gift for my partner and they were completely blown away. The packaging was gorgeous and the lamp itself feels very premium. Five stars!',
    helpful: 28,
    tag: 'Gift Purchase',
  },
  {
    id: 4,
    name: 'Carlos Mendez',
    location: 'Madrid, Spain',
    rating: 4,
    date: 'Jan 30, 2026',
    product: 'Stardust Orb Lamp',
    review:
      "Beautiful lamp, very well made. The only reason I'm giving 4 stars instead of 5 is that delivery took a bit longer than expected. But the product itself is stunning.",
    helpful: 19,
    tag: 'Verified Purchase',
  },
  {
    id: 5,
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    date: 'Jan 22, 2026',
    product: 'Galaxy Core Sphere',
    review:
      "This lamp has completely changed the vibe of my meditation room. The light is gentle and soothing. I fall asleep to it every night. Galaxy Aura is a brand I'll keep coming back to.",
    helpful: 55,
    tag: 'Verified Purchase',
  },
  {
    id: 6,
    name: 'Lena Fischer',
    location: 'Berlin, Germany',
    rating: 5,
    date: 'Jan 10, 2026',
    product: 'Aurora Celestial Sphere',
    review:
      'Perfect in every way. The sphere has no imperfections, the color temperature is ideal for a cozy evening, and customer support was super responsive when I had a shipping question.',
    helpful: 38,
    tag: 'Verified Purchase',
  },
  {
    id: 7,
    name: 'Michael Torres',
    location: 'Toronto, Canada',
    rating: 4,
    date: 'Dec 18, 2025',
    product: 'Cosmic Bloom Lamp',
    review:
      "Really impressed with the quality. I've bought crystal lamps from other brands and none of them compare. The base is solid, the crystal is clear and the glow is perfect.",
    helpful: 22,
    tag: 'Verified Purchase',
  },
  {
    id: 8,
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    rating: 5,
    date: 'Dec 5, 2025',
    product: 'Nebula Crystal Globe',
    review:
      'I had high expectations and Galaxy Aura exceeded every one of them. The lamp arrived in a beautiful gift box, looked exactly like the photos, and the light quality is exceptional.',
    helpful: 47,
    tag: 'Verified Purchase',
  },
]

const SUMMARY = [
  { stars: 5, count: 6, pct: 75 },
  { stars: 4, count: 2, pct: 25 },
  { stars: 3, count: 0, pct: 0 },
  { stars: 2, count: 0, pct: 0 },
  { stars: 1, count: 0, pct: 0 },
]

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const [filter, setFilter] = useState<number | null>(null)
  const [helpfulClicked, setHelpfulClicked] = useState<Set<number>>(new Set())

  const displayed = filter ? ALL_REVIEWS.filter((r) => r.rating === filter) : ALL_REVIEWS

  const avgRating = (
    ALL_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / ALL_REVIEWS.length
  ).toFixed(1)

  return (
    <PublicLayout cartCount={0}>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Star size={14} className="fill-primary" />
            Customer Reviews
          </div>
          <h1 className="text-5xl font-serif font-bold mb-4">
            What Our Customers Say
          </h1>
          <p className="text-muted-foreground text-lg">
            Real reviews from real people who brought the galaxy into their homes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar: summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 border border-border sticky top-24">
                <div className="text-center mb-6">
                  <p className="text-6xl font-serif font-bold text-primary">{avgRating}</p>
                  <StarRating rating={Math.round(Number(avgRating))} size={20} />
                  <p className="text-sm text-muted-foreground mt-2">
                    {ALL_REVIEWS.length} reviews
                  </p>
                </div>

                {/* Bar chart */}
                <div className="space-y-2 mb-6">
                  {SUMMARY.map(({ stars, count, pct }) => (
                    <button
                      key={stars}
                      onClick={() => setFilter(filter === stars ? null : stars)}
                      className={`w-full flex items-center gap-2 text-sm hover:opacity-80 transition-opacity ${filter === stars ? 'opacity-100' : 'opacity-70'}`}
                    >
                      <span className="w-4 text-right">{stars}</span>
                      <Star size={12} className="text-yellow-400 fill-yellow-400 shrink-0" />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-4 text-muted-foreground">{count}</span>
                    </button>
                  ))}
                </div>

                {filter && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => setFilter(null)}
                  >
                    <Filter size={14} />
                    Clear Filter
                  </Button>
                )}
              </Card>
            </div>

            {/* Reviews list */}
            <div className="lg:col-span-3 space-y-5">
              {/* Featured quote */}
              <Card className="p-6 border border-primary/30 bg-primary/5">
                <Quote size={28} className="text-primary/40 mb-3" />
                <p className="text-lg font-serif italic text-foreground mb-4">
                  "The light it casts on the walls at night is like nothing I've ever seen. My
                  living room has been completely transformed."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">New York, USA</p>
                  </div>
                  <StarRating rating={5} size={14} />
                </div>
              </Card>

              {displayed.map((review) => (
                <Card key={review.id} className="p-6 border border-border hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/70 to-accent/70 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary-foreground">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.location}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <StarRating rating={review.rating} size={14} />
                      <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{review.product}</Badge>
                    <Badge className="text-xs bg-green-500/15 text-green-500 border-0">{review.tag}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    "{review.review}"
                  </p>

                  <button
                    onClick={() => {
                      const next = new Set(helpfulClicked)
                      if (next.has(review.id)) next.delete(review.id)
                      else next.add(review.id)
                      setHelpfulClicked(next)
                    }}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      helpfulClicked.has(review.id)
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <ThumbsUp size={13} />
                    Helpful ({helpfulClicked.has(review.id) ? review.helpful + 1 : review.helpful})
                  </button>
                </Card>
              ))}

              {displayed.length === 0 && (
                <Card className="p-12 border border-border text-center">
                  <p className="text-muted-foreground">No reviews for this rating yet.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setFilter(null)}>
                    Show All Reviews
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
