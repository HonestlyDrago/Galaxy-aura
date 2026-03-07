import { useState } from "react";
import { useParams } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  // Fetch product
  const productQuery = trpc.products.getBySlug.useQuery({ slug: slug || "" });
  const reviewsQuery = trpc.reviews.list.useQuery({
    productId: productQuery.data?.id || 0,
    limit: 10,
  });

  // Mutations
  const addToCartMutation = trpc.cart.addItem.useMutation({
    onSuccess: () => {
      toast.success("Added to cart!");
      setQuantity(1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const createReviewMutation = trpc.reviews.create.useMutation({
    onSuccess: () => {
      toast.success("Review submitted!");
      setReviewRating(5);
      setReviewTitle("");
      setReviewContent("");
      reviewsQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (productQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!productQuery.data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <Link href="/products">
            <a>
              <Button>Back to Products</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const product = productQuery.data;
  const images = product.images || [];
  const currentImage = images[currentImageIndex]?.imageUrl || "/placeholder.png";

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      return;
    }
    addToCartMutation.mutate({ productId: product.id, quantity });
  };

  const handleSubmitReview = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to leave a review");
      return;
    }
    if (!reviewTitle || !reviewContent) {
      toast.error("Please fill in all fields");
      return;
    }
    createReviewMutation.mutate({
      productId: product.id,
      rating: reviewRating,
      title: reviewTitle,
      content: reviewContent,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-950/95 backdrop-blur border-b border-slate-700 py-4">
        <div className="container mx-auto px-4">
          <Link href="/products">
            <a className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Products
            </a>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-4">
              <div className="w-full h-96 bg-slate-700 rounded-md flex items-center justify-center mb-4 relative">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Image Navigation */}
              {images.length > 1 && (
                <div className="flex gap-2 justify-between items-center">
                  <button
                    onClick={() => setCurrentImageIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
                    className="bg-slate-700 hover:bg-slate-600 p-2 rounded transition"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <div className="flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-12 h-12 rounded border-2 transition ${
                          idx === currentImageIndex ? "border-cyan-400" : "border-slate-600"
                        }`}
                      >
                        <img
                          src={images[idx]?.imageUrl}
                          alt={`View ${idx + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentImageIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
                    className="bg-slate-700 hover:bg-slate-600 p-2 rounded transition"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-slate-400 mb-4">{product.shortDescription}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(product.reviewStats?.averageRating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-400">
                {product.reviewStats?.totalReviews || 0} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl font-bold text-cyan-400 mb-2">
                ${parseFloat(product.price).toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-lg text-slate-400 line-through">
                  ${parseFloat(product.originalPrice).toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              <p className={`text-lg font-semibold ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-6">
              <Label className="text-white mb-2 block">Quantity</Label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 bg-slate-700 border-slate-600 text-white"
                />
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addToCartMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                </Button>
              </div>
            </div>

            {/* Description */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Description</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">{product.description}</CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">Customer Reviews</h2>

            {reviewsQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
              </div>
            ) : (reviewsQuery.data || []).length === 0 ? (
              <p className="text-slate-400">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4">
                {(reviewsQuery.data || []).map((review: any) => (
                  <Card key={review.id} className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{review.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="text-slate-300">{review.content}</CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Write Review */}
          <div>
            <Card className="bg-slate-800 border-slate-700 sticky top-20">
              <CardHeader>
                <CardTitle className="text-white">Write a Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isAuthenticated ? (
                  <p className="text-slate-400 text-sm">Please sign in to leave a review</p>
                ) : (
                  <>
                    <div>
                      <Label className="text-white mb-2 block">Rating</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="transition"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= reviewRating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-600"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">Title</Label>
                      <Input
                        placeholder="Review title"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <Label className="text-white mb-2 block">Review</Label>
                      <Textarea
                        placeholder="Share your experience..."
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        rows={4}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <Button
                      onClick={handleSubmitReview}
                      disabled={createReviewMutation.isPending}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
