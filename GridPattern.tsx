/**
 * GridPattern - Animated Grid and Dot Pattern Backgrounds
 *
 * Versatile background component that creates dot grids, line grids,
 * or animated gradient masks. Perfect for hero sections, cards, and
 * modern UI designs.
 *
 * @example
 * ```tsx
 * import { GridPattern, DotPattern } from 'archyra';
 *
 * <GridPattern className="absolute inset-0 -z-10">
 *   <YourContent />
 * </GridPattern>
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useId, ReactNode, useMemo, CSSProperties } from 'react';

export interface GridPatternProps {
  /** Grid cell size in pixels */
  cellSize?: number;
  /** Grid line color */
  strokeColor?: string;
  /** Grid line width */
  strokeWidth?: number;
  /** Fade edges with radial gradient */
  fadeEdges?: boolean;
  /** Fade intensity (0-1) */
  fadeIntensity?: number;
  /** Animate grid lines */
  animated?: boolean;
  /** Animation duration (seconds) */
  animationDuration?: number;
  /** Background color */
  backgroundColor?: string;
  /** Children to render over pattern */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
}

/**
 * GridPattern - Line grid background pattern
 */
export default function GridPattern({
  cellSize = 40,
  strokeColor = 'rgba(255, 255, 255, 0.1)',
  strokeWidth = 1,
  fadeEdges = true,
  fadeIntensity = 0.8,
  animated = false,
  animationDuration = 10,
  backgroundColor = 'transparent',
  children,
  className = '',
  style,
}: GridPatternProps) {
  const id = useId();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  const patternId = `grid-pattern-${id}`;
  const maskId = `grid-mask-${id}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor, ...style }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            {shouldAnimate ? (
              <motion.g
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: animationDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <line
                  x1={cellSize}
                  y1="0"
                  x2={cellSize}
                  y2={cellSize}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
                <line
                  x1="0"
                  y1={cellSize}
                  x2={cellSize}
                  y2={cellSize}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
              </motion.g>
            ) : (
              <>
                <line
                  x1={cellSize}
                  y1="0"
                  x2={cellSize}
                  y2={cellSize}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
                <line
                  x1="0"
                  y1={cellSize}
                  x2={cellSize}
                  y2={cellSize}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
              </>
            )}
          </pattern>
          {fadeEdges && (
            <radialGradient id={maskId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset={`${(1 - fadeIntensity) * 100}%`} stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          )}
          {fadeEdges && (
            <mask id={`${maskId}-mask`}>
              <rect width="100%" height="100%" fill={`url(#${maskId})`} />
            </mask>
          )}
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          mask={fadeEdges ? `url(#${maskId}-mask)` : undefined}
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * DotPattern - Dot grid background pattern
 */
export interface DotPatternProps {
  /** Spacing between dots */
  spacing?: number;
  /** Dot radius */
  dotSize?: number;
  /** Dot color */
  dotColor?: string;
  /** Fade edges with radial gradient */
  fadeEdges?: boolean;
  /** Fade intensity (0-1) */
  fadeIntensity?: number;
  /** Animate dots */
  animated?: boolean;
  /** Animation type */
  animationType?: 'pulse' | 'wave' | 'random';
  /** Background color */
  backgroundColor?: string;
  /** Children to render over pattern */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
}

export function DotPattern({
  spacing = 24,
  dotSize = 1.5,
  dotColor = 'rgba(255, 255, 255, 0.3)',
  fadeEdges = true,
  fadeIntensity = 0.7,
  animated = false,
  animationType = 'pulse',
  backgroundColor = 'transparent',
  children,
  className = '',
  style,
}: DotPatternProps) {
  const id = useId();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;

  const patternId = `dot-pattern-${id}`;
  const maskId = `dot-mask-${id}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor, ...style }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            {shouldAnimate ? (
              <motion.circle
                cx={spacing / 2}
                cy={spacing / 2}
                r={dotSize}
                fill={dotColor}
                animate={
                  animationType === 'pulse'
                    ? { r: [dotSize, dotSize * 1.5, dotSize], opacity: [1, 0.5, 1] }
                    : { opacity: [0.3, 1, 0.3] }
                }
                transition={{
                  duration: animationType === 'pulse' ? 2 : 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ) : (
              <circle
                cx={spacing / 2}
                cy={spacing / 2}
                r={dotSize}
                fill={dotColor}
              />
            )}
          </pattern>
          {fadeEdges && (
            <radialGradient id={maskId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset={`${(1 - fadeIntensity) * 100}%`} stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          )}
          {fadeEdges && (
            <mask id={`${maskId}-mask`}>
              <rect width="100%" height="100%" fill={`url(#${maskId})`} />
            </mask>
          )}
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          mask={fadeEdges ? `url(#${maskId}-mask)` : undefined}
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * GridPatternBeams - Grid with animated highlight beams
 */
export interface GridPatternBeamsProps extends Omit<GridPatternProps, 'animated'> {
  /** Number of animated beams */
  beamCount?: number;
  /** Beam color */
  beamColor?: string;
  /** Beam animation duration */
  beamDuration?: number;
}

export function GridPatternBeams({
  cellSize = 40,
  strokeColor = 'rgba(255, 255, 255, 0.05)',
  strokeWidth = 1,
  fadeEdges = true,
  fadeIntensity = 0.8,
  beamCount = 3,
  beamColor = 'rgba(99, 102, 241, 0.5)',
  beamDuration = 3,
  backgroundColor = 'transparent',
  children,
  className = '',
  style,
}: GridPatternBeamsProps) {
  const id = useId();
  const prefersReducedMotion = useReducedMotion();

  const patternId = `grid-beam-pattern-${id}`;
  const maskId = `grid-beam-mask-${id}`;

  const beams = useMemo(() =>
    Array.from({ length: beamCount }, (_, i) => ({
      id: i,
      delay: (i / beamCount) * beamDuration,
      isHorizontal: i % 2 === 0,
    })),
    [beamCount, beamDuration]
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor, ...style }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <line
              x1={cellSize}
              y1="0"
              x2={cellSize}
              y2={cellSize}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <line
              x1="0"
              y1={cellSize}
              x2={cellSize}
              y2={cellSize}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </pattern>
          {fadeEdges && (
            <radialGradient id={maskId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset={`${(1 - fadeIntensity) * 100}%`} stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          )}
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          mask={fadeEdges ? `url(#${maskId}-mask)` : undefined}
        />
      </svg>

      {/* Animated beams */}
      {!prefersReducedMotion && beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute"
          style={{
            background: beam.isHorizontal
              ? `linear-gradient(90deg, transparent, ${beamColor}, transparent)`
              : `linear-gradient(180deg, transparent, ${beamColor}, transparent)`,
            width: beam.isHorizontal ? '100%' : '2px',
            height: beam.isHorizontal ? '2px' : '100%',
          }}
          initial={beam.isHorizontal ? { top: '-2px' } : { left: '-2px' }}
          animate={beam.isHorizontal ? { top: '100%' } : { left: '100%' }}
          transition={{
            duration: beamDuration,
            delay: beam.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * HexagonPattern - Hexagonal grid pattern
 */
export interface HexagonPatternProps {
  /** Hexagon size */
  size?: number;
  /** Stroke color */
  strokeColor?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Fill color (optional) */
  fillColor?: string;
  /** Fade edges */
  fadeEdges?: boolean;
  /** Fade intensity */
  fadeIntensity?: number;
  /** Background color */
  backgroundColor?: string;
  /** Children */
  children?: ReactNode;
  /** Additional classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
}

export function HexagonPattern({
  size = 30,
  strokeColor = 'rgba(255, 255, 255, 0.1)',
  strokeWidth = 1,
  fillColor = 'none',
  fadeEdges = true,
  fadeIntensity = 0.7,
  backgroundColor = 'transparent',
  children,
  className = '',
  style,
}: HexagonPatternProps) {
  const id = useId();

  const patternId = `hex-pattern-${id}`;
  const maskId = `hex-mask-${id}`;

  // Calculate hexagon dimensions
  const w = size * 2;
  const h = size * Math.sqrt(3);

  // Hexagon points
  const points = [
    [size * 0.5, 0],
    [size * 1.5, 0],
    [w, h * 0.5],
    [size * 1.5, h],
    [size * 0.5, h],
    [0, h * 0.5],
  ].map(([x, y]) => `${x},${y}`).join(' ');

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor, ...style }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={size * 3}
            height={h * 2}
            patternUnits="userSpaceOnUse"
          >
            <polygon
              points={points}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <polygon
              points={points}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              transform={`translate(${size * 1.5}, ${h})`}
            />
          </pattern>
          {fadeEdges && (
            <radialGradient id={maskId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset={`${(1 - fadeIntensity) * 100}%`} stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
          )}
          {fadeEdges && (
            <mask id={`${maskId}-mask`}>
              <rect width="100%" height="100%" fill={`url(#${maskId})`} />
            </mask>
          )}
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          mask={fadeEdges ? `url(#${maskId}-mask)` : undefined}
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * DiagonalLines - Diagonal stripe pattern
 */
export interface DiagonalLinesProps {
  /** Line spacing */
  spacing?: number;
  /** Line width */
  lineWidth?: number;
  /** Line color */
  lineColor?: string;
  /** Angle in degrees (45 or -45) */
  angle?: 45 | -45;
  /** Fade edges */
  fadeEdges?: boolean;
  /** Background color */
  backgroundColor?: string;
  /** Children */
  children?: ReactNode;
  /** Additional classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
}

export function DiagonalLines({
  spacing = 20,
  lineWidth = 1,
  lineColor = 'rgba(255, 255, 255, 0.1)',
  angle = 45,
  fadeEdges = true,
  backgroundColor = 'transparent',
  children,
  className = '',
  style,
}: DiagonalLinesProps) {
  const id = useId();
  const patternId = `diagonal-${id}`;
  const maskId = `diagonal-mask-${id}`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor, ...style }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
            patternTransform={`rotate(${angle})`}
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={spacing}
              stroke={lineColor}
              strokeWidth={lineWidth}
            />
          </pattern>
          {fadeEdges && (
            <>
              <radialGradient id={maskId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" />
                <stop offset="60%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </radialGradient>
              <mask id={`${maskId}-mask`}>
                <rect width="100%" height="100%" fill={`url(#${maskId})`} />
              </mask>
            </>
          )}
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          mask={fadeEdges ? `url(#${maskId}-mask)` : undefined}
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Named export
export { GridPattern };
