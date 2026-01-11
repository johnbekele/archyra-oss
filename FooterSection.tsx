/**
 * FooterSection - Animated Website Footer Components
 *
 * Ready-to-use footer sections with multiple layouts, social links,
 * newsletter signup, and navigation.
 *
 * @example
 * ```tsx
 * import { Footer, FooterSimple, FooterCentered } from 'archyra';
 *
 * <Footer
 *   logo={{ src: '/logo.svg', alt: 'Company' }}
 *   columns={[
 *     { title: 'Product', links: [{ label: 'Features', href: '/features' }] },
 *     { title: 'Company', links: [{ label: 'About', href: '/about' }] },
 *   ]}
 *   socialLinks={[{ platform: 'twitter', href: 'https://twitter.com' }]}
 * />
 * ```
 */

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

// Types
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'instagram' | 'facebook' | 'youtube';
  href: string;
  label?: string;
}

export interface FooterLogo {
  src?: string;
  alt?: string;
  text?: string;
  href?: string;
}

// Social Icons Map
const SocialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

// ============================================================================
// FOOTER (FULL)
// ============================================================================

export interface FooterProps {
  /** Logo configuration */
  logo?: FooterLogo;
  /** Footer description */
  description?: string;
  /** Navigation columns */
  columns?: FooterColumn[];
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Newsletter signup */
  newsletter?: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
    onSubmit?: (email: string) => void | Promise<void>;
  };
  /** Contact info */
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  /** Copyright text */
  copyright?: string;
  /** Bottom links (privacy, terms, etc.) */
  bottomLinks?: FooterLink[];
  /** Additional className */
  className?: string;
}

export function Footer({
  logo,
  description,
  columns = [],
  socialLinks = [],
  newsletter,
  contact,
  copyright,
  bottomLinks = [],
  className = '',
}: FooterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletter?.onSubmit || !email) return;

    setIsSubmitting(true);
    try {
      await newsletter.onSubmit(email);
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-card border-t border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              {/* Logo */}
              {logo && (
                <motion.a
                  href={logo.href || '/'}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 mb-4"
                >
                  {logo.src ? (
                    <img src={logo.src} alt={logo.alt || ''} className="h-8 w-auto" />
                  ) : logo.text ? (
                    <span className="text-xl font-bold">{logo.text}</span>
                  ) : null}
                </motion.a>
              )}

              {/* Description */}
              {description && (
                <motion.p
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground text-sm mb-6 max-w-sm"
                >
                  {description}
                </motion.p>
              )}

              {/* Contact Info */}
              {contact && (
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2 text-sm text-muted-foreground mb-6"
                >
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      <Phone className="w-4 h-4" />
                      {contact.phone}
                    </a>
                  )}
                  {contact.address && (
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                      {contact.address}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Social Links */}
              {socialLinks.length > 0 && (
                <motion.div
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3"
                >
                  {socialLinks.map((social) => {
                    const Icon = SocialIcons[social.platform];
                    return (
                      <a
                        key={social.platform}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label || social.platform}
                        className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {columns.map((column, columnIndex) => (
                  <motion.div
                    key={column.title}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + columnIndex * 0.1 }}
                  >
                    <h3 className="font-semibold text-sm mb-4">{column.title}</h3>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                          >
                            {link.label}
                            {link.external && <ExternalLink className="w-3 h-3" />}
                            {link.badge && (
                              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded">
                                {link.badge}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            {newsletter && (
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-3"
              >
                <h3 className="font-semibold text-sm mb-2">
                  {newsletter.title || 'Subscribe to our newsletter'}
                </h3>
                {newsletter.description && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {newsletter.description}
                  </p>
                )}
                {submitted ? (
                  <p className="text-sm text-green-500">Thanks for subscribing!</p>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={newsletter.placeholder || 'Enter your email'}
                      required
                      className="flex-1 px-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? '...' : newsletter.buttonText || 'Subscribe'}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {copyright || `© ${currentYear} All rights reserved.`}
          </p>

          {bottomLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// FOOTER SIMPLE
// ============================================================================

export interface FooterSimpleProps {
  logo?: FooterLogo;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  copyright?: string;
  className?: string;
}

export function FooterSimple({
  logo,
  links = [],
  socialLinks = [],
  copyright,
  className = '',
}: FooterSimpleProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-card border-t border-border py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          {logo && (
            <a href={logo.href || '/'} className="flex items-center gap-2">
              {logo.src ? (
                <img src={logo.src} alt={logo.alt || ''} className="h-8 w-auto" />
              ) : logo.text ? (
                <span className="text-xl font-bold">{logo.text}</span>
              ) : null}
            </a>
          )}

          {/* Links */}
          {links.length > 0 && (
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = SocialIcons[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            {copyright || `© ${currentYear} All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// FOOTER CENTERED
// ============================================================================

export interface FooterCenteredProps {
  logo?: FooterLogo;
  description?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  copyright?: string;
  className?: string;
}

export function FooterCentered({
  logo,
  description,
  links = [],
  socialLinks = [],
  copyright,
  className = '',
}: FooterCenteredProps) {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-card border-t border-border py-12 md:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        {logo && (
          <motion.a
            href={logo.href || '/'}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            {logo.src ? (
              <img src={logo.src} alt={logo.alt || ''} className="h-10 w-auto mx-auto" />
            ) : logo.text ? (
              <span className="text-2xl font-bold">{logo.text}</span>
            ) : null}
          </motion.a>
        )}

        {/* Description */}
        {description && (
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-md mx-auto mb-8"
          >
            {description}
          </motion.p>
        )}

        {/* Links */}
        {links.length > 0 && (
          <motion.nav
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4 mb-8"
          >
            {socialLinks.map((social) => {
              const Icon = SocialIcons[social.platform];
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </motion.div>
        )}

        {/* Copyright */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground pt-8 border-t border-border"
        >
          {copyright || `© ${currentYear} All rights reserved.`}
        </motion.p>
      </div>
    </footer>
  );
}

// ============================================================================
// FOOTER DARK (GRADIENT)
// ============================================================================

export interface FooterDarkProps extends FooterProps {
  gradientFrom?: string;
  gradientTo?: string;
}

export function FooterDark({
  gradientFrom = '#0f0f0f',
  gradientTo = '#1a1a1a',
  ...props
}: FooterDarkProps) {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
      }}
      className="text-white"
    >
      <Footer
        {...props}
        className={`bg-transparent border-white/10 ${props.className || ''}`}
      />
    </div>
  );
}

// ============================================================================
// FOOTER CTA (WITH CALL TO ACTION)
// ============================================================================

export interface FooterCTAProps extends FooterProps {
  cta?: {
    title: string;
    description?: string;
    buttonText: string;
    buttonHref?: string;
    onButtonClick?: () => void;
  };
}

export function FooterCTA({
  cta,
  ...props
}: FooterCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div>
      {/* CTA Section */}
      {cta && (
        <section className="bg-gradient-to-r from-primary to-purple-600 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {cta.title}
            </motion.h2>
            {cta.description && (
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/80 mb-8"
              >
                {cta.description}
              </motion.p>
            )}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <a
                href={cta.buttonHref}
                onClick={cta.onButtonClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              >
                {cta.buttonText}
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer {...props} />
    </div>
  );
}

// Default export
export default Footer;
