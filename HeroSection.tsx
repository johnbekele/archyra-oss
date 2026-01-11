/**
 * HeroSection - Stunning Animated Hero Sections
 *
 * Ready-to-use hero sections with multiple variants, animations,
 * and responsive layouts. Perfect for landing pages.
 *
 * @example
 * ```tsx
 * import { HeroSection, HeroCentered, HeroSplit } from 'archyra';
 *
 * <HeroSection
 *   title="Build Something Amazing"
 *   subtitle="Create beautiful, responsive websites in minutes"
 *   primaryAction={{ label: 'Get Started', onClick: () => {} }}
 *   secondaryAction={{ label: 'Learn More', href: '/docs' }}
 *   variant="gradient"
 * />
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react';

// Types
export interface HeroAction {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export interface HeroSectionProps {
  /** Main title */
  title: string | ReactNode;
  /** Subtitle/description */
  subtitle?: string;
  /** Badge text above title */
  badge?: string;
  /** Primary CTA */
  primaryAction?: HeroAction;
  /** Secondary CTA */
  secondaryAction?: HeroAction;
  /** Background variant */
  variant?: 'default' | 'gradient' | 'mesh' | 'dots' | 'grid';
  /** Gradient colors for gradient variant */
  gradientColors?: string[];
  /** Custom background */
  backgroundImage?: string;
  /** Overlay opacity */
  overlayOpacity?: number;
  /** Show scroll indicator */
  showScrollIndicator?: boolean;
  /** Alignment */
  align?: 'left' | 'center' | 'right';
  /** Full viewport height */
  fullHeight?: boolean;
  /** Additional content below actions */
  children?: ReactNode;
  /** Additional className */
  className?: string;
}

// ============================================================================
// HERO SECTION
// ============================================================================

export function HeroSection({
  title,
  subtitle,
  badge,
  primaryAction,
  secondaryAction,
  variant = 'default',
  gradientColors = ['#6366f1', '#a855f7', '#ec4899'],
  backgroundImage,
  overlayOpacity = 0.5,
  showScrollIndicator = false,
  align = 'center',
  fullHeight = true,
  children,
  className = '',
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const getBackground = () => {
    switch (variant) {
      case 'gradient':
        return (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
              opacity: 0.15,
            }}
          />
        );
      case 'mesh':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(at 40% 20%, ${gradientColors[0]}40 0px, transparent 50%),
                  radial-gradient(at 80% 0%, ${gradientColors[1]}30 0px, transparent 50%),
                  radial-gradient(at 0% 50%, ${gradientColors[2]}30 0px, transparent 50%),
                  radial-gradient(at 80% 50%, ${gradientColors[0]}20 0px, transparent 50%),
                  radial-gradient(at 0% 100%, ${gradientColors[1]}30 0px, transparent 50%),
                  radial-gradient(at 80% 100%, ${gradientColors[2]}20 0px, transparent 50%)
                `,
              }}
            />
          </div>
        );
      case 'dots':
        return (
          <div
            className="absolute inset-0 opacity-30 dark:opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
        );
      case 'grid':
        return (
          <div
            className="absolute inset-0 opacity-10 dark:opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(currentColor 1px, transparent 1px),
                linear-gradient(90deg, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
            }}
          />
        );
      default:
        return null;
    }
  };

  const renderButton = (action: HeroAction, isPrimary: boolean) => {
    const baseClasses = `
      inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium
      transition-all duration-200
    `;

    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
      ghost: 'text-foreground hover:bg-muted',
    };

    const buttonVariant = action.variant || (isPrimary ? 'primary' : 'ghost');
    const Component = action.href ? 'a' : 'button';

    return (
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        <Component
          href={action.href}
          onClick={action.onClick}
          className={`${baseClasses} ${variantClasses[buttonVariant]}`}
        >
          {action.icon && action.iconPosition !== 'right' && action.icon}
          {action.label}
          {action.icon && action.iconPosition === 'right' && action.icon}
          {!action.icon && isPrimary && <ArrowRight className="w-4 h-4" />}
        </Component>
      </motion.div>
    );
  };

  return (
    <section
      className={`
        relative overflow-hidden bg-background
        ${fullHeight ? 'min-h-screen' : 'py-24 md:py-32'}
        ${className}
      `}
    >
      {/* Background */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div
            className="absolute inset-0 bg-background"
            style={{ opacity: overlayOpacity }}
          />
        </>
      )}
      {getBackground()}

      {/* Content */}
      <div
        className={`
          relative z-10 flex flex-col justify-center px-4 sm:px-6 lg:px-8
          ${fullHeight ? 'min-h-screen' : ''}
        `}
      >
        <div className={`max-w-4xl mx-auto w-full flex flex-col ${alignmentClasses[align]}`}>
          {/* Badge */}
          {badge && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              {primaryAction && renderButton(primaryAction, true)}
              {secondaryAction && renderButton(secondaryAction, false)}
            </motion.div>
          )}

          {/* Additional Content */}
          {children && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12"
            >
              {children}
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && fullHeight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-xs">Scroll down</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// HERO CENTERED (SIMPLER VARIANT)
// ============================================================================

export interface HeroCenteredProps {
  title: string | ReactNode;
  subtitle?: string;
  badge?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  trustedBy?: {
    label?: string;
    logos: Array<{ src: string; alt: string }>;
  };
  className?: string;
}

export function HeroCentered({
  title,
  subtitle,
  badge,
  primaryAction,
  secondaryAction,
  trustedBy,
  className = '',
}: HeroCenteredProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`relative py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium border border-violet-500/20">
              <Sparkles className="w-4 h-4" />
              {badge}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Actions */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {primaryAction && (
            <motion.a
              href={primaryAction.href}
              onClick={primaryAction.onClick as any}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              {primaryAction.label}
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          )}
          {secondaryAction && (
            <motion.a
              href={secondaryAction.href}
              onClick={secondaryAction.onClick as any}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
            >
              {secondaryAction.label}
            </motion.a>
          )}
        </motion.div>

        {/* Trusted By */}
        {trustedBy && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-6">
              {trustedBy.label || 'Trusted by leading companies'}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {trustedBy.logos.map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// HERO SPLIT (IMAGE + TEXT)
// ============================================================================

export interface HeroSplitProps {
  title: string | ReactNode;
  subtitle?: string;
  badge?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  media?: {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    poster?: string;
  };
  mediaPosition?: 'left' | 'right';
  features?: Array<{
    icon?: ReactNode;
    text: string;
  }>;
  className?: string;
}

export function HeroSplit({
  title,
  subtitle,
  badge,
  primaryAction,
  secondaryAction,
  media,
  mediaPosition = 'right',
  features,
  className = '',
}: HeroSplitProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);

  const contentSection = (
    <div className="flex flex-col justify-center">
      {/* Badge */}
      {badge && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h1
        initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
      >
        {title}
      </motion.h1>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground mb-6"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Features */}
      {features && (
        <motion.ul
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-muted-foreground">
              {feature.icon || (
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
              )}
              <span>{feature.text}</span>
            </li>
          ))}
        </motion.ul>
      )}

      {/* Actions */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4"
      >
        {primaryAction && (
          <motion.a
            href={primaryAction.href}
            onClick={primaryAction.onClick as any}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
          >
            {primaryAction.label}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        )}
        {secondaryAction && (
          <motion.a
            href={secondaryAction.href}
            onClick={secondaryAction.onClick as any}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-foreground font-medium hover:bg-muted transition-colors"
          >
            {secondaryAction.label}
          </motion.a>
        )}
      </motion.div>
    </div>
  );

  const mediaSection = media && (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      {media.type === 'image' ? (
        <img
          src={media.src}
          alt={media.alt || ''}
          className="w-full h-auto rounded-2xl shadow-2xl"
        />
      ) : (
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <video
            src={media.src}
            poster={media.poster}
            className="w-full h-auto"
            loop
            muted
            playsInline
            autoPlay={isPlaying}
          />
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-6 h-6 text-black ml-1" />
              </div>
            </button>
          )}
        </div>
      )}
    </motion.div>
  );

  return (
    <section className={`py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${mediaPosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
          {mediaPosition === 'right' ? (
            <>
              {contentSection}
              {mediaSection}
            </>
          ) : (
            <>
              {mediaSection}
              {contentSection}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// HERO WITH VIDEO BACKGROUND
// ============================================================================

export interface HeroVideoProps {
  title: string | ReactNode;
  subtitle?: string;
  videoSrc: string;
  posterSrc?: string;
  overlayOpacity?: number;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  className?: string;
}

export function HeroVideo({
  title,
  subtitle,
  videoSrc,
  posterSrc,
  overlayOpacity = 0.6,
  primaryAction,
  secondaryAction,
  className = '',
}: HeroVideoProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {primaryAction && (
            <motion.a
              href={primaryAction.href}
              onClick={primaryAction.onClick as any}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              {primaryAction.label}
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          )}
          {secondaryAction && (
            <motion.a
              href={secondaryAction.href}
              onClick={secondaryAction.onClick as any}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-white/50 text-white font-medium hover:bg-white/10 transition-colors"
            >
              {secondaryAction.label}
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/60"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================================
// HERO GRADIENT TEXT
// ============================================================================

export interface HeroGradientTextProps {
  /** Text with gradient */
  gradientText: string;
  /** Text before gradient */
  beforeText?: string;
  /** Text after gradient */
  afterText?: string;
  /** Gradient colors */
  gradientColors?: string[];
  /** Subtitle */
  subtitle?: string;
  /** Actions */
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  className?: string;
}

export function HeroGradientText({
  gradientText,
  beforeText,
  afterText,
  gradientColors = ['#6366f1', '#a855f7', '#ec4899'],
  subtitle,
  primaryAction,
  secondaryAction,
  className = '',
}: HeroGradientTextProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          {beforeText && <span>{beforeText} </span>}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
            }}
          >
            {gradientText}
          </span>
          {afterText && <span> {afterText}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {primaryAction && (
            <motion.a
              href={primaryAction.href}
              onClick={primaryAction.onClick as any}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white shadow-lg"
              style={{
                backgroundImage: `linear-gradient(135deg, ${gradientColors.join(', ')})`,
              }}
            >
              {primaryAction.label}
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          )}
          {secondaryAction && (
            <motion.a
              href={secondaryAction.href}
              onClick={secondaryAction.onClick as any}
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
            >
              {secondaryAction.label}
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Default export
export default HeroSection;
