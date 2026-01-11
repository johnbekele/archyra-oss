/**
 * @fileoverview LoadingDots - Minimal Loading Indicator Component
 *
 * A lightweight animation component displaying three bouncing dots in sequence.
 * Ideal for inline loading states, button loading indicators, or minimal UI contexts.
 *
 * @module LoadingDots
 * @requires react
 * @requires framer-motion
 *
 * @example
 * // Basic usage with default styling
 * <LoadingDots />
 *
 * @example
 * // Custom size and color
 * <LoadingDots size="lg" color="#10B981" />
 *
 * @example
 * // Small dots for button loading state
 * <button disabled={isLoading}>
 *   {isLoading ? <LoadingDots size="sm" color="#fff" /> : 'Submit'}
 * </button>
 */

'use client';

import { motion } from 'framer-motion';

/**
 * Size variants for the loading dots.
 * @typedef {'sm' | 'md' | 'lg'} DotSize
 */
type DotSize = 'sm' | 'md' | 'lg';

/**
 * Props for the LoadingDots component.
 *
 * @interface LoadingDotsProps
 */
export interface LoadingDotsProps {
  /**
   * Size variant for the dots.
   * - 'sm': 8px diameter (compact, inline use)
   * - 'md': 12px diameter (default, standard loading)
   * - 'lg': 16px diameter (prominent display)
   *
   * @type {DotSize}
   * @default 'md'
   */
  size?: DotSize;

  /**
   * Color of the dots (any valid CSS color value).
   *
   * @type {string}
   * @default '#6366F1' (Indigo)
   */
  color?: string;
}

/**
 * LoadingDots - Minimal Loading Indicator Component
 *
 * Renders three dots that bounce sequentially to indicate loading state.
 * Each dot bounces 20px upward with a 0.15s stagger between dots.
 *
 * @component
 * @param {LoadingDotsProps} props - Component props
 * @returns {JSX.Element} Three animated bouncing dots
 *
 * @description
 * Animation Details:
 * - Duration: 0.5 seconds per bounce cycle
 * - Y translation: 0 → -20px → 0
 * - Stagger delay: 0.15s between each dot (0s, 0.15s, 0.3s)
 * - Easing: easeInOut for smooth motion
 * - Container: Flexbox centered with 8px gap, 32px vertical padding
 */
export default function LoadingDots({ size = 'md', color = '#6366F1' }: LoadingDotsProps): JSX.Element {
  /**
   * Pixel size mapping for each size variant.
   */
  const sizeMap: Record<DotSize, number> = {
    sm: 8,
    md: 12,
    lg: 16,
  };

  const dotSize = sizeMap[size];

  /**
   * Shared animation transition config for all dots.
   */
  const bounceTransition = {
    duration: 0.5,
    repeat: Infinity,
    ease: "easeInOut"
  };

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
            borderRadius: '50%',
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            ...bounceTransition,
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  );
}
