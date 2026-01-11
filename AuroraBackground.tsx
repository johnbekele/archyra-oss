/**
 * AuroraBackground - Animated Northern Lights Gradient Background
 *
 * A mesmerizing background component that creates a flowing aurora
 * borealis effect with multiple animated gradient layers. Perfect
 * for hero sections, landing pages, and immersive experiences.
 *
 * @example
 * ```tsx
 * import { AuroraBackground } from 'archyra';
 *
 * // Basic usage - wraps content
 * <AuroraBackground>
 *   <div className="relative z-10 text-center">
 *     <h1>Welcome</h1>
 *   </div>
 * </AuroraBackground>
 *
 * // Custom colors
 * <AuroraBackground colors={['#00ff87', '#60efff', '#0061ff']}>
 *   <Content />
 * </AuroraBackground>
 *
 * // As fixed background
 * <AuroraBackground fixed className="min-h-screen" />
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useMemo } from 'react';

export interface AuroraBackgroundProps {
  /** Content to render over the aurora */
  children?: ReactNode;
  /** Aurora gradient colors */
  colors?: string[];
  /** Animation speed multiplier (0.5 = slow, 2 = fast) */
  speed?: number;
  /** Blur intensity for softness */
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  /** Make background fixed position */
  fixed?: boolean;
  /** Show radial gradient overlay */
  showRadialGradient?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const blurMap = {
  sm: 'blur-2xl',
  md: 'blur-3xl',
  lg: 'blur-[80px]',
  xl: 'blur-[120px]',
};

// Reduce blur on mobile for performance
const mobileBlurMap = {
  sm: 'blur-xl',
  md: 'blur-2xl',
  lg: 'blur-3xl',
  xl: 'blur-3xl',
};

export function AuroraBackground({
  children,
  colors = ['#6366f1', '#a855f7', '#ec4899', '#06b6d4'],
  speed = 1,
  blur = 'lg',
  fixed = false,
  showRadialGradient = true,
  className = '',
}: AuroraBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseDuration = 20 / speed;

  // Generate gradient layers
  const gradientLayers = useMemo(() => {
    return colors.map((color, index) => ({
      color,
      delay: index * (baseDuration / colors.length),
      offsetX: (index % 2 === 0 ? 1 : -1) * 30,
      offsetY: (index % 2 === 0 ? -1 : 1) * 20,
    }));
  }, [colors, baseDuration]);

  // Static fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        className={`
          relative overflow-hidden
          ${fixed ? 'fixed inset-0' : ''}
          bg-white dark:bg-zinc-950
          ${className}
        `}
      >
        {/* Static gradient background */}
        <div
          className={`absolute inset-0 ${blurMap[blur]}`}
          style={{
            background: `linear-gradient(135deg, ${colors.map((c, i) => `${c}${Math.round(20 + i * 10).toString(16)}`).join(', ')})`,
          }}
        />
        {/* Radial overlay */}
        {showRadialGradient && (
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
            }}
          />
        )}
        {/* Content */}
        {children && <div className="relative z-10">{children}</div>}
      </div>
    );
  }

  return (
    <div
      className={`
        relative overflow-hidden
        ${fixed ? 'fixed inset-0' : ''}
        bg-white dark:bg-zinc-950
        ${className}
      `}
    >
      {/* Animated aurora layers */}
      <div className="absolute inset-0">
        {gradientLayers.map((layer, index) => (
          <motion.div
            key={index}
            className={`
              absolute inset-[-50%] w-[200%] h-[200%]
              ${blurMap[blur]} sm:${blurMap[blur]} ${mobileBlurMap[blur]}
            `}
            style={{
              background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${layer.color}40, transparent 70%)`,
            }}
            animate={{
              x: [
                `${layer.offsetX}%`,
                `${-layer.offsetX}%`,
                `${layer.offsetX}%`,
              ],
              y: [
                `${layer.offsetY}%`,
                `${-layer.offsetY}%`,
                `${layer.offsetY}%`,
              ],
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: baseDuration,
              delay: layer.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Additional flowing layer */}
        <motion.div
          className={`absolute inset-[-30%] w-[160%] h-[160%] ${blurMap[blur]}`}
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, ${colors.map((c, i) => `${c}30 ${(i / colors.length) * 100}%`).join(', ')})`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: baseDuration * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Radial gradient overlay for depth */}
      {showRadialGradient && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      )}

      {/* Noise texture for grain effect */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

/**
 * Preset color themes for AuroraBackground
 */
export const auroraPresets = {
  /** Classic aurora borealis (green/blue) */
  northern: ['#00ff87', '#60efff', '#0061ff', '#a855f7'],
  /** Sunset/warm tones */
  sunset: ['#ff6b6b', '#feca57', '#ff9ff3', '#ff6b6b'],
  /** Ocean blues */
  ocean: ['#0077b6', '#00b4d8', '#90e0ef', '#0077b6'],
  /** Purple/pink gradient */
  cosmic: ['#6366f1', '#a855f7', '#ec4899', '#06b6d4'],
  /** Dark moody */
  midnight: ['#1e1b4b', '#312e81', '#4f46e5', '#1e1b4b'],
  /** Nature greens */
  forest: ['#064e3b', '#059669', '#34d399', '#064e3b'],
  /** Fire/energy */
  fire: ['#dc2626', '#f97316', '#fbbf24', '#dc2626'],
};

/**
 * AuroraText - Text with aurora gradient effect
 */
export interface AuroraTextProps {
  children: ReactNode;
  colors?: string[];
  className?: string;
}

export function AuroraText({
  children,
  colors = ['#6366f1', '#a855f7', '#ec4899'],
  className = '',
}: AuroraTextProps) {
  const prefersReducedMotion = useReducedMotion();

  const gradient = `linear-gradient(90deg, ${colors.join(', ')}, ${colors[0]})`;

  return (
    <motion.span
      className={`
        inline-block bg-clip-text text-transparent
        ${className}
      `}
      style={{
        backgroundImage: gradient,
        backgroundSize: '200% 100%',
      }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}

export default AuroraBackground;
