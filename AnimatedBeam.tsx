/**
 * AnimatedBeam - SVG Beam Connecting Two Elements
 *
 * A dynamic SVG component that draws an animated beam/connection
 * line between two DOM elements. Perfect for showing data flow,
 * relationships, integrations, or any visual connection between
 * components.
 *
 * @example
 * ```tsx
 * import { AnimatedBeam, AnimatedBeamContainer } from 'archyra';
 *
 * function IntegrationDemo() {
 *   const containerRef = useRef(null);
 *   const fromRef = useRef(null);
 *   const toRef = useRef(null);
 *
 *   return (
 *     <AnimatedBeamContainer ref={containerRef}>
 *       <div ref={fromRef}>Source</div>
 *       <div ref={toRef}>Destination</div>
 *       <AnimatedBeam
 *         containerRef={containerRef}
 *         fromRef={fromRef}
 *         toRef={toRef}
 *       />
 *     </AnimatedBeamContainer>
 *   );
 * }
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { RefObject, useEffect, useState, useId, forwardRef, ReactNode } from 'react';

export interface AnimatedBeamProps {
  /** Reference to the container element */
  containerRef: RefObject<HTMLElement>;
  /** Reference to the starting element */
  fromRef: RefObject<HTMLElement>;
  /** Reference to the ending element */
  toRef: RefObject<HTMLElement>;
  /** Gradient colors for the beam [start, end] */
  gradientColors?: [string, string];
  /** Animation duration in seconds */
  duration?: number;
  /** Curve intensity (0 = straight, higher = more curved) */
  curvature?: number;
  /** Beam stroke width */
  pathWidth?: number;
  /** Show particle/dot moving along beam */
  showParticle?: boolean;
  /** Particle size */
  particleSize?: number;
  /** Reverse the animation direction */
  reverse?: boolean;
  /** Delay before animation starts */
  delay?: number;
  /** Additional CSS classes for the SVG */
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  gradientColors = ['#6366f1', '#a855f7'],
  duration = 2,
  curvature = 50,
  pathWidth = 2,
  showParticle = true,
  particleSize = 6,
  reverse = false,
  delay = 0,
  className = '',
}: AnimatedBeamProps) {
  const id = useId();
  const prefersReducedMotion = useReducedMotion();
  const [path, setPath] = useState<string>('');
  const [pathLength, setPathLength] = useState<number>(0);
  const [fromPos, setFromPos] = useState<Position>({ x: 0, y: 0 });
  const [toPos, setToPos] = useState<Position>({ x: 0, y: 0 });

  // Calculate positions and path
  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      // Calculate center points relative to container
      const from: Position = {
        x: fromRect.left - containerRect.left + fromRect.width / 2,
        y: fromRect.top - containerRect.top + fromRect.height / 2,
      };

      const to: Position = {
        x: toRect.left - containerRect.left + toRect.width / 2,
        y: toRect.top - containerRect.top + toRect.height / 2,
      };

      setFromPos(from);
      setToPos(to);

      // Calculate bezier curve control points
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;

      // Determine curve direction based on relative positions
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Perpendicular offset for curve
      const perpX = -dy / distance;
      const perpY = dx / distance;

      const controlX = midX + perpX * curvature;
      const controlY = midY + perpY * curvature;

      // Create quadratic bezier path
      const pathD = `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
      setPath(pathD);

      // Estimate path length for stroke animation
      setPathLength(distance * 1.2);
    };

    calculatePath();

    // Recalculate on resize
    const observer = new ResizeObserver(calculatePath);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', calculatePath);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculatePath);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  // Static fallback for reduced motion
  if (prefersReducedMotion || !path) {
    return (
      <svg
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientColors[0]} />
            <stop offset="100%" stopColor={gradientColors[1]} />
          </linearGradient>
        </defs>
        <path
          d={path}
          stroke={`url(#gradient-${id})`}
          strokeWidth={pathWidth}
          fill="none"
          strokeLinecap="round"
          opacity={0.5}
        />
      </svg>
    );
  }

  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Gradient for beam */}
        <linearGradient
          id={`gradient-${id}`}
          x1={reverse ? '100%' : '0%'}
          y1="0%"
          x2={reverse ? '0%' : '100%'}
          y2="0%"
        >
          <stop offset="0%" stopColor={gradientColors[0]} />
          <stop offset="100%" stopColor={gradientColors[1]} />
        </linearGradient>

        {/* Glow filter */}
        <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background path (static) */}
      <path
        d={path}
        stroke={gradientColors[0]}
        strokeWidth={pathWidth}
        fill="none"
        strokeLinecap="round"
        opacity={0.2}
      />

      {/* Animated beam */}
      <motion.path
        d={path}
        stroke={`url(#gradient-${id})`}
        strokeWidth={pathWidth}
        fill="none"
        strokeLinecap="round"
        filter={`url(#glow-${id})`}
        initial={{
          strokeDasharray: pathLength,
          strokeDashoffset: reverse ? -pathLength : pathLength,
        }}
        animate={{
          strokeDashoffset: [
            reverse ? -pathLength : pathLength,
            0,
            reverse ? pathLength : -pathLength,
          ],
        }}
        transition={{
          duration: duration * 2,
          delay,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Moving particle */}
      {showParticle && (
        <motion.circle
          r={particleSize / 2}
          fill={gradientColors[1]}
          filter={`url(#glow-${id})`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            offsetDistance: reverse ? ['100%', '0%'] : ['0%', '100%'],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            offsetPath: `path("${path}")`,
          }}
        />
      )}
    </svg>
  );
}

/**
 * AnimatedBeamContainer - Container wrapper for AnimatedBeam
 */
export interface AnimatedBeamContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedBeamContainer = forwardRef<HTMLDivElement, AnimatedBeamContainerProps>(
  ({ children, className = '', style }, ref) => {
    return (
      <div ref={ref} className={`relative ${className}`} style={style}>
        {children}
      </div>
    );
  }
);

AnimatedBeamContainer.displayName = 'AnimatedBeamContainer';

/**
 * AnimatedBeamNode - Styled node for beam endpoints
 */
export interface AnimatedBeamNodeProps {
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

const nodeSizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
};

const nodeVariantClasses = {
  default: 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800',
  primary: 'bg-violet-50 dark:bg-violet-950 border-violet-200 dark:border-violet-800',
  secondary: 'bg-gray-50 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700',
};

export const AnimatedBeamNode = forwardRef<HTMLDivElement, AnimatedBeamNodeProps>(
  ({ children, size = 'md', variant = 'default', className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          flex items-center justify-center
          rounded-xl border-2 shadow-sm
          ${nodeSizeClasses[size]}
          ${nodeVariantClasses[variant]}
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
);

AnimatedBeamNode.displayName = 'AnimatedBeamNode';

/**
 * MultiBeamDemo - Pre-built demo showing multiple beam connections
 */
export interface MultiBeamDemoProps {
  className?: string;
}

export function MultiBeamDemo({ className = '' }: MultiBeamDemoProps) {
  const [refs, setRefs] = useState<{
    container: HTMLDivElement | null;
    center: HTMLDivElement | null;
    nodes: (HTMLDivElement | null)[];
  }>({
    container: null,
    center: null,
    nodes: [],
  });

  return (
    <div
      ref={(el) => setRefs((prev) => ({ ...prev, container: el }))}
      className={`relative p-8 ${className}`}
    >
      {/* Center node */}
      <div className="flex justify-center mb-8">
        <AnimatedBeamNode
          ref={(el) => setRefs((prev) => ({ ...prev, center: el }))}
          size="lg"
          variant="primary"
        >
          <svg className="w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </AnimatedBeamNode>
      </div>

      {/* Surrounding nodes */}
      <div className="flex justify-around">
        {[0, 1, 2].map((i) => (
          <AnimatedBeamNode
            key={i}
            ref={(el) =>
              setRefs((prev) => {
                const newNodes = [...prev.nodes];
                newNodes[i] = el;
                return { ...prev, nodes: newNodes };
              })
            }
            variant="secondary"
          >
            <span className="text-gray-500 font-medium">{i + 1}</span>
          </AnimatedBeamNode>
        ))}
      </div>

      {/* Beams */}
      {refs.container &&
        refs.center &&
        refs.nodes.map(
          (node, i) =>
            node && (
              <AnimatedBeam
                key={i}
                containerRef={{ current: refs.container }}
                fromRef={{ current: refs.center }}
                toRef={{ current: node }}
                delay={i * 0.3}
                curvature={30}
              />
            )
        )}
    </div>
  );
}

export default AnimatedBeam;
