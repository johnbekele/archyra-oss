'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, Play, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import AiCreating from '../../AiCreating';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function AiCreatingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'full'>('md');
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { AiCreating } from 'archyra';

<AiCreating
  isLoading={isLoading}
  size="${size}"
  onComplete={() => setIsLoading(false)}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="ai-creating ${size}">
  <div class="robot">
    <svg viewBox="0 0 100 100">
      <rect x="25" y="30" width="50" height="45" rx="8" fill="#6366f1" />
      <rect x="35" y="45" width="10" height="10" rx="2" fill="white" />
      <rect x="55" y="45" width="10" height="10" rx="2" fill="white" />
      <rect x="40" y="62" width="20" height="5" rx="2" fill="white" />
      <rect x="42" y="20" width="16" height="15" rx="3" fill="#6366f1" />
      <circle cx="50" cy="12" r="4" fill="#fbbf24" class="antenna" />
    </svg>
  </div>
  <p class="stage-message">Thinking...</p>
</div>

<!-- CSS -->
<style>
.ai-creating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.ai-creating .robot {
  width: 96px;
  height: 96px;
}

.ai-creating.sm .robot { width: 64px; height: 64px; }
.ai-creating.lg .robot { width: 128px; height: 128px; }

.ai-creating .robot {
  animation: bob 1s ease-in-out infinite;
}

@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.antenna {
  animation: glow 1s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.stage-message {
  font-size: 16px;
  font-weight: 500;
  color: #4b5563;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<!-- JavaScript -->
<script>
class AiCreating {
  constructor(element, onComplete) {
    this.element = element;
    this.message = element.querySelector('.stage-message');
    this.stages = ['Thinking...', 'Writing...', 'Building...', 'Done!'];
    this.onComplete = onComplete;
  }

  start() {
    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage >= this.stages.length) {
        clearInterval(interval);
        this.onComplete?.();
        return;
      }
      this.message.textContent = this.stages[stage];
    }, 2000);
  }
}

// Usage:
const ai = new AiCreating(document.querySelector('.ai-creating'), () => {
  console.log('Complete!');
});
ai.start();
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="AiCreating" description="Multi-stage AI animation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Size Variant</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['xs', 'sm', 'md', 'lg', 'full'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    size === s ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Controls</h3>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                isPlaying ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Play className="w-4 h-4" />
              {isPlaying ? 'Stop Animation' : 'Start Animation'}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-blue-100 text-sm">Multi-stage AI creation animation</p>
            </div>
            <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900" style={{ minHeight: '400px' }}>
              <AiCreating isLoading={isPlaying} size={size} onComplete={() => setIsPlaying(false)} />
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
