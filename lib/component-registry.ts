/**
 * Component Registry
 *
 * Single source of truth for all animation components and categories.
 * Used by Dashboard, DashboardLayout, and navigation components.
 */

import {
  Sparkles, Zap, Terminal, Activity, Database, Brain, LogIn,
  Layers, Loader, BarChart3, Waves, MessageCircle, MessageSquare, MessagesSquare,
  ShoppingCart, Heart, Clock, Bell, CreditCard,
  Wand2, MousePointer, Box, Palette, Move3d, LayoutGrid, GitBranch,
  Type, FileText, Sparkle, Grid3x3, PanelTop, Navigation,
  LayoutTemplate, FormInput, DollarSign, Mail, Megaphone, Star, Quote, PanelBottom, Menu,
  LucideIcon
} from 'lucide-react';

// Component metadata type
export interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  category: 'loading' | 'processing' | 'creative' | 'auth' | 'chat' | 'ecommerce' | 'effects' | 'cards' | 'text' | 'navigation' | 'sections';
  icon: LucideIcon;
}

// Category metadata type
export interface CategoryMeta {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

// Category registry
export const categories: CategoryMeta[] = [
  { id: 'all', name: 'All Components', icon: Layers, color: 'bg-slate-500' },
  { id: 'sections', name: 'Ready-to-Use', icon: LayoutTemplate, color: 'bg-emerald-500' },
  { id: 'loading', name: 'Loading', icon: Zap, color: 'bg-yellow-500' },
  { id: 'processing', name: 'Processing', icon: Activity, color: 'bg-blue-500' },
  { id: 'creative', name: 'Creative', icon: Sparkles, color: 'bg-purple-500' },
  { id: 'effects', name: 'Visual Effects', icon: Wand2, color: 'bg-cyan-500' },
  { id: 'cards', name: 'Interactive Cards', icon: Box, color: 'bg-amber-500' },
  { id: 'text', name: 'Text Animation', icon: Type, color: 'bg-rose-500' },
  { id: 'navigation', name: 'Navigation', icon: Navigation, color: 'bg-indigo-500' },
  { id: 'auth', name: 'Authentication', icon: LogIn, color: 'bg-green-500' },
  { id: 'chat', name: 'Chat', icon: MessageCircle, color: 'bg-pink-500' },
  { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingCart, color: 'bg-violet-500' },
] as const;

// Component registry
export const components: ComponentMeta[] = [
  {
    id: 'ai-creating',
    name: 'AiCreating',
    description: 'Multi-stage animation visualizing AI creation process with thinking, writing, building, and completion phases.',
    category: 'creative',
    icon: Sparkles,
  },
  {
    id: 'ai-creating-2',
    name: 'AiCreating2',
    description: 'Full-screen AI brain animation with rotating rings, floating particles, and dynamic status messages.',
    category: 'creative',
    icon: Brain,
  },
  {
    id: 'loading-dots',
    name: 'LoadingDots',
    description: 'Simple, elegant bouncing dots animation. Perfect for minimal loading states and inline indicators.',
    category: 'loading',
    icon: Zap,
  },
  {
    id: 'code-typing',
    name: 'CodeTyping',
    description: 'Realistic code typing effect with syntax highlighting and terminal-style presentation.',
    category: 'processing',
    icon: Terminal,
  },
  {
    id: 'pulse-circle',
    name: 'PulseCircle',
    description: 'Circular progress indicator with expanding pulse rings and percentage display.',
    category: 'loading',
    icon: Activity,
  },
  {
    id: 'data-processing',
    name: 'DataProcessing',
    description: 'Data pipeline visualization showing input, processing, and output stages with flowing cards.',
    category: 'processing',
    icon: Database,
  },
  {
    id: 'floating-login',
    name: 'FloatingLogin',
    description: 'Animated floating login form with smooth bobbing motion, supporting local and OAuth authentication.',
    category: 'auth',
    icon: LogIn,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description: 'Flexible skeleton loader with multiple variants for text, avatar, card, and image placeholders.',
    category: 'loading',
    icon: Loader,
  },
  {
    id: 'progress-bar',
    name: 'ProgressBar',
    description: 'Animated progress bar with gradient, striped, and glow variants. Includes step and circular progress.',
    category: 'loading',
    icon: BarChart3,
  },
  {
    id: 'shimmer',
    name: 'Shimmer',
    description: 'Beautiful shimmer animation wrapper with preset components for cards, tables, and full page layouts.',
    category: 'loading',
    icon: Waves,
  },
  {
    id: 'chat-bubble',
    name: 'ChatBubble',
    description: 'Animated chat message bubble with smooth entrance animations. Supports sender/receiver variants and message status.',
    category: 'chat',
    icon: MessageSquare,
  },
  {
    id: 'chat-typing',
    name: 'ChatTyping',
    description: 'Animated typing indicator with bouncing dots. Multiple animation variants for showing typing status.',
    category: 'chat',
    icon: MessagesSquare,
  },
  {
    id: 'chat-message',
    name: 'ChatMessage',
    description: 'Complete chat message component with avatar, name, bubble, and animations. Supports text and image messages.',
    category: 'chat',
    icon: MessageCircle,
  },
  // E-Commerce Components
  {
    id: 'product-card',
    name: 'ProductCard',
    description: 'Stunning 3D product card with mouse-tracking tilt effects, quick view overlay, and animated add to cart.',
    category: 'ecommerce',
    icon: CreditCard,
  },
  {
    id: 'add-to-cart-button',
    name: 'AddToCartButton',
    description: 'Multi-state button with particle burst, loading animation, and success state transformation.',
    category: 'ecommerce',
    icon: ShoppingCart,
  },
  {
    id: 'wishlist-heart',
    name: 'WishlistHeart',
    description: 'Animated heart button with expanding rings, particle burst effects, and multiple size variants.',
    category: 'ecommerce',
    icon: Heart,
  },
  {
    id: 'flash-sale-timer',
    name: 'FlashSaleTimer',
    description: 'Eye-catching countdown timer with flip transitions, urgency animations, and pulsing effects.',
    category: 'ecommerce',
    icon: Clock,
  },
  {
    id: 'cart-notification',
    name: 'CartNotification',
    description: 'Animated notification showing product flying to cart with success animations and progress bar.',
    category: 'ecommerce',
    icon: Bell,
  },
  // Visual Effects Components
  {
    id: 'glow-button',
    name: 'GlowButton',
    description: 'Eye-catching CTA button with animated shimmer sweep effect that draws attention to key actions.',
    category: 'effects',
    icon: Wand2,
  },
  {
    id: 'spotlight-card',
    name: 'SpotlightCard',
    description: 'Interactive card with mouse-tracking spotlight gradient effect that follows cursor movement.',
    category: 'effects',
    icon: MousePointer,
  },
  {
    id: 'aurora-background',
    name: 'AuroraBackground',
    description: 'Mesmerizing aurora borealis animated gradient background for hero sections and landing pages.',
    category: 'effects',
    icon: Palette,
  },
  {
    id: 'animated-beam',
    name: 'AnimatedBeam',
    description: 'SVG beam connecting elements with flowing animation. Perfect for showing data flow or connections.',
    category: 'effects',
    icon: GitBranch,
  },
  // Interactive Cards Components
  {
    id: 'card-3d',
    name: 'Card3D',
    description: '3D perspective tilt card with mouse-tracking rotation, glare effect, and spring physics.',
    category: 'cards',
    icon: Move3d,
  },
  {
    id: 'neon-gradient-card',
    name: 'NeonGradientCard',
    description: 'Stunning card with animated rotating neon gradient border and customizable glow intensity.',
    category: 'cards',
    icon: Box,
  },
  {
    id: 'infinite-carousel',
    name: 'InfiniteCarousel',
    description: 'Seamlessly looping horizontal carousel for logos, testimonials, or any repeating content.',
    category: 'cards',
    icon: LayoutGrid,
  },
  // Text Animation Components
  {
    id: 'typewriter-text',
    name: 'TypewriterText',
    description: 'Realistic typewriter effect that types out text character by character with cursor animation.',
    category: 'text',
    icon: Type,
  },
  {
    id: 'text-reveal',
    name: 'TextReveal',
    description: 'Scroll-based text reveal animation that fades in words as user scrolls down the page.',
    category: 'text',
    icon: FileText,
  },
  // Additional Visual Effects
  {
    id: 'meteor-shower',
    name: 'MeteorShower',
    description: 'Stunning meteor shower animation with twinkling stars for hero sections and dark themes.',
    category: 'effects',
    icon: Sparkle,
  },
  {
    id: 'grid-pattern',
    name: 'GridPattern',
    description: 'Versatile background patterns including dots, lines, hexagons, and animated beams.',
    category: 'effects',
    icon: Grid3x3,
  },
  // Navigation Components
  {
    id: 'animated-tabs',
    name: 'AnimatedTabs',
    description: 'Smooth animated tab component with sliding indicator and multiple style variants.',
    category: 'navigation',
    icon: PanelTop,
  },
  {
    id: 'dock',
    name: 'Dock',
    description: 'macOS-style dock navigation with magnification effect on hover.',
    category: 'navigation',
    icon: Navigation,
  },
  // Ready-to-Use Sections
  {
    id: 'auth-page',
    name: 'AuthPage',
    description: 'Complete authentication pages with login, signup, and forgot password forms. Includes OAuth support.',
    category: 'sections',
    icon: LogIn,
  },
  {
    id: 'animated-form',
    name: 'AnimatedForm',
    description: 'Beautiful animated form components including inputs, textareas, selects, toggles, and more.',
    category: 'sections',
    icon: FormInput,
  },
  {
    id: 'pricing-card',
    name: 'PricingCard',
    description: 'Animated pricing cards and tables with billing toggle, feature lists, and comparison views.',
    category: 'sections',
    icon: DollarSign,
  },
  {
    id: 'contact-form',
    name: 'ContactForm',
    description: 'Ready-to-use contact forms with validation, customizable fields, and contact info section.',
    category: 'sections',
    icon: Mail,
  },
  {
    id: 'hero-section',
    name: 'HeroSection',
    description: 'Stunning hero sections with multiple variants including gradient, split, video, and gradient text.',
    category: 'sections',
    icon: Megaphone,
  },
  {
    id: 'testimonial-card',
    name: 'TestimonialCard',
    description: 'Testimonial components with cards, carousel, grid, marquee, and wall layouts.',
    category: 'sections',
    icon: Quote,
  },
  {
    id: 'feature-card',
    name: 'FeatureCard',
    description: 'Feature display components with grid, bento, list, and showcase layouts.',
    category: 'sections',
    icon: Star,
  },
  {
    id: 'footer-section',
    name: 'FooterSection',
    description: 'Website footer components with multiple layouts, newsletter signup, and social links.',
    category: 'sections',
    icon: PanelBottom,
  },
  {
    id: 'navbar',
    name: 'Navbar',
    description: 'Navigation bar components with mobile menu, dropdowns, scroll effects, and multiple layouts.',
    category: 'sections',
    icon: Menu,
  },
];

// Helper functions
export function getComponentsByCategory(category: string): ComponentMeta[] {
  if (category === 'all') return components;
  return components.filter(c => c.category === category);
}

export function getComponentByName(name: string): ComponentMeta | undefined {
  return components.find(c => c.name === name);
}

export function getComponentById(id: string): ComponentMeta | undefined {
  return components.find(c => c.id === id);
}

export function getCategoryById(id: string): CategoryMeta | undefined {
  return categories.find(c => c.id === id);
}
