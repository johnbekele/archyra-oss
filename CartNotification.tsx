/**
 * @fileoverview CartNotification - Animated Cart Notification
 *
 * A stunning notification component showing items flying to cart,
 * with success animations and cart counter updates.
 *
 * @module CartNotification
 * @requires react
 * @requires framer-motion
 * @requires lucide-react
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Package, X, Sparkles } from 'lucide-react';

export interface CartNotificationProps {
  /** Show the notification */
  isVisible: boolean;
  /** Product image URL */
  productImage?: string;
  /** Product name */
  productName?: string;
  /** Product price */
  productPrice?: number;
  /** Current cart count */
  cartCount?: number;
  /** Auto hide after ms (0 to disable) */
  autoHideDuration?: number;
  /** Callback when notification is dismissed */
  onDismiss?: () => void;
  /** Callback to view cart */
  onViewCart?: () => void;
  /** Position of notification */
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export function CartNotification({
  isVisible,
  productImage = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
  productName = 'Product Added',
  productPrice = 99.99,
  cartCount = 1,
  autoHideDuration = 4000,
  onDismiss,
  onViewCart,
  position = 'top-right',
}: CartNotificationProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [flyingProduct, setFlyingProduct] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setFlyingProduct(true);
      const flyTimer = setTimeout(() => {
        setFlyingProduct(false);
        setShowSuccess(true);
      }, 600);

      const hideTimer = autoHideDuration > 0 ? setTimeout(() => {
        onDismiss?.();
      }, autoHideDuration) : null;

      return () => {
        clearTimeout(flyTimer);
        if (hideTimer) clearTimeout(hideTimer);
      };
    } else {
      setShowSuccess(false);
      setFlyingProduct(false);
    }
  }, [isVisible, autoHideDuration, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Flying product animation */}
          <AnimatePresence>
            {flyingProduct && (
              <motion.div
                className="fixed z-[100] pointer-events-none"
                initial={{
                  top: '50%',
                  left: '50%',
                  scale: 1,
                  opacity: 1
                }}
                animate={{
                  top: '2rem',
                  right: '2rem',
                  left: 'auto',
                  scale: 0.3,
                  opacity: 0.8
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
              >
                <div className="relative">
                  <img
                    src={productImage}
                    alt=""
                    className="w-20 h-20 object-cover rounded-xl shadow-2xl"
                  />
                  {/* Trail effect */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-xl bg-violet-500"
                      initial={{ opacity: 0.3, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.5 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification card */}
          <motion.div
            className={`fixed ${positionStyles[position]} z-50`}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden min-w-[320px]">
              {/* Success shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Close button */}
              <button
                onClick={onDismiss}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>

              <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <AnimatePresence mode="wait">
                    {showSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="loading"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Package className="w-6 h-6 text-violet-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {showSuccess ? 'Added to Cart!' : 'Adding to Cart...'}
                  </span>
                </div>

                {/* Product info */}
                <div className="flex gap-3">
                  <motion.div
                    className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                    {showSuccess && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center"
                      >
                        <Sparkles className="w-6 h-6 text-emerald-500" />
                      </motion.div>
                    )}
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {productName}
                    </p>
                    <p className="text-lg font-bold text-violet-600 dark:text-violet-400">
                      ${productPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Cart button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={onViewCart}
                  className="mt-4 w-full py-2.5 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
                >
                  <ShoppingCart className="w-4 h-4" />
                  View Cart
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="bg-white/20 px-2 py-0.5 rounded-md text-sm"
                  >
                    {cartCount}
                  </motion.span>
                </motion.button>
              </div>

              {/* Progress bar */}
              {autoHideDuration > 0 && (
                <motion.div
                  className="h-1 bg-gradient-to-r from-violet-500 to-purple-500"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: autoHideDuration / 1000, ease: 'linear' }}
                />
              )}
            </div>
          </motion.div>

          {/* Cart icon bounce effect */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                className="fixed top-4 right-4 z-40"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {/* This would be your app's cart icon - showing placeholder */}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

// Demo component that triggers the notification
export function CartNotificationDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
    setIsVisible(true);
  };

  return (
    <div className="relative min-h-[300px] flex items-center justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddToCart}
        className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-shadow flex items-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </motion.button>

      <CartNotification
        isVisible={isVisible}
        cartCount={cartCount}
        onDismiss={() => setIsVisible(false)}
        onViewCart={() => {
          setIsVisible(false);
          alert('Navigate to cart!');
        }}
      />
    </div>
  );
}

export default CartNotification;
