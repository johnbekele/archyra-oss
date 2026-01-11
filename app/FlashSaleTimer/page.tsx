'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { FlashSaleTimer } from '../../FlashSaleTimer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function FlashSaleTimerPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');
  const [showBadge, setShowBadge] = useState(true);
  const [discount, setDiscount] = useState(50);
  const [hoursFromNow, setHoursFromNow] = useState(2);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { FlashSaleTimer } from 'archyra';

// Set end time to ${hoursFromNow} hours from now
const endTime = Date.now() + ${hoursFromNow} * 60 * 60 * 1000;

<FlashSaleTimer
  endTime={endTime}
  title="Flash Sale Ends In"
  discount={${discount}}
  showBadge={${showBadge}}
  onEnd={() => console.log('Sale ended!')}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="flash-sale-timer">
  ${showBadge ? `<div class="discount-badge">${discount}% OFF</div>` : ''}
  <h2 class="title">Flash Sale Ends In</h2>
  <div class="countdown">
    <div class="time-unit">
      <div class="digit-container">
        <span class="digit" id="hours">00</span>
      </div>
      <span class="label">Hours</span>
    </div>
    <span class="separator">:</span>
    <div class="time-unit">
      <div class="digit-container">
        <span class="digit" id="minutes">00</span>
      </div>
      <span class="label">Minutes</span>
    </div>
    <span class="separator">:</span>
    <div class="time-unit">
      <div class="digit-container">
        <span class="digit" id="seconds">00</span>
      </div>
      <span class="label">Seconds</span>
    </div>
  </div>
</div>

<!-- CSS -->
<style>
.flash-sale-timer {
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.discount-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #f43f5e, #ec4899);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 24px;
  opacity: 0.9;
}

.countdown {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.digit-container {
  background: rgba(255, 255, 255, 0.1);
  padding: 16px 24px;
  border-radius: 12px;
  min-width: 80px;
  position: relative;
  overflow: hidden;
}

.digit {
  font-size: 2.5rem;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.7;
  margin-top: 8px;
}

.separator {
  font-size: 2rem;
  font-weight: bold;
  opacity: 0.5;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Urgent mode - under 30 minutes */
.flash-sale-timer.urgent {
  animation: urgentPulse 0.5s infinite;
}

@keyframes urgentPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(244, 63, 94, 0); }
}

/* Flip animation for digit changes */
.digit.flip {
  animation: flipDigit 0.3s ease-out;
}

@keyframes flipDigit {
  0% { transform: rotateX(90deg); }
  100% { transform: rotateX(0); }
}
</style>

<!-- JavaScript -->
<script>
class FlashSaleTimer {
  constructor(element, endTime, onEnd) {
    this.element = element;
    this.endTime = endTime;
    this.onEnd = onEnd;
    this.hours = element.querySelector('#hours');
    this.minutes = element.querySelector('#minutes');
    this.seconds = element.querySelector('#seconds');
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = Date.now();
    const remaining = Math.max(0, this.endTime - now);

    if (remaining === 0) {
      clearInterval(this.interval);
      this.onEnd?.();
      return;
    }

    const h = Math.floor(remaining / (1000 * 60 * 60));
    const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((remaining % (1000 * 60)) / 1000);

    this.setDigit(this.hours, h);
    this.setDigit(this.minutes, m);
    this.setDigit(this.seconds, s);

    // Urgent mode under 30 minutes
    if (remaining < 30 * 60 * 1000) {
      this.element.classList.add('urgent');
    }
  }

  setDigit(el, value) {
    const formatted = value.toString().padStart(2, '0');
    if (el.textContent !== formatted) {
      el.classList.add('flip');
      el.textContent = formatted;
      setTimeout(() => el.classList.remove('flip'), 300);
    }
  }
}

// Usage:
const timer = new FlashSaleTimer(
  document.querySelector('.flash-sale-timer'),
  Date.now() + ${hoursFromNow} * 60 * 60 * 1000,
  () => alert('Sale ended!')
);
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="FlashSaleTimer" description="Countdown timer with flip animations">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Time Remaining</h3>
            <div className="flex flex-wrap gap-2">
              {[0.5, 1, 2, 5, 12].map((h) => (
                <button
                  key={h}
                  onClick={() => setHoursFromNow(h)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    hoursFromNow === h
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {h < 1 ? `${h * 60}m` : `${h}h`}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * Less than 30 minutes triggers urgent mode
            </p>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Discount</h3>
            <div className="flex flex-wrap gap-2">
              {[20, 30, 50, 70].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiscount(d)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    discount === d
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {d}%
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showBadge}
                onChange={(e) => setShowBadge(e.target.checked)}
                className="w-4 h-4 rounded accent-violet-500"
              />
              <span className="text-sm">Show Discount Badge</span>
            </label>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>- Flip digit transitions</li>
              <li>- Animated separators</li>
              <li>- Urgent mode (under 30 min)</li>
              <li>- Background particles</li>
              <li>- Pulsing effects</li>
              <li>- Shimmer highlight</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-violet-100 text-sm">Watch the countdown in action</p>
            </div>
            <div className="p-8 bg-muted/30 min-h-[400px] flex items-center justify-center">
              <div className="w-full max-w-md">
                <FlashSaleTimer
                  key={`${hoursFromNow}-${discount}-${showBadge}`}
                  endTime={Date.now() + hoursFromNow * 60 * 60 * 1000}
                  title="Flash Sale Ends In"
                  discount={discount}
                  showBadge={showBadge}
                  onEnd={() => alert('Sale ended!')}
                />
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
