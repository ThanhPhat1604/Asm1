"use client";
import Link from "next/link";
import { useState } from "react";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Heart,
  Bell,
  ChevronDown,
  Plus
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="hidden md:block">Free shipping on orders over $50!</p>
          <div className="flex items-center space-x-4 text-xs">
            <Link href="/help" className="hover:text-yellow-300 transition-colors">Help Center</Link>
            <span>|</span>
            <Link href="/track" className="hover:text-yellow-300 transition-colors">Track Order</Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-yellow-300 transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="bg-gradient-to-r from-pink-600 to-purple-700 text-white p-2 rounded-lg font-bold text-xl">
                  FashionHub
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <button className="absolute right-2 top-1 bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Categories
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/dresses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg">Dresses</Link>
                  <Link href="/tops" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Tops & Blouses</Link>
                  <Link href="/bottoms" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Bottoms</Link>
                  <Link href="/accessories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg">Accessories</Link>
                </div>
              </div>

              <Link 
                href="/create" 
                className="text-gray-700 hover:text-pink-600 font-medium transition-colors relative group"
              >
                Sell Fashion
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </Link>

              {/* Add New Product Button */}
              <Link
                href="/products/create"
                className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add Product
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon for Mobile */}
              <button 
                onClick={toggleSearch}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Search className="h-6 w-6" />
              </button>

              {/* Wishlist */}
              <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors group">
                <Heart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  5
                </span>
              </Link>

              {/* User Account */}
              <Link href="/account" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <User className="h-6 w-6" />
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-gray-200 p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/dresses" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dresses
              </Link>
              <Link 
                href="/tops" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tops & Blouses
              </Link>
              <Link 
                href="/bottoms" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Bottoms
              </Link>
              <Link 
                href="/accessories" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link 
                href="/create" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sell Fashion
              </Link>
              <Link 
                href="/products/create" 
                className="block px-3 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg transition-colors font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </div>
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link 
                href="/account" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
              <Link 
                href="/cart" 
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shopping Cart
              </Link>
            </div>
          </div>
        )}
    </nav>
    </>
  );
}
