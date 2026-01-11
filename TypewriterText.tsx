/**
 * TypewriterText - Animated Typewriter Text Effect
 *
 * Creates a realistic typewriter effect that types out text character
 * by character. Supports multiple strings with delete animation,
 * cursor customization, and loop control.
 *
 * @example
 * ```tsx
 * import { TypewriterText } from 'archyra';
 *
 * <TypewriterText
 *   words={['Hello World', 'Welcome', 'Get Started']}
 *   typingSpeed={100}
 *   deletingSpeed={50}
 *   loop
 * />
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useCallback, ReactNode } from 'react';

export interface TypewriterTextProps {
  /** Array of words/phrases to type */
  words: string[];
  /** Typing speed in milliseconds per character */
  typingSpeed?: number;
  /** Deleting speed in milliseconds per character */
  deletingSpeed?: number;
  /** Delay before starting to delete (ms) */
  deleteDelay?: number;
  /** Delay before typing next word (ms) */
  startDelay?: number;
  /** Whether to loop through words */
  loop?: boolean;
  /** Show blinking cursor */
  showCursor?: boolean;
  /** Custom cursor character */
  cursor?: string;
  /** Cursor blink speed in ms */
  cursorBlinkSpeed?: number;
  /** Callback when a word is fully typed */
  onWordComplete?: (word: string, index: number) => void;
  /** Callback when all words are complete (only fires if loop=false) */
  onComplete?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Text wrapper element */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

/**
 * TypewriterText - Main typewriter effect component
 */
export default function TypewriterText({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  deleteDelay = 2000,
  startDelay = 500,
  loop = true,
  showCursor = true,
  cursor = '|',
  cursorBlinkSpeed = 530,
  onWordComplete,
  onComplete,
  className = '',
  as: Component = 'span',
}: TypewriterTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // If reduced motion, show first word statically
  if (prefersReducedMotion) {
    return (
      <Component className={className}>
        {words[0]}
        {showCursor && <span className="opacity-70">{cursor}</span>}
      </Component>
    );
  }

  const currentWord = words[wordIndex];

  useEffect(() => {
    if (isComplete || isWaiting) return;

    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting characters
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        // Done deleting, move to next word
        setIsDeleting(false);
        setWordIndex(prev => {
          const nextIndex = (prev + 1) % words.length;
          // Check if we've completed all words (non-loop mode)
          if (!loop && prev === words.length - 1) {
            setIsComplete(true);
            onComplete?.();
            return prev;
          }
          return nextIndex;
        });
        setIsWaiting(true);
        timeout = setTimeout(() => setIsWaiting(false), startDelay);
      }
    } else {
      // Typing characters
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(prev => currentWord.slice(0, prev.length + 1));
        }, typingSpeed);
      } else {
        // Done typing this word
        onWordComplete?.(currentWord, wordIndex);

        if (!loop && wordIndex === words.length - 1) {
          // Last word in non-loop mode, don't delete
          setIsComplete(true);
          onComplete?.();
        } else {
          // Wait then start deleting
          setIsWaiting(true);
          timeout = setTimeout(() => {
            setIsWaiting(false);
            setIsDeleting(true);
          }, deleteDelay);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isWaiting, isComplete, currentWord, wordIndex, words.length, typingSpeed, deletingSpeed, deleteDelay, startDelay, loop, onWordComplete, onComplete]);

  return (
    <Component className={className}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: cursorBlinkSpeed / 1000,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="inline-block ml-0.5"
        >
          {cursor}
        </motion.span>
      )}
    </Component>
  );
}

/**
 * TypewriterTextGradient - Typewriter with gradient text
 */
export interface TypewriterTextGradientProps extends TypewriterTextProps {
  /** Gradient colors */
  gradientColors?: string[];
  /** Gradient direction */
  gradientDirection?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
}

export function TypewriterTextGradient({
  gradientColors = ['#6366f1', '#a855f7', '#ec4899'],
  gradientDirection = 'to-r',
  className = '',
  ...props
}: TypewriterTextGradientProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientDirection.replace('to-', 'to ')}, ${gradientColors.join(', ')})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <span style={gradientStyle} className={className}>
      <TypewriterText {...props} showCursor={false} />
      {props.showCursor !== false && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.53, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block ml-0.5 text-current"
          style={{ WebkitTextFillColor: gradientColors[0] }}
        >
          {props.cursor || '|'}
        </motion.span>
      )}
    </span>
  );
}

/**
 * TypewriterTextMultiline - Typewriter that reveals multiple lines
 */
export interface TypewriterTextMultilineProps {
  /** Array of lines to reveal */
  lines: string[];
  /** Delay between lines (ms) */
  lineDelay?: number;
  /** Typing speed per character (ms) */
  typingSpeed?: number;
  /** Show cursor on current line */
  showCursor?: boolean;
  /** Custom cursor */
  cursor?: string;
  /** Line component wrapper */
  lineClassName?: string;
  /** Container className */
  className?: string;
  /** Callback when all lines are typed */
  onComplete?: () => void;
}

export function TypewriterTextMultiline({
  lines,
  lineDelay = 500,
  typingSpeed = 50,
  showCursor = true,
  cursor = '|',
  lineClassName = '',
  className = '',
  onComplete,
}: TypewriterTextMultilineProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  // If reduced motion, show all lines
  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <div key={i} className={lineClassName}>{line}</div>
        ))}
      </div>
    );
  }

  useEffect(() => {
    if (isComplete) return;

    const currentLine = lines[currentLineIndex];

    if (currentText.length < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => currentLine.slice(0, prev.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      // Line complete
      if (currentLineIndex < lines.length - 1) {
        const timeout = setTimeout(() => {
          setCompletedLines(prev => [...prev, currentLine]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentText('');
        }, lineDelay);
        return () => clearTimeout(timeout);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    }
  }, [currentText, currentLineIndex, lines, typingSpeed, lineDelay, isComplete, onComplete]);

  return (
    <div className={className}>
      {completedLines.map((line, i) => (
        <div key={i} className={lineClassName}>{line}</div>
      ))}
      <div className={lineClassName}>
        {currentText}
        {showCursor && !isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.53, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block ml-0.5"
          >
            {cursor}
          </motion.span>
        )}
      </div>
    </div>
  );
}

/**
 * TypewriterTextDelete - Single text with type and delete animation
 */
export interface TypewriterTextDeleteProps {
  /** Text to display */
  text: string;
  /** Whether to auto-delete after typing */
  autoDelete?: boolean;
  /** Typing speed (ms per char) */
  typingSpeed?: number;
  /** Delete speed (ms per char) */
  deleteSpeed?: number;
  /** Delay before deleting */
  deleteDelay?: number;
  /** Show cursor */
  showCursor?: boolean;
  /** Cursor character */
  cursor?: string;
  /** Additional classes */
  className?: string;
  /** Called when typing complete */
  onTypingComplete?: () => void;
  /** Called when deletion complete */
  onDeleteComplete?: () => void;
}

export function TypewriterTextDelete({
  text,
  autoDelete = false,
  typingSpeed = 80,
  deleteSpeed = 40,
  deleteDelay = 2000,
  showCursor = true,
  cursor = '|',
  className = '',
  onTypingComplete,
  onDeleteComplete,
}: TypewriterTextDeleteProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting' | 'done'>('typing');

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {text}
        {showCursor && <span className="opacity-70">{cursor}</span>}
      </span>
    );
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    switch (phase) {
      case 'typing':
        if (displayText.length < text.length) {
          timeout = setTimeout(() => {
            setDisplayText(text.slice(0, displayText.length + 1));
          }, typingSpeed);
        } else {
          onTypingComplete?.();
          if (autoDelete) {
            setPhase('waiting');
            timeout = setTimeout(() => setPhase('deleting'), deleteDelay);
          } else {
            setPhase('done');
          }
        }
        break;

      case 'deleting':
        if (displayText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
          }, deleteSpeed);
        } else {
          setPhase('done');
          onDeleteComplete?.();
        }
        break;
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, text, typingSpeed, deleteSpeed, deleteDelay, autoDelete, onTypingComplete, onDeleteComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && phase !== 'done' && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.53, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block ml-0.5"
        >
          {cursor}
        </motion.span>
      )}
    </span>
  );
}

// Named exports for convenience
export { TypewriterText };
