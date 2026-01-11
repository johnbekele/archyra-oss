'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { ProductCard } from '../../ProductCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function ProductCardPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');
  const [badge, setBadge] = useState('Best Seller');
  const [showDiscount, setShowDiscount] = useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { ProductCard } from 'archyra';

<ProductCard
  image="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  name="Premium Wireless Headphones"
  price={299.99}
  originalPrice={399.99}
  rating={4.8}
  reviews={256}
  badge="${badge}"
  onAddToCart={() => console.log('Added to cart!')}
  onWishlist={() => console.log('Added to wishlist!')}
  onQuickView={() => console.log('Quick view!')}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="product-card">
  <div class="image-container">
    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="Product" />
    <span class="badge">${badge}</span>
    <div class="overlay">
      <button class="overlay-btn wishlist">♡</button>
      <button class="overlay-btn quick-view">👁</button>
    </div>
  </div>
  <div class="card-content">
    <h3 class="product-name">Premium Wireless Headphones</h3>
    <div class="rating">
      <span class="stars">★★★★★</span>
      <span class="rating-value">4.8</span>
      <span class="reviews">(256 reviews)</span>
    </div>
    <div class="price-row">
      <span class="price">$299.99</span>
      <span class="original-price">$399.99</span>
      <span class="discount">-25%</span>
    </div>
    <button class="add-to-cart">Add to Cart</button>
  </div>
</div>

<!-- CSS -->
<style>
.product-card {
  width: 280px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-8px) rotateX(2deg);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .image-container img {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s;
}

.product-card:hover .overlay {
  opacity: 1;
  transform: translateX(0);
}

.overlay-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.card-content {
  padding: 16px;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  margin-bottom: 8px;
}

.stars { color: #fbbf24; }
.reviews { color: #9ca3af; }

.price-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #8b5cf6;
}

.original-price {
  text-decoration: line-through;
  color: #9ca3af;
}

.discount {
  background: #fee2e2;
  color: #ef4444;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.add-to-cart {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.add-to-cart:hover {
  transform: scale(1.02);
}

.add-to-cart:active {
  transform: scale(0.98);
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="ProductCard" description="3D Product Card with hover effects">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Badge Text</h3>
            <div className="flex flex-wrap gap-2">
              {['Best Seller', 'New', 'Hot Deal', 'Limited'].map((b) => (
                <button
                  key={b}
                  onClick={() => setBadge(b)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    badge === b
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDiscount}
                onChange={(e) => setShowDiscount(e.target.checked)}
                className="w-4 h-4 rounded accent-violet-500"
              />
              <span className="text-sm">Show Discount Badge</span>
            </label>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- 3D tilt effect on mouse move</li>
              <li>- Glow effect follows cursor</li>
              <li>- Quick view & wishlist overlay</li>
              <li>- Add to cart animation</li>
              <li>- Floating particles on hover</li>
              <li>- Star rating display</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-violet-100 text-sm">Hover over the card to see the 3D effect</p>
            </div>
            <div className="p-8 bg-muted/30 min-h-[500px] flex items-center justify-center">
              <ProductCard
                image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
                name="Premium Wireless Headphones"
                price={299.99}
                originalPrice={showDiscount ? 399.99 : undefined}
                rating={4.8}
                reviews={256}
                badge={badge}
                onAddToCart={() => alert('Added to cart!')}
                onWishlist={() => alert('Added to wishlist!')}
                onQuickView={() => alert('Quick view clicked!')}
              />
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
