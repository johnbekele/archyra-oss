'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, Zap, Shield, Rocket, Globe, Lock, Sparkles } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PreviewControls, { ColorConfig } from '../../components/PreviewControls';
import { FeatureGrid, FeatureBento } from '../../FeatureCard';

export default function FeatureCardDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [layout, setLayout] = useState<'grid' | 'bento'>('grid');
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

  const features = [
    {
      id: 1,
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Optimized for performance with GPU-accelerated animations and efficient rendering.',
    },
    {
      id: 2,
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure by Default',
      description: 'Built with security best practices. No vulnerabilities, just peace of mind.',
    },
    {
      id: 3,
      icon: <Rocket className="w-6 h-6" />,
      title: 'Easy to Deploy',
      description: 'Deploy anywhere in minutes. Works with Vercel, Netlify, and any hosting platform.',
    },
    {
      id: 4,
      icon: <Globe className="w-6 h-6" />,
      title: 'Global CDN',
      description: 'Your assets are served from edge locations worldwide for fastest delivery.',
    },
    {
      id: 5,
      icon: <Lock className="w-6 h-6" />,
      title: 'Type Safe',
      description: 'Full TypeScript support with comprehensive type definitions and IntelliSense.',
    },
    {
      id: 6,
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Beautiful Design',
      description: 'Carefully crafted components with attention to detail and accessibility.',
    },
  ];

  const bentoFeatures = [
    { ...features[0], size: 'large' as const },
    { ...features[1], size: 'small' as const },
    { ...features[2], size: 'small' as const },
    { ...features[3], size: 'wide' as const },
    { ...features[4], size: 'small' as const },
    { ...features[5], size: 'small' as const },
  ];

  const usageCode = `import { FeatureGrid, FeatureBento, FeatureSection } from 'archyra';

// Simple Grid
<FeatureGrid
  features={[
    { icon: <Zap />, title: 'Fast', description: 'Lightning performance' },
    { icon: <Shield />, title: 'Secure', description: 'Built-in security' },
  ]}
  columns={3}
/>

// Bento Layout
<FeatureBento
  features={[
    { icon: <Zap />, title: 'Fast', size: 'large' },
    { icon: <Shield />, title: 'Secure', size: 'small' },
  ]}
/>

// Full Section
<FeatureSection
  title="Why Choose Us"
  subtitle="Everything you need to build amazing apps"
  features={features}
  layout="grid"
/>`;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="FeatureCard" description="Feature display components for landing pages">
      <div className="space-y-8">
        {/* Controls */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-semibold mb-3">Layout</h3>
          <div className="flex gap-2">
            {(['grid', 'bento'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l)}
                className={`px-4 py-2 text-sm rounded-lg capitalize transition-colors ${
                  layout === l ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <PreviewControls
          title={`Feature ${layout === 'grid' ? 'Grid' : 'Bento'}`}
          subtitle="Interactive feature showcase"
          gradientFrom="from-violet-500"
          gradientTo="to-purple-500"
          onColorsChange={setColors}
        >
          <div className="py-4">
            {layout === 'grid' ? (
              <FeatureGrid
                features={features}
                columns={3}
                variant="elevated"
                iconStyle="gradient"
              />
            ) : (
              <FeatureBento features={bentoFeatures} />
            )}
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
