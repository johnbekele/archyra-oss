'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Github, Layers, ChevronDown,
  Cloud, GitBranch, Lock
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import UserMenu from '@/components/auth/UserMenu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Documentation' },
];

const galleryLinks = [
  {
    href: '/gallery/ui',
    label: 'UI Components',
    description: 'React components with animations',
    icon: Layers,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    href: '/gallery/iac',
    label: 'IaC Templates',
    description: 'Terraform & Pulumi templates',
    icon: Cloud,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    href: '/gallery/designer',
    label: 'Architecture Designer',
    description: 'Visual AWS architecture builder',
    icon: GitBranch,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    badge: 'Auth',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isGalleryActive = pathname.startsWith('/gallery') || pathname.startsWith('/components');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 dark:border-border/20">
      <nav className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Archyra Logo */}
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-violet-600 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-all group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-white"
                >
                  {/* Archyra logo - V with motion waves */}
                  {/* Main V shape */}
                  <path
                    d="M5 4L12 20L19 4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Motion wave lines */}
                  <path
                    d="M2 8C3.5 8 3.5 6 5 6C6.5 6 6.5 8 8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <path
                    d="M16 8C17.5 8 17.5 6 19 6C20.5 6 20.5 8 22 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-violet-600 blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl tracking-tight">
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                  Archyra
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative px-4 ${
                    isActive(link.href)
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Button>
              </Link>
            ))}

            {/* Gallery Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setGalleryDropdownOpen(true)}
              onMouseLeave={() => setGalleryDropdownOpen(false)}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`relative px-4 gap-1 ${
                  isGalleryActive
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Gallery
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${galleryDropdownOpen ? 'rotate-180' : ''}`} />
                {isGalleryActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Button>

              <AnimatePresence>
                {galleryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-72 p-2 bg-popover border border-border rounded-xl shadow-xl"
                  >
                    {galleryLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className={`w-9 h-9 rounded-lg ${link.bgColor} flex items-center justify-center shrink-0`}>
                            <Icon className={`w-4.5 h-4.5 ${link.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{link.label}</span>
                              {link.badge && (
                                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                  <Lock className="w-2.5 h-2.5" />
                                  {link.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {link.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                    <div className="border-t border-border mt-2 pt-2">
                      <Link
                        href="/gallery"
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
                      >
                        <span>View all gallery sections</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/johnbekele/archyra-oss"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Github className="w-5 h-5" />
              </Button>
            </a>

            <ThemeToggle />

            <Link href="/gallery" className="hidden sm:block">
              <Button size="sm" className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25">
                <Layers className="w-4 h-4" />
                Gallery
              </Button>
            </Link>

            <div className="hidden sm:block">
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-border/40 dark:border-border/20"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(link.href) ? 'secondary' : 'ghost'}
                    className={`w-full justify-start ${
                      isActive(link.href) ? 'bg-violet-500/10 text-violet-600' : ''
                    }`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}

              {/* Gallery Section */}
              <div className="border-t border-border/40 pt-2 mt-2">
                <p className="px-3 py-1 text-xs font-medium text-muted-foreground">Gallery</p>
                {galleryLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant={isActive(link.href) ? 'secondary' : 'ghost'}
                        className={`w-full justify-start gap-2 ${
                          isActive(link.href) ? 'bg-violet-500/10 text-violet-600' : ''
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${link.color}`} />
                        {link.label}
                        {link.badge && (
                          <Lock className="w-3 h-3 ml-auto text-muted-foreground" />
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </div>

              <a
                href="https://github.com/johnbekele/archyra-oss"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
