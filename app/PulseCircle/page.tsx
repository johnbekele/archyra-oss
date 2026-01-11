'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, Play, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PulseCircle from '../../PulseCircle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function PulseCirclePage() {
  const [isActive, setIsActive] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { PulseCircle } from 'archyra';

<PulseCircle
  isActive={isActive}
  onComplete={() => setIsActive(false)}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="pulse-circle">
  <svg viewBox="0 0 100 100">
    <circle class="track" cx="50" cy="50" r="45" />
    <circle class="progress" cx="50" cy="50" r="45" />
    <circle class="pulse-ring ring-1" cx="50" cy="50" r="45" />
    <circle class="pulse-ring ring-2" cx="50" cy="50" r="45" />
  </svg>
  <span class="percentage">0%</span>
</div>

<!-- CSS -->
<style>
.pulse-circle {
  position: relative;
  width: 120px;
  height: 120px;
}

.pulse-circle svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.pulse-circle circle {
  fill: none;
  stroke-width: 8;
}

.track { stroke: #e5e7eb; }
.progress {
  stroke: #3b82f6;
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  transition: stroke-dashoffset 0.1s;
}

.pulse-ring {
  stroke: #3b82f6;
  opacity: 0;
}

.pulse-circle.active .pulse-ring {
  animation: pulse 2s ease-out infinite;
}

.pulse-circle.active .ring-2 {
  animation-delay: 1s;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.3); opacity: 0; }
}

.percentage {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
}
</style>

<!-- JavaScript -->
<script>
class PulseCircle {
  constructor(element, onComplete) {
    this.element = element;
    this.progress = element.querySelector('.progress');
    this.percentage = element.querySelector('.percentage');
    this.onComplete = onComplete;
    this.value = 0;
  }

  start() {
    this.element.classList.add('active');
    this.animate();
  }

  animate() {
    const interval = setInterval(() => {
      this.value = Math.min(100, this.value + 2);
      const offset = 283 - (283 * this.value / 100);
      this.progress.style.strokeDashoffset = offset;
      this.percentage.textContent = this.value + '%';

      if (this.value >= 100) {
        clearInterval(interval);
        this.element.classList.remove('active');
        this.onComplete?.();
      }
    }, 50);
  }
}

// Usage:
const circle = new PulseCircle(document.querySelector('.pulse-circle'), () => {
  console.log('Complete!');
});
circle.start();
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="PulseCircle" description="Circular progress animation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Controls</h3>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                isActive ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Play className="w-4 h-4" />
              {isActive ? 'Stop Animation' : 'Start Animation'}
            </button>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-muted-foreground">
              An SVG-based circular progress indicator with expanding pulse rings and percentage display. Shows completion checkmark at 100%.
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-cyan-100 text-sm">Circular progress with pulsing rings</p>
            </div>
            <div className="flex items-center justify-center p-12 bg-gradient-to-br from-muted/30 to-blue-50/30 dark:to-blue-900/20" style={{ minHeight: '300px' }}>
              <PulseCircle isActive={isActive} onComplete={() => setIsActive(false)} />
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
