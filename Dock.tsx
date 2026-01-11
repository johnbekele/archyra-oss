/**
 * Dock - macOS-style Animated Dock Navigation
 *
 * A beautiful dock component inspired by macOS with magnification
 * effect on hover. Icons scale up smoothly as the cursor approaches,
 * creating an engaging navigation experience.
 *
 * @example
 * ```tsx
 * import { Dock, DockItem } from 'archyra';
 * import { Home, Settings, User } from 'lucide-react';
 *
 * <Dock>
 *   <DockItem icon={<Home />} label="Home" onClick={() => {}} />
 *   <DockItem icon={<Settings />} label="Settings" onClick={() => {}} />
 *   <DockItem icon={<User />} label="Profile" onClick={() => {}} />
 * </Dock>
 * ```
 */

'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, MotionValue } from 'framer-motion';
import { useRef, ReactNode, Children, cloneElement, isValidElement, useState } from 'react';

export interface DockProps {
  /** Dock items */
  children: ReactNode;
  /** Magnification factor (how much items scale) */
  magnification?: number;
  /** Distance for magnification effect (pixels from cursor) */
  distance?: number;
  /** Base icon size */
  baseSize?: number;
  /** Dock position */
  position?: 'bottom' | 'top' | 'left' | 'right';
  /** Dock background style */
  variant?: 'glass' | 'solid' | 'transparent';
  /** Show labels on hover */
  showLabels?: boolean;
  /** Gap between items */
  gap?: number;
  /** Padding inside dock */
  padding?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Dock - Main dock container component
 */
export default function Dock({
  children,
  magnification = 1.5,
  distance = 150,
  baseSize = 48,
  position = 'bottom',
  variant = 'glass',
  showLabels = true,
  gap = 8,
  padding = 8,
  className = '',
}: DockProps) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const isVertical = position === 'left' || position === 'right';

  // Background variants
  const backgroundClasses = {
    glass: 'bg-white/10 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50',
    solid: 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg',
    transparent: 'bg-transparent',
  };

  // Position classes
  const positionClasses = {
    bottom: 'fixed bottom-4 left-1/2 -translate-x-1/2',
    top: 'fixed top-4 left-1/2 -translate-x-1/2',
    left: 'fixed left-4 top-1/2 -translate-y-1/2',
    right: 'fixed right-4 top-1/2 -translate-y-1/2',
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (isVertical) {
      mouseY.set(e.clientY - rect.top);
      mouseX.set(e.clientX - rect.left);
    } else {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    mouseY.set(Infinity);
  };

  // Clone children and inject props
  const items = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<DockItemInternalProps>, {
        mouseX: isVertical ? mouseY : mouseX,
        baseSize,
        magnification: prefersReducedMotion ? 1 : magnification,
        distance,
        index,
        showLabel: showLabels,
        isVertical,
      });
    }
    return child;
  });

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        flex items-end justify-center rounded-2xl
        ${isVertical ? 'flex-col items-center' : 'flex-row items-end'}
        ${backgroundClasses[variant]}
        ${positionClasses[position]}
        ${className}
      `}
      style={{
        gap,
        padding,
      }}
      initial={{ opacity: 0, y: position === 'bottom' ? 50 : position === 'top' ? -50 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {items}
    </motion.div>
  );
}

/**
 * DockItem - Individual dock icon
 */
export interface DockItemProps {
  /** Icon element */
  icon: ReactNode;
  /** Label text */
  label?: string;
  /** Click handler */
  onClick?: () => void;
  /** Link href (alternative to onClick) */
  href?: string;
  /** Active state */
  isActive?: boolean;
  /** Show active indicator dot */
  showIndicator?: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Additional classes */
  className?: string;
}

interface DockItemInternalProps extends DockItemProps {
  mouseX?: MotionValue<number>;
  baseSize?: number;
  magnification?: number;
  distance?: number;
  index?: number;
  showLabel?: boolean;
  isVertical?: boolean;
}

export function DockItem({
  icon,
  label,
  onClick,
  href,
  isActive = false,
  showIndicator = true,
  backgroundColor,
  className = '',
  mouseX,
  baseSize = 48,
  magnification = 1.5,
  distance = 150,
  index = 0,
  showLabel = true,
  isVertical = false,
}: DockItemInternalProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate distance from mouse to center of item
  const distanceFromMouse = useTransform(mouseX || useMotionValue(Infinity), (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseSize, y: 0, height: baseSize };
    const center = isVertical
      ? bounds.y + bounds.height / 2
      : bounds.x + bounds.width / 2;
    return val - center + (isVertical ? bounds.y : bounds.x);
  });

  // Scale based on distance
  const scale = useTransform(distanceFromMouse, [-distance, 0, distance], [1, magnification, 1]);
  const springScale = useSpring(scale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const size = useTransform(springScale, (s) => s * baseSize);

  const Component = href ? 'a' : 'button';
  const componentProps = href ? { href } : { onClick };

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip label */}
      {showLabel && label && (
        <motion.div
          className={`
            absolute ${isVertical ? 'left-full ml-3' : 'bottom-full mb-2'}
            px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap
            bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900
            pointer-events-none
          `}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
            y: isHovered ? 0 : 5,
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
        >
          {label}
        </motion.div>
      )}

      {/* Icon button */}
      <Component
        {...componentProps}
        className={`
          w-full h-full flex items-center justify-center rounded-xl
          transition-colors cursor-pointer
          ${backgroundColor || 'bg-white/80 dark:bg-zinc-800/80'}
          hover:bg-white dark:hover:bg-zinc-700
          shadow-sm hover:shadow-md
          ${className}
        `}
      >
        <motion.div
          className="flex items-center justify-center"
          style={{
            width: useTransform(size, (s) => s * 0.5),
            height: useTransform(size, (s) => s * 0.5),
          }}
        >
          {icon}
        </motion.div>
      </Component>

      {/* Active indicator */}
      {showIndicator && isActive && (
        <motion.div
          className={`
            absolute ${isVertical ? 'right-0 top-1/2 -translate-y-1/2 -mr-2' : 'bottom-0 left-1/2 -translate-x-1/2 -mb-2'}
            w-1 h-1 rounded-full bg-primary
          `}
          layoutId="dock-indicator"
        />
      )}
    </motion.div>
  );
}

/**
 * DockDivider - Separator between dock item groups
 */
export function DockDivider({
  className = '',
  isVertical = false,
}: {
  className?: string;
  isVertical?: boolean;
}) {
  return (
    <div
      className={`
        ${isVertical ? 'w-8 h-px' : 'w-px h-8'}
        bg-gray-300 dark:bg-zinc-600 mx-1
        ${className}
      `}
    />
  );
}

/**
 * FloatingDock - Pre-styled floating dock
 */
export function FloatingDock({
  children,
  className = '',
  ...props
}: DockProps) {
  return (
    <Dock
      variant="glass"
      position="bottom"
      className={className}
      {...props}
    >
      {children}
    </Dock>
  );
}

/**
 * DockStatic - Non-animated dock for mobile or reduced motion
 */
export interface DockStaticProps {
  /** Dock items */
  items: Array<{
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    href?: string;
    isActive?: boolean;
  }>;
  /** Icon size */
  size?: number;
  /** Variant */
  variant?: 'glass' | 'solid' | 'transparent';
  /** Position */
  position?: 'bottom' | 'top';
  /** Additional classes */
  className?: string;
}

export function DockStatic({
  items,
  size = 44,
  variant = 'glass',
  position = 'bottom',
  className = '',
}: DockStaticProps) {
  const backgroundClasses = {
    glass: 'bg-white/10 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/20',
    solid: 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-lg',
    transparent: 'bg-transparent',
  };

  const positionClasses = {
    bottom: 'fixed bottom-4 left-1/2 -translate-x-1/2',
    top: 'fixed top-4 left-1/2 -translate-x-1/2',
  };

  return (
    <div
      className={`
        flex items-center gap-2 p-2 rounded-2xl
        ${backgroundClasses[variant]}
        ${positionClasses[position]}
        ${className}
      `}
    >
      {items.map((item, i) => {
        const Component = item.href ? 'a' : 'button';
        const props = item.href ? { href: item.href } : { onClick: item.onClick };

        return (
          <Component
            key={i}
            {...props}
            className={`
              flex items-center justify-center rounded-xl
              bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700
              shadow-sm transition-colors
              ${item.isActive ? 'ring-2 ring-primary' : ''}
            `}
            style={{ width: size, height: size }}
            title={item.label}
          >
            <div className="w-5 h-5">{item.icon}</div>
          </Component>
        );
      })}
    </div>
  );
}

/**
 * DockMobile - Mobile-friendly bottom navigation dock
 */
export interface DockMobileProps {
  items: Array<{
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    href?: string;
    isActive?: boolean;
  }>;
  /** Show labels under icons */
  showLabels?: boolean;
  /** Additional classes */
  className?: string;
}

export function DockMobile({
  items,
  showLabels = true,
  className = '',
}: DockMobileProps) {
  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        flex items-center justify-around
        bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800
        px-4 py-2 safe-bottom
        ${className}
      `}
    >
      {items.map((item, i) => {
        const Component = item.href ? 'a' : 'button';
        const props = item.href ? { href: item.href } : { onClick: item.onClick };

        return (
          <Component
            key={i}
            {...props}
            className={`
              flex flex-col items-center justify-center gap-1 py-1 px-3
              rounded-lg transition-colors
              ${item.isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
              }
            `}
          >
            <div className="w-6 h-6">{item.icon}</div>
            {showLabels && (
              <span className="text-xs font-medium">{item.label}</span>
            )}
          </Component>
        );
      })}
    </div>
  );
}

// Named export
export { Dock };
