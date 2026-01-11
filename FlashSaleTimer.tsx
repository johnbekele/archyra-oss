/**
 * @fileoverview FlashSaleTimer - Animated Countdown Timer
 *
 * An eye-catching countdown timer for flash sales and limited offers
 * with urgency animations, pulsing effects, and flip transitions.
 *
 * @module FlashSaleTimer
 * @requires react
 * @requires framer-motion
 * @requires lucide-react
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Flame, AlertTriangle } from 'lucide-react';

export interface FlashSaleTimerProps {
  /** End time as Date object or timestamp */
  endTime: Date | number;
  /** Title text */
  title?: string;
  /** Callback when timer ends */
  onEnd?: () => void;
  /** Variant style */
  variant?: 'default' | 'urgent' | 'minimal';
  /** Show sale badge */
  showBadge?: boolean;
  /** Discount percentage to show */
  discount?: number;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  isUrgent: boolean;
  isEnded: boolean;
}

function TimeBlock({ value, label, isUrgent }: { value: number; label: string; isUrgent: boolean }) {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timeout = setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [value, prevValue]);

  const displayValue = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Background glow for urgent */}
        {isUrgent && (
          <motion.div
            className="absolute inset-0 bg-rose-500 rounded-xl blur-lg"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        <motion.div
          className={`
            relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center
            text-2xl sm:text-3xl font-bold overflow-hidden
            ${isUrgent
              ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white'
              : 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
            }
          `}
          animate={isUrgent ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />

          {/* Flip animation container */}
          <div className="relative perspective-500">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={displayValue}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="block"
              >
                {displayValue}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Center divider line */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
        </motion.div>
      </div>

      <span className={`mt-2 text-xs font-medium uppercase tracking-wider ${isUrgent ? 'text-rose-500' : 'text-gray-500 dark:text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
}

function Separator({ isUrgent }: { isUrgent: boolean }) {
  return (
    <div className="flex flex-col gap-2 px-1">
      <motion.div
        className={`w-2 h-2 rounded-full ${isUrgent ? 'bg-rose-500' : 'bg-violet-500'}`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.div
        className={`w-2 h-2 rounded-full ${isUrgent ? 'bg-rose-500' : 'bg-violet-500'}`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
      />
    </div>
  );
}

export function FlashSaleTimer({
  endTime,
  title = 'Flash Sale Ends In',
  onEnd,
  variant = 'default',
  showBadge = true,
  discount = 50,
}: FlashSaleTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUrgent: false,
    isEnded: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = typeof endTime === 'number' ? endTime : endTime.getTime();
      const difference = end - Date.now();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isUrgent: false, isEnded: true });
        onEnd?.();
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      const isUrgent = hours === 0 && minutes < 30;

      setTimeLeft({ hours, minutes, seconds, isUrgent, isEnded: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime, onEnd]);

  if (timeLeft.isEnded) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-6 bg-gray-100 dark:bg-zinc-800 rounded-2xl"
      >
        <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-amber-500" />
        <p className="text-lg font-semibold text-gray-900 dark:text-white">Sale Ended!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Check back for future deals</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative overflow-hidden rounded-2xl p-6
        ${variant === 'urgent' || timeLeft.isUrgent
          ? 'bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30 border border-rose-200 dark:border-rose-800/50'
          : 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border border-violet-200 dark:border-violet-800/50'
        }
      `}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${timeLeft.isUrgent ? 'bg-rose-400/30' : 'bg-violet-400/30'}`}
            animate={{
              x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <motion.div
            animate={timeLeft.isUrgent ? { rotate: [-10, 10, -10] } : {}}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            {timeLeft.isUrgent ? (
              <Flame className="w-6 h-6 text-rose-500" />
            ) : (
              <Zap className="w-6 h-6 text-violet-500" />
            )}
          </motion.div>
          <h3 className={`font-bold text-lg ${timeLeft.isUrgent ? 'text-rose-600 dark:text-rose-400' : 'text-violet-600 dark:text-violet-400'}`}>
            {title}
          </h3>
        </div>

        {showBadge && (
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: -12 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className={`
              px-3 py-1 rounded-full font-bold text-sm text-white
              ${timeLeft.isUrgent
                ? 'bg-gradient-to-r from-rose-500 to-red-500'
                : 'bg-gradient-to-r from-violet-500 to-purple-500'
              }
            `}
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {discount}% OFF
            </motion.span>
          </motion.div>
        )}
      </div>

      {/* Timer */}
      <div className="relative flex items-center justify-center gap-2 sm:gap-4">
        <TimeBlock value={timeLeft.hours} label="Hours" isUrgent={timeLeft.isUrgent} />
        <Separator isUrgent={timeLeft.isUrgent} />
        <TimeBlock value={timeLeft.minutes} label="Minutes" isUrgent={timeLeft.isUrgent} />
        <Separator isUrgent={timeLeft.isUrgent} />
        <TimeBlock value={timeLeft.seconds} label="Seconds" isUrgent={timeLeft.isUrgent} />
      </div>

      {/* Urgent warning */}
      <AnimatePresence>
        {timeLeft.isUrgent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Clock className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">Hurry! Sale ending soon!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default FlashSaleTimer;
