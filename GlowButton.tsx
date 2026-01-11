/**
 * GlowButton - Animated Button with Shimmer/Glow Sweep Effect
 *
 * A beautiful CTA button with an animated shine effect that sweeps
 * across the button surface. Perfect for drawing attention to
 * important actions.
 *
 * @example
 * ```tsx
 * import { GlowButton } from 'archyra';
 *
 * // Basic usage
 * <GlowButton>Get Started</GlowButton>
 *
 * // With custom color and size
 * <GlowButton glowColor="rgba(255,200,100,0.4)" size="lg">
 *   Subscribe Now
 * </GlowButton>
 *
 * // Glow only on hover
 * <GlowButton glowOnHover variant="outline">
 *   Learn More
 * </GlowButton>
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useState, useCallback } from 'react';

export interface GlowButtonProps {
  /** Button content */
  children: ReactNode;
  /** Color of the glow/shimmer effect */
  glowColor?: string;
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Button style variant */
  variant?: 'default' | 'outline' | 'ghost';
  /** Only animate on hover (default: always animate) */
  glowOnHover?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses = {
  sm: 'h-9 px-4 text-sm rounded-lg',
  md: 'h-11 px-6 text-base rounded-xl',
  lg: 'h-14 px-8 text-lg rounded-xl',
};

const variantClasses = {
  default: 'bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-500 dark:hover:bg-violet-600',
  outline: 'bg-transparent border-2 border-violet-600 text-violet-600 hover:bg-violet-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-950',
  ghost: 'bg-transparent text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950',
};

export function GlowButton({
  children,
  glowColor = 'rgba(255, 255, 255, 0.3)',
  size = 'md',
  variant = 'default',
  glowOnHover = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}: GlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = !prefersReducedMotion && !disabled && (glowOnHover ? isHovered : true);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden font-semibold
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
        dark:focus:ring-offset-zinc-900
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Button content */}
      <span className="relative z-10">{children}</span>

      {/* Glow/shimmer effect */}
      {shouldAnimate && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              90deg,
              transparent 0%,
              ${glowColor} 50%,
              transparent 100%
            )`,
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered && !disabled ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

/**
 * GlowButtonGroup - Container for multiple GlowButtons
 */
export interface GlowButtonGroupProps {
  children: ReactNode;
  /** Spacing between buttons */
  gap?: 'sm' | 'md' | 'lg';
  /** Alignment */
  align?: 'start' | 'center' | 'end';
  /** Stack vertically on mobile */
  stackOnMobile?: boolean;
  className?: string;
}

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const alignClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
};

export function GlowButtonGroup({
  children,
  gap = 'md',
  align = 'start',
  stackOnMobile = true,
  className = '',
}: GlowButtonGroupProps) {
  return (
    <div
      className={`
        flex ${alignClasses[align]} ${gapClasses[gap]}
        ${stackOnMobile ? 'flex-col sm:flex-row' : 'flex-row'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default GlowButton;
