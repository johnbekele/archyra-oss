'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { ShimmerBlock, ShimmerText, ShimmerAvatar, ShimmerCard, ShimmerTable, ShimmerPage } from '../../Shimmer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function ShimmerPageDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [direction, setDirection] = useState<'left-right' | 'right-left' | 'diagonal'>('left-right');
  const [color, setColor] = useState<'light' | 'dark' | 'colored'>('light');
  const [duration, setDuration] = useState(1.5);
  const [pageVariant, setPageVariant] = useState<'dashboard' | 'article' | 'profile' | 'list'>('list');
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { ShimmerCard, ShimmerTable, ShimmerPage } from 'archyra';

<ShimmerCard />
<ShimmerTable rows={5} cols={4} />
<ShimmerPage variant="${pageVariant}" />`;

  const vanillaCode = `<!-- HTML -->
<div class="shimmer-card">
  <div class="shimmer-block" style="height: 200px;"></div>
  <div class="shimmer-content">
    <div class="shimmer-text" style="width: 80%;"></div>
    <div class="shimmer-text" style="width: 60%;"></div>
    <div class="shimmer-text" style="width: 40%;"></div>
  </div>
</div>

<!-- Shimmer Table -->
<div class="shimmer-table">
  <div class="shimmer-row header">
    <div class="shimmer-cell"></div>
    <div class="shimmer-cell"></div>
    <div class="shimmer-cell"></div>
  </div>
  <div class="shimmer-row">
    <div class="shimmer-cell"></div>
    <div class="shimmer-cell"></div>
    <div class="shimmer-cell"></div>
  </div>
</div>

<!-- CSS -->
<style>
.shimmer-block,
.shimmer-text,
.shimmer-cell {
  background: linear-gradient(
    90deg,
    #e5e7eb 25%,
    #f3f4f6 50%,
    #e5e7eb 75%
  );
  background-size: 200% 100%;
  animation: shimmer ${duration}s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.shimmer-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.shimmer-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shimmer-text {
  height: 16px;
}

.shimmer-table {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.shimmer-row {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.shimmer-row:last-child {
  border-bottom: none;
}

.shimmer-row.header {
  background: #f9fafb;
}

.shimmer-cell {
  flex: 1;
  height: 48px;
  margin: 12px;
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="Shimmer" description="Shimmer loading effects">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Direction</h3>
            <div className="flex flex-wrap gap-2">
              {(['left-right', 'right-left', 'diagonal'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    direction === d ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Color</h3>
            <div className="flex flex-wrap gap-2">
              {(['light', 'dark', 'colored'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    color === c ? 'bg-purple-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Duration: {duration}s</h3>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Page Variant</h3>
            <div className="flex flex-wrap gap-2">
              {(['dashboard', 'article', 'profile', 'list'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setPageVariant(v)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    pageVariant === v ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-indigo-100 text-sm">Shimmer loading effects</p>
            </div>
            <div className="p-6 space-y-8 bg-muted/30">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Basic Shapes</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Block</p>
                    <ShimmerBlock height={80} duration={duration} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Avatar</p>
                    <ShimmerAvatar size={60} duration={duration} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Text</p>
                    <ShimmerText lines={3} duration={duration} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Card</h4>
                <div className="max-w-sm">
                  <ShimmerCard duration={duration} />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Table</h4>
                <ShimmerTable rows={3} cols={4} duration={duration} />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold">Page Layout: {pageVariant}</h2>
            </div>
            <div className="max-h-96 overflow-auto">
              <ShimmerPage variant={pageVariant} />
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
