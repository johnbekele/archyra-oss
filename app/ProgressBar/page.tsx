'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, Play, RotateCcw, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import ProgressBar, { StepProgress, CircularProgress } from '../../ProgressBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function ProgressBarPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [value, setValue] = useState(65);
  const [variant, setVariant] = useState<'default' | 'gradient' | 'striped' | 'glow'>('gradient');
  const [color, setColor] = useState<'blue' | 'green' | 'purple' | 'orange'>('blue');
  const [showLabel, setShowLabel] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [framework, setFramework] = useState<Framework>('react');

  const steps = ['Start', 'Processing', 'Review', 'Complete'];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const animateProgress = () => {
    setIsAnimating(true);
    setValue(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setValue(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 50);
  };

  const reactCode = `import ProgressBar, { StepProgress, CircularProgress } from 'archyra';

<ProgressBar value={${value}} variant="${variant}" color="${color}" showLabel />
<StepProgress steps={['Start', 'Process', 'Done']} currentStep={1} />
<CircularProgress value={75} size={80} color="${color}" />`;

  const vanillaCode = `<!-- HTML -->
<div class="progress-bar ${variant}" style="--color: ${color === 'blue' ? '#3b82f6' : color === 'green' ? '#22c55e' : color === 'purple' ? '#a855f7' : '#f97316'}">
  <div class="progress-track">
    <div class="progress-fill" style="width: ${value}%"></div>
  </div>
  <span class="progress-label">${value}%</span>
</div>

<!-- CSS -->
<style>
.progress-bar {
  width: 100%;
}

.progress-track {
  height: 12px;
  background: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color);
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.progress-bar.gradient .progress-fill {
  background: linear-gradient(90deg, var(--color), color-mix(in srgb, var(--color) 70%, white));
}

.progress-bar.striped .progress-fill {
  background-image: linear-gradient(
    45deg,
    rgba(255,255,255,0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255,255,255,0.15) 50%,
    rgba(255,255,255,0.15) 75%,
    transparent 75%
  );
  background-size: 1rem 1rem;
  animation: stripes 1s linear infinite;
}

@keyframes stripes {
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
}

.progress-bar.glow .progress-fill {
  box-shadow: 0 0 10px var(--color);
}

.progress-label {
  display: block;
  text-align: right;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
  color: #374151;
}
</style>

<!-- JavaScript -->
<script>
class ProgressBar {
  constructor(element) {
    this.element = element;
    this.fill = element.querySelector('.progress-fill');
    this.label = element.querySelector('.progress-label');
  }

  setValue(value) {
    this.fill.style.width = value + '%';
    this.label.textContent = value + '%';
  }

  animate(from, to, duration = 1000) {
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = from + (to - from) * progress;
      this.setValue(Math.round(value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}

// Usage:
const bar = new ProgressBar(document.querySelector('.progress-bar'));
bar.animate(0, 100, 2000);
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="ProgressBar" description="Animated progress indicators">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Progress: {value}%</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full"
              disabled={indeterminate}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={animateProgress}
                disabled={isAnimating}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Animate
              </button>
              <button
                onClick={() => setValue(0)}
                className="px-3 py-2 bg-muted rounded-lg hover:bg-muted/80"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Variant</h3>
            <div className="flex flex-wrap gap-2">
              {(['default', 'gradient', 'striped', 'glow'] as const).map((v) => (
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
            <h3 className="font-semibold mb-4">Color</h3>
            <div className="flex flex-wrap gap-2">
              {(['blue', 'green', 'purple', 'orange'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{
                    backgroundColor: c === 'blue' ? '#3B82F6' : c === 'green' ? '#22C55E' : c === 'purple' ? '#A855F7' : '#F97316'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5 space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={showLabel} onChange={(e) => setShowLabel(e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm">Show Label</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={indeterminate} onChange={(e) => setIndeterminate(e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-sm">Indeterminate</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-blue-100 text-sm">Progress bar with animations</p>
            </div>
            <div className="p-8 space-y-8 bg-muted/30">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Linear Progress</h4>
                <ProgressBar value={value} variant={variant} color={color} showLabel={showLabel} indeterminate={indeterminate} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Step Progress</h4>
                <StepProgress steps={steps} currentStep={currentStep} color={color} />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="px-3 py-1 text-sm bg-muted rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Circular Progress</h4>
                <div className="flex gap-8 items-center">
                  <CircularProgress value={value} color={color} size={80} />
                  <CircularProgress value={value} color={color} size={60} strokeWidth={6} />
                  <CircularProgress indeterminate color={color} size={50} />
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
