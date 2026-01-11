/**
 * @fileoverview CodeTyping - Code Generation Animation Component
 *
 * A typewriter-style animation component that simulates AI code generation.
 * Features a terminal-style window with syntax display and progress bar.
 * Ideal for showcasing AI coding capabilities or code generation processes.
 *
 * @module CodeTyping
 * @requires react
 * @requires framer-motion
 *
 * @example
 * // Basic usage
 * <CodeTyping isTyping={true} />
 *
 * @example
 * // With completion callback
 * <CodeTyping
 *   isTyping={isGenerating}
 *   onComplete={() => setShowOutput(true)}
 * />
 *
 * @example
 * // Controlled typing state
 * const [isTyping, setIsTyping] = useState(false);
 * <button onClick={() => setIsTyping(true)}>Generate Code</button>
 * <CodeTyping isTyping={isTyping} onComplete={() => setIsTyping(false)} />
 */

'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * Props for the CodeTyping component.
 *
 * @interface CodeTypingProps
 */
export interface CodeTypingProps {
  /**
   * Controls whether the typing animation is active.
   * When true, starts typing character by character.
   * When false, resets the displayed code to empty.
   *
   * @type {boolean}
   * @required
   */
  isTyping: boolean;

  /**
   * Callback function invoked when typing animation completes.
   * Called after the last character has been typed.
   *
   * @type {() => void}
   * @optional
   */
  onComplete?: () => void;
}

/**
 * CodeTyping - Code Generation Animation Component
 *
 * Simulates AI code generation with a typewriter effect inside a
 * terminal-style window. Includes animated cursor and progress bar.
 *
 * @component
 * @param {CodeTypingProps} props - Component props
 * @returns {JSX.Element} Terminal window with typing animation
 *
 * @description
 * Animation Details:
 * - Typing speed: 50ms per character
 * - Cursor: Blinking blue bar (0.8s opacity cycle)
 * - Progress bar: Gradient from blue to purple, width tracks completion
 * - Window: Dark theme (gray-900) with colored header dots
 *
 * Sample Code Displayed:
 * ```javascript
 * function generateAI() {
 *   const model = await load();
 *   const result = model.predict();
 *   return result;
 * }
 * ```
 *
 * State Management:
 * - displayedCode: Currently visible portion of the code
 * - currentIndex: Character position in the full code string
 */
export default function CodeTyping({ isTyping, onComplete }: CodeTypingProps): JSX.Element {
  /** Currently displayed portion of the code (progressive reveal) */
  const [displayedCode, setDisplayedCode] = useState('');

  /** Current character index being typed */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Sample code that gets "typed" character by character.
   * Demonstrates a simple AI/ML function structure.
   */
  const fullCode = `function generateAI() {
  const model = await load();
  const result = model.predict();
  return result;
}`;

  useEffect(() => {
    if (isTyping && currentIndex < fullCode.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(fullCode.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);

      return () => clearTimeout(timer);
    } else if (!isTyping) {
      setDisplayedCode('');
      setCurrentIndex(0);
    } else if (currentIndex >= fullCode.length) {
      onComplete?.();
    }
  }, [isTyping, currentIndex, fullCode, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-lg p-6 shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-gray-400 text-sm">code-generator.js</span>
        </div>

        {/* Code Content */}
        <div className="font-mono text-sm">
          <pre className="text-gray-100">
            <code>{displayedCode}</code>
            {isTyping && currentIndex < fullCode.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-blue-500 ml-1"
              />
            )}
          </pre>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: isTyping ? `${(currentIndex / fullCode.length) * 100}%` : '0%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
