/**
 * Skeleton - Animated loading placeholder
 *
 * A flexible skeleton loader component with multiple variants
 * for different content types (text, avatar, card, etc.)
 *
 * @example
 * ```tsx
 * import { Skeleton } from 'archyra';
 *
 * // Text skeleton
 * <Skeleton variant="text" lines={3} />
 *
 * // Avatar skeleton
 * <Skeleton variant="avatar" size="lg" />
 *
 * // Card skeleton
 * <Skeleton variant="card" />
 * ```
 */

'use client';

import { motion } from 'framer-motion';

export interface SkeletonProps {
  /** Skeleton variant type */
  variant?: 'text' | 'avatar' | 'card' | 'image' | 'button' | 'custom';
  /** Number of text lines (for text variant) */
  lines?: number;
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom width */
  width?: string | number;
  /** Custom height */
  height?: string | number;
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Animation style */
  animation?: 'pulse' | 'shimmer' | 'wave';
  /** Custom class name */
  className?: string;
}

const sizeMap = {
  sm: { avatar: 32, text: 12, button: 32 },
  md: { avatar: 40, text: 16, button: 40 },
  lg: { avatar: 56, text: 20, button: 48 },
  xl: { avatar: 80, text: 24, button: 56 },
};

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export default function Skeleton({
  variant = 'text',
  lines = 1,
  size = 'md',
  width,
  height,
  rounded = 'md',
  animation = 'shimmer',
  className = '',
}: SkeletonProps) {
  const baseClasses = `bg-gray-200 dark:bg-gray-700 ${roundedMap[rounded]}`;

  const animationClasses = {
    pulse: 'animate-pulse',
    shimmer: '',
    wave: '',
  };

  const ShimmerOverlay = () => (
    <motion.div
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
      animate={{ translateX: ['calc(-100%)', 'calc(100%)'] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
    />
  );

  const WaveOverlay = () => (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.02, 1]
      }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  );

  const renderAnimation = () => {
    if (animation === 'shimmer') return <ShimmerOverlay />;
    if (animation === 'wave') return <WaveOverlay />;
    return null;
  };

  // Text variant
  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${animationClasses[animation]} overflow-hidden relative`}
            style={{
              width: i === lines - 1 && lines > 1 ? '75%' : width || '100%',
              height: height || sizeMap[size].text,
            }}
          >
            {renderAnimation()}
          </div>
        ))}
      </div>
    );
  }

  // Avatar variant
  if (variant === 'avatar') {
    const avatarSize = sizeMap[size].avatar;
    return (
      <div
        className={`${baseClasses} ${animationClasses[animation]} overflow-hidden relative rounded-full`}
        style={{
          width: width || avatarSize,
          height: height || avatarSize,
        }}
      >
        {renderAnimation()}
      </div>
    );
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div className={`${className} space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg`}>
        {/* Image placeholder */}
        <div
          className={`${baseClasses} ${animationClasses[animation]} overflow-hidden relative w-full`}
          style={{ height: 160 }}
        >
          {renderAnimation()}
        </div>
        {/* Title */}
        <div
          className={`${baseClasses} ${animationClasses[animation]} overflow-hidden relative`}
          style={{ width: '70%', height: 20 }}
        >
          {renderAnimation()}
        </div>
        {/* Description lines */}
        <div className="space-y-2">
          <div
            className={`${baseClasses} ${animationClasses[animation]} overflow-hidden relative`}
            style={{ width: '100%', height: 14 }}
          >
            {renderAnimation()}
          </div>
          <div
            className={`${baseClasses} ${animationClasses[animation]} overflow-hidden relative`}
            style={{ width: '85%', height: 14 }}
          >
            {renderAnimation()}
          </div>
        </div>
      </div>
    );
  }

  // Image variant
  if (variant === 'image') {
    return (
      <div
        className={`${baseClasses} ${animationClasses[animation]} overflow-hidden relative ${className}`}
        style={{
          width: width || '100%',
          height: height || 200,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        {renderAnimation()}
      </div>
    );
  }

  // Button variant
  if (variant === 'button') {
    return (
      <div
        className={`${baseClasses} ${animationClasses[animation]} overflow-hidden relative ${className}`}
        style={{
          width: width || 120,
          height: height || sizeMap[size].button,
        }}
      >
        {renderAnimation()}
      </div>
    );
  }

  // Custom variant
  return (
    <div
      className={`${baseClasses} ${animationClasses[animation]} overflow-hidden relative ${className}`}
      style={{ width: width || '100%', height: height || 40 }}
    >
      {renderAnimation()}
    </div>
  );
}

// Preset components for convenience
export function SkeletonText({ lines = 3, ...props }: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="text" lines={lines} {...props} />;
}

export function SkeletonAvatar({ size = 'md', ...props }: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="avatar" size={size} rounded="full" {...props} />;
}

export function SkeletonCard(props: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="card" {...props} />;
}

export function SkeletonImage({ ...props }: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton variant="image" {...props} />;
}

// List skeleton for multiple items
export function SkeletonList({
  count = 3,
  gap = 16,
  ...props
}: Omit<SkeletonProps, 'variant'> & { count?: number; gap?: number }) {
  return (
    <div className="space-y-4" style={{ gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <SkeletonAvatar size="md" {...props} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" height={16} {...props} />
            <Skeleton variant="text" width="40%" height={12} {...props} />
          </div>
        </div>
      ))}
    </div>
  );
}
