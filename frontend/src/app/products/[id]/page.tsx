"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProductById, deleteProduct } from "@/lib/api";
import { Product } from "@/types/product";
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  Share2, 
  Star, 
  Edit, 
  Trash2, 
  Sparkles,
  Tag,
  DollarSign,
  Calendar,
  Eye,
  Package,
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getProductById(id)
        .then(setProduct)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!product?._id) return;
    
    try {
      setIsDeleting(true);
      await deleteProduct(product._id);
      router.push("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-200 border-t-pink-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-pink-600 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Product Details</h3>
          <p className="text-gray-600">Please wait while we fetch the information...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
              <Package className="w-12 h-12 text-pink-500" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6 mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Collection
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
                  <p className="text-gray-600">Fashion item information</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Link
                href={`/products/edit/${product._id}`}
                className="flex items-center px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="aspect-square bg-white rounded-2xl shadow-xl overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-white/50 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-10 h-10 text-pink-500" />
                      </div>
                      <p className="text-gray-500 font-medium">No Image Available</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Image Overlay Actions */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                  <Heart className="w-5 h-5 text-red-500" />
                </button>
                <button className="p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                  <Share2 className="w-5 h-5 text-blue-500" />
                </button>
              </div>
            </div>

            {/* Image Gallery Placeholder */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {product.category && (
                  <span className="inline-flex items-center px-3 py-1 bg-pink-100 text-pink-600 text-sm font-medium rounded-full">
                    <Tag className="w-3 h-3 mr-1" />
                    {product.category}
                  </span>
                )}
                <div className="flex items-center text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.8 • 124 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <span className="text-gray-500">USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Product ID</p>
                  <p className="text-sm font-mono text-gray-700">#{product._id?.slice(-6)}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-white rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">100% secure checkout</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Add to Wishlist
                </button>
                <button className="flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 mr-2 text-blue-500" />
                  Share
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{product.category || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium">${product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Description</span>
                  <span className="font-medium text-right max-w-xs">{product.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product ID</span>
                  <span className="font-mono text-sm">{product._id?.slice(-8)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Product</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{product.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
