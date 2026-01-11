/**
 * @fileoverview FloatingLogin - Animated Floating Login Form Component
 *
 * A beautiful login form that literally floats with smooth animations.
 * Features gentle bobbing motion, subtle rotation, and shadow effects
 * that create a 3D floating illusion. Includes local, Google, and Apple auth.
 *
 * @module FloatingLogin
 * @requires react
 * @requires framer-motion
 * @requires lucide-react
 *
 * @example
 * // Basic floating login
 * <FloatingLogin
 *   onLogin={(data) => handleLogin(data)}
 *   onGoogleLogin={() => signInWithGoogle()}
 * />
 *
 * @example
 * // Dark mode with custom colors
 * <FloatingLogin
 *   mode="dark"
 *   primaryColor="#8B5CF6"
 *   onLogin={handleLogin}
 * />
 *
 * @example
 * // Disable floating animation
 * <FloatingLogin
 *   floatingEnabled={false}
 *   mode="light"
 *   onLogin={handleLogin}
 * />
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

/**
 * Theme mode for the login form.
 * @typedef {'light' | 'dark'} ThemeMode
 */
type ThemeMode = 'light' | 'dark';

/**
 * Login form data structure returned on submission.
 *
 * @interface LoginData
 * @property {string} email - User's email address
 * @property {string} password - User's password
 * @property {boolean} rememberMe - Whether to remember the user
 */
export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

/**
 * Props for the FloatingLogin component.
 *
 * @interface FloatingLoginProps
 */
export interface FloatingLoginProps {
  /**
   * Callback for local email/password login.
   * Receives the login form data on submission.
   *
   * @type {(data: LoginData) => void | Promise<void>}
   * @optional
   */
  onLogin?: (data: LoginData) => void | Promise<void>;

  /**
   * Callback for Google OAuth login.
   * Called when user clicks "Continue with Google" button.
   *
   * @type {() => void | Promise<void>}
   * @optional
   */
  onGoogleLogin?: () => void | Promise<void>;

  /**
   * Callback for Apple Sign-In.
   * Called when user clicks "Continue with Apple" button.
   *
   * @type {() => void | Promise<void>}
   * @optional
   */
  onAppleLogin?: () => void | Promise<void>;

  /**
   * Theme mode for the form.
   * - 'light': Light background with dark text
   * - 'dark': Dark background with light text
   *
   * @type {ThemeMode}
   * @default 'light'
   */
  mode?: ThemeMode;

  /**
   * Primary accent color for buttons and focus states (hex format).
   * Applied to the login button and input focus rings.
   *
   * @type {string}
   * @default '#6366F1' (Indigo)
   */
  primaryColor?: string;

  /**
   * Background color for the form card (hex format).
   * If not provided, uses theme-appropriate default.
   *
   * @type {string}
   * @default Light: '#ffffff', Dark: '#1F2937'
   */
  backgroundColor?: string;

  /**
   * Text color for labels and inputs (hex format).
   * If not provided, uses theme-appropriate default.
   *
   * @type {string}
   * @default Light: '#1F2937', Dark: '#F9FAFB'
   */
  textColor?: string;

  /**
   * Enable or disable the floating animation.
   *
   * @type {boolean}
   * @default true
   */
  floatingEnabled?: boolean;

  /**
   * Intensity of the floating animation (1-10).
   * Higher values create more dramatic movement.
   *
   * @type {number}
   * @default 5
   */
  floatIntensity?: number;

  /**
   * Title text displayed at the top of the form.
   *
   * @type {string}
   * @default 'Welcome back'
   */
  title?: string;

  /**
   * Subtitle text displayed below the title.
   *
   * @type {string}
   * @default 'Sign in to your account'
   */
  subtitle?: string;
}

/**
 * Google icon SVG component for the OAuth button.
 */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

/**
 * Apple icon SVG component for the Sign-In button.
 */
const AppleIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill={color}>
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

/**
 * FloatingLogin - Animated Floating Login Form Component
 *
 * Renders a login form that floats with smooth bobbing animations,
 * creating a playful and modern UI experience.
 *
 * @component
 * @param {FloatingLoginProps} props - Component props
 * @returns {JSX.Element} The floating login form
 *
 * @description
 * Animation Details:
 * - Y-axis bobbing: Smooth up/down motion (customizable intensity)
 * - X-axis sway: Gentle left/right movement
 * - Rotation: Subtle tilt animation
 * - Shadow: Dynamic shadow that responds to movement
 * - Duration: 6-second cycle for natural feel
 */
export default function FloatingLogin({
  onLogin,
  onGoogleLogin,
  onAppleLogin,
  mode = 'light',
  primaryColor = '#6366F1',
  backgroundColor,
  textColor,
  floatingEnabled = true,
  floatIntensity = 5,
  title = 'Welcome back',
  subtitle = 'Sign in to your account',
}: FloatingLoginProps): JSX.Element {
  /** Email input state */
  const [email, setEmail] = useState('');

  /** Password input state */
  const [password, setPassword] = useState('');

  /** Password visibility toggle */
  const [showPassword, setShowPassword] = useState(false);

  /** Remember me checkbox state */
  const [rememberMe, setRememberMe] = useState(false);

  /** Form submission loading state */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Calculate animation values based on intensity (1-10)
   */
  const intensity = Math.min(10, Math.max(1, floatIntensity));
  const yMovement = intensity * 3; // 3-30px
  const xMovement = intensity * 1.5; // 1.5-15px
  const rotation = intensity * 0.5; // 0.5-5deg

  /**
   * Theme-based color defaults.
   */
  const colors = {
    bg: backgroundColor || (mode === 'dark' ? '#1F2937' : '#ffffff'),
    text: textColor || (mode === 'dark' ? '#F9FAFB' : '#1F2937'),
    textMuted: mode === 'dark' ? '#9CA3AF' : '#6B7280',
    inputBg: mode === 'dark' ? '#374151' : '#F9FAFB',
    inputBorder: mode === 'dark' ? '#4B5563' : '#E5E7EB',
    divider: mode === 'dark' ? '#4B5563' : '#E5E7EB',
    socialBg: mode === 'dark' ? '#374151' : '#ffffff',
    socialBorder: mode === 'dark' ? '#4B5563' : '#E5E7EB',
  };

  /**
   * Handle form submission for local login.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onLogin) return;

    setIsLoading(true);
    try {
      await onLogin({ email, password, rememberMe });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Google OAuth login.
   */
  const handleGoogleLogin = async () => {
    if (!onGoogleLogin) return;
    setIsLoading(true);
    try {
      await onGoogleLogin();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle Apple Sign-In.
   */
  const handleAppleLogin = async () => {
    if (!onAppleLogin) return;
    setIsLoading(true);
    try {
      await onAppleLogin();
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Floating animation variants
   */
  const floatingAnimation = floatingEnabled
    ? {
        y: [0, -yMovement, 0, yMovement * 0.5, 0],
        x: [0, xMovement, 0, -xMovement * 0.7, 0],
        rotate: [0, rotation, 0, -rotation * 0.5, 0],
      }
    : {};

  const floatingTransition = floatingEnabled
    ? {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    : {};

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ perspective: '1000px' }}>
      {/* Floating shadow effect */}
      {floatingEnabled && (
        <motion.div
          className="absolute inset-x-8 bottom-0 h-8 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(ellipse, ${mode === 'dark' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)'} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1, 0.95, 1],
            opacity: [0.5, 0.3, 0.5, 0.6, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Main floating card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          ...floatingAnimation,
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          scale: { duration: 0.5 },
          ...floatingTransition,
        }}
        className="relative rounded-2xl p-8"
        style={{
          backgroundColor: colors.bg,
          boxShadow: mode === 'dark'
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Decorative floating elements */}
        {floatingEnabled && (
          <>
            <motion.div
              className="absolute -top-3 -right-3 w-6 h-6 rounded-full"
              style={{ backgroundColor: primaryColor, opacity: 0.6 }}
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full"
              style={{ backgroundColor: primaryColor, opacity: 0.4 }}
              animate={{
                y: [0, 8, 0],
                x: [0, -6, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
            <motion.div
              className="absolute top-1/2 -left-4 w-3 h-3 rounded-full"
              style={{ backgroundColor: primaryColor, opacity: 0.3 }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
          </>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2
            className="text-2xl font-bold mb-2"
            style={{ color: colors.text }}
            animate={floatingEnabled ? { y: [0, -2, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {title}
          </motion.h2>
          <p style={{ color: colors.textMuted }}>{subtitle}</p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          {/* Google Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border transition-colors disabled:opacity-50"
            style={{
              backgroundColor: colors.socialBg,
              borderColor: colors.socialBorder,
              color: colors.text,
            }}
          >
            <GoogleIcon />
            <span className="font-medium">Continue with Google</span>
          </motion.button>

          {/* Apple Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAppleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border transition-colors disabled:opacity-50"
            style={{
              backgroundColor: colors.socialBg,
              borderColor: colors.socialBorder,
              color: colors.text,
            }}
          >
            <AppleIcon color={colors.text} />
            <span className="font-medium">Continue with Apple</span>
          </motion.button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: colors.divider }} />
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className="px-4"
              style={{ backgroundColor: colors.bg, color: colors.textMuted }}
            >
              or continue with email
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: colors.text }}
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: colors.textMuted }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all"
                style={{
                  backgroundColor: colors.inputBg,
                  borderColor: colors.inputBorder,
                  color: colors.text,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 0 3px ${primaryColor}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.inputBorder;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: colors.text }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: colors.textMuted }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-11 pr-12 py-3 rounded-xl border outline-none transition-all"
                style={{
                  backgroundColor: colors.inputBg,
                  borderColor: colors.inputBorder,
                  color: colors.text,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 0 3px ${primaryColor}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.inputBorder;
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: colors.textMuted }}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-2 cursor-pointer"
                style={{
                  accentColor: primaryColor,
                  borderColor: colors.inputBorder,
                }}
              />
              <span className="text-sm" style={{ color: colors.textMuted }}>
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-sm font-medium hover:underline"
              style={{ color: primaryColor }}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 10px 30px -10px ${primaryColor}80`,
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <p
          className="text-center mt-6 text-sm"
          style={{ color: colors.textMuted }}
        >
          Don't have an account?{' '}
          <button
            className="font-semibold hover:underline"
            style={{ color: primaryColor }}
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
}
