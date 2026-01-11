'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FrameworkCodeBlock } from '@/components/docs/FrameworkCodeBlock';

export default function EcommerceComponentsPage() {
  const components = [
    {
      name: 'ProductCard',
      description: 'Stunning 3D product card with mouse-tracking tilt effects, quick view overlay, and animated add to cart.',
      href: '/ProductCard',
      props: [
        { name: 'image', type: 'string', default: 'placeholder', description: 'Product image URL' },
        { name: 'name', type: 'string', default: '-', description: 'Product name' },
        { name: 'price', type: 'number', default: '-', description: 'Product price' },
        { name: 'originalPrice', type: 'number', default: '-', description: 'Original price for discount' },
        { name: 'rating', type: 'number', default: '-', description: 'Product rating (0-5)' },
        { name: 'onAddToCart', type: '() => void', default: '-', description: 'Add to cart callback' },
      ],
      reactCode: `import { ProductCard } from 'archyra';

<ProductCard
  image="https://example.com/product.jpg"
  name="Premium Wireless Headphones"
  price={299.99}
  originalPrice={399.99}
  rating={4.8}
  reviews={256}
  badge="Best Seller"
  onAddToCart={() => handleAddToCart()}
  onWishlist={() => handleWishlist()}
/>`,
      vanillaCode: `<!-- HTML -->
<div class="product-card">
  <div class="product-image">
    <img src="/product.jpg" alt="Product" />
    <span class="badge">Best Seller</span>
    <button class="wishlist-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
      </svg>
    </button>
    <div class="quick-view-overlay">
      <button class="quick-view-btn">Quick View</button>
    </div>
  </div>
  <div class="product-info">
    <h3 class="product-name">Premium Wireless Headphones</h3>
    <div class="rating">
      <span class="stars">★★★★★</span>
      <span class="reviews">(256)</span>
    </div>
    <div class="price">
      <span class="current">$299.99</span>
      <span class="original">$399.99</span>
    </div>
    <button class="add-to-cart-btn">Add to Cart</button>
  </div>
</div>

<!-- CSS -->
<style>
.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

.product-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #8b5cf6;
  color: white;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
}

.wishlist-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.wishlist-btn svg { width: 20px; height: 20px; }

.quick-view-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover .quick-view-overlay {
  opacity: 1;
}

.quick-view-btn {
  background: white;
  color: #111;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
}

.product-info {
  padding: 16px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}

.stars { color: #fbbf24; }
.reviews { color: #9ca3af; font-size: 14px; }

.price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.price .current {
  font-size: 18px;
  font-weight: 700;
  color: #111;
}

.price .original {
  font-size: 14px;
  color: #9ca3af;
  text-decoration: line-through;
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px;
  background: #111;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.add-to-cart-btn:hover { background: #333; }
</style>`,
    },
    {
      name: 'AddToCartButton',
      description: 'Multi-state button with particle burst, loading animation, and success state transformation.',
      href: '/AddToCartButton',
      props: [
        { name: 'onClick', type: '() => Promise<void>', default: '-', description: 'Click callback' },
        { name: 'text', type: 'string', default: "'Add to Cart'", description: 'Button text' },
        { name: 'successText', type: 'string', default: "'Added!'", description: 'Success text' },
        { name: 'variant', type: "'violet' | 'emerald' | 'rose'", default: "'violet'", description: 'Color variant' },
      ],
      reactCode: `import { AddToCartButton } from 'archyra';

// Basic usage
<AddToCartButton onClick={() => addToCart(product)} />

// With price display
<AddToCartButton
  text="Add to Cart"
  price={99.99}
  variant="violet"
  onClick={async () => {
    await api.addToCart(productId);
  }}
/>

// Different variants
<AddToCartButton variant="emerald" />
<AddToCartButton variant="rose" size="lg" />`,
      vanillaCode: `<!-- HTML -->
<button class="add-to-cart-btn violet">
  <span class="btn-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  </span>
  <span class="btn-text">Add to Cart</span>
  <span class="btn-price">$99.99</span>
</button>

<!-- CSS -->
<style>
.add-to-cart-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn.violet {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.add-to-cart-btn.emerald {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.add-to-cart-btn.rose {
  background: linear-gradient(135deg, #f43f5e, #e11d48);
  color: white;
}

.add-to-cart-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
}

.add-to-cart-btn:active {
  transform: scale(0.98);
}

.btn-icon svg {
  width: 20px;
  height: 20px;
}

.btn-price {
  background: rgba(255,255,255,0.2);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
}

/* Loading state */
.add-to-cart-btn.loading .btn-text {
  opacity: 0;
}

.add-to-cart-btn.loading::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Success state */
.add-to-cart-btn.success {
  background: #22c55e;
}
</style>

<!-- JavaScript -->
<script>
class AddToCartButton {
  constructor(element, onClick) {
    this.element = element;
    this.onClick = onClick;

    element.addEventListener('click', () => this.handleClick());
  }

  async handleClick() {
    this.element.classList.add('loading');
    this.element.disabled = true;

    try {
      await this.onClick?.();
      this.element.classList.remove('loading');
      this.element.classList.add('success');
      this.element.querySelector('.btn-text').textContent = 'Added!';

      setTimeout(() => {
        this.element.classList.remove('success');
        this.element.querySelector('.btn-text').textContent = 'Add to Cart';
        this.element.disabled = false;
      }, 2000);
    } catch (e) {
      this.element.classList.remove('loading');
      this.element.disabled = false;
    }
  }
}

// Usage:
new AddToCartButton(document.querySelector('.add-to-cart-btn'), async () => {
  await fetch('/api/cart', { method: 'POST' });
});
</script>`,
    },
    {
      name: 'WishlistHeart',
      description: 'Animated heart button with expanding rings, particle burst effects, and multiple size variants.',
      href: '/WishlistHeart',
      props: [
        { name: 'isActive', type: 'boolean', default: 'false', description: 'Initial active state' },
        { name: 'onToggle', type: '(isActive: boolean) => void', default: '-', description: 'Toggle callback' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Heart size' },
      ],
      reactCode: `import { WishlistHeart } from 'archyra';

// Basic usage
<WishlistHeart onToggle={(active) => toggleWishlist(active)} />

// Controlled state
<WishlistHeart
  isActive={isWishlisted}
  onToggle={(active) => setIsWishlisted(active)}
  size="lg"
/>

// Custom color
<WishlistHeart activeColor="#8B5CF6" />`,
      vanillaCode: `<!-- HTML -->
<button class="wishlist-heart" data-active="false">
  <svg class="heart-icon" viewBox="0 0 24 24">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
  <div class="ring ring-1"></div>
  <div class="ring ring-2"></div>
</button>

<!-- CSS -->
<style>
.wishlist-heart {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.wishlist-heart:hover {
  background: #e5e7eb;
}

.heart-icon {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: #9ca3af;
  stroke-width: 2;
  transition: all 0.3s;
}

.wishlist-heart[data-active="true"] .heart-icon {
  fill: #f43f5e;
  stroke: #f43f5e;
  animation: heartPop 0.4s ease;
}

@keyframes heartPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid #f43f5e;
  opacity: 0;
  transform: scale(0.8);
}

.wishlist-heart[data-active="true"] .ring {
  animation: ringExpand 0.6s ease-out;
}

.wishlist-heart[data-active="true"] .ring-2 {
  animation-delay: 0.1s;
}

@keyframes ringExpand {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* Sizes */
.wishlist-heart.sm { width: 36px; height: 36px; }
.wishlist-heart.sm .heart-icon { width: 18px; height: 18px; }

.wishlist-heart.lg { width: 56px; height: 56px; }
.wishlist-heart.lg .heart-icon { width: 28px; height: 28px; }
</style>

<!-- JavaScript -->
<script>
class WishlistHeart {
  constructor(element, onToggle) {
    this.element = element;
    this.onToggle = onToggle;
    this.isActive = element.dataset.active === 'true';

    element.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.isActive = !this.isActive;
    this.element.dataset.active = this.isActive;
    this.onToggle?.(this.isActive);
  }
}

// Usage:
new WishlistHeart(document.querySelector('.wishlist-heart'), (active) => {
  console.log('Wishlist:', active);
});
</script>`,
    },
    {
      name: 'FlashSaleTimer',
      description: 'Eye-catching countdown timer with flip transitions, urgency animations, and pulsing effects.',
      href: '/FlashSaleTimer',
      props: [
        { name: 'endTime', type: 'Date | number', default: '-', description: 'End time' },
        { name: 'title', type: 'string', default: "'Flash Sale'", description: 'Timer title' },
        { name: 'onEnd', type: '() => void', default: '-', description: 'Callback when ends' },
        { name: 'discount', type: 'number', default: '50', description: 'Discount percentage' },
      ],
      reactCode: `import { FlashSaleTimer } from 'archyra';

// Basic usage - 2 hours from now
<FlashSaleTimer
  endTime={Date.now() + 2 * 60 * 60 * 1000}
  onEnd={() => console.log('Sale ended!')}
/>

// Custom title and discount
<FlashSaleTimer
  endTime={new Date('2024-12-31T23:59:59')}
  title="Holiday Sale Ends In"
  discount={70}
/>`,
      vanillaCode: `<!-- HTML -->
<div class="flash-sale-timer">
  <div class="timer-header">
    <span class="badge">50% OFF</span>
    <h3 class="title">Flash Sale Ends In</h3>
  </div>
  <div class="timer-display">
    <div class="time-unit">
      <span class="value" data-hours>02</span>
      <span class="label">Hours</span>
    </div>
    <span class="separator">:</span>
    <div class="time-unit">
      <span class="value" data-minutes>45</span>
      <span class="label">Minutes</span>
    </div>
    <span class="separator">:</span>
    <div class="time-unit">
      <span class="value" data-seconds>30</span>
      <span class="label">Seconds</span>
    </div>
  </div>
</div>

<!-- CSS -->
<style>
.flash-sale-timer {
  background: linear-gradient(135deg, #f43f5e, #ec4899);
  border-radius: 16px;
  padding: 24px;
  color: white;
  text-align: center;
}

.timer-header {
  margin-bottom: 16px;
}

.badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.timer-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-unit .value {
  font-size: 36px;
  font-weight: 700;
  background: rgba(0,0,0,0.2);
  padding: 8px 16px;
  border-radius: 8px;
  min-width: 70px;
}

.time-unit .label {
  font-size: 12px;
  margin-top: 4px;
  opacity: 0.8;
}

.separator {
  font-size: 32px;
  font-weight: 700;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Urgent state */
.flash-sale-timer.urgent {
  animation: urgentPulse 0.5s infinite;
}

@keyframes urgentPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244,63,94,0.4); }
  50% { box-shadow: 0 0 0 10px rgba(244,63,94,0); }
}
</style>

<!-- JavaScript -->
<script>
class FlashSaleTimer {
  constructor(element, endTime, onEnd) {
    this.element = element;
    this.endTime = new Date(endTime).getTime();
    this.onEnd = onEnd;

    this.hoursEl = element.querySelector('[data-hours]');
    this.minutesEl = element.querySelector('[data-minutes]');
    this.secondsEl = element.querySelector('[data-seconds]');

    this.tick();
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    const now = Date.now();
    const diff = Math.max(0, this.endTime - now);

    if (diff === 0) {
      clearInterval(this.interval);
      this.onEnd?.();
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.hoursEl.textContent = String(hours).padStart(2, '0');
    this.minutesEl.textContent = String(minutes).padStart(2, '0');
    this.secondsEl.textContent = String(seconds).padStart(2, '0');

    // Add urgent class when under 1 hour
    if (diff < 3600000) {
      this.element.classList.add('urgent');
    }
  }
}

// Usage:
new FlashSaleTimer(
  document.querySelector('.flash-sale-timer'),
  Date.now() + 2 * 60 * 60 * 1000,
  () => console.log('Sale ended!')
);
</script>`,
    },
    {
      name: 'CartNotification',
      description: 'Animated notification showing product flying to cart with success animations and progress bar.',
      href: '/CartNotification',
      props: [
        { name: 'isVisible', type: 'boolean', default: '-', description: 'Show notification' },
        { name: 'productName', type: 'string', default: '-', description: 'Product name' },
        { name: 'productPrice', type: 'number', default: '-', description: 'Product price' },
        { name: 'onDismiss', type: '() => void', default: '-', description: 'Dismiss callback' },
        { name: 'onViewCart', type: '() => void', default: '-', description: 'View cart callback' },
      ],
      reactCode: `import { CartNotification } from 'archyra';

const [showNotification, setShowNotification] = useState(false);
const [cartCount, setCartCount] = useState(0);

const handleAddToCart = () => {
  setCartCount(c => c + 1);
  setShowNotification(true);
};

<CartNotification
  isVisible={showNotification}
  productImage="https://example.com/product.jpg"
  productName="Premium Headphones"
  productPrice={299.99}
  cartCount={cartCount}
  onDismiss={() => setShowNotification(false)}
  onViewCart={() => router.push('/cart')}
/>`,
      vanillaCode: `<!-- HTML -->
<div class="cart-notification" data-visible="false">
  <div class="notification-content">
    <div class="check-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    </div>
    <div class="notification-info">
      <p class="success-text">Added to Cart!</p>
      <p class="product-name">Premium Headphones</p>
      <p class="product-price">$299.99</p>
    </div>
    <button class="view-cart-btn">View Cart (3)</button>
    <button class="dismiss-btn">&times;</button>
  </div>
  <div class="progress-bar"></div>
</div>

<!-- CSS -->
<style>
.cart-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  padding: 16px;
  min-width: 320px;
  transform: translateX(120%);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.cart-notification[data-visible="true"] {
  transform: translateX(0);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.check-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.notification-info {
  flex: 1;
}

.success-text {
  font-weight: 600;
  color: #22c55e;
  margin: 0 0 4px;
  font-size: 14px;
}

.product-name {
  font-weight: 500;
  margin: 0;
  font-size: 15px;
}

.product-price {
  color: #6b7280;
  margin: 0;
  font-size: 14px;
}

.view-cart-btn {
  background: #111;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
}

.dismiss-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #22c55e;
  width: 100%;
  animation: shrink 4s linear forwards;
}

@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}
</style>

<!-- JavaScript -->
<script>
class CartNotification {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    this.timeout = null;

    element.querySelector('.dismiss-btn')?.addEventListener('click', () => this.hide());
    element.querySelector('.view-cart-btn')?.addEventListener('click', () => {
      options.onViewCart?.();
      this.hide();
    });
  }

  show(product) {
    clearTimeout(this.timeout);

    if (product) {
      this.element.querySelector('.product-name').textContent = product.name;
      this.element.querySelector('.product-price').textContent = '$' + product.price;
    }

    this.element.dataset.visible = 'true';

    this.timeout = setTimeout(() => this.hide(), 4000);
  }

  hide() {
    this.element.dataset.visible = 'false';
    this.options.onDismiss?.();
  }
}

// Usage:
const notification = new CartNotification(document.querySelector('.cart-notification'), {
  onViewCart: () => window.location.href = '/cart',
  onDismiss: () => console.log('Dismissed')
});

notification.show({ name: 'Premium Headphones', price: 299.99 });
</script>`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-violet-500 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-violet-500/10 text-violet-600">E-Commerce</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          E-Commerce Components
        </h1>
        <p className="text-xl text-muted-foreground">
          Stunning animated components for online stores, shopping carts, and product displays.
        </p>
      </div>

      {/* Components */}
      <div className="space-y-16">
        {components.map((component, index) => (
          <div key={component.name} className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{component.name}</h2>
                <p className="text-muted-foreground mt-1">{component.description}</p>
              </div>
              <Link href={component.href}>
                <Button variant="outline" size="sm" className="gap-2">
                  Live Demo
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </Link>
            </div>

            <Tabs defaultValue="usage" className="w-full">
              <TabsList>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="props">Props</TabsTrigger>
              </TabsList>
              <TabsContent value="usage" className="mt-4">
                <FrameworkCodeBlock
                  reactCode={component.reactCode}
                  vanillaCode={component.vanillaCode}
                  id={`${component.name}-usage`}
                />
              </TabsContent>
              <TabsContent value="props" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prop</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {component.props.map((prop) => (
                        <TableRow key={prop.name}>
                          <TableCell className="font-mono text-sm">{prop.name}</TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">{prop.type}</TableCell>
                          <TableCell className="font-mono text-sm">{prop.default}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{prop.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
            </Tabs>

            {index < components.length - 1 && <hr className="border-border" />}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="border-t mt-12 pt-8">
        <div className="flex justify-between">
          <Link href="/docs/components/chat">
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Chat Components
            </Button>
          </Link>
          <Link href="/components">
            <Button className="gap-2">
              View Gallery
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
