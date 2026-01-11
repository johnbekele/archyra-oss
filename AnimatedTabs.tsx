/**
 * AnimatedTabs - Smooth Animated Tab Component
 *
 * A beautiful tab component with smooth sliding indicator animation,
 * content transitions, and multiple style variants. Perfect for
 * navigation, settings panels, and content organization.
 *
 * @example
 * ```tsx
 * import { AnimatedTabs } from 'archyra';
 *
 * <AnimatedTabs
 *   tabs={[
 *     { id: 'tab1', label: 'Overview', content: <Overview /> },
 *     { id: 'tab2', label: 'Settings', content: <Settings /> },
 *   ]}
 * />
 * ```
 */

'use client';

import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from 'framer-motion';
import { useState, useRef, useEffect, ReactNode, useId } from 'react';

export interface Tab {
  /** Unique tab identifier */
  id: string;
  /** Tab label text */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Tab content */
  content?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface AnimatedTabsProps {
  /** Array of tab configurations */
  tabs: Tab[];
  /** Default active tab id */
  defaultTab?: string;
  /** Controlled active tab */
  activeTab?: string;
  /** Callback when tab changes */
  onTabChange?: (tabId: string) => void;
  /** Tab style variant */
  variant?: 'default' | 'pills' | 'underline' | 'enclosed';
  /** Tab size */
  size?: 'sm' | 'md' | 'lg';
  /** Full width tabs */
  fullWidth?: boolean;
  /** Indicator color */
  indicatorColor?: string;
  /** Active tab text color */
  activeColor?: string;
  /** Inactive tab text color */
  inactiveColor?: string;
  /** Tab content animation */
  contentAnimation?: 'fade' | 'slide' | 'none';
  /** Additional classes for tabs container */
  className?: string;
  /** Additional classes for content container */
  contentClassName?: string;
}

/**
 * AnimatedTabs - Main animated tabs component
 */
export default function AnimatedTabs({
  tabs,
  defaultTab,
  activeTab: controlledTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  indicatorColor,
  activeColor,
  inactiveColor,
  contentAnimation = 'fade',
  className = '',
  contentClassName = '',
}: AnimatedTabsProps) {
  const prefersReducedMotion = useReducedMotion();
  const layoutId = useId();
  const [internalTab, setInternalTab] = useState(defaultTab || tabs[0]?.id);
  const activeTabId = controlledTab ?? internalTab;

  const handleTabChange = (tabId: string) => {
    if (!controlledTab) {
      setInternalTab(tabId);
    }
    onTabChange?.(tabId);
  };

  const activeTabData = tabs.find((t) => t.id === activeTabId);

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };

  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'pills':
        return {
          container: 'bg-muted/50 dark:bg-zinc-800/50 p-1 rounded-lg',
          indicator: 'rounded-md bg-white dark:bg-zinc-700 shadow-sm',
          tab: 'rounded-md',
        };
      case 'underline':
        return {
          container: 'border-b border-border',
          indicator: 'h-0.5 bottom-0 bg-primary',
          tab: '',
        };
      case 'enclosed':
        return {
          container: 'border-b border-border',
          indicator: 'rounded-t-lg border border-b-0 border-border bg-background -mb-px',
          tab: '',
        };
      default:
        return {
          container: 'bg-muted/30 dark:bg-zinc-800/30 p-1 rounded-xl',
          indicator: 'rounded-lg bg-white dark:bg-zinc-800 shadow-sm',
          tab: 'rounded-lg',
        };
    }
  };

  const variantStyles = getVariantStyles();

  // Content animation variants
  const contentVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
    slide: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
      transition: { duration: 0 },
    },
  };

  const animation = contentVariants[contentAnimation];

  return (
    <div className="w-full">
      {/* Tab list */}
      <LayoutGroup id={layoutId}>
        <div
          className={`
            relative flex
            ${fullWidth ? 'w-full' : 'w-fit'}
            ${variantStyles.container}
            ${className}
          `}
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                disabled={tab.disabled}
                onClick={() => !tab.disabled && handleTabChange(tab.id)}
                className={`
                  relative z-10 flex items-center justify-center gap-2
                  font-medium transition-colors
                  ${sizeClasses[size]}
                  ${variantStyles.tab}
                  ${fullWidth ? 'flex-1' : ''}
                  ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${isActive
                    ? activeColor || 'text-foreground'
                    : inactiveColor || 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId={`indicator-${layoutId}`}
                    className={`absolute inset-0 -z-10 ${variantStyles.indicator}`}
                    style={indicatorColor ? { backgroundColor: indicatorColor } : undefined}
                    transition={{
                      type: 'spring',
                      bounce: 0.15,
                      duration: prefersReducedMotion ? 0 : 0.5,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Tab content */}
      {activeTabData?.content && (
        <div className={`mt-4 ${contentClassName}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              role="tabpanel"
              id={`panel-${activeTabId}`}
              aria-labelledby={activeTabId}
              initial={animation.initial}
              animate={animation.animate}
              exit={animation.exit}
              transition={animation.transition}
            >
              {activeTabData.content}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/**
 * AnimatedTabsVertical - Vertical tab layout
 */
export interface AnimatedTabsVerticalProps extends Omit<AnimatedTabsProps, 'fullWidth'> {
  /** Tab list width */
  tabWidth?: string;
}

export function AnimatedTabsVertical({
  tabs,
  defaultTab,
  activeTab: controlledTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  tabWidth = '200px',
  indicatorColor,
  activeColor,
  inactiveColor,
  contentAnimation = 'fade',
  className = '',
  contentClassName = '',
}: AnimatedTabsVerticalProps) {
  const prefersReducedMotion = useReducedMotion();
  const layoutId = useId();
  const [internalTab, setInternalTab] = useState(defaultTab || tabs[0]?.id);
  const activeTabId = controlledTab ?? internalTab;

  const handleTabChange = (tabId: string) => {
    if (!controlledTab) {
      setInternalTab(tabId);
    }
    onTabChange?.(tabId);
  };

  const activeTabData = tabs.find((t) => t.id === activeTabId);

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };

  const contentVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    },
    none: { initial: {}, animate: {}, exit: {} },
  };

  return (
    <div className={`flex gap-6 ${className}`}>
      {/* Tab list */}
      <LayoutGroup id={layoutId}>
        <div
          className="flex flex-col gap-1 bg-muted/30 dark:bg-zinc-800/30 p-1 rounded-xl"
          style={{ width: tabWidth }}
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                disabled={tab.disabled}
                onClick={() => !tab.disabled && handleTabChange(tab.id)}
                className={`
                  relative z-10 flex items-center gap-2 text-left
                  font-medium transition-colors rounded-lg
                  ${sizeClasses[size]}
                  ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${isActive
                    ? activeColor || 'text-foreground'
                    : inactiveColor || 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId={`v-indicator-${layoutId}`}
                    className="absolute inset-0 -z-10 rounded-lg bg-white dark:bg-zinc-800 shadow-sm"
                    style={indicatorColor ? { backgroundColor: indicatorColor } : undefined}
                    transition={{
                      type: 'spring',
                      bounce: 0.15,
                      duration: prefersReducedMotion ? 0 : 0.5,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      {/* Tab content */}
      {activeTabData?.content && (
        <div className={`flex-1 ${contentClassName}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              role="tabpanel"
              initial={contentVariants[contentAnimation].initial}
              animate={contentVariants[contentAnimation].animate}
              exit={contentVariants[contentAnimation].exit}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              {activeTabData.content}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/**
 * AnimatedTabsUnderline - Underline indicator tabs (common style)
 */
export function AnimatedTabsUnderline(props: Omit<AnimatedTabsProps, 'variant'>) {
  return <AnimatedTabs variant="underline" {...props} />;
}

/**
 * AnimatedTabsPills - Pill-style tabs
 */
export function AnimatedTabsPills(props: Omit<AnimatedTabsProps, 'variant'>) {
  return <AnimatedTabs variant="pills" {...props} />;
}

/**
 * TabList - Headless tab list (just the tabs, no content)
 */
export interface TabListProps {
  /** Tab labels */
  tabs: Array<{ id: string; label: string; icon?: ReactNode; disabled?: boolean }>;
  /** Active tab */
  activeTab: string;
  /** Tab change callback */
  onTabChange: (tabId: string) => void;
  /** Variant */
  variant?: 'default' | 'pills' | 'underline';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Full width */
  fullWidth?: boolean;
  /** Additional classes */
  className?: string;
}

export function TabList({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
}: TabListProps) {
  const prefersReducedMotion = useReducedMotion();
  const layoutId = useId();

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };

  const getContainerClass = () => {
    switch (variant) {
      case 'pills':
        return 'bg-muted/50 dark:bg-zinc-800/50 p-1 rounded-lg';
      case 'underline':
        return 'border-b border-border';
      default:
        return 'bg-muted/30 dark:bg-zinc-800/30 p-1 rounded-xl';
    }
  };

  const getIndicatorClass = () => {
    switch (variant) {
      case 'pills':
        return 'rounded-md bg-white dark:bg-zinc-700 shadow-sm';
      case 'underline':
        return 'h-0.5 bottom-0 left-0 right-0 top-auto bg-primary rounded-full';
      default:
        return 'rounded-lg bg-white dark:bg-zinc-800 shadow-sm';
    }
  };

  return (
    <LayoutGroup id={layoutId}>
      <div
        className={`
          relative flex
          ${fullWidth ? 'w-full' : 'w-fit'}
          ${getContainerClass()}
          ${className}
        `}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              className={`
                relative z-10 flex items-center justify-center gap-2
                font-medium transition-colors
                ${sizeClasses[size]}
                ${variant !== 'underline' ? 'rounded-lg' : ''}
                ${fullWidth ? 'flex-1' : ''}
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {tab.icon}
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId={`tab-indicator-${layoutId}`}
                  className={`absolute inset-0 -z-10 ${getIndicatorClass()}`}
                  transition={{
                    type: 'spring',
                    bounce: 0.15,
                    duration: prefersReducedMotion ? 0 : 0.5,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

// Named export
export { AnimatedTabs };
