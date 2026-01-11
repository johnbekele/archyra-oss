/**
 * AnimatedForm - Beautiful Animated Form Components
 *
 * A collection of form components with smooth animations,
 * floating labels, validation states, and dark mode support.
 *
 * @example
 * ```tsx
 * import { AnimatedInput, AnimatedSelect, AnimatedToggle } from 'archyra';
 *
 * <AnimatedInput
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 * />
 * ```
 */

'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useRef, useId, ReactNode, forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { Check, ChevronDown, AlertCircle, Eye, EyeOff, X } from 'lucide-react';

// ============================================================================
// ANIMATED INPUT
// ============================================================================

export interface AnimatedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  /** Input label */
  label: string;
  /** Current value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Left icon */
  icon?: ReactNode;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Success state */
  success?: boolean;
  /** Show character count */
  showCount?: boolean;
  /** Variant style */
  variant?: 'default' | 'filled' | 'outline';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
  /** Additional wrapper className */
  wrapperClassName?: string;
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(({
  label,
  value,
  onChange,
  icon,
  error,
  helperText,
  success,
  showCount,
  variant = 'default',
  size = 'md',
  type = 'text',
  maxLength,
  disabled,
  required,
  className = '',
  wrapperClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const isFloating = isFocused || (value && value.length > 0);

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-4 py-4 text-lg',
  };

  const variantClasses = {
    default: 'bg-background border',
    filled: 'bg-muted border-transparent',
    outline: 'bg-transparent border-2',
  };

  const stateClasses = error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
    : success
    ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
    : 'border-border focus:border-primary focus:ring-primary/20';

  return (
    <div className={`relative ${wrapperClassName}`}>
      <div className="relative">
        {icon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 ${disabled ? 'opacity-50' : ''}`}>
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          className={`
            w-full rounded-xl transition-all duration-200 outline-none
            focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${stateClasses}
            ${icon ? 'pl-10' : ''}
            ${isPassword ? 'pr-10' : ''}
            ${className}
          `}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={inputId}
          className={`
            absolute transition-all duration-200 pointer-events-none
            ${icon ? 'left-10' : 'left-4'}
            ${isFloating
              ? `-top-2.5 text-xs bg-background px-1 ${error ? 'text-red-500' : success ? 'text-green-500' : 'text-primary'}`
              : 'top-1/2 -translate-y-1/2 text-muted-foreground'
            }
            ${disabled ? 'opacity-50' : ''}
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
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        {success && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Helper text / Error / Count */}
      <div className="flex justify-between mt-1 px-1">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-red-500 text-xs flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {error}
            </motion.p>
          ) : helperText ? (
            <motion.p
              key="helper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-xs"
            >
              {helperText}
            </motion.p>
          ) : (
            <span />
          )}
        </AnimatePresence>
        {showCount && maxLength && (
          <span className="text-muted-foreground text-xs">
            {(value || '').length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

AnimatedInput.displayName = 'AnimatedInput';

// ============================================================================
// ANIMATED TEXTAREA
// ============================================================================

export interface AnimatedTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  autoResize?: boolean;
  wrapperClassName?: string;
}

export const AnimatedTextarea = forwardRef<HTMLTextAreaElement, AnimatedTextareaProps>(({
  label,
  value,
  onChange,
  error,
  helperText,
  showCount,
  autoResize = false,
  maxLength,
  disabled,
  required,
  rows = 4,
  className = '',
  wrapperClassName = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaId = useId();
  const isFloating = isFocused || (value && value.length > 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (autoResize) {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }
  };

  return (
    <div className={`relative ${wrapperClassName}`}>
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          rows={rows}
          className={`
            w-full px-4 py-3 rounded-xl border bg-background
            transition-all duration-200 outline-none resize-none
            focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-border focus:border-primary focus:ring-primary/20'
            }
            ${className}
          `}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={textareaId}
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${isFloating
              ? `-top-2.5 text-xs bg-background px-1 ${error ? 'text-red-500' : 'text-primary'}`
              : 'top-3 text-muted-foreground'
            }
            ${disabled ? 'opacity-50' : ''}
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>

      <div className="flex justify-between mt-1 px-1">
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {error}
          </motion.p>
        ) : helperText ? (
          <p className="text-muted-foreground text-xs">{helperText}</p>
        ) : (
          <span />
        )}
        {showCount && maxLength && (
          <span className="text-muted-foreground text-xs">
            {(value || '').length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
});

AnimatedTextarea.displayName = 'AnimatedTextarea';

// ============================================================================
// ANIMATED SELECT
// ============================================================================

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AnimatedSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export function AnimatedSelect({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  helperText,
  disabled,
  required,
  icon,
  className = '',
  wrapperClassName = '',
}: AnimatedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectId = useId();

  const selectedOption = options.find(opt => opt.value === value);
  const isFloating = isFocused || isOpen || !!value;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close on outside click
  const handleBlur = (e: React.FocusEvent) => {
    if (!selectRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
      setIsFocused(false);
    }
  };

  return (
    <div className={`relative ${wrapperClassName}`} ref={selectRef}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            {icon}
          </div>
        )}
        <button
          type="button"
          id={selectId}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-xl border bg-background text-left
            transition-all duration-200 outline-none
            focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-border focus:border-primary focus:ring-primary/20'
            }
            ${className}
          `}
        >
          <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <label
          htmlFor={selectId}
          className={`
            absolute transition-all duration-200 pointer-events-none
            ${icon ? 'left-10' : 'left-4'}
            ${isFloating
              ? `-top-2.5 text-xs bg-background px-1 ${error ? 'text-red-500' : 'text-primary'}`
              : 'top-1/2 -translate-y-1/2 text-muted-foreground'
            }
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 py-1 bg-background border border-border rounded-xl shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                className={`
                  w-full px-4 py-2 text-left transition-colors
                  ${option.value === value ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}
                  ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <span className="flex items-center justify-between">
                  {option.label}
                  {option.value === value && <Check className="w-4 h-4" />}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper/Error */}
      {(error || helperText) && (
        <div className="mt-1 px-1">
          {error ? (
            <p className="text-red-500 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          ) : (
            <p className="text-muted-foreground text-xs">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ANIMATED TOGGLE
// ============================================================================

export interface AnimatedToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function AnimatedToggle({
  checked,
  onChange,
  label,
  description,
  disabled,
  size = 'md',
  color,
  className = '',
}: AnimatedToggleProps) {
  const prefersReducedMotion = useReducedMotion();
  const toggleId = useId();

  const sizes = {
    sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
  };

  const sizeClass = sizes[size];

  return (
    <label
      htmlFor={toggleId}
      className={`flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          relative inline-flex shrink-0 rounded-full transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
          ${sizeClass.track}
          ${checked ? (color || 'bg-primary') : 'bg-muted'}
        `}
      >
        <motion.span
          className={`
            pointer-events-none inline-block rounded-full bg-white shadow-sm
            ${sizeClass.thumb}
          `}
          initial={false}
          animate={{
            x: checked ? (size === 'sm' ? 16 : size === 'md' ? 20 : 28) : 2,
          }}
          transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 30 }}
          style={{ marginTop: size === 'sm' ? 2 : size === 'md' ? 2 : 2 }}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium">{label}</span>}
          {description && <span className="text-xs text-muted-foreground">{description}</span>}
        </div>
      )}
    </label>
  );
}

// ============================================================================
// ANIMATED CHECKBOX
// ============================================================================

export interface AnimatedCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  error?: string;
  className?: string;
}

export function AnimatedCheckbox({
  checked,
  onChange,
  label,
  description,
  disabled,
  indeterminate,
  error,
  className = '',
}: AnimatedCheckboxProps) {
  const prefersReducedMotion = useReducedMotion();
  const checkboxId = useId();

  return (
    <div className={className}>
      <label
        htmlFor={checkboxId}
        className={`flex items-start gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <button
          id={checkboxId}
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : checked}
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          className={`
            relative w-5 h-5 rounded-md border-2 transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
            flex items-center justify-center shrink-0 mt-0.5
            ${checked || indeterminate
              ? 'bg-primary border-primary'
              : error
              ? 'border-red-500'
              : 'border-border hover:border-primary'
            }
          `}
        >
          <AnimatePresence>
            {(checked || indeterminate) && (
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.1 }}
              >
                {indeterminate ? (
                  <div className="w-2.5 h-0.5 bg-white rounded-full" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        {(label || description) && (
          <div className="flex flex-col">
            {label && <span className="text-sm font-medium">{label}</span>}
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
          </div>
        )}
      </label>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 ml-8">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// ANIMATED RADIO GROUP
// ============================================================================

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface AnimatedRadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  name: string;
  label?: string;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function AnimatedRadioGroup({
  value,
  onChange,
  options,
  name,
  label,
  error,
  orientation = 'vertical',
  className = '',
}: AnimatedRadioGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={className}>
      {label && <p className="text-sm font-medium mb-3">{label}</p>}
      <div className={`flex gap-4 ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}`}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start gap-3 cursor-pointer ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <button
              type="button"
              role="radio"
              aria-checked={value === option.value}
              onClick={() => !option.disabled && onChange(option.value)}
              disabled={option.disabled}
              className={`
                relative w-5 h-5 rounded-full border-2 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
                flex items-center justify-center shrink-0 mt-0.5
                ${value === option.value
                  ? 'border-primary'
                  : error
                  ? 'border-red-500'
                  : 'border-border hover:border-primary'
                }
              `}
            >
              <AnimatePresence>
                {value === option.value && (
                  <motion.div
                    initial={prefersReducedMotion ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.1 }}
                    className="w-2.5 h-2.5 rounded-full bg-primary"
                  />
                )}
              </AnimatePresence>
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{option.label}</span>
              {option.description && (
                <span className="text-xs text-muted-foreground">{option.description}</span>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

// ============================================================================
// ANIMATED TAGS INPUT
// ============================================================================

export interface AnimatedTagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  maxTags?: number;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

export function AnimatedTagsInput({
  value,
  onChange,
  label,
  placeholder = 'Type and press Enter',
  maxTags,
  error,
  helperText,
  disabled,
  className = '',
}: AnimatedTagsInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  // Ensure value is always an array
  const tags = value || [];

  const isFloating = isFocused || tags.length > 0 || inputValue.length > 0;

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed) && (!maxTags || tags.length < maxTags)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className={className}>
      <div className="relative">
        <div
          onClick={() => inputRef.current?.focus()}
          className={`
            min-h-[48px] px-4 py-2 rounded-xl border bg-background
            transition-all duration-200 cursor-text
            flex flex-wrap gap-2 items-center
            ${isFocused ? 'ring-2' : ''}
            ${error
              ? 'border-red-500 ring-red-500/20'
              : 'border-border ring-primary/20 focus-within:border-primary'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <AnimatePresence>
            {tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(tag);
                  }}
                  className="hover:bg-primary/20 rounded p-0.5"
                  disabled={disabled}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              if (inputValue) addTag();
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled || (maxTags !== undefined && tags.length >= maxTags)}
            placeholder={tags.length === 0 ? '' : placeholder}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm"
          />
        </div>
        {label && (
          <label
            htmlFor={inputId}
            className={`
              absolute left-4 transition-all duration-200 pointer-events-none
              ${isFloating
                ? `-top-2.5 text-xs bg-background px-1 ${error ? 'text-red-500' : 'text-primary'}`
                : 'top-3 text-muted-foreground'
              }
            `}
          >
            {label}
          </label>
        )}
      </div>

      <div className="flex justify-between mt-1 px-1">
        {error ? (
          <p className="text-red-500 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        ) : helperText ? (
          <p className="text-muted-foreground text-xs">{helperText}</p>
        ) : (
          <span />
        )}
        {maxTags && (
          <span className="text-muted-foreground text-xs">
            {tags.length}/{maxTags}
          </span>
        )}
      </div>
    </div>
  );
}

// Default export
export default AnimatedInput;
