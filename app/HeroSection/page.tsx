'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PreviewControls, { ColorConfig } from '../../components/PreviewControls';
import { HeroSection, HeroGradientText } from '../../HeroSection';

export default function HeroSectionDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [variant, setVariant] = useState<'default' | 'gradient' | 'mesh' | 'dots' | 'grid'>('gradient');
  const [colors, setColors] = useState<ColorConfig>({
    primary: '#8b5cf6',
    accent: '#a78bfa',
    background: '#ffffff',
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const usageCode = `import { HeroSection, HeroCentered, HeroGradientText } from 'archyra';

// Main Hero
<HeroSection
  title="Build Something Amazing"
  subtitle="Create beautiful apps with our component library"
  badge="New Release"
  variant="gradient"
  primaryAction={{ label: 'Get Started', href: '/start' }}
  secondaryAction={{ label: 'Learn More', href: '/docs' }}
/>

// Gradient Text Hero
<HeroGradientText
  beforeText="Build"
  gradientText="Beautiful Apps"
  afterText="Faster"
  subtitle="The modern way to build web applications"
/>`;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="HeroSection" description="Stunning hero sections for landing pages">
      <div className="space-y-8">
        {/* Controls */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-semibold mb-3">Background Variant</h3>
          <div className="flex flex-wrap gap-2">
            {(['default', 'gradient', 'mesh', 'dots', 'grid'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-3 py-2 text-sm rounded-lg capitalize transition-colors ${
                  variant === v ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <PreviewControls
          title="Hero Section Preview"
          subtitle={`Variant: ${variant}`}
          gradientFrom="from-violet-500"
          gradientTo="to-purple-500"
          onColorsChange={setColors}
        >
          <div className="relative overflow-hidden" style={{ minHeight: '450px' }}>
            <HeroSection
              title="Build Something Amazing"
              subtitle="Create stunning web applications with our collection of animated components. Production-ready and fully customizable."
              badge="New Release v2.0"
              variant={variant}
              fullHeight={false}
              primaryAction={{ label: 'Get Started', onClick: () => alert('Get Started clicked!') }}
              secondaryAction={{ label: 'View Docs', onClick: () => alert('View Docs clicked!') }}
              showScrollIndicator={false}
            />
          </div>
        </PreviewControls>

        {/* Gradient Text Preview */}
        <PreviewControls
          title="Gradient Text Variant"
          subtitle="Alternative hero style"
          gradientFrom="from-rose-500"
          gradientTo="to-pink-500"
          onColorsChange={setColors}
        >
          <div className="py-12 px-4">
            <HeroGradientText
              beforeText="Build"
              gradientText="Beautiful Apps"
              afterText="Faster"
              subtitle="The modern way to build stunning web applications with animated components"
              primaryAction={{ label: 'Start Building', onClick: () => {} }}
              secondaryAction={{ label: 'Learn More', onClick: () => {} }}
            />
          </div>
        </PreviewControls>

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
