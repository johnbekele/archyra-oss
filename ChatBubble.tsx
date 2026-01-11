/**
 * ChatBubble Component
 *
 * Animated chat message bubble with smooth entrance animations.
 * Supports sender/receiver variants, different colors, and customizable styles.
 *
 * @example
 * ```tsx
 * <ChatBubble
 *   message="Hello! How are you?"
 *   variant="sender"
 *   color="blue"
 *   animate={true}
 * />
 * ```
 *
 * @param message - The text content of the message
 * @param variant - 'sender' (right-aligned) or 'receiver' (left-aligned)
 * @param color - Color theme: 'blue', 'green', 'purple', 'gray'
 * @param animate - Whether to animate on mount (default: true)
 * @param timestamp - Optional timestamp to display
 * @param status - Message status: 'sending', 'sent', 'delivered', 'read'
 * @param className - Additional CSS classes
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock } from 'lucide-react';

export interface ChatBubbleProps {
  message: string;
  variant?: 'sender' | 'receiver';
  color?: 'blue' | 'green' | 'purple' | 'gray' | 'gradient';
  animate?: boolean;
  timestamp?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  className?: string;
  delay?: number;
}

const colorStyles = {
  blue: {
    sender: 'bg-blue-500 text-white',
    receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white',
  },
  green: {
    sender: 'bg-green-500 text-white',
    receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white',
  },
  purple: {
    sender: 'bg-purple-500 text-white',
    receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white',
  },
  gray: {
    sender: 'bg-gray-600 text-white',
    receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white',
  },
  gradient: {
    sender: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    receiver: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white',
  },
};

const StatusIcon = ({ status }: { status: ChatBubbleProps['status'] }) => {
  switch (status) {
    case 'sending':
      return <Clock className="w-3 h-3 text-white/60" />;
    case 'sent':
      return <Check className="w-3 h-3 text-white/60" />;
    case 'delivered':
      return <CheckCheck className="w-3 h-3 text-white/60" />;
    case 'read':
      return <CheckCheck className="w-3 h-3 text-blue-300" />;
    default:
      return null;
  }
};

export default function ChatBubble({
  message,
  variant = 'sender',
  color = 'blue',
  animate = true,
  timestamp,
  status,
  className = '',
  delay = 0,
}: ChatBubbleProps) {
  const isSender = variant === 'sender';
  const colorClass = colorStyles[color][variant];

  const bubbleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: isSender ? 20 : -20,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        delay,
      },
    },
  };

  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate
    ? {
        initial: 'hidden',
        animate: 'visible',
        variants: bubbleVariants,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`flex ${isSender ? 'justify-end' : 'justify-start'} ${className}`}
    >
      <div
        className={`
          relative max-w-[80%] px-4 py-2.5 rounded-2xl
          ${colorClass}
          ${isSender ? 'rounded-br-md' : 'rounded-bl-md'}
          shadow-sm
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>

        {(timestamp || status) && (
          <div className={`flex items-center gap-1 mt-1 ${isSender ? 'justify-end' : 'justify-start'}`}>
            {timestamp && (
              <span className={`text-[10px] ${isSender ? 'text-white/60' : 'text-gray-400'}`}>
                {timestamp}
              </span>
            )}
            {status && isSender && <StatusIcon status={status} />}
          </div>
        )}

        {/* Bubble tail */}
        <div
          className={`
            absolute bottom-0 w-3 h-3
            ${isSender ? '-right-1' : '-left-1'}
            ${colorStyles[color][variant].split(' ')[0]}
          `}
          style={{
            clipPath: isSender
              ? 'polygon(0 0, 100% 0, 0 100%)'
              : 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
      </div>
    </Wrapper>
  );
}

// Preset: Message with reactions
export interface ChatBubbleWithReactionsProps extends ChatBubbleProps {
  reactions?: { emoji: string; count: number }[];
}

export function ChatBubbleWithReactions({
  reactions = [],
  ...props
}: ChatBubbleWithReactionsProps) {
  return (
    <div className="relative">
      <ChatBubble {...props} />
      {reactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`
            absolute -bottom-3 flex gap-1
            ${props.variant === 'sender' ? 'right-2' : 'left-2'}
          `}
        >
          {reactions.map((reaction, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white dark:bg-gray-800 rounded-full text-xs shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <span>{reaction.emoji}</span>
              <span className="text-gray-500 text-[10px]">{reaction.count}</span>
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
