'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, Play, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import DataProcessing from '../../DataProcessing';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function DataProcessingPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { DataProcessing } from 'archyra';

<DataProcessing
  isProcessing={isProcessing}
  onComplete={() => setIsProcessing(false)}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="data-processing">
  <div class="stages">
    <div class="stage" data-stage="input">
      <div class="stage-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      </div>
      <span class="stage-label">Input</span>
    </div>
    <div class="connector"><div class="connector-fill"></div></div>
    <div class="stage" data-stage="process">
      <div class="stage-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="4" width="16" height="16" rx="2"/>
          <rect x="9" y="9" width="6" height="6"/>
        </svg>
      </div>
      <span class="stage-label">Process</span>
    </div>
    <div class="connector"><div class="connector-fill"></div></div>
    <div class="stage" data-stage="output">
      <div class="stage-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <span class="stage-label">Output</span>
    </div>
  </div>
  <div class="progress-info">
    <span class="status">Ready</span>
    <span class="percentage">0%</span>
  </div>
</div>

<!-- CSS -->
<style>
.data-processing {
  padding: 24px;
  text-align: center;
}

.stages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}

.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stage-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.stage-icon svg {
  width: 32px;
  height: 32px;
  color: #9ca3af;
}

.stage.active .stage-icon {
  background: #3b82f6;
}

.stage.active .stage-icon svg {
  color: white;
}

.connector {
  width: 48px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.connector-fill {
  height: 100%;
  width: 0;
  background: #3b82f6;
  transition: width 0.5s;
}

.stage.active + .connector .connector-fill {
  width: 100%;
}

.progress-info {
  display: flex;
  justify-content: center;
  gap: 16px;
  color: #6b7280;
}
</style>

<!-- JavaScript -->
<script>
class DataProcessing {
  constructor(element, onComplete) {
    this.element = element;
    this.stages = element.querySelectorAll('.stage');
    this.status = element.querySelector('.status');
    this.percentage = element.querySelector('.percentage');
    this.onComplete = onComplete;
  }

  start() {
    this.setStage(0);
    setTimeout(() => this.setStage(1), 800);
    setTimeout(() => this.setStage(2), 1700);
    setTimeout(() => {
      this.setStage(3);
      this.onComplete?.();
    }, 2500);
  }

  setStage(index) {
    this.stages.forEach((s, i) => s.classList.toggle('active', i <= index));
    const labels = ['Input', 'Processing', 'Output', 'Complete'];
    this.status.textContent = labels[index];
    this.percentage.textContent = Math.min(100, index * 33) + '%';
  }
}

// Usage:
const processing = new DataProcessing(
  document.querySelector('.data-processing'),
  () => console.log('Complete!')
);
processing.start();
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="DataProcessing" description="Data pipeline animation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Controls</h3>
            <button
              onClick={() => setIsProcessing(!isProcessing)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                isProcessing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Play className="w-4 h-4" />
              {isProcessing ? 'Stop Processing' : 'Start Processing'}
            </button>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-muted-foreground">
              An animated data pipeline visualization showing three stages (Input → Processing → Output) with flowing data cards and progress counter.
            </p>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Pipeline Stages</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Input (0-0.8s)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Processing (0.8-2.5s)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Output (2.5-4s)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Complete (4s+)
              </li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-emerald-100 text-sm">Data pipeline visualization</p>
            </div>
            <div className="flex items-center justify-center p-8 bg-gradient-to-br from-muted/30 to-emerald-50/30 dark:to-emerald-900/20" style={{ minHeight: '350px' }}>
              <DataProcessing isProcessing={isProcessing} onComplete={() => setIsProcessing(false)} />
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
