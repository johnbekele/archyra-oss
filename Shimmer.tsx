/**
 * Shimmer - Animated shimmer/shine effect wrapper
 *
 * A component that adds a beautiful shimmer animation
 * to any content, perfect for loading states and highlights.
 *
 * @example
 * ```tsx
 * import { Shimmer } from 'archyra';
 *
 * // Wrap any content
 * <Shimmer>
 *   <div className="w-full h-32 bg-gray-200 rounded-lg" />
 * </Shimmer>
 *
 * // Use preset shapes
 * <ShimmerBlock width={200} height={100} />
 * <ShimmerText lines={3} />
 * ```
 */

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface ShimmerProps {
  /** Content to apply shimmer effect to */
  children?: ReactNode;
  /** Animation duration in seconds */
  duration?: number;
  /** Shimmer color/gradient */
  color?: 'light' | 'dark' | 'colored';
  /** Custom shimmer gradient */
  gradient?: string;
  /** Animation direction */
  direction?: 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top' | 'diagonal';
  /** Enable/disable animation */
  animate?: boolean;
  /** Custom class name */
  className?: string;
}

const gradientMap = {
  light: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
  dark: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
  colored: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.2) 50%, transparent 100%)',
};

const directionMap = {
  'left-right': { x: ['-100%', '100%'], y: 0 },
  'right-left': { x: ['100%', '-100%'], y: 0 },
  'top-bottom': { x: 0, y: ['-100%', '100%'] },
  'bottom-top': { x: 0, y: ['100%', '-100%'] },
  'diagonal': { x: ['-100%', '100%'], y: ['-100%', '100%'] },
};

export default function Shimmer({
  children,
  duration = 1.5,
  color = 'light',
  gradient,
  direction = 'left-right',
  animate = true,
  className = '',
}: ShimmerProps) {
  const shimmerGradient = gradient || gradientMap[color];
  const movement = directionMap[direction];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      {animate && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: shimmerGradient }}
          animate={{
            x: movement.x,
            y: movement.y,
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );
}

// Shimmer block preset
export interface ShimmerBlockProps {
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  duration?: number;
}

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export function ShimmerBlock({
  width = '100%',
  height = 100,
  rounded = 'lg',
  className = '',
  duration = 1.5,
}: ShimmerBlockProps) {
  return (
    <Shimmer duration={duration} className={`${roundedClasses[rounded]} ${className}`}>
      <div
        className={`bg-gray-200 dark:bg-gray-700 ${roundedClasses[rounded]}`}
        style={{ width, height }}
      />
    </Shimmer>
  );
}

// Shimmer text preset
export interface ShimmerTextProps {
  lines?: number;
  lineHeight?: number;
  gap?: number;
  className?: string;
  duration?: number;
}

export function ShimmerText({
  lines = 3,
  lineHeight = 16,
  gap = 8,
  className = '',
  duration = 1.5,
}: ShimmerTextProps) {
  return (
    <div className={`space-y-2 ${className}`} style={{ gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer key={i} duration={duration + i * 0.1}>
          <div
            className="bg-gray-200 dark:bg-gray-700 rounded"
            style={{
              height: lineHeight,
              width: i === lines - 1 ? '70%' : '100%',
            }}
          />
        </Shimmer>
      ))}
    </div>
  );
}

// Shimmer avatar preset
export interface ShimmerAvatarProps {
  size?: number;
  className?: string;
  duration?: number;
}

export function ShimmerAvatar({
  size = 48,
  className = '',
  duration = 1.5,
}: ShimmerAvatarProps) {
  return (
    <Shimmer duration={duration} className={`rounded-full ${className}`}>
      <div
        className="bg-gray-200 dark:bg-gray-700 rounded-full"
        style={{ width: size, height: size }}
      />
    </Shimmer>
  );
}

// Shimmer card preset
export interface ShimmerCardProps {
  className?: string;
  duration?: number;
  imageHeight?: number;
}

export function ShimmerCard({
  className = '',
  duration = 1.5,
  imageHeight = 160,
}: ShimmerCardProps) {
  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden ${className}`}>
      <Shimmer duration={duration}>
        <div
          className="bg-gray-200 dark:bg-gray-700"
          style={{ height: imageHeight }}
        />
      </Shimmer>
      <div className="p-4 space-y-3">
        <Shimmer duration={duration}>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        </Shimmer>
        <Shimmer duration={duration + 0.1}>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        </Shimmer>
        <Shimmer duration={duration + 0.2}>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </Shimmer>
        <div className="flex gap-2 pt-2">
          <Shimmer duration={duration}>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-20" />
          </Shimmer>
          <Shimmer duration={duration + 0.1}>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-20" />
          </Shimmer>
        </div>
      </div>
    </div>
  );
}

// Shimmer table preset
export interface ShimmerTableProps {
  rows?: number;
  cols?: number;
  className?: string;
  duration?: number;
}

export function ShimmerTable({
  rows = 5,
  cols = 4,
  className = '',
  duration = 1.5,
}: ShimmerTableProps) {
  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gray-100 dark:bg-gray-800 p-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Shimmer key={i} duration={duration} className="flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
          </Shimmer>
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="p-3 flex gap-4 border-t border-gray-200 dark:border-gray-700"
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Shimmer
              key={colIndex}
              duration={duration + rowIndex * 0.05}
              className="flex-1"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            </Shimmer>
          ))}
        </div>
      ))}
    </div>
  );
}

// Shimmer button preset
export interface ShimmerButtonProps {
  width?: string | number;
  height?: number;
  className?: string;
  duration?: number;
}

export function ShimmerButton({
  width = 120,
  height = 40,
  className = '',
  duration = 1.5,
}: ShimmerButtonProps) {
  return (
    <Shimmer duration={duration} className={`rounded-lg ${className}`}>
      <div
        className="bg-gray-200 dark:bg-gray-700 rounded-lg"
        style={{ width, height }}
      />
    </Shimmer>
  );
}

// Full page shimmer loader
export interface ShimmerPageProps {
  variant?: 'dashboard' | 'article' | 'profile' | 'list';
  className?: string;
}

export function ShimmerPage({ variant = 'dashboard', className = '' }: ShimmerPageProps) {
  if (variant === 'article') {
    return (
      <div className={`max-w-3xl mx-auto space-y-6 p-6 ${className}`}>
        <ShimmerBlock height={300} rounded="xl" />
        <ShimmerBlock width="60%" height={32} />
        <div className="flex items-center gap-4">
          <ShimmerAvatar size={40} />
          <div className="flex-1">
            <ShimmerBlock width={120} height={16} />
            <ShimmerBlock width={80} height={12} className="mt-1" />
          </div>
        </div>
        <ShimmerText lines={8} />
      </div>
    );
  }

  if (variant === 'profile') {
    return (
      <div className={`max-w-2xl mx-auto space-y-6 p-6 ${className}`}>
        <div className="flex items-center gap-6">
          <ShimmerAvatar size={100} />
          <div className="flex-1 space-y-2">
            <ShimmerBlock width="50%" height={24} />
            <ShimmerBlock width="30%" height={16} />
            <ShimmerBlock width="70%" height={14} />
          </div>
        </div>
        <ShimmerText lines={4} />
        <div className="grid grid-cols-3 gap-4">
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-4 p-6 ${className}`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <ShimmerAvatar size={48} />
            <div className="flex-1 space-y-2">
              <ShimmerBlock width="40%" height={16} />
              <ShimmerBlock width="60%" height={12} />
            </div>
            <ShimmerButton width={80} height={32} />
          </div>
        ))}
      </div>
    );
  }

  // Dashboard variant (default)
  return (
    <div className={`grid grid-cols-4 gap-6 p-6 ${className}`}>
      {/* Stats row */}
      {Array.from({ length: 4 }).map((_, i) => (
        <ShimmerCard key={i} imageHeight={0} />
      ))}
      {/* Main content */}
      <div className="col-span-3">
        <ShimmerBlock height={400} />
      </div>
      {/* Sidebar */}
      <div className="space-y-4">
        <ShimmerCard imageHeight={100} />
        <ShimmerCard imageHeight={100} />
      </div>
      {/* Table */}
      <div className="col-span-4">
        <ShimmerTable rows={5} cols={5} />
      </div>
    </div>
  );
}
