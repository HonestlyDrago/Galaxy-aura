import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, ShoppingCart } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Fetch cart
  const cartQuery = trpc.cart.getItems.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Mutations
  const updateItemMutation = trpc.cart.updateItem.useMutation({
    onSuccess: () => {
      cartQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeItemMutation = trpc.cart.removeItem.useMutation({
    onSuccess: () => {
      cartQuery.refetch();
      toast.success("Item removed from cart");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-12 text-center">
          <ShoppingCart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Please sign in to view your cart</h1>
          <Link href="/">
            <a>
              <Button>Back to Home</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const items = cartQuery.data || [];
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.product?.price || "0") * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-950/95 backdrop-blur border-b border-slate-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {cartQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <Link href="/products">
              <a>
                <Button>Continue Shopping</Button>
              </a>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                {items.map((item: any) => (
                  <Card key={item.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-slate-700 rounded-md flex-shrink-0 flex items-center justify-center">
                          <span className="text-slate-500 text-sm">Image</span>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <Link href={`/products/${item.product?.slug}`}>
                            <a className="text-lg font-semibold text-white hover:text-cyan-400 transition">
                              {item.product?.name}
                            </a>
                          </Link>
                          <p className="text-slate-400 text-sm mb-2">{item.product?.shortDescription}</p>
                          <p className="text-cyan-400 font-bold">
                            ${parseFloat(item.product?.price || 0).toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateItemMutation.mutate({
                                  cartItemId: item.id,
                                  quantity: Math.max(1, item.quantity - 1),
                                })
                              }
                              className="bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition text-white"
                            >
                              −
                            </button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItemMutation.mutate({
                                  cartItemId: item.id,
                                  quantity: Math.max(1, parseInt(e.target.value) || 1),
                                })
                              }
                              className="w-12 bg-slate-700 border-slate-600 text-white text-center"
                            />
                            <button
                              onClick={() =>
                                updateItemMutation.mutate({
                                  cartItemId: item.id,
                                  quantity: item.quantity + 1,
                                })
                              }
                              className="bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition text-white"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItemMutation.mutate({ cartItemId: item.id })}
                            className="text-red-400 hover:text-red-300 transition flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-slate-800 border-slate-700 sticky top-20">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-sm text-green-400">Free shipping on orders over $100!</p>
                  )}

                  <div className="border-t border-slate-700 pt-4 flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span className="text-cyan-400">${total.toFixed(2)}</span>
                  </div>

                  <Link href="/checkout">
                    <a>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                        Proceed to Checkout
                      </Button>
                    </a>
                  </Link>

                  <Link href="/products">
                    <a>
                      <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                        Continue Shopping
                      </Button>
                    </a>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
