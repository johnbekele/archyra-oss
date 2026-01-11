'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Skeleton, { SkeletonCard, SkeletonList } from '../../Skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function SkeletonPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [variant, setVariant] = useState<'text' | 'avatar' | 'card' | 'image' | 'button'>('text');
  const [animation, setAnimation] = useState<'pulse' | 'shimmer' | 'wave'>('shimmer');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import Skeleton, { SkeletonCard, SkeletonList } from 'archyra';

<Skeleton variant="${variant}" animation="${animation}" size="${size}" />
<SkeletonCard />
<SkeletonList count={3} />`;

  const vanillaCode = `<!-- HTML -->
<div class="skeleton ${variant} ${animation} ${size}"></div>

<!-- Skeleton Card -->
<div class="skeleton-card">
  <div class="skeleton image shimmer"></div>
  <div class="skeleton-content">
    <div class="skeleton text shimmer" style="width: 80%"></div>
    <div class="skeleton text shimmer" style="width: 60%"></div>
  </div>
</div>

<!-- CSS -->
<style>
.skeleton {
  background: #e5e7eb;
  border-radius: 4px;
}

/* Variants */
.skeleton.text { height: 16px; margin-bottom: 8px; }
.skeleton.avatar { width: 48px; height: 48px; border-radius: 50%; }
.skeleton.image { width: 100%; height: 200px; border-radius: 8px; }
.skeleton.button { width: 100px; height: 40px; border-radius: 6px; }

/* Sizes */
.skeleton.sm.text { height: 12px; }
.skeleton.lg.text { height: 20px; }

/* Animations */
.skeleton.pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton.shimmer {
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton.wave {
  overflow: hidden;
  position: relative;
}

.skeleton.wave::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: wave 1.5s infinite;
}

@keyframes wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Skeleton Card */
.skeleton-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.skeleton-content {
  padding: 16px;
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="Skeleton" description="Loading placeholder animation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Variant</h3>
            <div className="flex flex-wrap gap-2">
              {(['text', 'avatar', 'card', 'image', 'button'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    variant === v ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Animation</h3>
            <div className="flex flex-wrap gap-2">
              {(['pulse', 'shimmer', 'wave'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAnimation(a)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    animation === a ? 'bg-purple-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {a}
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
                    size === s ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-gray-200 text-sm">Skeleton loading placeholders</p>
            </div>
            <div className="p-8 min-h-[300px] flex items-center justify-center bg-muted/30">
              <div className="w-full max-w-md">
                {variant === 'text' && <Skeleton variant="text" lines={4} size={size} animation={animation} />}
                {variant === 'avatar' && (
                  <div className="flex items-center gap-4">
                    <Skeleton variant="avatar" size={size} animation={animation} />
                    <div className="flex-1">
                      <Skeleton variant="text" lines={2} size={size} animation={animation} />
                    </div>
                  </div>
                )}
                {variant === 'card' && <SkeletonCard animation={animation} />}
                {variant === 'image' && <Skeleton variant="image" height={200} animation={animation} />}
                {variant === 'button' && (
                  <div className="flex gap-4">
                    <Skeleton variant="button" size={size} animation={animation} />
                    <Skeleton variant="button" size={size} animation={animation} width={80} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Preset Components</h2>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6 bg-muted/30">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">SkeletonList</h4>
                <SkeletonList count={3} animation={animation} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">SkeletonCard</h4>
                <SkeletonCard animation={animation} />
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
