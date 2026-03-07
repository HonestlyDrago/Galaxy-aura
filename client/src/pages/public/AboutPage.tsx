import React from 'react'
import { Link } from 'wouter'
import { PublicLayout } from '@/components/public/layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Sparkles,
  Heart,
  Globe,
  Leaf,
  Star,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react'

const TEAM = [
  {
    name: 'Sophia Reeves',
    role: 'Founder & Creative Director',
    bio: 'With a background in fine arts and a passion for light, Sophia founded Galaxy Aura to bring crystal illumination into everyday living.',
    initial: 'S',
  },
  {
    name: 'Marcus Lin',
    role: 'Head of Product Design',
    bio: 'Marcus blends modern aesthetics with ancient crystal traditions, hand-selecting every piece for quality and beauty.',
    initial: 'M',
  },
  {
    name: 'Anika Patel',
    role: 'Customer Experience Lead',
    bio: 'Anika ensures every Galaxy Aura customer feels valued, guiding them from discovery to long-term delight.',
    initial: 'A',
  },
]

const VALUES = [
  {
    icon: Heart,
    title: 'Crafted with Care',
    desc: 'Every lamp is hand-inspected before it reaches you. We hold ourselves to the highest standards of craftsmanship.',
  },
  {
    icon: Leaf,
    title: 'Sustainably Sourced',
    desc: 'Our crystals are ethically mined and our packaging is fully recyclable. Beauty should never come at the planets expense.',
  },
  {
    icon: Globe,
    title: 'Globally Inspired',
    desc: 'Drawing from crystal traditions across Asia, Europe and the Americas, our collection celebrates a world of wonder.',
  },
  {
    icon: Star,
    title: 'Customer First',
    desc: 'Thousands of glowing reviews back our commitment: if youre not in love with your lamp, well make it right.',
  },
]

const STATS = [
  { value: '12,000+', label: 'Happy Customers' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '50+', label: 'Unique Designs' },
  { value: '6', label: 'Years of Craft' },
]

export default function AboutPage() {
  return (
    <PublicLayout cartCount={0}>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 -z-10" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles size={14} />
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Illuminating Spaces,{' '}
            <span className="text-primary">One Crystal</span> at a Time
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Galaxy Aura was born from a simple belief — that light has the power to transform
            a room, a mood, and a moment. We craft premium crystal sphere lamps that bring
            warmth, wonder, and a touch of magic to every home.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-serif font-bold text-primary mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium mb-4">
                <Award size={14} />
                Our Mission
              </div>
              <h2 className="text-4xl font-serif font-bold mb-5">
                Making Extraordinary Lighting Accessible
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We started in a small studio, hand-polishing crystal spheres and experimenting
                with warm LED illumination. What began as a passion project quickly became a
                movement — people everywhere wanted that same enchanting glow in their homes.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Today we serve customers across 30+ countries, but our philosophy remains
                unchanged: every piece should feel special, personal, and worthy of a story.
              </p>
              <Link href="/shop">
                <Button className="gap-2">
                  Explore Our Collection
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            {/* Visual placeholder */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-background border border-border h-80 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <Sparkles size={40} className="text-primary-foreground" />
                </div>
                <p className="font-serif text-xl font-bold">Galaxy Aura</p>
                <p className="text-sm text-muted-foreground mt-1">Est. 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These aren't just words on a wall — they're the principles behind every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users size={14} />
              The Team
            </div>
            <h2 className="text-4xl font-serif font-bold mb-4">The People Behind the Glow</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Passionate people who believe in the power of beautiful light.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {TEAM.map((member) => (
              <Card key={member.name} className="p-6 border border-border text-center hover:border-primary/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">{member.initial}</span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-xs text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Find Your Perfect Lamp?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of happy customers and bring a little galaxy into your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" className="gap-2">
                Shop Now
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
