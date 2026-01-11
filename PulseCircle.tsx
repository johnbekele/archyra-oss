/**
 * @fileoverview PulseCircle - Circular Progress Animation Component
 *
 * An SVG-based circular progress indicator with expanding pulse rings
 * and percentage display. Features automatic progress simulation or
 * external progress control. Ideal for upload/download progress,
 * processing states, or completion indicators.
 *
 * @module PulseCircle
 * @requires react
 * @requires framer-motion
 *
 * @example
 * // Basic usage with auto-progressing animation
 * <PulseCircle isActive={true} />
 *
 * @example
 * // External progress control (e.g., file upload)
 * <PulseCircle
 *   isActive={isUploading}
 *   progress={uploadProgress}
 *   onComplete={() => showSuccessMessage()}
 * />
 *
 * @example
 * // Processing state with completion callback
 * const [isProcessing, setIsProcessing] = useState(true);
 * <PulseCircle
 *   isActive={isProcessing}
 *   onComplete={() => {
 *     setIsProcessing(false);
 *     navigateToResults();
 *   }}
 * />
 */

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Props for the PulseCircle component.
 *
 * @interface PulseCircleProps
 */
export interface PulseCircleProps {
  /**
   * Controls whether the animation is running.
   * When true, displays pulse rings and progress animation.
   * When false, resets to "Ready" state.
   *
   * @type {boolean}
   * @required
   */
  isActive: boolean;

  /**
   * External progress value (0-100).
   * If provided, overrides internal auto-progress simulation.
   * Use for controlled progress scenarios (uploads, downloads).
   *
   * @type {number}
   * @default 0 (uses internal auto-progress)
   */
  progress?: number;

  /**
   * Callback function invoked when progress reaches 100%.
   * Called once when internal or external progress hits 100.
   *
   * @type {() => void}
   * @optional
   */
  onComplete?: () => void;
}

/**
 * PulseCircle - Circular Progress Animation Component
 *
 * Renders an SVG circle with animated progress fill, expanding pulse rings,
 * and a percentage counter. Shows completion checkmark at 100%.
 *
 * @component
 * @param {PulseCircleProps} props - Component props
 * @returns {JSX.Element} Circular progress visualization
 *
 * @description
 * Visual Elements:
 * - Outer pulse rings: Two concentric rings expanding outward (scale 1→1.8)
 * - Progress circle: SVG path with gradient fill (indigo → purple)
 * - Center display: Percentage number with pulsing animation
 * - Completion overlay: Green circle with animated checkmark
 *
 * Animation Details:
 * - Pulse rings: 2-second cycle, 0.5s stagger between rings
 * - Auto-progress: Increments by 2% every 100ms (~5 seconds to complete)
 * - Progress stroke: 0.5s transition for smooth updates
 * - Checkmark: SVG path drawing animation on completion
 *
 * SVG Specifications:
 * - Circle radius: 50px (within 128x128 container)
 * - Stroke width: 8px
 * - Gradient ID: "gradient" (indigo #6366F1 → purple #A855F7)
 */
export default function PulseCircle({ isActive, progress = 0, onComplete }: PulseCircleProps): JSX.Element {
  /**
   * Internal progress state for auto-simulation mode.
   * Increments by 2 every 100ms when isActive is true.
   */
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (isActive && internalProgress < 100) {
      const timer = setTimeout(() => {
        setInternalProgress(prev => Math.min(prev + 2, 100));
      }, 100);
      return () => clearTimeout(timer);
    } else if (!isActive) {
      setInternalProgress(0);
    } else if (internalProgress >= 100) {
      onComplete?.();
    }
  }, [isActive, internalProgress, onComplete]);

  const currentProgress = progress || internalProgress;
  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = circumference - (currentProgress / 100) * circumference;

  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        {/* Outer Pulse Rings */}
        {isActive && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-blue-400"
              animate={{
                scale: [1, 1.8],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-purple-400"
              animate={{
                scale: [1, 1.6],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
              }}
            />
          </>
        )}

        {/* Main Circle */}
        <div className="relative w-32 h-32">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="50"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="64"
              cy="64"
              r="50"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5 }}
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={isActive ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-3xl font-bold text-gray-900"
            >
              {Math.round(currentProgress)}%
            </motion.div>
            <div className="text-xs text-gray-500 mt-1">
              {isActive ? 'Processing' : 'Ready'}
            </div>
          </div>
        </div>

        {/* Completion Checkmark */}
        {currentProgress >= 100 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center">
              <motion.svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
