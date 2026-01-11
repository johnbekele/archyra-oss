/**
 * TextReveal - Scroll-based Text Reveal Animation
 *
 * Reveals text progressively as the user scrolls. Creates stunning
 * hero sections and storytelling experiences. Each word or character
 * fades in based on scroll position.
 *
 * @example
 * ```tsx
 * import { TextReveal } from 'archyra';
 *
 * <TextReveal
 *   text="Build beautiful interfaces with animated components"
 *   revealBy="word"
 * />
 * ```
 */

'use client';

import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion';
import { useRef, ReactNode } from 'react';

export interface TextRevealProps {
  /** Text to reveal */
  text: string;
  /** Reveal text by word or character */
  revealBy?: 'word' | 'character';
  /** Container height multiplier for scroll distance */
  scrollHeight?: number;
  /** Starting opacity for unrevealed text */
  startOpacity?: number;
  /** Blur amount for unrevealed text (px) */
  blurAmount?: number;
  /** Stagger reveal (percentage overlap between items) */
  stagger?: number;
  /** Text element to render */
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  /** Additional CSS classes for text */
  className?: string;
  /** Container className */
  containerClassName?: string;
}

/**
 * TextReveal - Main scroll-based text reveal component
 */
export default function TextReveal({
  text,
  revealBy = 'word',
  scrollHeight = 3,
  startOpacity = 0.15,
  blurAmount = 4,
  stagger = 0.3,
  as: Component = 'p',
  className = '',
  containerClassName = '',
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Split text into units (words or characters)
  const units = revealBy === 'word'
    ? text.split(' ')
    : text.split('');

  // If reduced motion, show text statically
  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={containerClassName}>
        <Component className={className}>{text}</Component>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${containerClassName}`}
      style={{ height: `${scrollHeight * 100}vh` }}
    >
      <div className="sticky top-0 flex items-center justify-center h-screen">
        <Component className={`flex flex-wrap justify-center ${className}`}>
          {units.map((unit, i) => {
            // Calculate reveal range for each unit
            const start = (i / units.length) * (1 - stagger);
            const end = start + stagger;

            return (
              <TextRevealUnit
                key={i}
                unit={unit}
                progress={scrollYProgress}
                start={start}
                end={end}
                startOpacity={startOpacity}
                blurAmount={blurAmount}
                isWord={revealBy === 'word'}
              />
            );
          })}
        </Component>
      </div>
    </div>
  );
}

/**
 * TextRevealUnit - Individual word or character with reveal animation
 */
interface TextRevealUnitProps {
  unit: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  startOpacity: number;
  blurAmount: number;
  isWord: boolean;
}

function TextRevealUnit({
  unit,
  progress,
  start,
  end,
  startOpacity,
  blurAmount,
  isWord,
}: TextRevealUnitProps) {
  const opacity = useTransform(progress, [start, end], [startOpacity, 1]);
  const blur = useTransform(progress, [start, end], [blurAmount, 0]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.span
      style={{
        opacity,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        y,
      }}
      className={isWord ? 'mr-[0.25em]' : ''}
    >
      {unit}
      {!isWord && unit === ' ' && <span>&nbsp;</span>}
    </motion.span>
  );
}

/**
 * TextRevealGradient - Text reveal with gradient highlight
 */
export interface TextRevealGradientProps extends Omit<TextRevealProps, 'startOpacity'> {
  /** Gradient colors for revealed text */
  gradientColors?: string[];
  /** Color for unrevealed text */
  baseColor?: string;
}

export function TextRevealGradient({
  text,
  revealBy = 'word',
  scrollHeight = 3,
  blurAmount = 0,
  stagger = 0.3,
  gradientColors = ['#6366f1', '#a855f7', '#ec4899'],
  baseColor = 'rgba(255,255,255,0.2)',
  as: Component = 'p',
  className = '',
  containerClassName = '',
}: TextRevealGradientProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const units = revealBy === 'word' ? text.split(' ') : text.split('');

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={containerClassName}>
        <Component
          className={className}
          style={{
            backgroundImage: `linear-gradient(to right, ${gradientColors.join(', ')})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {text}
        </Component>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${containerClassName}`}
      style={{ height: `${scrollHeight * 100}vh` }}
    >
      <div className="sticky top-0 flex items-center justify-center h-screen">
        <Component className={`flex flex-wrap justify-center ${className}`}>
          {units.map((unit, i) => {
            const start = (i / units.length) * (1 - stagger);
            const end = start + stagger;
            const gradientPosition = (i / units.length) * 100;

            return (
              <TextRevealGradientUnit
                key={i}
                unit={unit}
                progress={scrollYProgress}
                start={start}
                end={end}
                gradientColors={gradientColors}
                gradientPosition={gradientPosition}
                baseColor={baseColor}
                blurAmount={blurAmount}
                isWord={revealBy === 'word'}
              />
            );
          })}
        </Component>
      </div>
    </div>
  );
}

interface TextRevealGradientUnitProps {
  unit: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  gradientColors: string[];
  gradientPosition: number;
  baseColor: string;
  blurAmount: number;
  isWord: boolean;
}

function TextRevealGradientUnit({
  unit,
  progress,
  start,
  end,
  gradientColors,
  gradientPosition,
  baseColor,
  blurAmount,
  isWord,
}: TextRevealGradientUnitProps) {
  const revealProgress = useTransform(progress, [start, end], [0, 1]);

  // Interpolate between base color and gradient
  const colorProgress = useTransform(revealProgress, [0, 1], [0, 1]);

  return (
    <motion.span
      style={{
        color: baseColor,
        backgroundImage: `linear-gradient(to right, ${gradientColors.join(', ')})`,
        backgroundSize: '200% 100%',
        backgroundPosition: `${gradientPosition}% 0`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: useTransform(colorProgress, (v) =>
          v > 0.5 ? 'transparent' : baseColor
        ),
        filter: useTransform(revealProgress, (v) => `blur(${blurAmount * (1 - v)}px)`),
      }}
      className={isWord ? 'mr-[0.25em]' : ''}
    >
      {unit}
    </motion.span>
  );
}

/**
 * TextRevealHighlight - Text with highlight bar reveal
 */
export interface TextRevealHighlightProps {
  /** Text to reveal */
  text: string;
  /** Highlight color */
  highlightColor?: string;
  /** Text color when highlighted */
  highlightTextColor?: string;
  /** Base text color */
  baseTextColor?: string;
  /** Scroll height multiplier */
  scrollHeight?: number;
  /** Text element */
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  /** Text className */
  className?: string;
  /** Container className */
  containerClassName?: string;
}

export function TextRevealHighlight({
  text,
  highlightColor = '#fbbf24',
  highlightTextColor = '#09090b',
  baseTextColor = 'currentColor',
  scrollHeight = 2,
  as: Component = 'p',
  className = '',
  containerClassName = '',
}: TextRevealHighlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const highlightWidth = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={containerClassName}>
        <Component className={className} style={{ backgroundColor: highlightColor, color: highlightTextColor }}>
          {text}
        </Component>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${containerClassName}`}
      style={{ height: `${scrollHeight * 100}vh` }}
    >
      <div className="sticky top-0 flex items-center justify-center h-screen">
        <Component className={`relative inline-block ${className}`}>
          {/* Base text */}
          <span style={{ color: baseTextColor }}>{text}</span>
          {/* Highlight overlay */}
          <motion.span
            className="absolute inset-0 overflow-hidden"
            style={{ width: highlightWidth }}
          >
            <span
              className="whitespace-nowrap"
              style={{
                backgroundColor: highlightColor,
                color: highlightTextColor,
                padding: '0.1em 0',
                boxDecorationBreak: 'clone',
              }}
            >
              {text}
            </span>
          </motion.span>
        </Component>
      </div>
    </div>
  );
}

/**
 * TextRevealLine - Line-by-line text reveal
 */
export interface TextRevealLineProps {
  /** Array of lines to reveal */
  lines: string[];
  /** Scroll height per line */
  scrollHeightPerLine?: number;
  /** Starting opacity */
  startOpacity?: number;
  /** Line element */
  lineAs?: 'p' | 'span' | 'div';
  /** Line className */
  lineClassName?: string;
  /** Container className */
  className?: string;
}

export function TextRevealLine({
  lines,
  scrollHeightPerLine = 0.5,
  startOpacity = 0.1,
  lineAs: LineComponent = 'p',
  lineClassName = '',
  className = '',
}: TextRevealLineProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={className}>
        {lines.map((line, i) => (
          <LineComponent key={i} className={lineClassName}>{line}</LineComponent>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${lines.length * scrollHeightPerLine * 100 + 100}vh` }}
    >
      <div className="sticky top-0 flex flex-col items-center justify-center h-screen gap-2">
        {lines.map((line, i) => {
          const start = (i / lines.length) * 0.6;
          const end = start + 0.2;

          return (
            <TextRevealLineUnit
              key={i}
              line={line}
              progress={scrollYProgress}
              start={start}
              end={end}
              startOpacity={startOpacity}
              Component={LineComponent}
              className={lineClassName}
            />
          );
        })}
      </div>
    </div>
  );
}

interface TextRevealLineUnitProps {
  line: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  startOpacity: number;
  Component: 'p' | 'span' | 'div';
  className: string;
}

function TextRevealLineUnit({
  line,
  progress,
  start,
  end,
  startOpacity,
  Component,
  className,
}: TextRevealLineUnitProps) {
  const opacity = useTransform(progress, [start, end], [startOpacity, 1]);
  const y = useTransform(progress, [start, end], [20, 0]);
  const scale = useTransform(progress, [start, end], [0.95, 1]);

  return (
    <motion.div style={{ opacity, y, scale }}>
      <Component className={className}>{line}</Component>
    </motion.div>
  );
}

// Named export
export { TextReveal };
