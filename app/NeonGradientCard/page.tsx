'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown, Crown, Rocket, Gem } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import NeonGradientCard, { NeonGradientCardContent, neonGradientPresets } from '../../NeonGradientCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function NeonGradientCardPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [preset, setPreset] = useState<keyof typeof neonGradientPresets>('purple');
  const [glowIntensity, setGlowIntensity] = useState<'none' | 'sm' | 'md' | 'lg'>('md');
  const [speed, setSpeed] = useState(4);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const colors = neonGradientPresets[preset];

  const reactCode = `import { NeonGradientCard, NeonGradientCardContent, neonGradientPresets } from 'archyra';

<NeonGradientCard
  colors={neonGradientPresets.${preset}}
  glowIntensity="${glowIntensity}"
  speed={${speed}}
>
  <NeonGradientCardContent>
    <h3>Premium Feature</h3>
    <p>Unlock exclusive content</p>
  </NeonGradientCardContent>
</NeonGradientCard>`;

  const vanillaCode = `<!-- HTML -->
<div class="neon-card">
  <div class="neon-card-border"></div>
  <div class="neon-card-glow"></div>
  <div class="neon-card-content">
    <h3>Premium</h3>
    <p>Exclusive content</p>
  </div>
</div>

<!-- CSS -->
<style>
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.neon-card {
  position: relative;
  padding: 2px;
  border-radius: 16px;
}

.neon-card-border {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: conic-gradient(from var(--angle), ${colors.join(', ')});
  animation: rotate-gradient ${speed}s linear infinite;
}

.neon-card-glow {
  position: absolute;
  inset: -${glowIntensity === 'none' ? 0 : glowIntensity === 'sm' ? 5 : glowIntensity === 'md' ? 10 : 20}px;
  border-radius: 20px;
  background: conic-gradient(from var(--angle), ${colors.join(', ')});
  filter: blur(${glowIntensity === 'none' ? 0 : glowIntensity === 'sm' ? 10 : glowIntensity === 'md' ? 20 : 40}px);
  opacity: 0.5;
  animation: rotate-gradient ${speed}s linear infinite;
}

.neon-card-content {
  position: relative;
  z-index: 1;
  background: white;
  border-radius: 14px;
  padding: 24px;
}

@keyframes rotate-gradient {
  0% { --angle: 0deg; }
  100% { --angle: 360deg; }
}

/* Dark mode */
.dark .neon-card-content {
  background: #09090b;
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="NeonGradientCard" description="Card with animated neon gradient border">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Color Preset</h3>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(neonGradientPresets) as Array<keyof typeof neonGradientPresets>).map((p) => (
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
            <h3 className="font-semibold mb-4">Glow Intensity</h3>
            <div className="flex gap-2">
              {(['none', 'sm', 'md', 'lg'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGlowIntensity(g)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    glowIntensity === g ? 'bg-violet-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {g.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Rotation Speed: {speed}s</h3>
            <input
              type="range"
              min="2"
              max="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-purple-100 text-sm">Animated neon gradient border with glow effect</p>
            </div>
            <div className="p-8 bg-zinc-950" style={{ minHeight: '400px' }}>
              <div className="grid md:grid-cols-3 gap-6">
                <NeonGradientCard colors={colors} glowIntensity={glowIntensity} speed={speed}>
                  <NeonGradientCardContent className="text-center">
                    <Crown className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-1">Starter</h3>
                    <p className="text-3xl font-bold mb-4">$9<span className="text-sm font-normal">/mo</span></p>
                    <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                      <li>5 Projects</li>
                      <li>Basic Support</li>
                    </ul>
                  </NeonGradientCardContent>
                </NeonGradientCard>

                <NeonGradientCard colors={colors} glowIntensity={glowIntensity} speed={speed}>
                  <NeonGradientCardContent className="text-center">
                    <Rocket className="w-10 h-10 text-violet-500 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-1">Pro</h3>
                    <p className="text-3xl font-bold mb-4">$29<span className="text-sm font-normal">/mo</span></p>
                    <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                      <li>Unlimited Projects</li>
                      <li>Priority Support</li>
                    </ul>
                  </NeonGradientCardContent>
                </NeonGradientCard>

                <NeonGradientCard colors={colors} glowIntensity={glowIntensity} speed={speed}>
                  <NeonGradientCardContent className="text-center">
                    <Gem className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
                    <h3 className="font-bold text-lg mb-1">Enterprise</h3>
                    <p className="text-3xl font-bold mb-4">$99<span className="text-sm font-normal">/mo</span></p>
                    <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                      <li>Custom Solutions</li>
                      <li>24/7 Support</li>
                    </ul>
                  </NeonGradientCardContent>
                </NeonGradientCard>
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
