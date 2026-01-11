'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PreviewControls, { ColorConfig } from '../../components/PreviewControls';
import { TestimonialCard, TestimonialGrid, TestimonialHighlight } from '../../TestimonialCard';

export default function TestimonialCardDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [variant, setVariant] = useState<'default' | 'bordered' | 'elevated' | 'gradient'>('elevated');
  const [colors, setColors] = useState<ColorConfig>({
    primary: '#f59e0b',
    accent: '#fbbf24',
    background: '#ffffff',
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const testimonials = [
    {
      id: 1,
      quote: "This component library has transformed our development workflow. The animations are smooth and the API is intuitive.",
      author: { name: 'Sarah Chen', role: 'Frontend Lead', company: 'TechCorp' },
      rating: 5,
    },
    {
      id: 2,
      quote: "Best investment we've made for our design system. The components are beautiful and easy to customize.",
      author: { name: 'Michael Rodriguez', role: 'CTO', company: 'StartupXYZ' },
      rating: 5,
    },
    {
      id: 3,
      quote: "Finally, a component library that doesn't compromise on animations or accessibility. Highly recommended!",
      author: { name: 'Emily Watson', role: 'Designer', company: 'DesignStudio' },
      rating: 5,
    },
  ];

  const usageCode = `import { TestimonialCard, TestimonialGrid, TestimonialSection } from 'archyra';

// Single Card
<TestimonialCard
  quote="This is amazing!"
  author={{ name: 'John Doe', role: 'CEO', company: 'Acme' }}
  rating={5}
  variant="elevated"
/>

// Grid Layout
<TestimonialGrid
  testimonials={testimonials}
  columns={3}
  variant="elevated"
/>

// Full Section
<TestimonialSection
  title="What our customers say"
  testimonials={testimonials}
  layout="carousel"
/>`;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="TestimonialCard" description="Beautiful testimonial components for social proof">
      <div className="space-y-8">
        {/* Controls */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-semibold mb-3">Variant</h3>
          <div className="flex flex-wrap gap-2">
            {(['default', 'bordered', 'elevated', 'gradient'] as const).map((v) => (
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

        {/* Single Card */}
        <PreviewControls
          title="Single Testimonial"
          subtitle={`Variant: ${variant}`}
          gradientFrom="from-amber-500"
          gradientTo="to-orange-500"
          onColorsChange={setColors}
        >
          <div className="flex justify-center py-4">
            <div className="max-w-md">
              <TestimonialCard
                quote={testimonials[0].quote}
                author={testimonials[0].author}
                rating={testimonials[0].rating}
                variant={variant}
              />
            </div>
          </div>
        </PreviewControls>

        {/* Grid */}
        <PreviewControls
          title="Testimonial Grid"
          subtitle="Multiple testimonials"
          gradientFrom="from-violet-500"
          gradientTo="to-purple-500"
          onColorsChange={setColors}
        >
          <div className="py-4">
            <TestimonialGrid
              testimonials={testimonials}
              columns={3}
              variant={variant}
            />
          </div>
        </PreviewControls>

        {/* Highlight */}
        <PreviewControls
          title="Featured Testimonial"
          subtitle="Highlight style"
          gradientFrom="from-emerald-500"
          gradientTo="to-teal-500"
          onColorsChange={setColors}
        >
          <div className="py-4">
            <TestimonialHighlight
              testimonial={testimonials[1]}
              backgroundGradient={['#6366f1', '#a855f7']}
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
