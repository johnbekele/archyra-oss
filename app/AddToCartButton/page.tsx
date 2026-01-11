'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { AddToCartButton } from '../../AddToCartButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function AddToCartButtonPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');
  const [variant, setVariant] = useState<'violet' | 'emerald' | 'rose' | 'amber'>('violet');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showPrice, setShowPrice] = useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { AddToCartButton } from 'archyra';

<AddToCartButton
  text="Add to Cart"
  successText="Added!"
  price={${showPrice ? '99.99' : 'undefined'}}
  variant="${variant}"
  size="${size}"
  onClick={async () => {
    await addToCart(productId);
  }}
/>`;

  const vanillaCode = `<!-- HTML -->
<button class="add-to-cart-btn ${variant} ${size}">
  <span class="btn-content">
    <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
    <span class="btn-text">Add to Cart</span>
    ${showPrice ? '<span class="price">$99.99</span>' : ''}
  </span>
  <span class="success-content">
    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>Added!</span>
  </span>
</button>

<!-- CSS -->
<style>
.add-to-cart-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
}

/* Variants */
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

.add-to-cart-btn.amber {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

/* Sizes */
.add-to-cart-btn.sm { padding: 8px 16px; font-size: 14px; }
.add-to-cart-btn.lg { padding: 16px 32px; font-size: 18px; }

.add-to-cart-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
}

.add-to-cart-btn:active {
  transform: scale(0.98);
}

/* Shimmer effect */
.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% { left: 100%; }
}

.btn-content, .success-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.success-content {
  position: absolute;
  opacity: 0;
  transform: translateY(20px);
}

.add-to-cart-btn.success .btn-content {
  opacity: 0;
  transform: translateY(-20px);
}

.add-to-cart-btn.success .success-content {
  opacity: 1;
  transform: translateY(0);
}

.cart-icon, .check-icon {
  width: 20px;
  height: 20px;
}

.price {
  padding-left: 8px;
  border-left: 1px solid rgba(255,255,255,0.3);
}
</style>

<!-- JavaScript -->
<script>
document.querySelector('.add-to-cart-btn').addEventListener('click', async function() {
  this.classList.add('loading');
  await new Promise(r => setTimeout(r, 1500)); // Simulate API call
  this.classList.remove('loading');
  this.classList.add('success');
  setTimeout(() => this.classList.remove('success'), 2000);
});
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="AddToCartButton" description="Multi-state cart button with animations">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Variant</h3>
            <div className="flex flex-wrap gap-2">
              {(['violet', 'emerald', 'rose', 'amber'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    variant === v
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Size</h3>
            <div className="flex gap-2">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    size === s
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPrice}
                onChange={(e) => setShowPrice(e.target.checked)}
                className="w-4 h-4 rounded accent-violet-500"
              />
              <span className="text-sm">Show Price</span>
            </label>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Click particle burst effect</li>
              <li>- Shimmer highlight animation</li>
              <li>- Loading state with cart motion</li>
              <li>- Success ripple animation</li>
              <li>- Flying package icon</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-violet-100 text-sm">Click the button to see animations</p>
            </div>
            <div className="p-8 bg-muted/30 min-h-[300px] flex items-center justify-center">
              <div className="space-y-6">
                <AddToCartButton
                  key={`${variant}-${size}-${showPrice}`}
                  text="Add to Cart"
                  successText="Added!"
                  price={showPrice ? 99.99 : undefined}
                  variant={variant}
                  size={size}
                  onClick={async () => {
                    await new Promise(resolve => setTimeout(resolve, 1500));
                  }}
                />

                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-4 text-center">All Variants</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <AddToCartButton variant="violet" size="sm" />
                    <AddToCartButton variant="emerald" size="sm" />
                    <AddToCartButton variant="rose" size="sm" />
                    <AddToCartButton variant="amber" size="sm" />
                  </div>
                </div>
              </div>
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
