'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { WishlistHeart } from '../../WishlistHeart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function WishlistHeartPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [showBackground, setShowBackground] = useState(true);
  const [activeColor, setActiveColor] = useState('#F43F5E');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { WishlistHeart } from 'archyra';

<WishlistHeart
  size="${size}"
  showBackground={${showBackground}}
  activeColor="${activeColor}"
  onToggle={(isActive) => {
    console.log('Wishlisted:', isActive);
  }}
/>`;

  const vanillaCode = `<!-- HTML -->
<button class="wishlist-heart ${size}${showBackground ? ' with-bg' : ''}" data-active="false">
  <div class="heart-container">
    <svg class="heart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  </div>
  <div class="particles"></div>
  <div class="rings"></div>
</button>

<!-- CSS -->
<style>
.wishlist-heart {
  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
}

.wishlist-heart.with-bg {
  width: 48px;
  height: 48px;
  background: #f3f4f6;
  border-radius: 50%;
}

/* Sizes */
.wishlist-heart.sm .heart-icon { width: 20px; height: 20px; }
.wishlist-heart.md .heart-icon { width: 28px; height: 28px; }
.wishlist-heart.lg .heart-icon { width: 36px; height: 36px; }
.wishlist-heart.xl .heart-icon { width: 48px; height: 48px; }

.heart-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-icon {
  transition: all 0.3s;
  stroke: #9ca3af;
}

.wishlist-heart[data-active="true"] .heart-icon {
  fill: ${activeColor};
  stroke: ${activeColor};
  animation: heartPop 0.3s ease-out;
}

@keyframes heartPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.wishlist-heart:hover .heart-icon {
  transform: scale(1.1);
}

/* Particle burst effect */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.wishlist-heart[data-active="true"] .particles::before {
  content: '❤️❤️❤️❤️';
  position: absolute;
  font-size: 10px;
  animation: particleBurst 0.6s ease-out forwards;
}

@keyframes particleBurst {
  0% { opacity: 1; transform: scale(0.5); }
  100% { opacity: 0; transform: scale(2) translateY(-20px); }
}

/* Expanding rings */
.rings {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.wishlist-heart[data-active="true"] .rings::before,
.wishlist-heart[data-active="true"] .rings::after {
  content: '';
  position: absolute;
  inset: -10px;
  border: 2px solid ${activeColor};
  border-radius: 50%;
  animation: ringExpand 0.5s ease-out forwards;
}

.wishlist-heart[data-active="true"] .rings::after {
  animation-delay: 0.1s;
}

@keyframes ringExpand {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* Glow effect when active */
.wishlist-heart[data-active="true"] .heart-icon {
  filter: drop-shadow(0 0 8px ${activeColor});
}
</style>

<!-- JavaScript -->
<script>
document.querySelector('.wishlist-heart').addEventListener('click', function() {
  const isActive = this.dataset.active === 'true';
  this.dataset.active = !isActive;
});
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  const colorOptions = [
    { name: 'Rose', value: '#F43F5E' },
    { name: 'Violet', value: '#8B5CF6' },
    { name: 'Amber', value: '#F59E0B' },
    { name: 'Emerald', value: '#10B981' },
  ];

  return (
    <DashboardLayout title="WishlistHeart" description="Animated heart with particle burst">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Size</h3>
            <div className="flex gap-2">
              {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    size === s
                      ? 'bg-rose-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setActiveColor(c.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    activeColor === c.value
                      ? 'bg-rose-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: c.value }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBackground}
                onChange={(e) => setShowBackground(e.target.checked)}
                className="w-4 h-4 rounded accent-rose-500"
              />
              <span className="text-sm">Show Background Circle</span>
            </label>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Expanding ring animations</li>
              <li>- Heart particle burst</li>
              <li>- Sparkle effects</li>
              <li>- Pulse glow when active</li>
              <li>- Smooth scale transitions</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-rose-100 text-sm">Click the heart to see the animation</p>
            </div>
            <div className="p-8 bg-muted/30 min-h-[350px] flex flex-col items-center justify-center gap-8">
              <WishlistHeart
                key={`${size}-${showBackground}-${activeColor}`}
                size={size}
                showBackground={showBackground}
                activeColor={activeColor}
                onToggle={(isActive) => console.log('Toggled:', isActive)}
              />

              <div className="pt-6 border-t w-full">
                <p className="text-sm text-muted-foreground mb-4 text-center">All Sizes</p>
                <div className="flex items-center justify-center gap-6">
                  <div className="text-center">
                    <WishlistHeart size="sm" activeColor={activeColor} />
                    <p className="text-xs text-muted-foreground mt-2">SM</p>
                  </div>
                  <div className="text-center">
                    <WishlistHeart size="md" activeColor={activeColor} />
                    <p className="text-xs text-muted-foreground mt-2">MD</p>
                  </div>
                  <div className="text-center">
                    <WishlistHeart size="lg" activeColor={activeColor} />
                    <p className="text-xs text-muted-foreground mt-2">LG</p>
                  </div>
                  <div className="text-center">
                    <WishlistHeart size="xl" activeColor={activeColor} />
                    <p className="text-xs text-muted-foreground mt-2">XL</p>
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
