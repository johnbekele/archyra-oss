/**
 * InfiniteCarousel - Infinite Horizontal Scroll Carousel
 *
 * A seamlessly looping carousel component that continuously scrolls
 * content horizontally. Perfect for testimonials, logos, feature
 * showcases, and any content that benefits from continuous display.
 *
 * @example
 * ```tsx
 * import { InfiniteCarousel } from 'archyra';
 *
 * // Basic usage with items
 * <InfiniteCarousel
 *   items={[
 *     { id: 1, content: <Logo1 /> },
 *     { id: 2, content: <Logo2 /> },
 *     { id: 3, content: <Logo3 /> },
 *   ]}
 * />
 *
 * // With custom speed and pause on hover
 * <InfiniteCarousel
 *   items={testimonials}
 *   speed="slow"
 *   pauseOnHover
 *   direction="right"
 * />
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useMemo, useState, useCallback } from 'react';

export interface CarouselItem {
  /** Unique identifier for the item */
  id: string | number;
  /** Content to render */
  content: ReactNode;
}

export interface InfiniteCarouselProps {
  /** Array of items to display */
  items: CarouselItem[];
  /** Scroll direction */
  direction?: 'left' | 'right';
  /** Animation speed */
  speed?: 'slow' | 'normal' | 'fast';
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Gap between items in pixels */
  gap?: number;
  /** Show gradient fade on edges */
  showFade?: boolean;
  /** Fade width in pixels */
  fadeWidth?: number;
  /** Additional CSS classes */
  className?: string;
}

const speedMap = {
  slow: 60,
  normal: 40,
  fast: 20,
};

export function InfiniteCarousel({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  gap = 24,
  showFade = true,
  fadeWidth = 100,
  className = '',
}: InfiniteCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  // Duplicate items for seamless loop
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  const duration = speedMap[speed];
  const translateDirection = direction === 'left' ? '-50%' : '0%';
  const initialTranslate = direction === 'left' ? '0%' : '-50%';

  // Static fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="flex" style={{ gap }}>
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0">
              {item.content}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Scrolling content */}
      <motion.div
        className="flex"
        style={{ gap }}
        animate={{
          x: [initialTranslate, translateDirection],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          },
        }}
        // @ts-ignore - Framer motion style prop
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex-shrink-0">
            {item.content}
          </div>
        ))}
      </motion.div>

      {/* Fade overlays */}
      {showFade && (
        <>
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 pointer-events-none z-10"
            style={{
              width: fadeWidth,
              background: 'linear-gradient(to right, var(--fade-color, white) 0%, transparent 100%)',
            }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 pointer-events-none z-10"
            style={{
              width: fadeWidth,
              background: 'linear-gradient(to left, var(--fade-color, white) 0%, transparent 100%)',
            }}
          />
        </>
      )}

      {/* CSS variable for dark mode fade color */}
      <style jsx>{`
        div {
          --fade-color: white;
        }
        :global(.dark) div {
          --fade-color: #09090b;
        }
      `}</style>
    </div>
  );
}

/**
 * InfiniteCarouselCard - Pre-styled card for use in carousel
 */
export interface InfiniteCarouselCardProps {
  children: ReactNode;
  width?: number | string;
  className?: string;
}

export function InfiniteCarouselCard({
  children,
  width = 300,
  className = '',
}: InfiniteCarouselCardProps) {
  return (
    <div
      className={`
        flex-shrink-0
        bg-white dark:bg-zinc-900
        border border-gray-200 dark:border-zinc-800
        rounded-xl p-6
        shadow-sm hover:shadow-md
        transition-shadow duration-300
        ${className}
      `}
      style={{ width }}
    >
      {children}
    </div>
  );
}

/**
 * InfiniteLogoCarousel - Specialized carousel for logo displays
 */
export interface LogoItem {
  id: string | number;
  src: string;
  alt: string;
  href?: string;
}

export interface InfiniteLogoCarouselProps {
  logos: LogoItem[];
  height?: number;
  grayscale?: boolean;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export function InfiniteLogoCarousel({
  logos,
  height = 40,
  grayscale = true,
  direction = 'left',
  speed = 'normal',
  className = '',
}: InfiniteLogoCarouselProps) {
  const items: CarouselItem[] = useMemo(
    () =>
      logos.map((logo) => ({
        id: logo.id,
        content: (
          <a
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              block transition-all duration-300
              ${grayscale ? 'grayscale hover:grayscale-0 opacity-60 hover:opacity-100' : ''}
            `}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="object-contain"
              style={{ height }}
            />
          </a>
        ),
      })),
    [logos, height, grayscale]
  );

  return (
    <InfiniteCarousel
      items={items}
      direction={direction}
      speed={speed}
      gap={48}
      className={className}
    />
  );
}

/**
 * TestimonialCarousel - Specialized carousel for testimonials
 */
export interface Testimonial {
  id: string | number;
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  cardWidth?: number;
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  direction = 'left',
  speed = 'slow',
  cardWidth = 350,
  className = '',
}: TestimonialCarouselProps) {
  const items: CarouselItem[] = useMemo(
    () =>
      testimonials.map((t) => ({
        id: t.id,
        content: (
          <InfiniteCarouselCard width={cardWidth}>
            {/* Rating stars */}
            {t.rating && (
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < t.rating! ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
            {/* Quote */}
            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
              "{t.quote}"
            </p>
            {/* Author */}
            <div className="flex items-center gap-3">
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
                  <span className="text-violet-600 dark:text-violet-300 font-medium">
                    {t.author.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {t.author}
                </p>
                {t.role && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {t.role}
                  </p>
                )}
              </div>
            </div>
          </InfiniteCarouselCard>
        ),
      })),
    [testimonials, cardWidth]
  );

  return (
    <InfiniteCarousel
      items={items}
      direction={direction}
      speed={speed}
      pauseOnHover
      className={className}
    />
  );
}

export default InfiniteCarousel;
