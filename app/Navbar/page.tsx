'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PreviewControls, { ColorConfig } from '../../components/PreviewControls';
import { Navbar, NavbarCentered } from '../../Navbar';

export default function NavbarDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [variant, setVariant] = useState<'default' | 'centered'>('default');
  const [transparent, setTransparent] = useState(false);
  const [colors, setColors] = useState<ColorConfig>({
    primary: '#6366f1',
    accent: '#818cf8',
    background: '#ffffff',
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const navProps = {
    logo: { text: 'Archyra' },
    links: [
      { label: 'Home', href: '#', active: true },
      { label: 'Features', href: '#' },
      {
        label: 'Products',
        href: '#',
        children: [
          { label: 'Analytics', href: '#' },
          { label: 'Automation', href: '#' },
          { label: 'Reports', href: '#' },
        ],
      },
      { label: 'Pricing', href: '#' },
      { label: 'Docs', href: '#', external: true },
    ],
    actions: [
      { label: 'Sign In', variant: 'outline' as const },
      { label: 'Get Started', variant: 'primary' as const },
    ],
  };

  const usageCode = `import { Navbar, NavbarFloating, NavbarCentered } from 'archyra';

// Standard Navbar
<Navbar
  logo={{ text: 'YourBrand' }}
  links={[
    { label: 'Home', href: '/', active: true },
    { label: 'Features', href: '/features' },
    { label: 'Products', href: '#', children: [
      { label: 'Analytics', href: '/analytics' },
      { label: 'Reports', href: '/reports' },
    ]},
  ]}
  actions={[
    { label: 'Sign In', variant: 'outline' },
    { label: 'Get Started', variant: 'primary' },
  ]}
  sticky
  hideOnScroll
/>

// Centered Logo Navbar
<NavbarCentered
  logo={{ text: 'YourBrand' }}
  links={navLinks}
  actions={actions}
/>`;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="Navbar" description="Navigation bar components with mobile menu and scroll effects">
      <div className="space-y-8">
        {/* Controls */}
        <div className="bg-card rounded-xl border p-5">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Variant</h3>
              <div className="flex gap-2">
                {(['default', 'centered'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-4 py-2 text-sm rounded-lg capitalize transition-colors ${
                      variant === v ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Options</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={transparent}
                  onChange={(e) => setTransparent(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Transparent background</span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview */}
        <PreviewControls
          title="Navbar Preview"
          subtitle="Try resizing the window to see mobile menu"
          gradientFrom="from-indigo-500"
          gradientTo="to-purple-500"
          onColorsChange={setColors}
        >
          <div className={`relative ${transparent ? 'bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg' : ''}`}>
            <div className="relative z-10">
              {variant === 'default' ? (
                <Navbar
                  {...navProps}
                  sticky={false}
                  transparent={transparent}
                />
              ) : (
                <NavbarCentered
                  {...navProps}
                  sticky={false}
                />
              )}
            </div>
            <div className="h-32 flex items-center justify-center text-muted-foreground">
              <p>Page content area</p>
            </div>
          </div>
        </PreviewControls>

        {/* Features */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-semibold mb-3">Features</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li>- Sticky navigation with scroll hide</li>
            <li>- Dropdown menus</li>
            <li>- Mobile responsive menu</li>
            <li>- Transparent mode for hero sections</li>
            <li>- Active link states</li>
            <li>- External link indicators</li>
            <li>- Floating variant on scroll</li>
            <li>- Dark mode support</li>
          </ul>
        </div>

        {/* Code */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Usage</span>
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
    </DashboardLayout>
  );
}
