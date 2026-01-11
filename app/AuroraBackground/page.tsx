'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import AuroraBackground, { AuroraText, auroraPresets } from '../../AuroraBackground';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function AuroraBackgroundPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [preset, setPreset] = useState<keyof typeof auroraPresets>('cosmic');
  const [blur, setBlur] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [speed, setSpeed] = useState(1);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const colors = auroraPresets[preset];

  const reactCode = `import { AuroraBackground, AuroraText, auroraPresets } from 'archyra';

<AuroraBackground
  colors={auroraPresets.${preset}}
  blur="${blur}"
  speed={${speed}}
  className="min-h-screen"
>
  <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
    <h1 className="text-5xl font-bold text-white mb-4">
      Welcome to the Future
    </h1>
    <p className="text-xl text-white/80 mb-8">
      Beautiful aurora effects for your hero sections
    </p>
    <AuroraText className="text-2xl font-bold">
      Gradient Text Animation
    </AuroraText>
  </div>
</AuroraBackground>`;

  const vanillaCode = `<!-- HTML -->
<div class="aurora-background">
  <div class="aurora-layer"></div>
  <div class="aurora-layer"></div>
  <div class="aurora-layer"></div>
  <div class="aurora-content">
    <h1>Welcome to the Future</h1>
    <p>Beautiful aurora effects for your hero sections</p>
  </div>
</div>

<!-- CSS -->
<style>
.aurora-background {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: #09090b;
}

.aurora-layer {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  filter: blur(${blur === 'sm' ? '40px' : blur === 'md' ? '60px' : blur === 'lg' ? '80px' : '120px'});
  animation: aurora ${20 / speed}s ease-in-out infinite;
}

.aurora-layer:nth-child(1) {
  background: radial-gradient(ellipse 80% 50% at 50% 50%, ${colors[0]}66, transparent 70%);
}

.aurora-layer:nth-child(2) {
  background: radial-gradient(ellipse 80% 50% at 50% 50%, ${colors[1]}66, transparent 70%);
  animation-delay: -${20 / speed / 4}s;
}

.aurora-layer:nth-child(3) {
  background: radial-gradient(ellipse 80% 50% at 50% 50%, ${colors[2]}66, transparent 70%);
  animation-delay: -${20 / speed / 2}s;
}

@keyframes aurora {
  0%, 100% { transform: translate(30%, -20%) scale(1); }
  50% { transform: translate(-30%, 20%) scale(1.1); }
}

.aurora-content {
  position: relative;
  z-index: 10;
  color: white;
  text-align: center;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.aurora-content h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.aurora-content p {
  font-size: 1.25rem;
  opacity: 0.8;
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="AuroraBackground" description="Animated aurora borealis background">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Color Preset</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(auroraPresets) as Array<keyof typeof auroraPresets>).map((p) => (
                <button
                  key={p}
                  onClick={() => setPreset(p)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
                    preset === p ? 'bg-violet-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Blur Intensity</h3>
            <div className="flex gap-2">
              {(['sm', 'md', 'lg', 'xl'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBlur(b)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    blur === b ? 'bg-violet-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {b.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Speed: {speed}x</h3>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-indigo-100 text-sm">Mesmerizing aurora borealis effect</p>
            </div>
            <div className="relative" style={{ height: '450px' }}>
              <AuroraBackground
                colors={colors}
                blur={blur}
                speed={speed}
                className="absolute inset-0"
              >
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Welcome to the Future
                  </h1>
                  <p className="text-lg text-white/80 mb-6 max-w-md">
                    Beautiful aurora effects for your hero sections and landing pages
                  </p>
                  <AuroraText colors={colors} className="text-xl font-bold">
                    Animated Gradient Text
                  </AuroraText>
                  <div className="mt-8 flex gap-4">
                    <button className="px-6 py-3 bg-white text-zinc-900 rounded-lg font-medium">
                      Get Started
                    </button>
                    <button className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-medium">
                      Learn More
                    </button>
                  </div>
                </div>
              </AuroraBackground>
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
