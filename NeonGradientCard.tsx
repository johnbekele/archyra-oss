/**
 * NeonGradientCard - Card with Animated Neon Border Gradient
 *
 * A stunning card component featuring an animated rotating gradient
 * border with configurable neon glow effect. Perfect for premium
 * content, pricing cards, or highlighting important features.
 *
 * @example
 * ```tsx
 * import { NeonGradientCard } from 'archyra';
 *
 * // Basic usage
 * <NeonGradientCard>
 *   <h3>Premium Feature</h3>
 *   <p>Unlock exclusive content</p>
 * </NeonGradientCard>
 *
 * // Custom colors and glow
 * <NeonGradientCard
 *   colors={['#ff0080', '#7928ca', '#0070f3']}
 *   glowIntensity="lg"
 * >
 *   <div className="p-6">Cyberpunk Style</div>
 * </NeonGradientCard>
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useMemo } from 'react';

export interface NeonGradientCardProps {
  /** Card content */
  children?: ReactNode;
  /** Gradient colors for the border */
  colors?: string[];
  /** Border width in pixels */
  borderWidth?: number;
  /** Glow effect intensity */
  glowIntensity?: 'none' | 'sm' | 'md' | 'lg';
  /** Animation speed in seconds (full rotation) */
  speed?: number;
  /** Border radius */
  rounded?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  /** Inner background color */
  background?: string;
  /** Additional CSS classes */
  className?: string;
}

const roundedClasses = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

const glowSizeMap = {
  none: 0,
  sm: 10,
  md: 20,
  lg: 40,
};

export function NeonGradientCard({
  children,
  colors = ['#6366f1', '#a855f7', '#ec4899', '#6366f1'],
  borderWidth = 2,
  glowIntensity = 'md',
  speed = 4,
  rounded = '2xl',
  background,
  className = '',
}: NeonGradientCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const glowSize = glowSizeMap[glowIntensity];

  // Create conic gradient string
  const gradient = useMemo(() => {
    const colorStops = colors.map((color, i) => {
      const percent = (i / (colors.length - 1)) * 100;
      return `${color} ${percent}%`;
    });
    return `conic-gradient(from var(--angle), ${colorStops.join(', ')})`;
  }, [colors]);

  // Static fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        className={`
          relative
          ${roundedClasses[rounded]}
          ${className}
        `}
        style={{ padding: borderWidth }}
      >
        <div
          className={`absolute inset-0 ${roundedClasses[rounded]}`}
          style={{
            background: `linear-gradient(135deg, ${colors.slice(0, 3).join(', ')})`,
          }}
        />
        <div
          className={`
            relative h-full
            ${background || 'bg-white dark:bg-zinc-950'}
            ${roundedClasses[rounded]}
          `}
          style={{
            margin: 0,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        relative
        ${roundedClasses[rounded]}
        ${className}
      `}
      style={{ padding: borderWidth }}
    >
      {/* Animated gradient border */}
      <motion.div
        className={`absolute inset-0 ${roundedClasses[rounded]}`}
        style={{
          background: gradient,
          // @ts-ignore - CSS custom property
          '--angle': '0deg',
        }}
        animate={{
          // @ts-ignore
          '--angle': '360deg',
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Glow effect layer */}
      {glowIntensity !== 'none' && (
        <motion.div
          className={`absolute ${roundedClasses[rounded]}`}
          style={{
            inset: -glowSize / 2,
            background: gradient,
            filter: `blur(${glowSize}px)`,
            opacity: 0.5,
            // @ts-ignore
            '--angle': '0deg',
          }}
          animate={{
            // @ts-ignore
            '--angle': '360deg',
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Inner content container */}
      <div
        className={`
          relative h-full z-10
          ${background || 'bg-white dark:bg-zinc-950'}
          ${roundedClasses[rounded]}
        `}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * NeonGradientCardHeader - Header section for NeonGradientCard
 */
export interface NeonGradientCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function NeonGradientCardHeader({ children, className = '' }: NeonGradientCardHeaderProps) {
  return (
    <div className={`p-6 pb-0 ${className}`}>
      {children}
    </div>
  );
}

/**
 * NeonGradientCardContent - Content section for NeonGradientCard
 */
export interface NeonGradientCardContentProps {
  children: ReactNode;
  className?: string;
}

export function NeonGradientCardContent({ children, className = '' }: NeonGradientCardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

/**
 * NeonGradientCardFooter - Footer section for NeonGradientCard
 */
export interface NeonGradientCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function NeonGradientCardFooter({ children, className = '' }: NeonGradientCardFooterProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Preset color themes for NeonGradientCard
 */
export const neonGradientPresets = {
  /** Purple to pink gradient */
  purple: ['#6366f1', '#a855f7', '#ec4899', '#6366f1'],
  /** Blue to cyan gradient */
  ocean: ['#0ea5e9', '#06b6d4', '#22d3ee', '#0ea5e9'],
  /** Green to emerald gradient */
  nature: ['#10b981', '#34d399', '#6ee7b7', '#10b981'],
  /** Orange to yellow gradient */
  sunset: ['#f97316', '#fb923c', '#fbbf24', '#f97316'],
  /** Red to pink gradient */
  fire: ['#ef4444', '#f87171', '#ec4899', '#ef4444'],
  /** Rainbow gradient */
  rainbow: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ef4444'],
  /** Monochrome gradient */
  mono: ['#1f2937', '#4b5563', '#9ca3af', '#1f2937'],
};

export default NeonGradientCard;
