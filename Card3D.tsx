/**
 * Card3D - Interactive 3D Perspective Tilt Card
 *
 * A card component with 3D perspective tilt effect that follows
 * the mouse cursor position. Includes optional glare effect and
 * support for parallax child elements.
 *
 * @example
 * ```tsx
 * import { Card3D, Card3DContent } from 'archyra';
 *
 * // Basic usage
 * <Card3D>
 *   <Card3DContent>
 *     <h3>3D Card</h3>
 *     <p>Hover to see the tilt effect!</p>
 *   </Card3DContent>
 * </Card3D>
 *
 * // With glare effect
 * <Card3D glareEnabled glareColor="rgba(255,255,255,0.4)">
 *   <Card3DContent>Premium Content</Card3DContent>
 * </Card3D>
 *
 * // Parallax elements (use data-parallax attribute)
 * <Card3D>
 *   <img data-parallax="0.1" src="..." />
 *   <h3 data-parallax="0.2">Floating Text</h3>
 * </Card3D>
 * ```
 */

'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ReactNode, useCallback, useRef, useState } from 'react';

export interface Card3DProps {
  /** Card content */
  children?: ReactNode;
  /** Maximum tilt angle in degrees */
  tiltIntensity?: number;
  /** Enable glare effect */
  glareEnabled?: boolean;
  /** Color of the glare effect */
  glareColor?: string;
  /** Maximum glare opacity */
  glareOpacity?: number;
  /** Scale factor on hover */
  scale?: number;
  /** Perspective distance */
  perspective?: number;
  /** Border radius */
  rounded?: 'md' | 'lg' | 'xl' | '2xl' | '3xl';
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

export function Card3D({
  children,
  tiltIntensity = 10,
  glareEnabled = false,
  glareColor = 'rgba(255, 255, 255, 0.4)',
  glareOpacity = 0.3,
  scale = 1.02,
  perspective = 1000,
  rounded = '2xl',
  className = '',
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Motion values for mouse position (0 to 1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring physics for smooth movement
  const springConfig = { stiffness: 300, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform mouse position to rotation values
  const rotateX = useTransform(smoothY, [0, 1], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(smoothX, [0, 1], [-tiltIntensity, tiltIntensity]);

  // Glare position
  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Reset to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  // Don't apply 3D effects if reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <div
        className={`
          bg-white dark:bg-zinc-900
          border border-gray-200 dark:border-zinc-800
          shadow-lg
          ${roundedClasses[rounded]}
          ${className}
        `}
      >
        {children}
      </div>
    );
  }

  return (
    <div style={{ perspective }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          relative overflow-hidden
          bg-white dark:bg-zinc-900
          border border-gray-200 dark:border-zinc-800
          shadow-lg hover:shadow-2xl
          transition-shadow duration-300
          ${roundedClasses[rounded]}
          ${className}
        `}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? scale : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 25 },
        }}
      >
        {/* Card content with 3D transform */}
        <div style={{ transformStyle: 'preserve-3d' }}>{children}</div>

        {/* Glare effect */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at var(--glare-x) var(--glare-y), ${glareColor}, transparent 60%)`,
              opacity: isHovered ? glareOpacity : 0,
              // @ts-ignore
              '--glare-x': glareX,
              '--glare-y': glareY,
            }}
            transition={{ opacity: { duration: 0.3 } }}
          />
        )}

        {/* Subtle shine on edges */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ opacity: { duration: 0.3 } }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Card3DContent - Content wrapper with proper padding
 */
export interface Card3DContentProps {
  children: ReactNode;
  className?: string;
}

export function Card3DContent({ children, className = '' }: Card3DContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

/**
 * Card3DImage - Image with parallax effect
 */
export interface Card3DImageProps {
  src: string;
  alt: string;
  /** Parallax depth (0-1, higher = more movement) */
  parallaxDepth?: number;
  className?: string;
}

export function Card3DImage({
  src,
  alt,
  parallaxDepth = 0.1,
  className = '',
}: Card3DImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`w-full object-cover ${className}`}
      style={{
        transform: `translateZ(${parallaxDepth * 50}px)`,
      }}
    />
  );
}

/**
 * Card3DFloatingElement - Element that floats above the card
 */
export interface Card3DFloatingElementProps {
  children: ReactNode;
  /** How much the element floats (in px) */
  depth?: number;
  className?: string;
}

export function Card3DFloatingElement({
  children,
  depth = 30,
  className = '',
}: Card3DFloatingElementProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Card3DGrid - Grid layout for multiple 3D cards
 */
export interface Card3DGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
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

export function Card3DGrid({
  children,
  cols = 3,
  gap = 'md',
  className = '',
}: Card3DGridProps) {
  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

export default Card3D;
