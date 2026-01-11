/**
 * @fileoverview ProductCard - Stunning 3D E-commerce Product Card
 *
 * A visually impressive product card with 3D hover effects,
 * smooth animations, quick view, and add to cart functionality.
 *
 * @module ProductCard
 * @requires react
 * @requires framer-motion
 * @requires lucide-react
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star, Sparkles, Check } from 'lucide-react';

export interface ProductCardProps {
  /** Product image URL */
  image?: string;
  /** Product name */
  name?: string;
  /** Product price */
  price?: number;
  /** Original price (for showing discount) */
  originalPrice?: number;
  /** Product rating (0-5) */
  rating?: number;
  /** Number of reviews */
  reviews?: number;
  /** Sale badge text */
  badge?: string;
  /** Callback when add to cart is clicked */
  onAddToCart?: () => void;
  /** Callback when wishlist is clicked */
  onWishlist?: () => void;
  /** Callback when quick view is clicked */
  onQuickView?: () => void;
}

export function ProductCard({
  image = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  name = 'Premium Wireless Headphones',
  price = 299.99,
  originalPrice = 399.99,
  rating = 4.8,
  reviews = 256,
  badge = 'Best Seller',
  onAddToCart,
  onWishlist,
  onQuickView,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    onAddToCart?.();
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.();
  };

  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl"
        animate={{
          rotateY: isHovered ? mousePosition.x * 10 : 0,
          rotateX: isHovered ? -mousePosition.y * 10 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 rounded-3xl"
          animate={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(139, 92, 246, 0.3), transparent 50%)`,
          }}
          style={{ zIndex: 10, pointerEvents: 'none' }}
        />

        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-violet-100 to-purple-50 dark:from-zinc-800 dark:to-zinc-900 overflow-hidden">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="absolute top-4 left-4 z-20"
            >
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Sparkles className="w-3 h-3" />
                {badge}
              </div>
            </motion.div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="absolute top-4 right-4 z-20"
            >
              <div className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg">
                -{discount}%
              </div>
            </motion.div>
          )}

          {/* Product Image */}
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* Quick Actions Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center gap-3 z-10"
              >
                {/* Quick View */}
                <motion.button
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 20 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onQuickView}
                  className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-xl hover:bg-violet-500 hover:text-white transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>

                {/* Wishlist */}
                <motion.button
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 20 }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlist}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-colors ${
                    isWishlisted
                      ? 'bg-rose-500 text-white'
                      : 'bg-white dark:bg-zinc-800 hover:bg-rose-500 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300 dark:text-zinc-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-zinc-400">
              {rating} ({reviews})
            </span>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={isAddedToCart}
            className={`w-full py-3.5 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              isAddedToCart
                ? 'bg-emerald-500 text-white'
                : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40'
            }`}
          >
            <AnimatePresence mode="wait">
              {isAddedToCart ? (
                <motion.div
                  key="added"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Added to Cart
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Floating particles on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-violet-400"
                  initial={{
                    opacity: 0,
                    x: '50%',
                    y: '50%',
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: [0, 1.5, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  style={{ pointerEvents: 'none' }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default ProductCard;
