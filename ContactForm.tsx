/**
 * ContactForm - Beautiful Animated Contact Form
 *
 * Ready-to-use contact form with smooth animations, validation,
 * success states, and multiple layout options.
 *
 * @example
 * ```tsx
 * import { ContactForm, ContactSection } from 'archyra';
 *
 * <ContactForm
 *   onSubmit={(data) => sendEmail(data)}
 *   fields={['name', 'email', 'subject', 'message']}
 * />
 * ```
 */

'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, FormEvent, ReactNode } from 'react';
import { Mail, User, MessageSquare, Phone, MapPin, Send, Check, AlertCircle, Loader2, Building } from 'lucide-react';

// Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}

export type ContactFieldType = 'name' | 'email' | 'phone' | 'company' | 'subject' | 'message';

export interface ContactFormProps {
  /** Form submission handler */
  onSubmit: (data: ContactFormData) => void | Promise<void>;
  /** Fields to display */
  fields?: ContactFieldType[];
  /** Form title */
  title?: string;
  /** Form description */
  description?: string;
  /** Submit button text */
  submitText?: string;
  /** Success message */
  successMessage?: string;
  /** Show success animation */
  showSuccessAnimation?: boolean;
  /** Reset form after success */
  resetOnSuccess?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** External error message */
  error?: string;
  /** Variant style */
  variant?: 'default' | 'card' | 'minimal';
  /** Additional className */
  className?: string;
}

// Field configurations
const fieldConfigs: Record<ContactFieldType, {
  label: string;
  type: string;
  placeholder: string;
  icon: ReactNode;
  required: boolean;
  multiline?: boolean;
  rows?: number;
}> = {
  name: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'John Doe',
    icon: <User className="w-4 h-4" />,
    required: true,
  },
  email: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    icon: <Mail className="w-4 h-4" />,
    required: true,
  },
  phone: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    icon: <Phone className="w-4 h-4" />,
    required: false,
  },
  company: {
    label: 'Company',
    type: 'text',
    placeholder: 'Acme Inc.',
    icon: <Building className="w-4 h-4" />,
    required: false,
  },
  subject: {
    label: 'Subject',
    type: 'text',
    placeholder: 'How can we help?',
    icon: <MessageSquare className="w-4 h-4" />,
    required: false,
  },
  message: {
    label: 'Message',
    type: 'textarea',
    placeholder: 'Tell us more about your project...',
    icon: <MessageSquare className="w-4 h-4" />,
    required: true,
    multiline: true,
    rows: 5,
  },
};

// Animated Input Component
interface FormInputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
}

function FormInput({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
  error,
  required,
  multiline,
  rows = 4,
  disabled,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  const inputClasses = `
    w-full px-4 py-3 rounded-xl border bg-background
    transition-all duration-200 outline-none
    focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed
    ${icon ? 'pl-10' : ''}
    ${error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-border focus:border-primary focus:ring-primary/20'
    }
  `;

  return (
    <div className="relative">
      <div className="relative">
        {icon && (
          <div className={`absolute left-3 ${multiline ? 'top-3' : 'top-1/2 -translate-y-1/2'} text-muted-foreground z-10`}>
            {icon}
          </div>
        )}
        {multiline ? (
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=" "
            required={required}
            disabled={disabled}
            rows={rows}
            className={`${inputClasses} resize-none`}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=" "
            required={required}
            disabled={disabled}
            className={inputClasses}
          />
        )}
        <label
          htmlFor={name}
          className={`
            absolute transition-all duration-200 pointer-events-none
            ${icon ? 'left-10' : 'left-4'}
            ${isFloating
              ? `-top-2.5 text-xs bg-background px-1 ${error ? 'text-red-500' : 'text-primary'}`
              : `${multiline ? 'top-3' : 'top-1/2 -translate-y-1/2'} text-muted-foreground`
            }
          `}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-red-500 text-xs mt-1 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * ContactForm - Main contact form component
 */
export function ContactForm({
  onSubmit,
  fields = ['name', 'email', 'message'],
  title,
  description,
  submitText = 'Send Message',
  successMessage = 'Thank you! Your message has been sent successfully.',
  showSuccessAnimation = true,
  resetOnSuccess = true,
  isLoading: externalLoading,
  error: externalError,
  variant = 'default',
  className = '',
}: ContactFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<ContactFieldType, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isLoading = externalLoading ?? isSubmitting;

  const validateForm = () => {
    const newErrors: Partial<Record<ContactFieldType, string>> = {};

    fields.forEach((field) => {
      const config = fieldConfigs[field];
      const value = formData[field as keyof ContactFormData];

      if (config.required && (!value || value.trim() === '')) {
        newErrors[field] = `${config.label} is required`;
      } else if (field === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[field] = 'Please enter a valid email address';
      } else if (field === 'phone' && value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
        newErrors[field] = 'Please enter a valid phone number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (showSuccessAnimation) {
        setIsSuccess(true);
      }
      if (resetOnSuccess) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
        });
      }
    } catch {
      // Error is handled by parent via error prop
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: ContactFieldType, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const variantClasses = {
    default: '',
    card: 'bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm',
    minimal: '',
  };

  // Success State
  if (isSuccess && showSuccessAnimation) {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-12 ${variantClasses[variant]} ${className}`}
      >
        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center"
        >
          <Check className="w-8 h-8 text-green-500" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">{successMessage}</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-primary hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${variantClasses[variant]} ${className}`}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {/* External Error */}
      <AnimatePresence>
        {externalError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {externalError}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Two-column layout for name/email */}
        {fields.includes('name') && fields.includes('email') && (
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              {...fieldConfigs.name}
              name="name"
              value={formData.name}
              onChange={(v) => updateField('name', v)}
              error={errors.name}
              disabled={isLoading}
            />
            <FormInput
              {...fieldConfigs.email}
              name="email"
              value={formData.email}
              onChange={(v) => updateField('email', v)}
              error={errors.email}
              disabled={isLoading}
            />
          </div>
        )}

        {/* Phone and Company */}
        {(fields.includes('phone') || fields.includes('company')) && (
          <div className="grid md:grid-cols-2 gap-4">
            {fields.includes('phone') && (
              <FormInput
                {...fieldConfigs.phone}
                name="phone"
                value={formData.phone || ''}
                onChange={(v) => updateField('phone', v)}
                error={errors.phone}
                disabled={isLoading}
              />
            )}
            {fields.includes('company') && (
              <FormInput
                {...fieldConfigs.company}
                name="company"
                value={formData.company || ''}
                onChange={(v) => updateField('company', v)}
                error={errors.company}
                disabled={isLoading}
              />
            )}
          </div>
        )}

        {/* Single fields - name/email if not in grid */}
        {!fields.includes('name') || !fields.includes('email') ? (
          <>
            {fields.includes('name') && !fields.includes('email') && (
              <FormInput
                {...fieldConfigs.name}
                name="name"
                value={formData.name}
                onChange={(v) => updateField('name', v)}
                error={errors.name}
                disabled={isLoading}
              />
            )}
            {fields.includes('email') && !fields.includes('name') && (
              <FormInput
                {...fieldConfigs.email}
                name="email"
                value={formData.email}
                onChange={(v) => updateField('email', v)}
                error={errors.email}
                disabled={isLoading}
              />
            )}
          </>
        ) : null}

        {/* Subject */}
        {fields.includes('subject') && (
          <FormInput
            {...fieldConfigs.subject}
            name="subject"
            value={formData.subject || ''}
            onChange={(v) => updateField('subject', v)}
            error={errors.subject}
            disabled={isLoading}
          />
        )}

        {/* Message */}
        {fields.includes('message') && (
          <FormInput
            {...fieldConfigs.message}
            name="message"
            value={formData.message}
            onChange={(v) => updateField('message', v)}
            error={errors.message}
            disabled={isLoading}
          />
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
          className={`
            w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl
            bg-primary text-primary-foreground font-medium
            hover:bg-primary/90 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              {submitText}
              <Send className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

/**
 * ContactSection - Full contact section with info and form
 */
export interface ContactInfo {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}

export interface ContactSectionProps extends Omit<ContactFormProps, 'variant'> {
  /** Contact information items */
  contactInfo?: ContactInfo[];
  /** Section title */
  sectionTitle?: string;
  /** Section subtitle */
  sectionSubtitle?: string;
  /** Layout direction */
  layout?: 'horizontal' | 'vertical';
  /** Additional className */
  className?: string;
}

export function ContactSection({
  contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: '123 Main St, City, Country' },
  ],
  sectionTitle = 'Get in Touch',
  sectionSubtitle = "Have a question or want to work together? We'd love to hear from you.",
  layout = 'horizontal',
  className = '',
  ...formProps
}: ContactSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {sectionTitle}
        </motion.h2>
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {sectionSubtitle}
        </motion.p>
      </div>

      {/* Content */}
      <div className={`
        grid gap-12
        ${layout === 'horizontal' ? 'lg:grid-cols-2' : 'max-w-2xl mx-auto'}
      `}>
        {/* Contact Info */}
        {contactInfo && contactInfo.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={layout === 'vertical' ? 'grid md:grid-cols-3 gap-6 mb-8' : 'space-y-6'}
          >
            {layout === 'horizontal' && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                <p className="text-muted-foreground">Reach out through any of these channels.</p>
              </div>
            )}
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`
                  flex items-start gap-4 p-4 rounded-xl
                  ${layout === 'horizontal' ? 'bg-muted/30' : 'bg-card border'}
                `}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="font-medium hover:text-primary transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-medium">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Form */}
        <ContactForm variant="card" {...formProps} />
      </div>
    </div>
  );
}

// Default export
export default ContactForm;
