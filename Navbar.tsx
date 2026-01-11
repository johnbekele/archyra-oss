/**
 * Navbar - Animated Navigation Bar Components
 *
 * Ready-to-use navigation bars with mobile menus, dropdown menus,
 * scroll effects, and various layouts.
 *
 * @example
 * ```tsx
 * import { Navbar, NavbarFloating } from 'archyra';
 *
 * <Navbar
 *   logo={{ text: 'Brand' }}
 *   links={[
 *     { label: 'Home', href: '/' },
 *     { label: 'About', href: '/about' },
 *   ]}
 *   actions={[{ label: 'Sign In', href: '/login' }]}
 * />
 * ```
 */

'use client';

import { motion, useReducedMotion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';

// Types
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  active?: boolean;
  children?: NavLink[];
}

export interface NavAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'outline';
  icon?: ReactNode;
}

export interface NavLogo {
  src?: string;
  alt?: string;
  text?: string;
  href?: string;
  icon?: ReactNode;
}

// ============================================================================
// NAVBAR
// ============================================================================

export interface NavbarProps {
  /** Logo configuration */
  logo?: NavLogo;
  /** Navigation links */
  links?: NavLink[];
  /** CTA buttons */
  actions?: NavAction[];
  /** Sticky behavior */
  sticky?: boolean;
  /** Transparent background initially (for hero sections) */
  transparent?: boolean;
  /** Hide on scroll down */
  hideOnScroll?: boolean;
  /** Custom right content */
  rightContent?: ReactNode;
  /** Additional className */
  className?: string;
}

export function Navbar({
  logo,
  links = [],
  actions = [],
  sticky = true,
  transparent = false,
  hideOnScroll = false,
  rightContent,
  className = '',
}: NavbarProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);

    if (hideOnScroll) {
      setIsHidden(latest > lastScrollY && latest > 100);
      setLastScrollY(latest);
    }
  });

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const showBackground = !transparent || isScrolled;

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: isHidden ? -100 : 0,
          backgroundColor: showBackground ? 'var(--background)' : 'transparent',
        }}
        transition={{ duration: 0.2 }}
        className={`
          ${sticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}
          ${showBackground ? 'border-b border-border shadow-sm' : ''}
          transition-all duration-300
          ${className}
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            {logo && (
              <a href={logo.href || '/'} className="flex items-center gap-2 shrink-0">
                {logo.icon}
                {logo.src ? (
                  <img src={logo.src} alt={logo.alt || ''} className="h-8 w-auto" />
                ) : logo.text ? (
                  <span className="text-xl font-bold">{logo.text}</span>
                ) : null}
              </a>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <NavLinkItem key={link.label} link={link} />
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-3">
              {rightContent}
              {actions.map((action, i) => (
                <NavActionButton key={i} action={action} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
              className="md:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {links.map((link) => (
                  <MobileNavLink key={link.label} link={link} onClose={() => setIsOpen(false)} />
                ))}
                {actions.length > 0 && (
                  <div className="pt-4 border-t border-border space-y-2">
                    {actions.map((action, i) => (
                      <NavActionButton key={i} action={action} fullWidth />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed navbar */}
      {sticky && <div className="h-16 md:h-20" />}
    </>
  );
}

// Desktop Nav Link with Dropdown
function NavLinkItem({ link }: { link: NavLink }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = link.children && link.children.length > 0;

  if (hasChildren) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          className={`
            px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1
            transition-colors
            ${link.active ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
          `}
        >
          {link.label}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 pt-2"
            >
              <div className="bg-card border border-border rounded-xl shadow-lg py-2 min-w-[200px]">
                {link.children!.map((child) => (
                  <a
                    key={child.label}
                    href={child.href}
                    target={child.external ? '_blank' : undefined}
                    rel={child.external ? 'noopener noreferrer' : undefined}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {child.label}
                      {child.external && <ExternalLink className="w-3 h-3" />}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      className={`
        px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-1
        transition-colors
        ${link.active ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
      `}
    >
      {link.label}
      {link.external && <ExternalLink className="w-3 h-3" />}
    </a>
  );
}

// Mobile Nav Link
function MobileNavLink({ link, onClose }: { link: NavLink; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = link.children && link.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
        >
          {link.label}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-4 overflow-hidden"
            >
              {link.children!.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  onClick={onClose}
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {child.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <a
      href={link.href}
      onClick={onClose}
      className={`
        block px-3 py-2 text-sm font-medium rounded-lg transition-colors
        ${link.active ? 'text-primary bg-primary/5' : 'hover:bg-muted'}
      `}
    >
      {link.label}
    </a>
  );
}

// Action Button
function NavActionButton({ action, fullWidth = false }: { action: NavAction; fullWidth?: boolean }) {
  const variantClasses = {
    default: 'bg-muted hover:bg-muted/80 text-foreground',
    primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    outline: 'border border-border hover:bg-muted text-foreground',
  };

  const Component = action.href ? 'a' : 'button';

  return (
    <Component
      href={action.href}
      onClick={action.onClick}
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors
        ${variantClasses[action.variant || 'default']}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {action.icon}
      {action.label}
    </Component>
  );
}

// ============================================================================
// NAVBAR FLOATING
// ============================================================================

export interface NavbarFloatingProps {
  logo?: NavLogo;
  links?: NavLink[];
  actions?: NavAction[];
  className?: string;
}

export function NavbarFloating({
  logo,
  links = [],
  actions = [],
  className = '',
}: NavbarFloatingProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 100);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 ${className}`}
      >
        <nav className="bg-background/80 backdrop-blur-lg border border-border rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-4">
            {/* Logo */}
            {logo && (
              <a href={logo.href || '/'} className="flex items-center gap-2 shrink-0 px-2">
                {logo.icon}
                {logo.src ? (
                  <img src={logo.src} alt={logo.alt || ''} className="h-6 w-auto" />
                ) : logo.text ? (
                  <span className="text-sm font-bold">{logo.text}</span>
                ) : null}
              </a>
            )}

            {/* Links */}
            <div className="hidden md:flex items-center">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`
                    px-3 py-1.5 text-sm font-medium rounded-full transition-colors
                    ${link.active ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}
                  `}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            {actions.length > 0 && (
              <div className="flex items-center gap-2 pl-2 border-l border-border">
                {actions.map((action, i) => (
                  <NavActionButton key={i} action={action} />
                ))}
              </div>
            )}
          </div>
        </nav>
      </motion.header>

      {/* Static Header (shown when not scrolled) */}
      <header className="relative z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            {logo && (
              <a href={logo.href || '/'} className="flex items-center gap-2">
                {logo.icon}
                {logo.src ? (
                  <img src={logo.src} alt={logo.alt || ''} className="h-8 w-auto" />
                ) : logo.text ? (
                  <span className="text-xl font-bold">{logo.text}</span>
                ) : null}
              </a>
            )}

            {/* Links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${link.active ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
                  `}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              {actions.map((action, i) => (
                <NavActionButton key={i} action={action} />
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

// ============================================================================
// NAVBAR CENTERED
// ============================================================================

export interface NavbarCenteredProps {
  logo?: NavLogo;
  links?: NavLink[];
  actions?: NavAction[];
  sticky?: boolean;
  className?: string;
}

export function NavbarCentered({
  logo,
  links = [],
  actions = [],
  sticky = true,
  className = '',
}: NavbarCenteredProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header
        className={`
          ${sticky ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}
          bg-background border-b border-border
          ${className}
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Left Links */}
            <div className="hidden md:flex items-center gap-1 flex-1">
              {links.slice(0, Math.ceil(links.length / 2)).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${link.active ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
                  `}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Center Logo */}
            {logo && (
              <a href={logo.href || '/'} className="flex items-center gap-2">
                {logo.icon}
                {logo.src ? (
                  <img src={logo.src} alt={logo.alt || ''} className="h-8 w-auto" />
                ) : logo.text ? (
                  <span className="text-xl font-bold">{logo.text}</span>
                ) : null}
              </a>
            )}

            {/* Right Links */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
              {links.slice(Math.ceil(links.length / 2)).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${link.active ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}
                  `}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {actions.map((action, i) => (
                <NavActionButton key={i} action={action} />
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      {sticky && <div className="h-16 md:h-20" />}
    </>
  );
}

// Default export
export default Navbar;
