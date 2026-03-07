import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">G</span>
              </div>
              <span className="font-serif text-lg font-semibold">Galaxy Aura</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover the enchanting glow of premium crystal sphere lamps.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 hover:bg-muted rounded transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-muted rounded transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-muted rounded transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-muted rounded transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Shop</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=lamps" className="text-muted-foreground hover:text-primary transition-colors">
                  Lamps
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="text-muted-foreground hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=newest" className="text-muted-foreground hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Galaxy Aura. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Secure Checkout</span>
            <span>Free Shipping on Orders Over $100</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
