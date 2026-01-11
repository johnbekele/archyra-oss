const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

async function build() {
  // Build ESM bundle
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src/index.tsx')],
    bundle: true,
    format: 'esm',
    outfile: path.join(distDir, 'index.mjs'),
    external: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    jsx: 'automatic',
    banner: {
      js: "'use client';\n// archyra - ESM Build\n// CSS: import 'archyra/styles.css'\n"
    },
    minify: false,
  });

  // Build CJS bundle
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'src/index.tsx')],
    bundle: true,
    format: 'cjs',
    outfile: path.join(distDir, 'index.js'),
    external: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    jsx: 'automatic',
    banner: {
      js: '"use strict";\n// archyra - CommonJS Build\n'
    },
    minify: false,
  });

  // Copy CSS
  const componentCss = fs.readFileSync(path.join(rootDir, 'AiCreating.css'), 'utf8');
  fs.writeFileSync(path.join(distDir, 'styles.css'), componentCss);

  // Create TypeScript declarations
  const dtsContent = `import { FC, ReactNode, CSSProperties } from 'react';

// ============================================================================
// CREATIVE / AI COMPONENTS
// ============================================================================

export interface AiCreatingProps {
  isLoading: boolean;
  onComplete?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
}

export interface AiCreating2Props {
  isLoading: boolean;
  onComplete?: () => void;
  message?: string;
  subMessage?: string;
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  contained?: boolean;
  statusMessages?: Array<{ icon: 'sparkles' | 'brain' | 'zap'; text: string }>;
}

export interface CodeTypingProps {
  code?: string;
  language?: 'javascript' | 'typescript' | 'python' | 'jsx';
  typingSpeed?: number;
  showLineNumbers?: boolean;
  autoStart?: boolean;
  onComplete?: () => void;
}

export declare const AiCreating: FC<AiCreatingProps>;
export declare const AiCreating2: FC<AiCreating2Props>;
export declare const CodeTyping: FC<CodeTypingProps>;

// ============================================================================
// LOADING COMPONENTS
// ============================================================================

export interface LoadingDotsProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'normal' | 'fast';
}

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

export interface ShimmerProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  className?: string;
}

export declare const LoadingDots: FC<LoadingDotsProps>;
export declare const Skeleton: FC<SkeletonProps>;
export declare const SkeletonText: FC<{ lines?: number; width?: string }>;
export declare const SkeletonAvatar: FC<{ size?: number }>;
export declare const SkeletonCard: FC<{}>;
export declare const SkeletonImage: FC<{ width?: number | string; height?: number | string }>;
export declare const SkeletonList: FC<{ count?: number }>;
export declare const Shimmer: FC<ShimmerProps>;
export declare const ShimmerCard: FC<{}>;
export declare const ShimmerTable: FC<{ rows?: number }>;
export declare const ShimmerPage: FC<{}>;

// ============================================================================
// PROCESSING COMPONENTS
// ============================================================================

export interface PulseCircleProps {
  size?: number;
  color?: string;
  progress?: number;
  showPercentage?: boolean;
  pulseCount?: number;
}

export interface DataProcessingProps {
  isProcessing?: boolean;
  inputLabel?: string;
  outputLabel?: string;
  processingSteps?: string[];
  onComplete?: () => void;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'default' | 'gradient' | 'striped' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  color?: string;
  animated?: boolean;
}

export declare const PulseCircle: FC<PulseCircleProps>;
export declare const DataProcessing: FC<DataProcessingProps>;
export declare const ProgressBar: FC<ProgressBarProps>;
export declare const StepProgress: FC<{ steps: string[]; currentStep: number }>;
export declare const CircularProgress: FC<{ value: number; size?: number; strokeWidth?: number }>;

// ============================================================================
// AUTH COMPONENTS
// ============================================================================

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface FloatingLoginProps {
  onSubmit?: (data: LoginData) => void | Promise<void>;
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  showSocialLogin?: boolean;
  title?: string;
  subtitle?: string;
}

export declare const FloatingLogin: FC<FloatingLoginProps>;

// ============================================================================
// CHAT COMPONENTS
// ============================================================================

export interface ChatBubbleProps {
  message: string;
  variant?: 'sender' | 'receiver';
  color?: 'blue' | 'green' | 'purple' | 'gray' | 'gradient';
  timestamp?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  animated?: boolean;
  delay?: number;
}

export interface ChatTypingProps {
  variant?: 'dots' | 'pulse' | 'wave';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showAvatar?: boolean;
  username?: string;
}

export interface ChatMessageProps {
  message: string;
  sender?: { name: string; avatar?: string };
  isOwn?: boolean;
  timestamp?: string;
  type?: 'text' | 'image' | 'system';
  imageUrl?: string;
}

export declare const ChatBubble: FC<ChatBubbleProps>;
export declare const ChatBubbleWithReactions: FC<ChatBubbleProps & { reactions?: Array<{ emoji: string; count: number }> }>;
export declare const ChatTyping: FC<ChatTypingProps>;
export declare const ChatMessage: FC<ChatMessageProps>;
export declare const ChatConversation: FC<{ children: ReactNode }>;
export declare const ChatInput: FC<{ onSend: (message: string) => void; placeholder?: string }>;

// ============================================================================
// E-COMMERCE COMPONENTS
// ============================================================================

export interface ProductCardProps {
  image?: string;
  name?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  onAddToCart?: () => void;
  onWishlist?: () => void;
  onQuickView?: () => void;
}

export interface AddToCartButtonProps {
  onClick?: () => Promise<void> | void;
  text?: string;
  successText?: string;
  price?: number;
  variant?: 'violet' | 'emerald' | 'rose' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export interface WishlistHeartProps {
  isActive?: boolean;
  onToggle?: (isActive: boolean) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBackground?: boolean;
  activeColor?: string;
}

export interface FlashSaleTimerProps {
  endTime: Date | number;
  title?: string;
  onEnd?: () => void;
  variant?: 'default' | 'urgent' | 'minimal';
  showBadge?: boolean;
  discount?: number;
}

export interface CartNotificationProps {
  isVisible: boolean;
  productImage?: string;
  productName?: string;
  productPrice?: number;
  cartCount?: number;
  autoHideDuration?: number;
  onDismiss?: () => void;
  onViewCart?: () => void;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

export declare const ProductCard: FC<ProductCardProps>;
export declare const AddToCartButton: FC<AddToCartButtonProps>;
export declare const WishlistHeart: FC<WishlistHeartProps>;
export declare const FlashSaleTimer: FC<FlashSaleTimerProps>;
export declare const CartNotification: FC<CartNotificationProps>;
export declare const CartNotificationDemo: FC<{}>;

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default AiCreating;
`;

  fs.writeFileSync(path.join(distDir, 'index.d.ts'), dtsContent);

  console.log('Build complete!');
  console.log('Files created in dist/:');
  console.log('  - index.mjs (ESM)');
  console.log('  - index.js (CommonJS)');
  console.log('  - index.d.ts (TypeScript declarations)');
  console.log('  - styles.css (Styles)');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
