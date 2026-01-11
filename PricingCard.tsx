/**
 * PricingCard - Beautiful Animated Pricing Cards
 *
 * Ready-to-use pricing cards with animations, popular badges,
 * feature lists, and billing toggle. Perfect for SaaS landing pages.
 *
 * @example
 * ```tsx
 * import { PricingCard, PricingTable } from 'archyra';
 *
 * <PricingTable
 *   plans={[
 *     { name: 'Basic', price: 9, features: ['Feature 1', 'Feature 2'] },
 *     { name: 'Pro', price: 29, popular: true, features: ['All Basic', 'Feature 3'] },
 *   ]}
 *   onSelectPlan={(plan) => handleSelect(plan)}
 * />
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { Check, X, Sparkles, Zap, Crown, Star } from 'lucide-react';

// Types
export interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  /** Plan identifier */
  id: string;
  /** Plan name */
  name: string;
  /** Plan description */
  description?: string;
  /** Monthly price */
  price: number;
  /** Yearly price (optional, for discount display) */
  yearlyPrice?: number;
  /** Custom price label (e.g., "Contact us") */
  customPrice?: string;
  /** Price suffix (e.g., "/month", "/user") */
  priceSuffix?: string;
  /** List of features */
  features: (string | PricingFeature)[];
  /** Is this the popular/recommended plan */
  popular?: boolean;
  /** CTA button text */
  buttonText?: string;
  /** CTA button variant */
  buttonVariant?: 'default' | 'outline' | 'gradient';
  /** Custom icon */
  icon?: ReactNode;
  /** Badge text (overrides "Popular" if popular=true) */
  badge?: string;
  /** Highlight color for popular plans */
  highlightColor?: string;
}

// ============================================================================
// PRICING CARD
// ============================================================================

export interface PricingCardProps extends PricingPlan {
  /** Whether showing yearly prices */
  isYearly?: boolean;
  /** Click handler */
  onSelect?: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Animation delay */
  delay?: number;
  /** Additional className */
  className?: string;
}

export function PricingCard({
  id,
  name,
  description,
  price,
  yearlyPrice,
  customPrice,
  priceSuffix = '/month',
  features,
  popular,
  buttonText = 'Get Started',
  buttonVariant = 'default',
  icon,
  badge,
  highlightColor = 'violet',
  isYearly = false,
  onSelect,
  isLoading,
  disabled,
  delay = 0,
  className = '',
}: PricingCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const displayPrice = isYearly && yearlyPrice !== undefined ? yearlyPrice : price;
  const monthlyEquivalent = isYearly && yearlyPrice !== undefined ? Math.round(yearlyPrice / 12) : price;

  const getButtonClasses = () => {
    if (buttonVariant === 'gradient') {
      return `bg-gradient-to-r from-${highlightColor}-500 to-${highlightColor}-600 text-white hover:from-${highlightColor}-600 hover:to-${highlightColor}-700`;
    }
    if (buttonVariant === 'outline') {
      return 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground';
    }
    if (popular) {
      return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
    return 'bg-muted text-foreground hover:bg-muted/80';
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      className={`
        relative flex flex-col p-6 rounded-2xl border bg-card
        transition-shadow duration-300
        ${popular
          ? `border-${highlightColor}-500/50 shadow-lg shadow-${highlightColor}-500/10 ring-1 ring-${highlightColor}-500/20`
          : 'border-border hover:shadow-lg'
        }
        ${className}
      `}
    >
      {/* Popular Badge */}
      {(popular || badge) && (
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: 'spring' }}
          className={`
            absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold
            bg-gradient-to-r from-violet-500 to-purple-500 text-white
            flex items-center gap-1
          `}
        >
          <Sparkles className="w-3 h-3" />
          {badge || 'Most Popular'}
        </motion.div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        {customPrice ? (
          <div className="text-3xl font-bold">{customPrice}</div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">${monthlyEquivalent}</span>
            <span className="text-muted-foreground">{priceSuffix}</span>
          </div>
        )}
        {isYearly && yearlyPrice !== undefined && !customPrice && (
          <p className="text-sm text-muted-foreground mt-1">
            ${yearlyPrice} billed yearly
          </p>
        )}
        {!isYearly && yearlyPrice !== undefined && !customPrice && (
          <p className="text-sm text-green-500 mt-1">
            Save ${(price * 12) - yearlyPrice}/year with annual
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => {
          const featureData = typeof feature === 'string'
            ? { text: feature, included: true }
            : feature;

          return (
            <motion.li
              key={i}
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 + i * 0.05 }}
              className={`flex items-start gap-2 text-sm ${featureData.included ? '' : 'text-muted-foreground'}`}
            >
              {featureData.included ? (
                <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              ) : (
                <X className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              )}
              <span>{featureData.text}</span>
            </motion.li>
          );
        })}
      </ul>

      {/* CTA Button */}
      <motion.button
        onClick={onSelect}
        disabled={disabled || isLoading}
        whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        className={`
          w-full py-3 px-4 rounded-xl font-medium transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${getButtonClasses()}
        `}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            />
            Processing...
          </span>
        ) : (
          buttonText
        )}
      </motion.button>
    </motion.div>
  );
}

// ============================================================================
// PRICING TABLE
// ============================================================================

export interface PricingTableProps {
  /** Array of pricing plans */
  plans: PricingPlan[];
  /** Show billing toggle */
  showBillingToggle?: boolean;
  /** Default billing period */
  defaultBilling?: 'monthly' | 'yearly';
  /** Callback when plan is selected */
  onSelectPlan?: (plan: PricingPlan, isYearly: boolean) => void;
  /** Currently loading plan ID */
  loadingPlanId?: string;
  /** Table title */
  title?: string;
  /** Table subtitle */
  subtitle?: string;
  /** Additional className */
  className?: string;
}

export function PricingTable({
  plans,
  showBillingToggle = true,
  defaultBilling = 'monthly',
  onSelectPlan,
  loadingPlanId,
  title = 'Simple, transparent pricing',
  subtitle = 'Choose the plan that works best for you',
  className = '',
}: PricingTableProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isYearly, setIsYearly] = useState(defaultBilling === 'yearly');

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>

        {/* Billing Toggle */}
        {showBillingToggle && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 inline-flex items-center gap-4 p-1 bg-muted rounded-full"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${!isYearly ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                ${isYearly ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              Yearly
              <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Cards Grid */}
      <div className={`
        grid gap-8
        ${plans.length === 1 ? 'max-w-md mx-auto' : ''}
        ${plans.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : ''}
        ${plans.length === 3 ? 'md:grid-cols-3 max-w-5xl mx-auto' : ''}
        ${plans.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : ''}
      `}>
        {plans.map((plan, index) => (
          <PricingCard
            key={plan.id}
            {...plan}
            isYearly={isYearly}
            onSelect={() => onSelectPlan?.(plan, isYearly)}
            isLoading={loadingPlanId === plan.id}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PRICING COMPARISON TABLE
// ============================================================================

export interface PricingComparisonProps {
  plans: PricingPlan[];
  featureCategories: {
    name: string;
    features: {
      name: string;
      values: (boolean | string | number)[];
      tooltip?: string;
    }[];
  }[];
  onSelectPlan?: (plan: PricingPlan) => void;
  className?: string;
}

export function PricingComparison({
  plans,
  featureCategories,
  onSelectPlan,
  className = '',
}: PricingComparisonProps) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full min-w-[800px]">
        {/* Header */}
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-4 w-1/4">Features</th>
            {plans.map((plan) => (
              <th key={plan.id} className="text-center py-4 px-4">
                <div className={`
                  p-4 rounded-xl
                  ${plan.popular ? 'bg-primary/5 ring-1 ring-primary/20' : ''}
                `}>
                  <div className="font-bold text-lg mb-1">{plan.name}</div>
                  <div className="text-2xl font-bold mb-2">
                    {plan.customPrice || `$${plan.price}`}
                    {!plan.customPrice && <span className="text-sm font-normal text-muted-foreground">/mo</span>}
                  </div>
                  <button
                    onClick={() => onSelectPlan?.(plan)}
                    className={`
                      w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors
                      ${plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted hover:bg-muted/80'
                      }
                    `}
                  >
                    {plan.buttonText || 'Get Started'}
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Feature Categories */}
        <tbody>
          {featureCategories.map((category) => (
            <>
              <tr key={category.name} className="bg-muted/30">
                <td colSpan={plans.length + 1} className="py-3 px-4 font-semibold text-sm">
                  {category.name}
                </td>
              </tr>
              {category.features.map((feature, featureIndex) => (
                <tr key={`${category.name}-${featureIndex}`} className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm">{feature.name}</td>
                  {feature.values.map((value, valueIndex) => (
                    <td key={valueIndex} className="py-3 px-4 text-center">
                      {typeof value === 'boolean' ? (
                        value ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================================
// PRESET ICONS
// ============================================================================

export const PricingIcons = {
  basic: <Zap className="w-5 h-5" />,
  pro: <Star className="w-5 h-5" />,
  enterprise: <Crown className="w-5 h-5" />,
  sparkle: <Sparkles className="w-5 h-5" />,
};

// Default export
export default PricingCard;
