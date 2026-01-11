'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { GlowButton, GlowButtonGroup } from '../../GlowButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function GlowButtonPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [variant, setVariant] = useState<'default' | 'outline' | 'ghost'>('default');
  const [glowOnHover, setGlowOnHover] = useState(false);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { GlowButton } from 'archyra';

<GlowButton
  size="${size}"
  variant="${variant}"
  ${glowOnHover ? 'glowOnHover' : ''}
  onClick={() => console.log('clicked')}
>
  Get Started
</GlowButton>`;

  const vanillaCode = `<!-- HTML -->
<button class="glow-button ${size} ${variant}">Get Started</button>

<!-- CSS -->
<style>
.glow-button {
  position: relative;
  overflow: hidden;
  font-weight: 600;
  color: white;
  background: #6366f1;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.glow-button:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
}

.glow-button::after {
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
  0% { left: -100%; }
  100% { left: 100%; }
}

/* Sizes */
.glow-button.sm { padding: 8px 16px; font-size: 14px; }
.glow-button.md { padding: 12px 24px; font-size: 16px; }
.glow-button.lg { padding: 16px 32px; font-size: 18px; }

/* Variants */
.glow-button.outline {
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
}

.glow-button.ghost {
  background: transparent;
  color: #6366f1;
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="GlowButton" description="Animated button with shimmer glow effect">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Size</h3>
            <div className="flex gap-2">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    size === s ? 'bg-violet-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Variant</h3>
            <div className="flex gap-2">
              {(['default', 'outline', 'ghost'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    variant === v ? 'bg-violet-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={glowOnHover}
                onChange={(e) => setGlowOnHover(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Glow on hover only</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-violet-100 text-sm">Animated CTA button with shimmer effect</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 p-12 bg-muted/30" style={{ minHeight: '250px' }}>
              <GlowButton size={size} variant={variant} glowOnHover={glowOnHover}>
                Get Started
              </GlowButton>

              <div className="pt-4 border-t w-full">
                <p className="text-sm text-muted-foreground text-center mb-4">Button Group Example</p>
                <GlowButtonGroup align="center">
                  <GlowButton variant="default" size="md">Primary</GlowButton>
                  <GlowButton variant="outline" size="md">Secondary</GlowButton>
                </GlowButtonGroup>
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
