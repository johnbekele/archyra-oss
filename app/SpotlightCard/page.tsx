'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown, Zap, Shield, Sparkles } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import SpotlightCard, { SpotlightCardContent, SpotlightGrid } from '../../SpotlightCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function SpotlightCardPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [spotlightColor, setSpotlightColor] = useState('rgba(99, 102, 241, 0.15)');
  const [borderGlow, setBorderGlow] = useState(true);
  const [rounded, setRounded] = useState<'md' | 'lg' | 'xl' | '2xl'>('2xl');
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const colorOptions = [
    { name: 'Violet', value: 'rgba(99, 102, 241, 0.15)' },
    { name: 'Cyan', value: 'rgba(6, 182, 212, 0.15)' },
    { name: 'Rose', value: 'rgba(244, 63, 94, 0.15)' },
    { name: 'Amber', value: 'rgba(245, 158, 11, 0.15)' },
    { name: 'Emerald', value: 'rgba(16, 185, 129, 0.15)' },
  ];

  const reactCode = `import { SpotlightCard, SpotlightCardContent } from 'archyra';

<SpotlightCard
  spotlightColor="${spotlightColor}"
  borderGlow={${borderGlow}}
  rounded="${rounded}"
>
  <SpotlightCardContent>
    <h3>Feature Title</h3>
    <p>Description text here.</p>
  </SpotlightCardContent>
</SpotlightCard>`;

  const vanillaCode = `<!-- HTML -->
<div class="spotlight-card">
  <div class="spotlight-card-content">
    <h3>Feature Title</h3>
    <p>Description text here.</p>
  </div>
</div>

<!-- CSS -->
<style>
.spotlight-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s, box-shadow 0.3s;
}

.spotlight-card:hover {
  transform: scale(1.01);
  box-shadow: 0 10px 40px rgba(99, 102, 241, 0.1);
}

.spotlight-card::before {
  content: '';
  position: absolute;
  top: var(--mouse-y, 50%);
  left: var(--mouse-x, 50%);
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, ${spotlightColor}, transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.spotlight-card:hover::before {
  opacity: 1;
}

.spotlight-card-content {
  position: relative;
  z-index: 1;
  padding: 24px;
}
</style>

<!-- JavaScript -->
<script>
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  });
});
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for performance' },
    { icon: Shield, title: 'Secure', desc: 'Enterprise-grade security' },
    { icon: Sparkles, title: 'Beautiful', desc: 'Stunning animations' },
  ];

  return (
    <DashboardLayout title="SpotlightCard" description="Card with mouse-tracking spotlight effect">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Spotlight Color</h3>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSpotlightColor(c.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    spotlightColor === c.value ? 'bg-violet-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Border Radius</h3>
            <div className="flex gap-2">
              {(['md', 'lg', 'xl', '2xl'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRounded(r)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    rounded === r ? 'bg-violet-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={borderGlow}
                onChange={(e) => setBorderGlow(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Border glow on hover</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-cyan-100 text-sm">Interactive spotlight effect follows your cursor</p>
            </div>
            <div className="p-8 bg-muted/30" style={{ minHeight: '350px' }}>
              <SpotlightGrid cols={3} gap="md">
                {features.map((feature, i) => (
                  <SpotlightCard
                    key={i}
                    spotlightColor={spotlightColor}
                    borderGlow={borderGlow}
                    rounded={rounded}
                  >
                    <SpotlightCardContent>
                      <feature.icon className="w-10 h-10 text-violet-500 mb-4" />
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </SpotlightCardContent>
                  </SpotlightCard>
                ))}
              </SpotlightGrid>
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
