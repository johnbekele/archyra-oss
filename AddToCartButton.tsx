/**
 * @fileoverview AddToCartButton - Animated E-commerce Add to Cart Button
 *
 * A stunning animated button that transforms through states:
 * idle → loading → success with particle effects and smooth transitions.
 *
 * @module AddToCartButton
 * @requires react
 * @requires framer-motion
 * @requires lucide-react
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check, Package, Sparkles } from 'lucide-react';

type ButtonState = 'idle' | 'loading' | 'success';

export interface AddToCartButtonProps {
  /** Callback when button is clicked */
  onClick?: () => Promise<void> | void;
  /** Button text */
  text?: string;
  /** Success text */
  successText?: string;
  /** Price to display */
  price?: number;
  /** Color variant */
  variant?: 'violet' | 'emerald' | 'rose' | 'amber';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
}

const variantStyles = {
  violet: {
    gradient: 'from-violet-600 to-purple-600',
    hoverGradient: 'hover:from-violet-700 hover:to-purple-700',
    shadow: 'shadow-violet-500/30 hover:shadow-violet-500/50',
    particles: '#8B5CF6',
  },
  emerald: {
    gradient: 'from-emerald-500 to-teal-600',
    hoverGradient: 'hover:from-emerald-600 hover:to-teal-700',
    shadow: 'shadow-emerald-500/30 hover:shadow-emerald-500/50',
    particles: '#10B981',
  },
  rose: {
    gradient: 'from-rose-500 to-pink-600',
    hoverGradient: 'hover:from-rose-600 hover:to-pink-700',
    shadow: 'shadow-rose-500/30 hover:shadow-rose-500/50',
    particles: '#F43F5E',
  },
  amber: {
    gradient: 'from-amber-500 to-orange-600',
    hoverGradient: 'hover:from-amber-600 hover:to-orange-700',
    shadow: 'shadow-amber-500/30 hover:shadow-amber-500/50',
    particles: '#F59E0B',
  },
};

const sizeStyles = {
  sm: 'py-2.5 px-5 text-sm',
  md: 'py-3.5 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
};

export function AddToCartButton({
  onClick,
  text = 'Add to Cart',
  successText = 'Added!',
  price,
  variant = 'violet',
  size = 'md',
  disabled = false,
}: AddToCartButtonProps) {
  const [state, setState] = useState<ButtonState>('idle');
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const styles = variantStyles[variant];

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (state !== 'idle' || disabled) return;

    // Create particle burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);

    setState('loading');

    try {
      await onClick?.();
      setState('success');
      setTimeout(() => setState('idle'), 2500);
    } catch {
      setState('idle');
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || state !== 'idle'}
      whileHover={state === 'idle' ? { scale: 1.02 } : {}}
      whileTap={state === 'idle' ? { scale: 0.98 } : {}}
      className={`
        relative overflow-hidden rounded-2xl font-semibold text-white
        transition-all duration-300
        ${sizeStyles[size]}
        ${state === 'success'
          ? 'bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30'
          : `bg-gradient-to-r ${styles.gradient} ${styles.hoverGradient} shadow-lg ${styles.shadow}`
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={state === 'idle' ? { x: '200%' } : { x: '-100%' }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              opacity: 1
            }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 150,
              y: particle.y + (Math.random() - 0.5) * 150,
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Button content */}
      <div className="relative flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.div>
              <span>{text}</span>
              {price && (
                <span className="bg-white/20 px-2 py-0.5 rounded-lg text-sm">
                  ${price.toFixed(2)}
                </span>
              )}
            </motion.div>
          )}

          {state === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-3"
            >
              {/* Cart animation */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.div>

              {/* Flying package */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{
                  x: [null, 0, 30],
                  opacity: [0, 1, 0],
                  y: [0, -10, 0],
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <Package className="w-4 h-4" />
              </motion.div>

              <span>Adding...</span>
            </motion.div>
          )}

          {state === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center gap-2"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
              </motion.div>
              <span>{successText}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success ripple */}
      <AnimatePresence>
        {state === 'success' && (
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white rounded-2xl"
            style={{ originX: 0.5, originY: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default AddToCartButton;
