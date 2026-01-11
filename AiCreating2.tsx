/**
 * @fileoverview AiCreating2 - AI Brain Processing Animation Component
 *
 * A modern, customizable AI processing animation featuring a central brain icon
 * with rotating rings, floating particles, and cycling status messages.
 * Ideal for AI/ML processing states, plan generation, or any async AI operations.
 *
 * @module AiCreating2
 * @requires react
 * @requires framer-motion
 * @requires lucide-react
 *
 * @example
 * // Basic usage - full-screen overlay
 * <AiCreating2 isLoading={true} />
 *
 * @example
 * // Contained mode with custom colors
 * <AiCreating2
 *   isLoading={isProcessing}
 *   contained={true}
 *   primaryColor="#10B981"
 *   backgroundColor="#1F2937"
 *   message="Analyzing data..."
 * />
 *
 * @example
 * // Custom status messages
 * <AiCreating2
 *   isLoading={true}
 *   statusMessages={[
 *     { icon: 'brain', text: 'Processing input' },
 *     { icon: 'zap', text: 'Running inference' },
 *     { icon: 'sparkles', text: 'Generating output' }
 *   ]}
 *   onComplete={() => setShowResults(true)}
 * />
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Zap } from 'lucide-react';

/**
 * Available icon types for status messages.
 * Maps to lucide-react icon components.
 *
 * @typedef {'sparkles' | 'brain' | 'zap'} StatusIconType
 */
type StatusIconType = 'sparkles' | 'brain' | 'zap';

/**
 * Status message configuration for cycling display.
 *
 * @interface StatusMessage
 * @property {StatusIconType} icon - Icon to display (sparkles, brain, or zap)
 * @property {string} text - Message text to display
 */
interface StatusMessage {
  icon: StatusIconType;
  text: string;
}

/**
 * Props for the AiCreating2 component.
 *
 * @interface AiCreating2Props
 */
export interface AiCreating2Props {
  /**
   * Controls whether the animation is visible and running.
   * When true, displays the animation overlay/container.
   * Uses AnimatePresence for smooth enter/exit transitions.
   *
   * @type {boolean}
   * @required
   */
  isLoading: boolean;

  /**
   * Callback function invoked when animation sequence completes.
   * Note: Currently not auto-triggered; implement timing logic externally.
   *
   * @type {() => void}
   * @optional
   */
  onComplete?: () => void;

  /**
   * Primary message displayed prominently below the brain animation.
   *
   * @type {string}
   * @default "Creating your plan..."
   */
  message?: string;

  /**
   * Secondary message displayed in smaller text below the main message.
   *
   * @type {string}
   * @default "AI is analyzing your goals and building a personalized plan"
   */
  subMessage?: string;

  /**
   * Primary accent color for animations, rings, and icons (hex format).
   * Applied to rotating rings, floating particles, and icon coloring.
   *
   * @type {string}
   * @default "#6366F1" (Indigo)
   */
  primaryColor?: string;

  /**
   * Background color for the overlay/container (hex format).
   *
   * @type {string}
   * @default "#0f172a" (Slate 900)
   */
  backgroundColor?: string;

  /**
   * Text color for messages (hex format).
   * Sub-messages use 60% opacity of this color.
   *
   * @type {string}
   * @default "#ffffff"
   */
  textColor?: string;

  /**
   * Rendering mode: contained box vs full-screen overlay.
   * - false: Fixed full-screen overlay (z-index: 70)
   * - true: Relative container (min-height: 400px, rounded corners)
   *
   * @type {boolean}
   * @default false
   */
  contained?: boolean;

  /**
   * Array of status messages that cycle during animation.
   * Each message displays with its icon for ~4 seconds before fading.
   *
   * @type {StatusMessage[]}
   * @default [
   *   { icon: 'sparkles', text: 'Analyzing your goals' },
   *   { icon: 'brain', text: 'Designing daily structure' },
   *   { icon: 'zap', text: 'Generating action items' }
   * ]
   */
  statusMessages?: StatusMessage[];
}

/**
 * Icon component mapping for status messages.
 * Maps string icon names to their lucide-react component equivalents.
 *
 * @constant
 * @type {Record<StatusIconType, React.ComponentType>}
 */
const iconMap: Record<StatusIconType, typeof Sparkles | typeof Brain | typeof Zap> = {
  sparkles: Sparkles,
  brain: Brain,
  zap: Zap,
};

/**
 * AiCreating2 - AI Brain Processing Animation Component
 *
 * Renders a sophisticated AI processing animation with a central brain icon,
 * rotating concentric rings, floating particles, and cycling status messages.
 *
 * @component
 * @param {AiCreating2Props} props - Component props
 * @returns {JSX.Element} The animated AI brain visualization
 *
 * @description
 * Animation Elements:
 * - Outer ring: Rotates 360° over 8 seconds (linear, infinite)
 * - Middle ring: Pulses scale 1→1.1→1 over 2 seconds
 * - Inner ring: Counter-rotates -360° over 12 seconds with gradient
 * - Center brain icon: Pulses scale 1→1.05→1 over 1.5 seconds
 * - 6 floating particles: Orbit outward with staggered 0.3s delays
 * - 5 progress dots: Wave animation with 0.15s stagger
 * - Status messages: Cycle with 2-second delays between items
 *
 * Color Customization:
 * - primaryColor: Rings, particles, icons, progress dots
 * - backgroundColor: Full container/overlay background
 * - textColor: Main message (full opacity), sub-message (60% opacity)
 */
export function AiCreating2({
  isLoading,
  onComplete,
  message = "Creating your plan...",
  subMessage = "AI is analyzing your goals and building a personalized plan",
  primaryColor = "#6366F1",
  backgroundColor = "transparent",
  textColor = "#ffffff",
  contained = false,
  statusMessages = [
    { icon: 'sparkles', text: 'Analyzing your goals' },
    { icon: 'brain', text: 'Designing daily structure' },
    { icon: 'zap', text: 'Generating action items' },
  ],
}: AiCreating2Props): JSX.Element {

  /**
   * Container CSS class based on rendering mode.
   * - Contained: Relative positioning, min-height, rounded corners
   * - Full-screen: Fixed overlay with z-index 70
   */
  const containerClass = contained
    ? "relative w-full h-full min-h-[400px] rounded-xl flex items-center justify-center overflow-hidden"
    : "fixed inset-0 z-[70] flex items-center justify-center";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={containerClass}
          style={{ background: backgroundColor === 'transparent' ? 'none' : backgroundColor }}
        >
          <div className="text-center max-w-md px-6">
            {/* Animated AI Brain */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `2px solid ${primaryColor}30` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Middle pulsing ring */}
              <motion.div
                className="absolute inset-2 rounded-full"
                style={{ border: `2px solid ${primaryColor}80` }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Inner ring with gradient */}
              <motion.div
                className="absolute inset-4 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}40, ${primaryColor}10)`
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Center icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain className="w-12 h-12" style={{ color: primaryColor }} />
              </motion.div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    backgroundColor: primaryColor,
                  }}
                  animate={{
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>

            {/* Text */}
            <motion.h3
              className="text-2xl font-bold mb-3"
              style={textColor === 'inherit' ? {} : { color: textColor }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {message}
            </motion.h3>

            <motion.p
              className="text-sm mb-6"
              style={textColor === 'inherit' ? { opacity: 0.6 } : { color: `${textColor}99` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {subMessage}
            </motion.p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>

            {/* Status messages */}
            <motion.div
              className="mt-8 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {statusMessages.map((status, index) => {
                const Icon = iconMap[status.icon];
                return (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center gap-2 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: [0, 1, 1, 0.5], x: 0 }}
                    transition={{
                      delay: index * 2,
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: (statusMessages.length - 1) * 2 + 4
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: primaryColor }} />
                    <span style={textColor === 'inherit' ? { opacity: 0.6 } : { color: `${textColor}99` }}>{status.text}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AiCreating2;
