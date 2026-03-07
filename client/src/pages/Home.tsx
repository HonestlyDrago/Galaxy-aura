import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShoppingCart, Star, Zap } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products
  const productsQuery = trpc.products.list.useQuery({
    limit: 6,
    offset: 0,
  });

  useEffect(() => {
    if (productsQuery.data) {
      setFeatured(productsQuery.data);
      setLoading(false);
    }
  }, [productsQuery.data]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Galaxy Aura
            </a>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/products">
              <a className="text-slate-300 hover:text-white transition">Shop</a>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/account">
                  <a className="text-slate-300 hover:text-white transition">Account</a>
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin">
                    <a className="text-slate-300 hover:text-white transition">Admin</a>
                  </Link>
                )}
              </>
            ) : (
              <a href={getLoginUrl()} className="text-slate-300 hover:text-white transition">
                Sign In
              </a>
            )}
            <Link href="/cart">
              <a className="relative">
                <ShoppingCart className="w-5 h-5 text-slate-300 hover:text-white transition" />
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome to Galaxy Aura
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Discover premium products with advanced filtering, customer reviews, and seamless checkout. Experience the future of e-commerce.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/products">
            <a>
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Start Shopping
              </Button>
            </a>
          </Link>
          <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Zap className="w-8 h-8 text-cyan-400 mb-2" />
              <CardTitle className="text-white">Advanced Filtering</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Filter products by category, price range, brand, and more to find exactly what you need.
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Star className="w-8 h-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Read authentic reviews and ratings from verified customers to make informed decisions.
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <ShoppingCart className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Easy Checkout</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Secure and seamless checkout process with multiple payment options and order tracking.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12">Featured Products</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product: any) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <a>
                  <Card className="bg-slate-800 border-slate-700 hover:border-cyan-500 transition cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="w-full h-48 bg-slate-700 rounded-md mb-4 flex items-center justify-center">
                        <span className="text-slate-500">Product Image</span>
                      </div>
                      <CardTitle className="text-white line-clamp-2">{product.name}</CardTitle>
                      <CardDescription className="text-slate-400">{product.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-cyan-400">${parseFloat(product.price).toFixed(2)}</p>
                          {product.originalPrice && (
                            <p className="text-sm text-slate-400 line-through">
                              ${parseFloat(product.originalPrice).toFixed(2)}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-yellow-400 mb-2">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm">4.5</span>
                          </div>
                          <p className="text-xs text-slate-400">{product.stock} in stock</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20 py-12 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Galaxy Aura</h3>
              <p className="text-slate-400 text-sm">Premium e-commerce experience with advanced features.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Brands
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2026 Galaxy Aura. All rights reserved. | SEO Optimized E-commerce Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
