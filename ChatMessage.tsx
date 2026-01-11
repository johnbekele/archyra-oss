/**
 * ChatMessage Component
 *
 * Complete chat message with avatar, name, message bubble, and animations.
 * Supports various message types including text, image, and system messages.
 *
 * @example
 * ```tsx
 * <ChatMessage
 *   user={{ name: 'John', avatar: '/avatar.jpg' }}
 *   message="Hello there!"
 *   timestamp="2:30 PM"
 *   variant="receiver"
 * />
 * ```
 *
 * @param user - User object with name and optional avatar
 * @param message - The message content
 * @param variant - 'sender' or 'receiver'
 * @param timestamp - Time of the message
 * @param type - Message type: 'text', 'image', 'system'
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock, Image as ImageIcon } from 'lucide-react';

export interface ChatUser {
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface ChatMessageProps {
  user: ChatUser;
  message: string;
  variant?: 'sender' | 'receiver';
  timestamp?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'system';
  imageUrl?: string;
  color?: 'blue' | 'green' | 'purple' | 'gray' | 'gradient';
  animate?: boolean;
  showAvatar?: boolean;
  showName?: boolean;
  isGrouped?: boolean;
  delay?: number;
  className?: string;
}

const colorStyles = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  gray: 'bg-gray-600',
  gradient: 'bg-gradient-to-r from-blue-500 to-purple-600',
};

const StatusIcon = ({ status }: { status: ChatMessageProps['status'] }) => {
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

export default function ChatMessage({
  user,
  message,
  variant = 'receiver',
  timestamp,
  status,
  type = 'text',
  imageUrl,
  color = 'blue',
  animate = true,
  showAvatar = true,
  showName = true,
  isGrouped = false,
  delay = 0,
  className = '',
}: ChatMessageProps) {
  const isSender = variant === 'sender';

  // System message
  if (type === 'system') {
    return (
      <motion.div
        initial={animate ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className={`flex justify-center my-4 ${className}`}
      >
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
          <p className="text-xs text-gray-500 dark:text-gray-400">{message}</p>
        </div>
      </motion.div>
    );
  }

  const messageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: isSender ? 30 : -30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 350,
        damping: 25,
        delay,
      },
    },
  };

  return (
    <motion.div
      initial={animate ? 'hidden' : false}
      animate="visible"
      variants={messageVariants}
      className={`
        flex gap-2
        ${isSender ? 'flex-row-reverse' : 'flex-row'}
        ${isGrouped ? 'mt-0.5' : 'mt-3'}
        ${className}
      `}
    >
      {/* Avatar */}
      {showAvatar && !isGrouped && (
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                {user.name[0]?.toUpperCase()}
              </div>
            )}
          </div>
          {user.isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
          )}
        </div>
      )}

      {/* Spacer for grouped messages without avatar */}
      {isGrouped && showAvatar && <div className="w-9 flex-shrink-0" />}

      {/* Message content */}
      <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} max-w-[75%]`}>
        {/* Name */}
        {showName && !isGrouped && !isSender && (
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-1">
            {user.name}
          </span>
        )}

        {/* Message bubble */}
        {type === 'image' && imageUrl ? (
          <div className="relative rounded-2xl overflow-hidden shadow-sm">
            <img
              src={imageUrl}
              alt="Shared image"
              className="max-w-xs max-h-64 object-cover"
            />
            {message && (
              <div
                className={`
                  absolute bottom-0 left-0 right-0 p-3
                  bg-gradient-to-t from-black/70 to-transparent
                `}
              >
                <p className="text-sm text-white">{message}</p>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`
              relative px-4 py-2.5 rounded-2xl shadow-sm
              ${isSender
                ? `${colorStyles[color]} text-white ${isGrouped ? 'rounded-tr-md' : 'rounded-br-md'}`
                : `bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white ${isGrouped ? 'rounded-tl-md' : 'rounded-bl-md'}`
              }
            `}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>

            {/* Timestamp and status */}
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
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Preset: Chat conversation with multiple messages
export interface ChatConversationProps {
  messages: Array<Omit<ChatMessageProps, 'animate' | 'isGrouped'> & { id: string }>;
  animate?: boolean;
  className?: string;
}

export function ChatConversation({
  messages,
  animate = true,
  className = '',
}: ChatConversationProps) {
  // Group consecutive messages from the same user
  const groupedMessages = messages.map((msg, i) => {
    const prevMsg = messages[i - 1];
    const isGrouped = prevMsg && prevMsg.user.name === msg.user.name && prevMsg.variant === msg.variant;
    return { ...msg, isGrouped };
  });

  return (
    <div className={`flex flex-col ${className}`}>
      {groupedMessages.map((msg, i) => (
        <ChatMessage
          key={msg.id}
          {...msg}
          animate={animate}
          delay={animate ? i * 0.1 : 0}
        />
      ))}
    </div>
  );
}

// Preset: Message input with typing animation
export interface ChatInputProps {
  onSend?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function ChatInput({
  onSend,
  placeholder = 'Type a message...',
  disabled = false,
  className = '',
}: ChatInputProps) {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && onSend) {
      onSend(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!value.trim() || disabled}
        className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </motion.button>
    </form>
  );
}
