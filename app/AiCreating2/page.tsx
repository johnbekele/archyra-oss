'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, Play, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import AiCreating2 from '../../AiCreating2';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function AiCreating2Page() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#6366F1');
  const [bgColor, setBgColor] = useState('#0f172a');
  const [textColor, setTextColor] = useState('#ffffff');
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const colorOptions = [
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Emerald', value: '#10B981' },
    { name: 'Rose', value: '#F43F5E' },
    { name: 'Violet', value: '#8B5CF6' },
    { name: 'Cyan', value: '#06B6D4' },
  ];

  const reactCode = `import { AiCreating2 } from 'archyra';

<AiCreating2
  isLoading={isLoading}
  primaryColor="${primaryColor}"
  backgroundColor="${bgColor}"
  textColor="${textColor}"
  message="Creating your plan..."
  onComplete={() => setIsLoading(false)}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="ai-creating-2" style="--primary: ${primaryColor}; --bg: ${bgColor}; --text: ${textColor};">
  <div class="brain-container">
    <div class="ring ring-1"></div>
    <div class="ring ring-2"></div>
    <div class="ring ring-3"></div>
    <div class="brain-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      </svg>
    </div>
  </div>
  <div class="messages">
    <h2 class="message">AI is creating...</h2>
    <p class="sub-message">This may take a moment</p>
  </div>
  <div class="progress-container">
    <div class="progress-bar"></div>
  </div>
</div>

<!-- CSS -->
<style>
.ai-creating-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 48px;
  background: var(--bg);
  color: var(--text);
}

.brain-container {
  position: relative;
  width: 128px;
  height: 128px;
}

.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--primary);
  opacity: 0.3;
}

.ring-1 { animation: rotate 3s linear infinite; }
.ring-2 { animation: rotate 4s linear infinite reverse; inset: 10px; }
.ring-3 { animation: rotate 5s linear infinite; inset: 20px; }

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.brain-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brain-icon svg {
  width: 48px;
  height: 48px;
  color: var(--primary);
}

.message {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.sub-message {
  font-size: 0.875rem;
  opacity: 0.7;
  margin: 8px 0 0;
}

.progress-container {
  width: 256px;
  height: 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  width: 0;
  background: var(--primary);
  border-radius: 9999px;
  animation: progress 3s ease forwards;
}

@keyframes progress {
  to { width: 100%; }
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="AiCreating2" description="AI brain animation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Primary Color</h3>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setPrimaryColor(color.value)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-2 border-dashed border-gray-300" />
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Background Color</h3>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer" />
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Text Color</h3>
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-12 rounded-lg cursor-pointer" />
          </div>

          <div className="bg-card rounded-xl border p-5">
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
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-purple-100 text-sm">AI brain animation with rotating rings</p>
            </div>
            <div className="rounded-b-xl overflow-hidden" style={{ height: '400px' }}>
              {isPlaying ? (
                <AiCreating2 isLoading={true} contained={true} primaryColor={primaryColor} backgroundColor={bgColor} textColor={textColor} onComplete={() => setIsPlaying(false)} />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
                  <p style={{ color: textColor, opacity: 0.5 }}>Click "Start Animation" to preview</p>
                </div>
              )}
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
