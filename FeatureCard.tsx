/**
 * FeatureCard - Animated Feature Display Components
 *
 * Beautiful feature cards and grids for showcasing product features,
 * benefits, and capabilities on landing pages.
 *
 * @example
 * ```tsx
 * import { FeatureCard, FeatureGrid, FeatureBento } from 'archyra';
 *
 * <FeatureGrid features={[
 *   { icon: <Zap />, title: 'Fast', description: 'Lightning fast performance' },
 *   { icon: <Shield />, title: 'Secure', description: 'Enterprise-grade security' },
 * ]} />
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';
import { ArrowRight, Check } from 'lucide-react';

// Types
export interface Feature {
  id?: string | number;
  icon?: ReactNode;
  title: string;
  description?: string;
  link?: { href: string; label: string };
  badge?: string;
  image?: string;
  bullets?: string[];
}

// ============================================================================
// FEATURE CARD
// ============================================================================

export interface FeatureCardProps extends Feature {
  /** Card variant */
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient' | 'glass';
  /** Icon style */
  iconStyle?: 'default' | 'rounded' | 'gradient';
  /** Animation delay */
  delay?: number;
  /** Additional className */
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  link,
  badge,
  bullets,
  variant = 'default',
  iconStyle = 'default',
  delay = 0,
  className = '',
}: FeatureCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const variantClasses = {
    default: 'bg-card border border-border',
    bordered: 'bg-transparent border-2 border-border hover:border-primary/50',
    elevated: 'bg-card shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl',
    gradient: 'bg-gradient-to-br from-primary/5 via-background to-purple-500/5 border border-primary/10',
    glass: 'bg-white/5 backdrop-blur-lg border border-white/10',
  };

  const iconStyleClasses = {
    default: 'w-12 h-12 text-primary',
    rounded: 'w-12 h-12 p-2.5 bg-primary/10 rounded-xl text-primary',
    gradient: 'w-12 h-12 p-2.5 bg-gradient-to-br from-primary to-purple-500 rounded-xl text-white',
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      className={`
        relative p-6 rounded-2xl transition-all duration-300
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {/* Badge */}
      {badge && (
        <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
          {badge}
        </span>
      )}

      {/* Icon */}
      {icon && (
        <div className={`${iconStyleClasses[iconStyle]} mb-4 flex items-center justify-center`}>
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>
      )}

      {/* Bullets */}
      {bullets && bullets.length > 0 && (
        <ul className="space-y-2 mb-4">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Link */}
      {link && (
        <a
          href={link.href}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline group"
        >
          {link.label}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </motion.div>
  );
}

// ============================================================================
// FEATURE GRID
// ============================================================================

export interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient' | 'glass';
  iconStyle?: 'default' | 'rounded' | 'gradient';
  staggerDelay?: number;
  className?: string;
}

export function FeatureGrid({
  features,
  columns = 3,
  variant = 'default',
  iconStyle = 'rounded',
  staggerDelay = 0.1,
  className = '',
}: FeatureGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${columnClasses[columns]} gap-6 ${className}`}>
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.id || index}
          {...feature}
          variant={variant}
          iconStyle={iconStyle}
          delay={index * staggerDelay}
        />
      ))}
    </div>
  );
}

// ============================================================================
// FEATURE BENTO GRID
// ============================================================================

export interface BentoFeature extends Feature {
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
}

export interface FeatureBentoProps {
  features: BentoFeature[];
  className?: string;
}

export function FeatureBento({
  features,
  className = '',
}: FeatureBentoProps) {
  const prefersReducedMotion = useReducedMotion();

  const getSizeClasses = (size: BentoFeature['size'] = 'small') => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'wide':
        return 'md:col-span-2';
      case 'tall':
        return 'md:row-span-2';
      case 'medium':
        return 'md:col-span-1';
      default:
        return '';
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {features.map((feature, index) => (
        <motion.div
          key={feature.id || index}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
          className={`
            relative p-6 rounded-2xl bg-card border border-border
            hover:border-primary/30 transition-all duration-300
            ${getSizeClasses(feature.size)}
          `}
        >
          {/* Image Background for large cards */}
          {feature.image && feature.size === 'large' && (
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img
                src={feature.image}
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
            </div>
          )}

          <div className="relative z-10 h-full flex flex-col">
            {/* Icon */}
            {feature.icon && (
              <div className="w-12 h-12 p-2.5 bg-primary/10 rounded-xl text-primary mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
            )}

            {/* Badge */}
            {feature.badge && (
              <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                {feature.badge}
              </span>
            )}

            {/* Title */}
            <h3 className={`font-semibold mb-2 ${feature.size === 'large' ? 'text-xl' : 'text-lg'}`}>
              {feature.title}
            </h3>

            {/* Description */}
            {feature.description && (
              <p className={`text-muted-foreground leading-relaxed flex-1 ${feature.size === 'large' ? 'text-base' : 'text-sm'}`}>
                {feature.description}
              </p>
            )}

            {/* Image for non-large cards */}
            {feature.image && feature.size !== 'large' && (
              <div className="mt-4 rounded-xl overflow-hidden">
                <img
                  src={feature.image}
                  alt=""
                  className="w-full h-32 object-cover"
                />
              </div>
            )}

            {/* Link */}
            {feature.link && (
              <a
                href={feature.link.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline group mt-4"
              >
                {feature.link.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// FEATURE LIST
// ============================================================================

export interface FeatureListProps {
  features: Feature[];
  variant?: 'default' | 'numbered' | 'timeline';
  className?: string;
}

export function FeatureList({
  features,
  variant = 'default',
  className = '',
}: FeatureListProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`space-y-6 ${className}`}>
      {features.map((feature, index) => (
        <motion.div
          key={feature.id || index}
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            flex gap-4
            ${variant === 'timeline' ? 'relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-border' : ''}
          `}
        >
          {/* Icon/Number */}
          <div className="shrink-0">
            {variant === 'numbered' ? (
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {index + 1}
              </div>
            ) : variant === 'timeline' ? (
              <div className="absolute left-0 w-6 h-6 rounded-full bg-primary border-4 border-background" />
            ) : feature.icon ? (
              <div className="w-12 h-12 p-2.5 bg-primary/10 rounded-xl text-primary flex items-center justify-center">
                {feature.icon}
              </div>
            ) : null}
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{feature.title}</h3>
            {feature.description && (
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            )}
            {feature.link && (
              <a
                href={feature.link.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline group mt-2"
              >
                {feature.link.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// FEATURE SHOWCASE (ALTERNATING)
// ============================================================================

export interface FeatureShowcaseProps {
  features: Array<Feature & { image: string }>;
  className?: string;
}

export function FeatureShowcase({
  features,
  className = '',
}: FeatureShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`space-y-24 ${className}`}>
      {features.map((feature, index) => {
        const isReversed = index % 2 === 1;

        return (
          <motion.div
            key={feature.id || index}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className={`
              grid lg:grid-cols-2 gap-12 lg:gap-16 items-center
              ${isReversed ? 'lg:flex-row-reverse' : ''}
            `}
          >
            {/* Content */}
            <div className={isReversed ? 'lg:order-2' : ''}>
              {feature.badge && (
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                  {feature.badge}
                </span>
              )}

              {feature.icon && (
                <div className="w-14 h-14 p-3 bg-primary/10 rounded-2xl text-primary mb-6 flex items-center justify-center">
                  {feature.icon}
                </div>
              )}

              <h3 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h3>

              {feature.description && (
                <p className="text-lg text-muted-foreground mb-6">
                  {feature.description}
                </p>
              )}

              {feature.bullets && (
                <ul className="space-y-3 mb-6">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {feature.link && (
                <a
                  href={feature.link.href}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline group"
                >
                  {feature.link.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </div>

            {/* Image */}
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              className={`${isReversed ? 'lg:order-1' : ''}`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================================
// FEATURE SECTION (COMPLETE SECTION)
// ============================================================================

export interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  features: Feature[];
  layout?: 'grid' | 'bento' | 'list' | 'showcase';
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeatureSection({
  title = 'Features',
  subtitle,
  badge,
  features,
  layout = 'grid',
  columns = 3,
  className = '',
}: FeatureSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {badge && (
            <motion.span
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4"
            >
              {badge}
            </motion.span>
          )}
          <motion.h2
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Features */}
        {layout === 'grid' && <FeatureGrid features={features} columns={columns} />}
        {layout === 'bento' && <FeatureBento features={features as BentoFeature[]} />}
        {layout === 'list' && <FeatureList features={features} />}
        {layout === 'showcase' && (
          <FeatureShowcase features={features as Array<Feature & { image: string }>} />
        )}
      </div>
    </section>
  );
}

// Default export
export default FeatureCard;
