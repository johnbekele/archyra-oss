/**
 * ProgressBar - Animated progress indicator
 *
 * A customizable progress bar with multiple styles,
 * animations, and color options.
 *
 * @example
 * ```tsx
 * import { ProgressBar } from 'archyra';
 *
 * // Basic usage
 * <ProgressBar value={65} />
 *
 * // With label
 * <ProgressBar value={65} showLabel variant="gradient" />
 *
 * // Indeterminate loading
 * <ProgressBar indeterminate />
 * ```
 */

'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface ProgressBarProps {
  /** Progress value (0-100) */
  value?: number;
  /** Show indeterminate loading animation */
  indeterminate?: boolean;
  /** Visual variant */
  variant?: 'default' | 'gradient' | 'striped' | 'glow';
  /** Size preset */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Color theme */
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'custom';
  /** Custom color (hex) when color='custom' */
  customColor?: string;
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'inside' | 'outside' | 'top';
  /** Animation duration in ms */
  animationDuration?: number;
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Custom class name */
  className?: string;
  /** Callback when progress completes */
  onComplete?: () => void;
}

const sizeMap = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
};

const colorMap = {
  blue: { bg: 'bg-blue-500', gradient: 'from-blue-400 to-blue-600' },
  green: { bg: 'bg-green-500', gradient: 'from-green-400 to-green-600' },
  purple: { bg: 'bg-purple-500', gradient: 'from-purple-400 to-purple-600' },
  orange: { bg: 'bg-orange-500', gradient: 'from-orange-400 to-orange-600' },
  red: { bg: 'bg-red-500', gradient: 'from-red-400 to-red-600' },
  custom: { bg: '', gradient: '' },
};

const roundedMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export default function ProgressBar({
  value = 0,
  indeterminate = false,
  variant = 'default',
  size = 'md',
  color = 'blue',
  customColor,
  showLabel = false,
  labelPosition = 'outside',
  animationDuration = 500,
  rounded = 'full',
  className = '',
  onComplete,
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const springValue = useSpring(0, { duration: animationDuration });
  const width = useTransform(springValue, (v) => `${Math.min(100, Math.max(0, v))}%`);

  useEffect(() => {
    springValue.set(value);
    const unsubscribe = springValue.on('change', (v) => {
      setDisplayValue(Math.round(v));
    });

    if (value >= 100 && onComplete) {
      const timer = setTimeout(onComplete, animationDuration);
      return () => {
        clearTimeout(timer);
        unsubscribe();
      };
    }

    return unsubscribe;
  }, [value, springValue, animationDuration, onComplete]);

  const height = sizeMap[size];
  const colors = colorMap[color];

  const getBarStyles = () => {
    const baseStyle: React.CSSProperties = {};

    if (color === 'custom' && customColor) {
      baseStyle.backgroundColor = customColor;
    }

    return baseStyle;
  };

  const getBarClasses = () => {
    const classes = ['h-full', 'transition-all'];

    if (variant === 'default') {
      classes.push(colors.bg);
    } else if (variant === 'gradient') {
      classes.push('bg-gradient-to-r', colors.gradient);
    } else if (variant === 'striped') {
      classes.push(colors.bg, 'bg-stripes');
    } else if (variant === 'glow') {
      classes.push(colors.bg, 'shadow-lg');
    }

    if (rounded !== 'none') {
      classes.push(roundedMap[rounded]);
    }

    return classes.join(' ');
  };

  // Indeterminate animation
  if (indeterminate) {
    return (
      <div className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 ${roundedMap[rounded]} ${className}`} style={{ height }}>
        <motion.div
          className={`absolute h-full w-1/3 ${getBarClasses()}`}
          style={getBarStyles()}
          animate={{
            left: ['-33%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  }

  const Label = () => (
    <span className={`text-sm font-medium ${labelPosition === 'inside' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
      {displayValue}%
    </span>
  );

  return (
    <div className={className}>
      {showLabel && labelPosition === 'top' && (
        <div className="flex justify-between mb-1">
          <Label />
        </div>
      )}

      <div className="flex items-center gap-3">
        <div
          className={`relative flex-1 overflow-hidden bg-gray-200 dark:bg-gray-700 ${roundedMap[rounded]}`}
          style={{ height }}
        >
          <motion.div
            className={`${getBarClasses()} relative`}
            style={{ ...getBarStyles(), width }}
          >
            {/* Glow effect */}
            {variant === 'glow' && (
              <motion.div
                className="absolute inset-0 opacity-50"
                style={{
                  background: customColor || (color !== 'custom' ? `var(--${color}-500)` : undefined),
                  filter: 'blur(8px)',
                }}
              />
            )}

            {/* Striped animation */}
            {variant === 'striped' && (
              <motion.div
                className="absolute inset-0 bg-stripes-animated"
                animate={{ backgroundPosition: ['0 0', '40px 0'] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inside label */}
            {showLabel && labelPosition === 'inside' && size !== 'xs' && size !== 'sm' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Label />
              </div>
            )}
          </motion.div>
        </div>

        {showLabel && labelPosition === 'outside' && <Label />}
      </div>
    </div>
  );
}

// Multi-step progress
export interface StepProgressProps {
  steps: string[];
  currentStep: number;
  color?: ProgressBarProps['color'];
  customColor?: string;
}

export function StepProgress({ steps, currentStep, color = 'blue', customColor }: StepProgressProps) {
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />

        {/* Progress line */}
        <motion.div
          className={`absolute top-4 left-0 h-1 rounded-full ${colorMap[color].bg}`}
          style={{ backgroundColor: customColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                    isCompleted
                      ? `${colorMap[color].bg} border-transparent text-white`
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500'
                  }`}
                  style={isCompleted && customColor ? { backgroundColor: customColor, borderColor: customColor } : undefined}
                  initial={false}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </motion.div>
                <span className={`mt-2 text-xs ${isCurrent ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Circular progress variant
export interface CircularProgressProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  color?: ProgressBarProps['color'];
  customColor?: string;
  showLabel?: boolean;
  indeterminate?: boolean;
}

export function CircularProgress({
  value = 0,
  size = 80,
  strokeWidth = 8,
  color = 'blue',
  customColor,
  showLabel = true,
  indeterminate = false,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const strokeColor = customColor || (color !== 'custom' ? undefined : '#3B82F6');

  if (indeterminate) {
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <motion.svg
          width={size}
          height={size}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            className="text-gray-200 dark:text-gray-700"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={colorMap[color].bg.replace('bg-', 'text-')}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.75}
            strokeLinecap="round"
            stroke={strokeColor || 'currentColor'}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </motion.svg>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          className={colorMap[color].bg.replace('bg-', 'text-')}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          strokeLinecap="round"
          stroke={strokeColor || 'currentColor'}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {Math.round(value)}%
          </span>
        </div>
      )}
    </div>
  );
}
