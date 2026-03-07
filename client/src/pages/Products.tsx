import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Star, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function Products() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(true);

  // Fetch data
  const productsQuery = trpc.products.list.useQuery({
    search: search || undefined,
    categoryId: selectedCategory || undefined,
    brandId: selectedBrand || undefined,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    limit: 20,
  });

  const categoriesQuery = trpc.categories.list.useQuery();
  const brandsQuery = trpc.brands.list.useQuery();

  const products = productsQuery.data || [];
  const categories = categoriesQuery.data || [];
  const brands = brandsQuery.data || [];

  const activeFilters = useMemo(() => {
    const filters = [];
    if (search) filters.push({ type: "search", value: search });
    if (selectedCategory) filters.push({ type: "category", value: selectedCategory });
    if (selectedBrand) filters.push({ type: "brand", value: selectedBrand });
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      filters.push({ type: "price", value: `$${priceRange[0]} - $${priceRange[1]}` });
    }
    return filters;
  }, [search, selectedCategory, selectedBrand, priceRange]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedBrand(null);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-950/95 backdrop-blur border-b border-slate-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Shop Products</h1>
          <p className="text-slate-400">Browse our collection with advanced filtering</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Filters</h2>
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <Label className="text-white mb-2 block">Search</Label>
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="text-white mb-4 block">Price Range</Label>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-slate-400">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <Label className="text-white mb-3 block font-semibold">Categories</Label>
                <div className="space-y-2">
                  {categories.map((category: any) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`cat-${category.id}`}
                        checked={selectedCategory === category.id}
                        onCheckedChange={(checked) =>
                          setSelectedCategory(checked ? category.id : null)
                        }
                        className="border-slate-600"
                      />
                      <label
                        htmlFor={`cat-${category.id}`}
                        className="ml-2 text-sm text-slate-300 cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <Label className="text-white mb-3 block font-semibold">Brands</Label>
                <div className="space-y-2">
                  {brands.map((brand: any) => (
                    <div key={brand.id} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={selectedBrand === brand.id}
                        onCheckedChange={(checked) =>
                          setSelectedBrand(checked ? brand.id : null)
                        }
                        className="border-slate-600"
                      />
                      <label
                        htmlFor={`brand-${brand.id}`}
                        className="ml-2 text-sm text-slate-300 cursor-pointer"
                      >
                        {brand.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {activeFilters.map((filter, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    <span>{filter.value}</span>
                    <button
                      onClick={() => {
                        if (filter.type === "search") setSearch("");
                        if (filter.type === "category") setSelectedCategory(null);
                        if (filter.type === "brand") setSelectedBrand(null);
                        if (filter.type === "price") setPriceRange([0, 1000]);
                      }}
                      className="hover:text-cyan-400 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Product Count */}
            <div className="mb-6 text-slate-400">
              {productsQuery.isLoading ? (
                <span>Loading products...</span>
              ) : (
                <span>Showing {products.length} products</span>
              )}
            </div>

            {/* Products */}
            {productsQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <a>
                      <Card className="bg-slate-800 border-slate-700 hover:border-cyan-500 transition cursor-pointer h-full">
                        <CardHeader className="pb-3">
                          <div className="w-full h-48 bg-slate-700 rounded-md mb-4 flex items-center justify-center">
                            <span className="text-slate-500">Product Image</span>
                          </div>
                          <CardTitle className="text-white line-clamp-2">{product.name}</CardTitle>
                          <CardDescription className="text-slate-400 line-clamp-2">
                            {product.shortDescription}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-2xl font-bold text-cyan-400">
                                ${parseFloat(product.price).toFixed(2)}
                              </p>
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
                              <p className={`text-xs ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
