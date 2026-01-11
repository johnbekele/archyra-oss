/**
 * ChatTyping Component
 *
 * Animated typing indicator showing bouncing dots.
 * Perfect for showing when someone is typing in a chat.
 *
 * @example
 * ```tsx
 * <ChatTyping
 *   isTyping={true}
 *   variant="dots"
 *   color="gray"
 * />
 * ```
 *
 * @param isTyping - Whether to show the typing indicator
 * @param variant - Animation style: 'dots', 'pulse', 'wave'
 * @param color - Dot color theme
 * @param showAvatar - Whether to show an avatar
 * @param avatarUrl - URL for the avatar image
 * @param userName - Name to show below avatar
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ChatTypingProps {
  isTyping?: boolean;
  variant?: 'dots' | 'pulse' | 'wave';
  color?: 'gray' | 'blue' | 'green' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showAvatar?: boolean;
  avatarUrl?: string;
  userName?: string;
  className?: string;
}

const colorMap = {
  gray: 'bg-gray-400',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
};

const sizeMap = {
  sm: { dot: 'w-1.5 h-1.5', container: 'px-3 py-2', gap: 'gap-1' },
  md: { dot: 'w-2 h-2', container: 'px-4 py-3', gap: 'gap-1.5' },
  lg: { dot: 'w-2.5 h-2.5', container: 'px-5 py-4', gap: 'gap-2' },
};

// Dots variant - bouncing dots
const DotsAnimation = ({ color, size }: { color: string; size: 'sm' | 'md' | 'lg' }) => {
  const dotClass = `${sizeMap[size].dot} ${colorMap[color as keyof typeof colorMap]} rounded-full`;

  return (
    <div className={`flex items-center ${sizeMap[size].gap}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={dotClass}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Pulse variant - pulsing dots
const PulseAnimation = ({ color, size }: { color: string; size: 'sm' | 'md' | 'lg' }) => {
  const dotClass = `${sizeMap[size].dot} ${colorMap[color as keyof typeof colorMap]} rounded-full`;

  return (
    <div className={`flex items-center ${sizeMap[size].gap}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={dotClass}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Wave variant - wave motion
const WaveAnimation = ({ color, size }: { color: string; size: 'sm' | 'md' | 'lg' }) => {
  const dotClass = `${sizeMap[size].dot} ${colorMap[color as keyof typeof colorMap]} rounded-full`;

  return (
    <div className={`flex items-center ${sizeMap[size].gap}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={dotClass}
          animate={{
            y: [0, -4, 0, 4, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default function ChatTyping({
  isTyping = true,
  variant = 'dots',
  color = 'gray',
  size = 'md',
  showAvatar = false,
  avatarUrl,
  userName,
  className = '',
}: ChatTypingProps) {
  const AnimationComponent = {
    dots: DotsAnimation,
    pulse: PulseAnimation,
    wave: WaveAnimation,
  }[variant];

  return (
    <AnimatePresence>
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`flex items-end gap-2 ${className}`}
        >
          {showAvatar && (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden flex-shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={userName || 'User'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">
                    {userName?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              {userName && (
                <span className="text-[10px] text-gray-400 mt-0.5">{userName}</span>
              )}
            </div>
          )}

          <div
            className={`
              bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md
              ${sizeMap[size].container}
              shadow-sm
            `}
          >
            <AnimationComponent color={color} size={size} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Preset: Typing indicator with text
export function ChatTypingWithText({
  text = 'typing...',
  ...props
}: ChatTypingProps & { text?: string }) {
  return (
    <div className="flex items-center gap-2">
      <ChatTyping {...props} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-gray-400 italic"
      >
        {text}
      </motion.span>
    </div>
  );
}

// Preset: Multiple users typing
export function ChatMultipleTyping({
  users = [],
  maxDisplay = 3,
  ...props
}: ChatTypingProps & { users?: { name: string; avatar?: string }[]; maxDisplay?: number }) {
  const displayUsers = users.slice(0, maxDisplay);
  const remaining = users.length - maxDisplay;

  if (users.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <div className="flex -space-x-2">
        {displayUsers.map((user, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 overflow-hidden"
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-[10px] font-medium">
                {user.name[0]?.toUpperCase()}
              </div>
            )}
          </div>
        ))}
        {remaining > 0 && (
          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-500 border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] text-gray-600 dark:text-gray-300">
            +{remaining}
          </div>
        )}
      </div>
      <ChatTyping {...props} size="sm" />
      <span className="text-xs text-gray-400">
        {users.length === 1
          ? `${users[0].name} is typing...`
          : `${displayUsers.map((u) => u.name).join(', ')}${remaining > 0 ? ` and ${remaining} more` : ''} are typing...`}
      </span>
    </motion.div>
  );
}
