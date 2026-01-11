'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import MeteorShower, { MeteorShowerCosmic, StarField } from '../../MeteorShower';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function MeteorShowerPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [count, setCount] = useState(20);
  const [angle, setAngle] = useState(215);
  const [showStars, setShowStars] = useState(true);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { MeteorShower, MeteorShowerCosmic, StarField } from 'archyra';

// Basic meteor shower
<MeteorShower
  count={${count}}
  angle={${angle}}
  showStars={${showStars}}
  className="absolute inset-0"
>
  <YourContent />
</MeteorShower>

// Pre-styled cosmic theme
<MeteorShowerCosmic count={15}>
  <h1>Welcome to Space</h1>
</MeteorShowerCosmic>

// Just the stars
<StarField count={100} twinkle>
  <YourContent />
</StarField>`;

  const vanillaCode = `<!-- HTML -->
<div class="meteor-container">
  <div class="stars"></div>
  <div class="meteors"></div>
  <div class="content">Your Content Here</div>
</div>

<!-- CSS -->
<style>
.meteor-container {
  position: relative;
  overflow: hidden;
  background: #09090b;
  min-height: 400px;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.meteor {
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, transparent, white);
  transform: rotate(${angle}deg);
  animation: meteor 3s linear infinite;
}

@keyframes meteor {
  0% { transform: translate(0, 0) rotate(${angle}deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translate(150%, 150%) rotate(${angle}deg); opacity: 0; }
}

.content {
  position: relative;
  z-index: 10;
}
</style>

<!-- JavaScript -->
<script>
// Generate stars
const starsContainer = document.querySelector('.stars');
for (let i = 0; i < 50; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  star.style.animationDelay = Math.random() * 3 + 's';
  starsContainer.appendChild(star);
}

// Generate meteors
const meteorsContainer = document.querySelector('.meteors');
for (let i = 0; i < ${count}; i++) {
  const meteor = document.createElement('div');
  meteor.className = 'meteor';
  meteor.style.left = Math.random() * 100 + '%';
  meteor.style.top = Math.random() * 50 + '%';
  meteor.style.animationDelay = Math.random() * 5 + 's';
  meteor.style.animationDuration = (2 + Math.random() * 3) + 's';
  meteorsContainer.appendChild(meteor);
}
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="MeteorShower" description="Animated meteor background effect">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Meteor Count: {count}</h3>
            <input
              type="range"
              min="5"
              max="40"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Few</span>
              <span>Many</span>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Angle: {angle}°</h3>
            <input
              type="range"
              min="180"
              max="270"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Left</span>
              <span>Down</span>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showStars}
                onChange={(e) => setShowStars(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Show twinkling stars</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-zinc-900 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-slate-300 text-sm">Meteors streaking across the night sky</p>
            </div>
            <div className="relative" style={{ height: '400px' }}>
              <MeteorShower
                key={`${count}-${angle}-${showStars}`}
                count={count}
                angle={angle}
                showStars={showStars}
                backgroundColor="#09090b"
                className="absolute inset-0"
              >
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Welcome to Space
                  </h1>
                  <p className="text-lg text-white/70 max-w-md">
                    A stunning meteor shower effect for your hero sections
                  </p>
                </div>
              </MeteorShower>
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-purple-900 to-violet-900 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Cosmic Theme</h2>
              <p className="text-purple-200 text-sm">Pre-styled purple cosmic variant</p>
            </div>
            <div className="relative" style={{ height: '300px' }}>
              <MeteorShowerCosmic count={15} className="absolute inset-0">
                <div className="relative z-10 flex items-center justify-center h-full">
                  <h2 className="text-3xl font-bold text-white">Cosmic Vibes</h2>
                </div>
              </MeteorShowerCosmic>
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
