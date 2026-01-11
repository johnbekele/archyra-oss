'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ShoppingCart, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { CartNotification, CartNotificationDemo } from '../../CartNotification';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function CartNotificationPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');
  const [position, setPosition] = useState<'top-right' | 'top-center' | 'bottom-right' | 'bottom-center'>('top-right');
  const [autoHide, setAutoHide] = useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { CartNotification } from 'archyra';

const [showNotification, setShowNotification] = useState(false);
const [cartCount, setCartCount] = useState(0);

const handleAddToCart = () => {
  setCartCount(c => c + 1);
  setShowNotification(true);
};

<CartNotification
  isVisible={showNotification}
  productImage="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  productName="Premium Wireless Headphones"
  productPrice={299.99}
  cartCount={cartCount}
  position="${position}"
  autoHideDuration={${autoHide ? '4000' : '0'}}
  onDismiss={() => setShowNotification(false)}
  onViewCart={() => router.push('/cart')}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="cart-notification ${position}" id="cartNotification">
  <div class="notification-content">
    <div class="product-info">
      <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product" class="product-image" />
      <div class="product-details">
        <span class="success-label">Added to cart!</span>
        <h4 class="product-name">Premium Wireless Headphones</h4>
        <span class="product-price">$299.99</span>
      </div>
    </div>
    <div class="actions">
      <button class="view-cart-btn">
        View Cart
        <span class="cart-count">1</span>
      </button>
      <button class="dismiss-btn">&times;</button>
    </div>
    ${autoHide ? '<div class="progress-bar"></div>' : ''}
  </div>
</div>

<!-- CSS -->
<style>
.cart-notification {
  position: fixed;
  z-index: 1000;
  animation: slideIn 0.4s ease-out;
}

.cart-notification.top-right { top: 16px; right: 16px; }
.cart-notification.top-center { top: 16px; left: 50%; transform: translateX(-50%); }
.cart-notification.bottom-right { bottom: 16px; right: 16px; }
.cart-notification.bottom-center { bottom: 16px; left: 50%; transform: translateX(-50%); }

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  padding: 16px;
  min-width: 320px;
  position: relative;
  overflow: hidden;
}

.product-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.product-image {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  object-fit: cover;
  animation: flyIn 0.5s ease-out;
}

@keyframes flyIn {
  from {
    transform: scale(0.5) translateY(-20px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.product-details {
  flex: 1;
}

.success-label {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #22c55e;
  font-size: 12px;
  font-weight: 600;
}

.success-label::before {
  content: '✓';
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background: #22c55e;
  color: white;
  border-radius: 50%;
  font-size: 10px;
}

.product-name {
  margin: 4px 0;
  font-size: 14px;
  font-weight: 600;
}

.product-price {
  color: #8b5cf6;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.view-cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.cart-count {
  background: white;
  color: #8b5cf6;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.dismiss-btn {
  padding: 10px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #8b5cf6;
  animation: countdown 4s linear forwards;
}

@keyframes countdown {
  from { width: 100%; }
  to { width: 0%; }
}

.cart-notification.hidden {
  animation: slideOut 0.3s ease-out forwards;
}

@keyframes slideOut {
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>

<!-- JavaScript -->
<script>
class CartNotification {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { autoHide: ${autoHide ? 4000 : 0}, ...options };
    this.init();
  }

  init() {
    this.element.querySelector('.dismiss-btn').addEventListener('click', () => this.hide());
    this.element.querySelector('.view-cart-btn').addEventListener('click', () => {
      this.hide();
      this.options.onViewCart?.();
    });

    if (this.options.autoHide > 0) {
      setTimeout(() => this.hide(), this.options.autoHide);
    }
  }

  show() {
    this.element.classList.remove('hidden');
    this.element.style.display = 'block';
  }

  hide() {
    this.element.classList.add('hidden');
    setTimeout(() => {
      this.element.style.display = 'none';
      this.options.onDismiss?.();
    }, 300);
  }
}

// Usage:
const notification = new CartNotification(
  document.getElementById('cartNotification'),
  { onViewCart: () => window.location.href = '/cart' }
);
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="CartNotification" description="Flying product notification">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Position</h3>
            <div className="grid grid-cols-2 gap-2">
              {(['top-right', 'top-center', 'bottom-right', 'bottom-center'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPosition(p)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    position === p
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {p.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoHide}
                onChange={(e) => setAutoHide(e.target.checked)}
                className="w-4 h-4 rounded accent-violet-500"
              />
              <span className="text-sm">Auto Hide (4 seconds)</span>
            </label>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Flying product animation</li>
              <li>- Trail particle effects</li>
              <li>- Success checkmark transition</li>
              <li>- Progress bar countdown</li>
              <li>- Cart count badge</li>
              <li>- View cart button</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-violet-100 text-sm">Click "Add to Cart" to trigger the notification</p>
            </div>
            <div className="p-8 bg-muted/30 min-h-[400px] flex items-center justify-center">
              <CartNotificationDemo />
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Custom Position Demo</h2>
              <p className="text-muted-foreground text-sm">Try different notification positions</p>
            </div>
            <div className="p-8 bg-muted/30 relative min-h-[250px]">
              <CustomPositionDemo position={position} autoHide={autoHide} />
            </div>
          </div>

          {/* Code */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Usage</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1 ml-2">
                        {framework === 'react' ? 'React' : 'Vanilla'}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => setFramework('react')}>
                        React + Framer Motion
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFramework('vanilla')}>
                        Vanilla HTML/CSS/JS
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <button onClick={() => copyToClipboard(usageCode, 'usage')} className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors">
                  {copied === 'usage' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'usage' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-zinc-950 overflow-x-auto max-h-[300px]">
                <pre className="text-xs text-zinc-100 font-mono"><code>{usageCode}</code></pre>
              </div>
            </div>

            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Installation</span>
                </div>
                <button onClick={() => copyToClipboard(installCode, 'install')} className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors">
                  {copied === 'install' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'install' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-zinc-950">
                <pre className="text-xs text-zinc-100 font-mono"><code>{installCode}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function CustomPositionDemo({
  position,
  autoHide
}: {
  position: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  autoHide: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleClick = () => {
    setCartCount(c => c + 1);
    setIsVisible(true);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl flex items-center gap-2 hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg"
      >
        <ShoppingCart className="w-4 h-4" />
        Test Position: {position}
      </button>

      <CartNotification
        isVisible={isVisible}
        position={position}
        cartCount={cartCount}
        autoHideDuration={autoHide ? 4000 : 0}
        onDismiss={() => setIsVisible(false)}
        onViewCart={() => {
          setIsVisible(false);
          alert('Navigate to cart!');
        }}
      />
    </div>
  );
}
