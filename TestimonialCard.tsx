/**
 * TestimonialCard - Animated Testimonial Components
 *
 * Beautiful testimonial cards, carousels, and grids for displaying
 * customer reviews and social proof.
 *
 * @example
 * ```tsx
 * import { TestimonialCard, TestimonialCarousel, TestimonialGrid } from 'archyra';
 *
 * <TestimonialCard
 *   quote="This product changed our business"
 *   author={{ name: 'Jane Doe', role: 'CEO', company: 'Acme Inc', avatar: '/jane.jpg' }}
 *   rating={5}
 * />
 * ```
 */

'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Twitter, Linkedin } from 'lucide-react';

// Types
export interface TestimonialAuthor {
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  socialLink?: string;
  socialType?: 'twitter' | 'linkedin';
}

export interface Testimonial {
  id: string | number;
  quote: string;
  author: TestimonialAuthor;
  rating?: number;
  date?: string;
  featured?: boolean;
}

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================

export interface TestimonialCardProps {
  /** Testimonial quote */
  quote: string;
  /** Author information */
  author: TestimonialAuthor;
  /** Star rating (1-5) */
  rating?: number;
  /** Card variant */
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  /** Show quote icon */
  showQuoteIcon?: boolean;
  /** Additional className */
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  rating,
  variant = 'default',
  showQuoteIcon = true,
  className = '',
}: TestimonialCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const variantClasses = {
    default: 'bg-card border border-border',
    bordered: 'bg-transparent border-2 border-primary/20',
    elevated: 'bg-card shadow-xl shadow-black/5 dark:shadow-black/20',
    gradient: 'bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10',
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      className={`
        relative p-6 rounded-2xl transition-shadow duration-300
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {/* Quote Icon */}
      {showQuoteIcon && (
        <Quote className="w-8 h-8 text-primary/20 mb-4" />
      )}

      {/* Rating */}
      {rating !== undefined && (
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= rating
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-foreground mb-6">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            {author.name.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <div className="font-semibold">{author.name}</div>
          {(author.role || author.company) && (
            <div className="text-sm text-muted-foreground">
              {author.role}
              {author.role && author.company && ' at '}
              {author.company}
            </div>
          )}
        </div>
        {author.socialLink && (
          <a
            href={author.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {author.socialType === 'linkedin' ? (
              <Linkedin className="w-5 h-5" />
            ) : (
              <Twitter className="w-5 h-5" />
            )}
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// TESTIMONIAL CAROUSEL
// ============================================================================

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
}: TestimonialCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, testimonials.length, prefersReducedMotion]);

  const goTo = (index: number) => setCurrent(index);
  const goNext = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const currentTestimonial = testimonials[current];

  return (
    <div className={`relative max-w-3xl mx-auto ${className}`}>
      {/* Main Content */}
      <div className="relative overflow-hidden py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center px-8 md:px-16"
          >
            {/* Quote Icon */}
            <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />

            {/* Rating */}
            {currentTestimonial.rating !== undefined && (
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= currentTestimonial.rating!
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-3">
              {currentTestimonial.author.avatar ? (
                <img
                  src={currentTestimonial.author.avatar}
                  alt={currentTestimonial.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                  {currentTestimonial.author.name.charAt(0)}
                </div>
              )}
              <div>
                <div className="font-semibold text-lg">{currentTestimonial.author.name}</div>
                {(currentTestimonial.author.role || currentTestimonial.author.company) && (
                  <div className="text-muted-foreground">
                    {currentTestimonial.author.role}
                    {currentTestimonial.author.role && currentTestimonial.author.company && ' at '}
                    {currentTestimonial.author.company}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card border border-border hover:bg-muted transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === current
                  ? 'w-8 bg-primary'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }
              `}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TESTIMONIAL GRID
// ============================================================================

export interface TestimonialGridProps {
  testimonials: Testimonial[];
  columns?: 1 | 2 | 3;
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  staggerDelay?: number;
  className?: string;
}

export function TestimonialGrid({
  testimonials,
  columns = 3,
  variant = 'default',
  staggerDelay = 0.1,
  className = '',
}: TestimonialGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid ${columnClasses[columns]} gap-6 ${className}`}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * staggerDelay }}
        >
          <TestimonialCard
            quote={testimonial.quote}
            author={testimonial.author}
            rating={testimonial.rating}
            variant={variant}
            className="h-full"
          />
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// TESTIMONIAL MARQUEE (INFINITE SCROLL)
// ============================================================================

export interface TestimonialMarqueeProps {
  testimonials: Testimonial[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
}

export function TestimonialMarquee({
  testimonials,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className = '',
}: TestimonialMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  const speedMap = {
    slow: 60,
    normal: 40,
    fast: 20,
  };

  // Double items for seamless loop
  const items = [...testimonials, ...testimonials];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        animate={prefersReducedMotion ? {} : {
          x: direction === 'left' ? [0, '-50%'] : ['-50%', 0],
        }}
        transition={{
          duration: speedMap[speed],
          repeat: Infinity,
          ease: 'linear',
        }}
        className={`flex gap-6 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ width: 'max-content' }}
      >
        {items.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="w-[350px] shrink-0"
          >
            <TestimonialCard
              quote={testimonial.quote}
              author={testimonial.author}
              rating={testimonial.rating}
              variant="elevated"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ============================================================================
// TESTIMONIAL WALL (MASONRY-LIKE)
// ============================================================================

export interface TestimonialWallProps {
  testimonials: Testimonial[];
  className?: string;
}

export function TestimonialWall({
  testimonials,
  className = '',
}: TestimonialWallProps) {
  const prefersReducedMotion = useReducedMotion();

  // Split into columns
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  const Column = ({ items, delay = 0 }: { items: Testimonial[]; delay?: number }) => (
    <div className="space-y-6">
      {items.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + index * 0.1 }}
        >
          <TestimonialCard
            quote={testimonial.quote}
            author={testimonial.author}
            rating={testimonial.rating}
            variant="elevated"
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      <Column items={col1} delay={0} />
      <Column items={col2} delay={0.15} />
      <div className="hidden lg:block">
        <Column items={col3} delay={0.3} />
      </div>
    </div>
  );
}

// ============================================================================
// TESTIMONIAL HIGHLIGHT (FEATURED)
// ============================================================================

export interface TestimonialHighlightProps {
  testimonial: Testimonial;
  /** Custom background */
  backgroundGradient?: string[];
  className?: string;
}

export function TestimonialHighlight({
  testimonial,
  backgroundGradient = ['#6366f1', '#a855f7'],
  className = '',
}: TestimonialHighlightProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        relative p-8 md:p-12 rounded-3xl overflow-hidden
        ${className}
      `}
      style={{
        background: `linear-gradient(135deg, ${backgroundGradient.join(', ')})`,
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Quote Icon */}
        <Quote className="w-12 h-12 text-white/30 mb-6" />

        {/* Rating */}
        {testimonial.rating !== undefined && (
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= testimonial.rating!
                    ? 'text-yellow-300 fill-yellow-300'
                    : 'text-white/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* Quote */}
        <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-relaxed mb-8">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          {testimonial.author.avatar ? (
            <img
              src={testimonial.author.avatar}
              alt={testimonial.author.name}
              className="w-14 h-14 rounded-full object-cover ring-4 ring-white/20"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-semibold ring-4 ring-white/20">
              {testimonial.author.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-semibold text-lg text-white">
              {testimonial.author.name}
            </div>
            {(testimonial.author.role || testimonial.author.company) && (
              <div className="text-white/70">
                {testimonial.author.role}
                {testimonial.author.role && testimonial.author.company && ' at '}
                {testimonial.author.company}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// TESTIMONIAL SECTION (COMPLETE SECTION)
// ============================================================================

export interface TestimonialSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  layout?: 'grid' | 'carousel' | 'marquee' | 'wall';
  /** Featured testimonial to highlight */
  featured?: Testimonial;
  className?: string;
}

export function TestimonialSection({
  title = 'What our customers say',
  subtitle = 'Join thousands of satisfied customers who have transformed their business',
  testimonials,
  layout = 'grid',
  featured,
  className = '',
}: TestimonialSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Featured Testimonial */}
        {featured && (
          <div className="mb-12">
            <TestimonialHighlight testimonial={featured} />
          </div>
        )}

        {/* Testimonials */}
        {layout === 'grid' && <TestimonialGrid testimonials={testimonials} />}
        {layout === 'carousel' && <TestimonialCarousel testimonials={testimonials} />}
        {layout === 'marquee' && <TestimonialMarquee testimonials={testimonials} />}
        {layout === 'wall' && <TestimonialWall testimonials={testimonials} />}
      </div>
    </section>
  );
}

// Default export
export default TestimonialCard;
