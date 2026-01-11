/**
 * MeteorShower - Animated Meteor Background Effect
 *
 * Creates a stunning meteor shower animation perfect for hero sections,
 * dark-themed backgrounds, and space-related designs. Meteors streak
 * across the screen with glowing trails.
 *
 * @example
 * ```tsx
 * import { MeteorShower } from 'archyra';
 *
 * <MeteorShower className="absolute inset-0">
 *   <h1>Welcome to Space</h1>
 * </MeteorShower>
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useMemo, ReactNode } from 'react';

export interface MeteorShowerProps {
  /** Content to display over the meteor shower */
  children?: ReactNode;
  /** Number of meteors */
  count?: number;
  /** Meteor color */
  color?: string;
  /** Meteor trail color (gradient end) */
  trailColor?: string;
  /** Minimum animation duration (seconds) */
  minDuration?: number;
  /** Maximum animation duration (seconds) */
  maxDuration?: number;
  /** Meteor angle (degrees, 0 = horizontal right, 90 = vertical down) */
  angle?: number;
  /** Meteor size range [min, max] in pixels */
  sizeRange?: [number, number];
  /** Trail length multiplier */
  trailLength?: number;
  /** Background color */
  backgroundColor?: string;
  /** Show star particles in background */
  showStars?: boolean;
  /** Number of stars */
  starCount?: number;
  /** Additional CSS classes */
  className?: string;
}

interface Meteor {
  id: number;
  size: number;
  duration: number;
  delay: number;
  startX: number;
  startY: number;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDuration: number;
}

/**
 * MeteorShower - Main meteor shower background component
 */
export default function MeteorShower({
  children,
  count = 20,
  color = '#ffffff',
  trailColor = 'transparent',
  minDuration = 2,
  maxDuration = 5,
  angle = 215,
  sizeRange = [1, 3],
  trailLength = 50,
  backgroundColor = 'transparent',
  showStars = true,
  starCount = 50,
  className = '',
}: MeteorShowerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  // Generate meteors
  useEffect(() => {
    const newMeteors: Meteor[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      duration: Math.random() * (maxDuration - minDuration) + minDuration,
      delay: Math.random() * maxDuration,
      startX: Math.random() * 100,
      startY: Math.random() * 50 - 10,
    }));
    setMeteors(newMeteors);
  }, [count, minDuration, maxDuration, sizeRange]);

  // Generate stars
  useEffect(() => {
    if (!showStars) return;
    const newStars: Star[] = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      twinkleDuration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, [showStars, starCount]);

  // Calculate movement vector based on angle
  const angleRad = (angle * Math.PI) / 180;
  const moveX = Math.cos(angleRad) * 150;
  const moveY = Math.sin(angleRad) * 150;

  // If reduced motion, show static stars only
  if (prefersReducedMotion) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ backgroundColor }}
      >
        {showStars && stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: color,
              opacity: star.opacity,
            }}
          />
        ))}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      {/* Stars layer */}
      {showStars && stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: color,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.twinkleDuration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Meteors layer */}
      {meteors.map((meteor) => (
        <motion.div
          key={`meteor-${meteor.id}`}
          className="absolute"
          style={{
            left: `${meteor.startX}%`,
            top: `${meteor.startY}%`,
            width: meteor.size * trailLength,
            height: meteor.size,
            background: `linear-gradient(${angle}deg, ${trailColor}, ${color})`,
            borderRadius: meteor.size / 2,
            boxShadow: `0 0 ${meteor.size * 2}px ${color}, 0 0 ${meteor.size * 4}px ${color}40`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: '100% 50%',
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, moveX + '%'],
            y: [0, moveY + '%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * MeteorShowerDark - Pre-styled dark theme meteor shower
 */
export function MeteorShowerDark({
  children,
  className = '',
  ...props
}: Omit<MeteorShowerProps, 'backgroundColor' | 'color'>) {
  return (
    <MeteorShower
      backgroundColor="#09090b"
      color="#ffffff"
      trailColor="rgba(99, 102, 241, 0.3)"
      className={className}
      {...props}
    >
      {children}
    </MeteorShower>
  );
}

/**
 * MeteorShowerCosmic - Cosmic purple themed meteor shower
 */
export function MeteorShowerCosmic({
  children,
  className = '',
  ...props
}: Omit<MeteorShowerProps, 'backgroundColor' | 'color' | 'trailColor'>) {
  return (
    <MeteorShower
      backgroundColor="#0f0520"
      color="#c4b5fd"
      trailColor="rgba(168, 85, 247, 0.4)"
      className={className}
      {...props}
    >
      {children}
    </MeteorShower>
  );
}

/**
 * MeteorShowerGold - Golden/amber themed meteor shower
 */
export function MeteorShowerGold({
  children,
  className = '',
  ...props
}: Omit<MeteorShowerProps, 'backgroundColor' | 'color' | 'trailColor'>) {
  return (
    <MeteorShower
      backgroundColor="#0c0a09"
      color="#fbbf24"
      trailColor="rgba(251, 191, 36, 0.3)"
      className={className}
      {...props}
    >
      {children}
    </MeteorShower>
  );
}

/**
 * Meteor - Single animated meteor component
 */
export interface SingleMeteorProps {
  /** Meteor color */
  color?: string;
  /** Trail color */
  trailColor?: string;
  /** Size in pixels */
  size?: number;
  /** Animation duration */
  duration?: number;
  /** Delay before starting */
  delay?: number;
  /** Angle in degrees */
  angle?: number;
  /** Trail length multiplier */
  trailLength?: number;
  /** Starting X position (%) */
  startX?: number;
  /** Starting Y position (%) */
  startY?: number;
  /** Additional classes */
  className?: string;
}

export function Meteor({
  color = '#ffffff',
  trailColor = 'transparent',
  size = 2,
  duration = 3,
  delay = 0,
  angle = 215,
  trailLength = 50,
  startX = 50,
  startY = 0,
  className = '',
}: SingleMeteorProps) {
  const prefersReducedMotion = useReducedMotion();
  const angleRad = (angle * Math.PI) / 180;
  const moveX = Math.cos(angleRad) * 150;
  const moveY = Math.sin(angleRad) * 150;

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: size * trailLength,
        height: size,
        background: `linear-gradient(${angle}deg, ${trailColor}, ${color})`,
        borderRadius: size / 2,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}40`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '100% 50%',
      }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [0, `${moveX}%`],
        y: [0, `${moveY}%`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

/**
 * StarField - Static or twinkling star background
 */
export interface StarFieldProps {
  /** Number of stars */
  count?: number;
  /** Star color */
  color?: string;
  /** Enable twinkling animation */
  twinkle?: boolean;
  /** Size range [min, max] */
  sizeRange?: [number, number];
  /** Background color */
  backgroundColor?: string;
  /** Children to render over stars */
  children?: ReactNode;
  /** Additional classes */
  className?: string;
}

export function StarField({
  count = 100,
  color = '#ffffff',
  twinkle = true,
  sizeRange = [0.5, 2],
  backgroundColor = 'transparent',
  children,
  className = '',
}: StarFieldProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldTwinkle = twinkle && !prefersReducedMotion;

  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
      opacity: Math.random() * 0.5 + 0.3,
      twinkleDuration: Math.random() * 3 + 2,
      twinkleDelay: Math.random() * 2,
    })),
    [count, sizeRange]
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      {stars.map((star) =>
        shouldTwinkle ? (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: color,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 0.2, star.opacity],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.twinkleDuration,
              delay: star.twinkleDelay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ) : (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: color,
              opacity: star.opacity,
            }}
          />
        )
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Named export
export { MeteorShower };
