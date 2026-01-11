/**
 * @fileoverview WishlistHeart - Animated Wishlist Heart Button
 *
 * A stunning animated heart button with particle burst effects,
 * perfect for wishlist/favorite functionality in e-commerce.
 *
 * @module WishlistHeart
 * @requires react
 * @requires framer-motion
 * @requires lucide-react
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export interface WishlistHeartProps {
  /** Initial state */
  isActive?: boolean;
  /** Callback when toggled */
  onToggle?: (isActive: boolean) => void;
  /** Size of the heart */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show background circle */
  showBackground?: boolean;
  /** Custom active color */
  activeColor?: string;
}

const sizeMap = {
  sm: { icon: 16, container: 32, ring: 40 },
  md: { icon: 20, container: 40, ring: 52 },
  lg: { icon: 28, container: 52, ring: 68 },
  xl: { icon: 36, container: 64, ring: 84 },
};

// Heart shapes for particle burst
const HeartParticle = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export function WishlistHeart({
  isActive: initialActive = false,
  onToggle,
  size = 'md',
  showBackground = true,
  activeColor = '#F43F5E',
}: WishlistHeartProps) {
  const [isActive, setIsActive] = useState(initialActive);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const dimensions = sizeMap[size];

  const handleClick = () => {
    if (isAnimating) return;

    const newState = !isActive;
    setIsActive(newState);
    onToggle?.(newState);

    if (newState) {
      setIsAnimating(true);
      // Generate particles
      setParticles(Array.from({ length: 14 }, (_, i) => i));
      setTimeout(() => {
        setParticles([]);
        setIsAnimating(false);
      }, 1000);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="relative flex items-center justify-center focus:outline-none"
      style={{
        width: dimensions.container,
        height: dimensions.container,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Background circle */}
      {showBackground && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: isActive
              ? `${activeColor}20`
              : 'rgba(0, 0, 0, 0.05)',
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Expanding ring on activation */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              borderColor: activeColor,
              width: dimensions.ring,
              height: dimensions.ring,
            }}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Second ring */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute rounded-full border-2"
            style={{
              borderColor: activeColor,
              width: dimensions.ring,
              height: dimensions.ring,
            }}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          />
        )}
      </AnimatePresence>

      {/* Particle burst */}
      <AnimatePresence>
        {particles.map((i) => {
          const angle = (i * 360) / particles.length;
          const distance = dimensions.ring * 0.8;
          const randomOffset = (Math.random() - 0.5) * 20;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ color: activeColor }}
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * (distance + randomOffset),
                y: Math.sin((angle * Math.PI) / 180) * (distance + randomOffset),
                scale: [0, 1.2, 0],
                opacity: [1, 1, 0],
                rotate: Math.random() * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.7,
                ease: 'easeOut',
                delay: i * 0.02,
              }}
            >
              <HeartParticle size={dimensions.icon * 0.5} />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Sparkle particles */}
      <AnimatePresence>
        {particles.slice(0, 7).map((i) => {
          const angle = (i * 360) / 7 + 25;
          const distance = dimensions.ring * 0.6;

          return (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeColor }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * distance,
                y: Math.sin((angle * Math.PI) / 180) * distance,
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: 0.1 + i * 0.03,
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Main heart icon */}
      <motion.div
        animate={{
          scale: isAnimating ? [1, 1.3, 0.9, 1.1, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          times: [0, 0.2, 0.4, 0.6, 1],
        }}
      >
        <Heart
          style={{
            width: dimensions.icon,
            height: dimensions.icon,
            color: isActive ? activeColor : '#9CA3AF',
            fill: isActive ? activeColor : 'transparent',
            strokeWidth: 2,
          }}
        />
      </motion.div>

      {/* Glow effect when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute rounded-full blur-md"
            style={{
              backgroundColor: activeColor,
              width: dimensions.icon * 1.5,
              height: dimensions.icon * 1.5,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default WishlistHeart;
