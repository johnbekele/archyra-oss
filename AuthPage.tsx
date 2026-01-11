/**
 * AuthPage - Complete Authentication Page Components
 *
 * Ready-to-use authentication pages with beautiful animations,
 * form validation, OAuth support, and dark mode. Includes
 * login, signup, forgot password, and verification flows.
 *
 * @example
 * ```tsx
 * import { LoginPage, SignupPage } from 'archyra';
 *
 * <LoginPage
 *   onSubmit={(data) => handleLogin(data)}
 *   onGoogleAuth={() => signInWithGoogle()}
 *   onGithubAuth={() => signInWithGithub()}
 * />
 * ```
 */

'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, FormEvent, ReactNode } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';

// Types
export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
  rememberMe?: boolean;
  acceptTerms?: boolean;
}

export interface AuthPageProps {
  /** Form submission handler */
  onSubmit: (data: AuthFormData) => void | Promise<void>;
  /** Google OAuth handler */
  onGoogleAuth?: () => void | Promise<void>;
  /** GitHub OAuth handler */
  onGithubAuth?: () => void | Promise<void>;
  /** Apple OAuth handler */
  onAppleAuth?: () => void | Promise<void>;
  /** Link to switch between login/signup */
  switchLink?: string;
  /** Custom logo */
  logo?: ReactNode;
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Show "Remember me" checkbox */
  showRememberMe?: boolean;
  /** Show "Forgot password" link */
  showForgotPassword?: boolean;
  /** Forgot password handler */
  onForgotPassword?: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string;
  /** Success message */
  success?: string;
  /** Background variant */
  backgroundVariant?: 'gradient' | 'pattern' | 'image' | 'solid';
  /** Custom background image URL */
  backgroundImage?: string;
  /** Primary color for theming (hex color) */
  primaryColor?: string;
  /** Additional className */
  className?: string;
}

// Animated Input Component
interface AnimatedInputProps {
  type: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}

function AnimatedInput({
  type: initialType,
  name,
  label,
  value,
  onChange,
  icon,
  error,
  required,
  autoComplete,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = initialType === 'password';
  const type = isPassword && showPassword ? 'text' : initialType;

  const isFloating = isFocused || value.length > 0;

  return (
    <div className="relative">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          autoComplete={autoComplete}
          className={`
            w-full px-4 py-3 rounded-xl border bg-background
            transition-all duration-200 outline-none
            ${icon ? 'pl-10' : ''}
            ${isPassword ? 'pr-10' : ''}
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
            }
          `}
          placeholder=" "
        />
        <label
          htmlFor={name}
          className={`
            absolute left-0 transition-all duration-200 pointer-events-none
            ${icon ? 'left-10' : 'left-4'}
            ${isFloating
              ? '-top-2.5 text-xs bg-background px-1 text-primary'
              : 'top-1/2 -translate-y-1/2 text-muted-foreground'
            }
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

// OAuth Button Component
interface OAuthButtonProps {
  provider: 'google' | 'github' | 'apple';
  onClick: () => void;
  disabled?: boolean;
}

function OAuthButton({ provider, onClick, disabled }: OAuthButtonProps) {
  const icons = {
    google: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    apple: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
  };

  const labels = {
    google: 'Continue with Google',
    github: 'Continue with GitHub',
    apple: 'Continue with Apple',
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl
        border border-border bg-background hover:bg-muted/50
        transition-colors disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {icons[provider]}
      <span className="font-medium">{labels[provider]}</span>
    </motion.button>
  );
}

// Divider Component
function OrDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
      </div>
    </div>
  );
}

/**
 * LoginPage - Complete login page component
 */
export function LoginPage({
  onSubmit,
  onGoogleAuth,
  onGithubAuth,
  onAppleAuth,
  switchLink = '/signup',
  logo,
  title = 'Welcome back',
  subtitle = 'Sign in to your account to continue',
  showRememberMe = true,
  showForgotPassword = true,
  onForgotPassword,
  isLoading = false,
  error,
  success,
  backgroundVariant = 'gradient',
  backgroundImage,
  primaryColor,
  className = '',
}: AuthPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<AuthFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<AuthFormData> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  const getBackgroundStyle = () => {
    switch (backgroundVariant) {
      case 'gradient':
        return 'bg-gradient-to-br from-violet-500/20 via-background to-cyan-500/20';
      case 'pattern':
        return 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]';
      case 'image':
        return '';
      default:
        return 'bg-muted/30';
    }
  };

  return (
    <div
      className={`min-h-screen flex ${getBackgroundStyle()} ${className}`}
      style={backgroundVariant === 'image' && backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' } : undefined}
    >
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          {logo && <div className="mb-8">{logo}</div>}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </div>

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* OAuth Buttons */}
          {(onGoogleAuth || onGithubAuth || onAppleAuth) && (
            <>
              <div className="space-y-3">
                {onGoogleAuth && <OAuthButton provider="google" onClick={onGoogleAuth} disabled={isLoading} />}
                {onGithubAuth && <OAuthButton provider="github" onClick={onGithubAuth} disabled={isLoading} />}
                {onAppleAuth && <OAuthButton provider="apple" onClick={onAppleAuth} disabled={isLoading} />}
              </div>
              <OrDivider />
            </>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatedInput
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              icon={<Mail className="w-4 h-4" />}
              error={errors.email as string}
              required
              autoComplete="email"
            />

            <AnimatedInput
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              icon={<Lock className="w-4 h-4" />}
              error={errors.password as string}
              required
              autoComplete="current-password"
            />

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              {showRememberMe && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
              )}
              {showForgotPassword && (
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className={`text-sm hover:underline ${!primaryColor ? 'text-primary' : ''}`}
                  style={primaryColor ? { color: primaryColor } : undefined}
                >
                  Forgot password?
                </button>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`
                w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                font-medium transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                ${!primaryColor ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
              `}
              style={primaryColor ? {
                backgroundColor: primaryColor,
                color: '#ffffff',
              } : undefined}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Switch to Signup */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a
              href={switchLink}
              className={!primaryColor ? 'text-primary font-medium hover:underline' : 'font-medium hover:underline'}
              style={primaryColor ? { color: primaryColor } : undefined}
            >
              Sign up
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * SignupPage - Complete signup page component
 */
export interface SignupPageProps extends AuthPageProps {
  /** Show terms acceptance checkbox */
  showTerms?: boolean;
  /** Terms link */
  termsLink?: string;
  /** Privacy link */
  privacyLink?: string;
}

export function SignupPage({
  onSubmit,
  onGoogleAuth,
  onGithubAuth,
  onAppleAuth,
  switchLink = '/login',
  logo,
  title = 'Create an account',
  subtitle = 'Start your journey with us today',
  showTerms = true,
  termsLink = '/terms',
  privacyLink = '/privacy',
  isLoading = false,
  error,
  success,
  backgroundVariant = 'gradient',
  backgroundImage,
  primaryColor,
  className = '',
}: SignupPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<AuthFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (showTerms && !formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  const getBackgroundStyle = () => {
    switch (backgroundVariant) {
      case 'gradient':
        return 'bg-gradient-to-br from-violet-500/20 via-background to-cyan-500/20';
      case 'pattern':
        return 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]';
      case 'image':
        return '';
      default:
        return 'bg-muted/30';
    }
  };

  return (
    <div
      className={`min-h-screen flex ${getBackgroundStyle()} ${className}`}
      style={backgroundVariant === 'image' && backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' } : undefined}
    >
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {logo && <div className="mb-8">{logo}</div>}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-2">{subtitle}</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {(onGoogleAuth || onGithubAuth || onAppleAuth) && (
            <>
              <div className="space-y-3">
                {onGoogleAuth && <OAuthButton provider="google" onClick={onGoogleAuth} disabled={isLoading} />}
                {onGithubAuth && <OAuthButton provider="github" onClick={onGithubAuth} disabled={isLoading} />}
                {onAppleAuth && <OAuthButton provider="apple" onClick={onAppleAuth} disabled={isLoading} />}
              </div>
              <OrDivider />
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatedInput
              type="text"
              name="name"
              label="Full Name"
              value={formData.name || ''}
              onChange={(value) => setFormData({ ...formData, name: value })}
              icon={<User className="w-4 h-4" />}
              error={errors.name}
              required
              autoComplete="name"
            />

            <AnimatedInput
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              icon={<Mail className="w-4 h-4" />}
              error={errors.email}
              required
              autoComplete="email"
            />

            <AnimatedInput
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              icon={<Lock className="w-4 h-4" />}
              error={errors.password}
              required
              autoComplete="new-password"
            />

            <AnimatedInput
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword || ''}
              onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
              icon={<Lock className="w-4 h-4" />}
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
            />

            {showTerms && (
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    className="w-4 h-4 rounded border-border mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <a href={termsLink} className="text-primary hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href={privacyLink} className="text-primary hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>
                )}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`
                w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
                font-medium transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                ${!primaryColor ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
              `}
              style={primaryColor ? {
                backgroundColor: primaryColor,
                color: '#ffffff',
              } : undefined}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <a
              href={switchLink}
              className={!primaryColor ? 'text-primary font-medium hover:underline' : 'font-medium hover:underline'}
              style={primaryColor ? { color: primaryColor } : undefined}
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * ForgotPasswordPage - Password reset request page
 */
export interface ForgotPasswordPageProps {
  onSubmit: (email: string) => void | Promise<void>;
  backLink?: string;
  logo?: ReactNode;
  isLoading?: boolean;
  error?: string;
  success?: string;
  primaryColor?: string;
  className?: string;
}

export function ForgotPasswordPage({
  onSubmit,
  backLink = '/login',
  logo,
  isLoading = false,
  error,
  success,
  primaryColor,
  className = '',
}: ForgotPasswordPageProps) {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email address');
      return;
    }
    setEmailError('');
    await onSubmit(email);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500/20 via-background to-cyan-500/20 p-8 ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {logo && <div className="mb-8">{logo}</div>}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Reset password</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatedInput
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={setEmail}
            icon={<Mail className="w-4 h-4" />}
            error={emailError}
            required
            autoComplete="email"
          />

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`
              w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
              font-medium transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
              ${!primaryColor ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}
            `}
            style={primaryColor ? {
              backgroundColor: primaryColor,
              color: '#ffffff',
            } : undefined}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Send reset link
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <a
            href={backLink}
            className={!primaryColor ? 'text-primary font-medium hover:underline' : 'font-medium hover:underline'}
            style={primaryColor ? { color: primaryColor } : undefined}
          >
            Back to login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

// Default export
export default LoginPage;
