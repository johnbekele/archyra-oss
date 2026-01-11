'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown, Home, Search, Mail, Calendar, Settings, User, Folder, Music } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { DockStatic } from '../../Dock';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';
type Variant = 'glass' | 'solid';

export default function DockPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [variant, setVariant] = useState<Variant>('glass');
  const [activeItem, setActiveItem] = useState('home');
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const dockItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', id: 'home' },
    { icon: <Search className="w-5 h-5" />, label: 'Search', id: 'search' },
    { icon: <Mail className="w-5 h-5" />, label: 'Mail', id: 'mail' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', id: 'calendar' },
    { icon: <Folder className="w-5 h-5" />, label: 'Files', id: 'files' },
    { icon: <Music className="w-5 h-5" />, label: 'Music', id: 'music' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', id: 'settings' },
  ];

  const reactCode = `import { Dock, DockItem, DockDivider, FloatingDock } from 'archyra';
import { Home, Search, Mail, Settings } from 'lucide-react';

// Full dock with magnification
<Dock
  magnification={1.5}
  distance={150}
  variant="${variant}"
  position="bottom"
>
  <DockItem icon={<Home />} label="Home" onClick={() => {}} />
  <DockItem icon={<Search />} label="Search" onClick={() => {}} />
  <DockDivider />
  <DockItem icon={<Mail />} label="Mail" onClick={() => {}} />
  <DockItem icon={<Settings />} label="Settings" onClick={() => {}} isActive />
</Dock>

// Pre-styled floating dock
<FloatingDock>
  <DockItem icon={<Home />} label="Home" />
</FloatingDock>

// Static dock (no magnification)
<DockStatic
  items={[
    { icon: <Home />, label: 'Home', isActive: true },
    { icon: <Settings />, label: 'Settings' },
  ]}
  variant="${variant}"
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="dock ${variant}">
  <button class="dock-item active" title="Home">
    <svg><!-- Home icon --></svg>
    <span class="tooltip">Home</span>
  </button>
  <button class="dock-item" title="Search">
    <svg><!-- Search icon --></svg>
    <span class="tooltip">Search</span>
  </button>
  <div class="dock-divider"></div>
  <button class="dock-item" title="Settings">
    <svg><!-- Settings icon --></svg>
    <span class="tooltip">Settings</span>
  </button>
</div>

<!-- CSS -->
<style>
.dock {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px;
  border-radius: 16px;
}

.dock.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dock.solid {
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dock-item {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.dock-item:hover {
  transform: translateY(-8px) scale(1.2);
}

.dock-item .tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background: #18181b;
  color: white;
  font-size: 12px;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  white-space: nowrap;
  margin-bottom: 8px;
}

.dock-item:hover .tooltip {
  opacity: 1;
}

.dock-divider {
  width: 1px;
  height: 32px;
  background: rgba(0, 0, 0, 0.2);
  margin: 0 4px;
}

/* Active indicator */
.dock-item.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
}
</style>

<!-- JavaScript (for magnification effect) -->
<script>
const dock = document.querySelector('.dock');
const items = dock.querySelectorAll('.dock-item');

dock.addEventListener('mousemove', (e) => {
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const distance = Math.abs(e.clientX - center);
    const maxDist = 150;
    const scale = Math.max(1, 1.5 - (distance / maxDist) * 0.5);
    item.style.transform = \`scale(\${scale})\`;
  });
});

dock.addEventListener('mouseleave', () => {
  items.forEach(item => {
    item.style.transform = 'scale(1)';
  });
});
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="Dock" description="macOS-style dock navigation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Variant</h3>
            <div className="flex gap-2">
              {(['glass', 'solid'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
                    variant === v
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Active Item</h3>
            <div className="grid grid-cols-2 gap-2">
              {dockItems.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    activeItem === item.id
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>- Magnification on hover</li>
              <li>- Smooth spring animations</li>
              <li>- Tooltip labels</li>
              <li>- Active indicators</li>
              <li>- Glass & solid variants</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-zinc-800 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Static Dock Preview</h2>
              <p className="text-slate-300 text-sm">Click items to change active state</p>
            </div>
            <div className="relative bg-gradient-to-br from-slate-900 to-zinc-900" style={{ height: '350px' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/50 text-sm">Hover over dock items below</p>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <DockStatic
                  items={dockItems.map(item => ({
                    ...item,
                    isActive: item.id === activeItem,
                    onClick: () => setActiveItem(item.id),
                  }))}
                  variant={variant}
                  size={48}
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6">
            <h3 className="font-semibold mb-4">Note on Full Dock Component</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The full <code className="bg-muted px-1 rounded">Dock</code> component with magnification uses
              <code className="bg-muted px-1 rounded">position: fixed</code> and appears at the bottom of the screen.
              For this demo, we show the <code className="bg-muted px-1 rounded">DockStatic</code> variant which works well in contained layouts.
            </p>
            <p className="text-sm text-muted-foreground">
              In your app, use the full <code className="bg-muted px-1 rounded">Dock</code> component for the authentic
              macOS-style magnification effect with smooth spring animations.
            </p>
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
