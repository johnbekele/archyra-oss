/**
 * SpotlightCard - Card with Mouse-Tracking Spotlight Effect
 *
 * An interactive card component that displays a radial gradient
 * spotlight effect that follows the mouse cursor. Perfect for
 * highlighting content and creating engaging hover interactions.
 *
 * @example
 * ```tsx
 * import { SpotlightCard } from 'archyra';
 *
 * // Basic usage
 * <SpotlightCard>
 *   <h3>Feature Title</h3>
 *   <p>Feature description goes here.</p>
 * </SpotlightCard>
 *
 * // With custom spotlight color
 * <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)">
 *   <div className="p-6">Custom content</div>
 * </SpotlightCard>
 * ```
 */

'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ReactNode, useCallback, useRef } from 'react';

export interface SpotlightCardProps {
  /** Card content */
  children?: ReactNode;
  /** Color of the spotlight effect */
  spotlightColor?: string;
  /** Size of the spotlight gradient in pixels */
  spotlightSize?: number;
  /** Show glowing border on hover */
  borderGlow?: boolean;
  /** Border radius */
  rounded?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  /** Background color */
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

export function SpotlightCard({
  children,
  spotlightColor = 'rgba(99, 102, 241, 0.15)',
  spotlightSize = 350,
  borderGlow = true,
  rounded = '2xl',
  background,
  className = '',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Motion values for smooth spotlight tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add spring physics for smoother movement
  const springConfig = { stiffness: 150, damping: 20 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    // Smoothly move spotlight to center when mouse leaves
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative overflow-hidden
        ${roundedClasses[rounded]}
        ${background || 'bg-white dark:bg-zinc-900'}
        border border-gray-200 dark:border-zinc-800
        transition-shadow duration-300
        ${borderGlow ? 'hover:shadow-lg hover:shadow-violet-500/10 dark:hover:shadow-violet-500/20' : ''}
        ${className}
      `}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Spotlight effect layer */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(${spotlightSize}px circle at var(--spotlight-x) var(--spotlight-y), ${spotlightColor}, transparent 80%)`,
            // @ts-ignore - CSS custom properties
            '--spotlight-x': spotlightX,
            '--spotlight-y': spotlightY,
          }}
        />
      )}

      {/* Border glow effect */}
      {borderGlow && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(${spotlightSize * 0.8}px circle at var(--spotlight-x) var(--spotlight-y), ${spotlightColor.replace('0.15', '0.3')}, transparent 70%)`,
            // @ts-ignore
            '--spotlight-x': spotlightX,
            '--spotlight-y': spotlightY,
            maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/**
 * SpotlightCardHeader - Header section for SpotlightCard
 */
export interface SpotlightCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCardHeader({ children, className = '' }: SpotlightCardHeaderProps) {
  return (
    <div className={`p-6 pb-0 ${className}`}>
      {children}
    </div>
  );
}

/**
 * SpotlightCardContent - Content section for SpotlightCard
 */
export interface SpotlightCardContentProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCardContent({ children, className = '' }: SpotlightCardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

/**
 * SpotlightCardFooter - Footer section for SpotlightCard
 */
export interface SpotlightCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCardFooter({ children, className = '' }: SpotlightCardFooterProps) {
  return (
    <div className={`p-6 pt-0 flex items-center gap-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * SpotlightGrid - Grid layout for multiple SpotlightCards
 */
export interface SpotlightGridProps {
  children: ReactNode;
  /** Number of columns */
  cols?: 1 | 2 | 3 | 4;
  /** Gap between cards */
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export function SpotlightGrid({
  children,
  cols = 3,
  gap = 'md',
  className = '',
}: SpotlightGridProps) {
  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

export default SpotlightCard;
