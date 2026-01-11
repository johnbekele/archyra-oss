// Main exports for AI Animation Framework
// This file mirrors src/index.tsx for local development

// ============================================================================
// CREATIVE / AI COMPONENTS
// ============================================================================

export { default as AiCreating } from './AiCreating';
export type { AiCreatingProps } from './AiCreating';

export { AiCreating2 } from './AiCreating2';
export type { AiCreating2Props } from './AiCreating2';

export { default as CodeTyping } from './CodeTyping';
export type { CodeTypingProps } from './CodeTyping';

// ============================================================================
// LOADING COMPONENTS
// ============================================================================

export { default as LoadingDots } from './LoadingDots';
export type { LoadingDotsProps } from './LoadingDots';

export { default as Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonImage, SkeletonList } from './Skeleton';
export type { SkeletonProps } from './Skeleton';

export { default as Shimmer, ShimmerCard, ShimmerTable, ShimmerPage } from './Shimmer';
export type { ShimmerProps } from './Shimmer';

// ============================================================================
// PROCESSING COMPONENTS
// ============================================================================

export { default as PulseCircle } from './PulseCircle';
export type { PulseCircleProps } from './PulseCircle';

export { default as DataProcessing } from './DataProcessing';
export type { DataProcessingProps } from './DataProcessing';

export { default as ProgressBar, StepProgress, CircularProgress } from './ProgressBar';
export type { ProgressBarProps } from './ProgressBar';

// ============================================================================
// AUTH COMPONENTS
// ============================================================================

export { default as FloatingLogin } from './FloatingLogin';
export type { FloatingLoginProps, LoginData } from './FloatingLogin';

// ============================================================================
// CHAT COMPONENTS
// ============================================================================

export { default as ChatBubble, ChatBubbleWithReactions } from './ChatBubble';
export type { ChatBubbleProps } from './ChatBubble';

export { default as ChatTyping } from './ChatTyping';
export type { ChatTypingProps } from './ChatTyping';

export { default as ChatMessage, ChatConversation, ChatInput } from './ChatMessage';
export type { ChatMessageProps } from './ChatMessage';

// ============================================================================
// E-COMMERCE COMPONENTS
// ============================================================================

export { ProductCard } from './ProductCard';
export type { ProductCardProps } from './ProductCard';

export { AddToCartButton } from './AddToCartButton';
export type { AddToCartButtonProps } from './AddToCartButton';

export { WishlistHeart } from './WishlistHeart';
export type { WishlistHeartProps } from './WishlistHeart';

export { FlashSaleTimer } from './FlashSaleTimer';
export type { FlashSaleTimerProps } from './FlashSaleTimer';

export { CartNotification, CartNotificationDemo } from './CartNotification';
export type { CartNotificationProps } from './CartNotification';

// ============================================================================
// VISUAL EFFECTS COMPONENTS
// ============================================================================

export { GlowButton, GlowButtonGroup } from './GlowButton';
export type { GlowButtonProps, GlowButtonGroupProps } from './GlowButton';

export { default as SpotlightCard, SpotlightCardHeader, SpotlightCardContent, SpotlightCardFooter, SpotlightGrid } from './SpotlightCard';
export type { SpotlightCardProps, SpotlightCardHeaderProps, SpotlightCardContentProps, SpotlightCardFooterProps, SpotlightGridProps } from './SpotlightCard';

export { default as AuroraBackground, AuroraText, auroraPresets } from './AuroraBackground';
export type { AuroraBackgroundProps, AuroraTextProps } from './AuroraBackground';

export { default as AnimatedBeam, AnimatedBeamContainer, AnimatedBeamNode, MultiBeamDemo } from './AnimatedBeam';
export type { AnimatedBeamProps, AnimatedBeamContainerProps, AnimatedBeamNodeProps } from './AnimatedBeam';

export { default as MeteorShower, MeteorShowerDark, MeteorShowerCosmic, MeteorShowerGold, Meteor, StarField } from './MeteorShower';
export type { MeteorShowerProps, SingleMeteorProps, StarFieldProps } from './MeteorShower';

export { default as GridPattern, DotPattern, GridPatternBeams, HexagonPattern, DiagonalLines } from './GridPattern';
export type { GridPatternProps, DotPatternProps, GridPatternBeamsProps, HexagonPatternProps, DiagonalLinesProps } from './GridPattern';

// ============================================================================
// TEXT ANIMATION COMPONENTS
// ============================================================================

export { default as TypewriterText, TypewriterTextGradient, TypewriterTextMultiline, TypewriterTextDelete } from './TypewriterText';
export type { TypewriterTextProps, TypewriterTextGradientProps, TypewriterTextMultilineProps, TypewriterTextDeleteProps } from './TypewriterText';

export { default as TextReveal, TextRevealGradient, TextRevealHighlight, TextRevealLine } from './TextReveal';
export type { TextRevealProps, TextRevealGradientProps, TextRevealHighlightProps, TextRevealLineProps } from './TextReveal';

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================

export { default as AnimatedTabs, AnimatedTabsVertical, AnimatedTabsUnderline, AnimatedTabsPills, TabList } from './AnimatedTabs';
export type { AnimatedTabsProps, AnimatedTabsVerticalProps, Tab, TabListProps } from './AnimatedTabs';

export { default as Dock, DockItem, DockDivider, FloatingDock, DockStatic, DockMobile } from './Dock';
export type { DockProps, DockItemProps, DockStaticProps, DockMobileProps } from './Dock';

// ============================================================================
// INTERACTIVE CARDS COMPONENTS
// ============================================================================

export { default as Card3D, Card3DContent, Card3DImage, Card3DFloatingElement, Card3DGrid } from './Card3D';
export type { Card3DProps, Card3DContentProps, Card3DImageProps, Card3DFloatingElementProps, Card3DGridProps } from './Card3D';

export { default as NeonGradientCard, NeonGradientCardHeader, NeonGradientCardContent, NeonGradientCardFooter, neonGradientPresets } from './NeonGradientCard';
export type { NeonGradientCardProps, NeonGradientCardHeaderProps, NeonGradientCardContentProps, NeonGradientCardFooterProps } from './NeonGradientCard';

export { default as InfiniteCarousel, InfiniteCarouselCard, InfiniteLogoCarousel, TestimonialCarousel } from './InfiniteCarousel';
export type { InfiniteCarouselProps, CarouselItem, InfiniteCarouselCardProps, InfiniteLogoCarouselProps, LogoItem, TestimonialCarouselProps, Testimonial } from './InfiniteCarousel';

// ============================================================================
// READY-TO-USE SECTIONS
// ============================================================================

// Auth Pages
export { LoginPage, SignupPage, ForgotPasswordPage } from './AuthPage';
export type { AuthPageProps, SignupPageProps, ForgotPasswordPageProps, AuthFormData } from './AuthPage';

// Forms
export { AnimatedInput, AnimatedTextarea, AnimatedSelect, AnimatedToggle, AnimatedCheckbox, AnimatedRadioGroup, AnimatedTagsInput } from './AnimatedForm';
export type { AnimatedInputProps, AnimatedTextareaProps, AnimatedSelectProps, AnimatedToggleProps, AnimatedCheckboxProps, AnimatedRadioGroupProps, AnimatedTagsInputProps, SelectOption, RadioOption } from './AnimatedForm';

// Pricing
export { default as PricingCard, PricingTable, PricingComparison, PricingIcons } from './PricingCard';
export type { PricingCardProps, PricingTableProps, PricingComparisonProps, PricingPlan, PricingFeature } from './PricingCard';

// Contact
export { default as ContactForm, ContactSection } from './ContactForm';
export type { ContactFormProps, ContactSectionProps, ContactFormData, ContactFieldType, ContactInfo } from './ContactForm';

// Hero Sections
export { default as HeroSection, HeroCentered, HeroSplit, HeroVideo, HeroGradientText } from './HeroSection';
export type { HeroSectionProps, HeroCenteredProps, HeroSplitProps, HeroVideoProps, HeroGradientTextProps, HeroAction } from './HeroSection';

// Testimonials
export { default as TestimonialCard, TestimonialCarousel as TestimonialSlider, TestimonialGrid, TestimonialMarquee, TestimonialWall, TestimonialHighlight, TestimonialSection } from './TestimonialCard';
export type { TestimonialCardProps, TestimonialCarouselProps as TestimonialSliderProps, TestimonialGridProps, TestimonialMarqueeProps, TestimonialWallProps, TestimonialHighlightProps, TestimonialSectionProps, Testimonial as TestimonialData, TestimonialAuthor } from './TestimonialCard';

// Features
export { default as FeatureCard, FeatureGrid, FeatureBento, FeatureList, FeatureShowcase, FeatureSection } from './FeatureCard';
export type { FeatureCardProps, FeatureGridProps, FeatureBentoProps, FeatureListProps, FeatureShowcaseProps, FeatureSectionProps, Feature, BentoFeature } from './FeatureCard';

// Footer
export { default as Footer, FooterSimple, FooterCentered, FooterDark, FooterCTA } from './FooterSection';
export type { FooterProps, FooterSimpleProps, FooterCenteredProps, FooterDarkProps, FooterCTAProps, FooterLink, FooterColumn, SocialLink, FooterLogo } from './FooterSection';

// Navbar
export { default as Navbar, NavbarFloating, NavbarCentered } from './Navbar';
export type { NavbarProps, NavbarFloatingProps, NavbarCenteredProps, NavLink, NavAction, NavLogo } from './Navbar';

// ============================================================================
// DASHBOARD & EXAMPLES (for development)
// ============================================================================

export { default as Dashboard } from './Dashboard';
export { default as AiCreatingExample } from './AiCreatingExample';
