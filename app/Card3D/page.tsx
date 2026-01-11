'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown, Star } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Card3D, { Card3DContent } from '../../Card3D';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function Card3DPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [tiltIntensity, setTiltIntensity] = useState(10);
  const [glareEnabled, setGlareEnabled] = useState(false);
  const [scale, setScale] = useState(1.02);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { Card3D, Card3DContent } from 'archyra';

<Card3D
  tiltIntensity={${tiltIntensity}}
  glareEnabled={${glareEnabled}}
  scale={${scale}}
>
  <Card3DContent>
    <h3>3D Card</h3>
    <p>Hover to see the tilt effect!</p>
  </Card3DContent>
</Card3D>`;

  const vanillaCode = `<!-- HTML -->
<div class="card-3d-container">
  <div class="card-3d">
    <div class="card-3d-content">
      <h3>3D Card</h3>
      <p>Hover to see the effect</p>
    </div>
    ${glareEnabled ? '<div class="card-3d-glare"></div>' : ''}
  </div>
</div>

<!-- CSS -->
<style>
.card-3d-container {
  perspective: 1000px;
}

.card-3d {
  position: relative;
  background: white;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out, box-shadow 0.3s;
}

.card-3d:hover {
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.card-3d-content {
  padding: 24px;
}

.card-3d-glare {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.4), transparent 60%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.card-3d:hover .card-3d-glare {
  opacity: 0.3;
}
</style>

<!-- JavaScript -->
<script>
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -${tiltIntensity * 2};
    const rotateY = (x - 0.5) * ${tiltIntensity * 2};
    card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(${scale})\`;
    card.style.setProperty('--glare-x', (x * 100) + '%');
    card.style.setProperty('--glare-y', (y * 100) + '%');
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="Card3D" description="Interactive 3D perspective tilt card">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Tilt Intensity: {tiltIntensity}°</h3>
            <input
              type="range"
              min="5"
              max="20"
              value={tiltIntensity}
              onChange={(e) => setTiltIntensity(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Subtle</span>
              <span>Intense</span>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Hover Scale: {scale}x</h3>
            <input
              type="range"
              min="1"
              max="1.1"
              step="0.01"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1x</span>
              <span>1.1x</span>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={glareEnabled}
                onChange={(e) => setGlareEnabled(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Enable glare effect</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-pink-100 text-sm">Move your mouse over the card to see the 3D effect</p>
            </div>
            <div className="flex items-center justify-center p-12 bg-muted/30" style={{ minHeight: '400px' }}>
              <Card3D
                tiltIntensity={tiltIntensity}
                glareEnabled={glareEnabled}
                scale={scale}
                className="w-full max-w-sm"
              >
                <Card3DContent>
                  <div className="aspect-video bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                    <Star className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Premium Card</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Experience the smooth 3D tilt effect as you move your cursor across this card.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$99</span>
                    <button className="px-4 py-2 bg-violet-500 text-white rounded-lg text-sm font-medium">
                      Buy Now
                    </button>
                  </div>
                </Card3DContent>
              </Card3D>
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
