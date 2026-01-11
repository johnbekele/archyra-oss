'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, Zap, Star, Crown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PreviewControls, { ColorConfig } from '../../components/PreviewControls';
import { PricingTable } from '../../PricingCard';

export default function PricingCardDemo() {
  const [copied, setCopied] = useState<string | null>(null);
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

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for individuals',
      price: 9,
      yearlyPrice: 90,
      icon: <Zap className="w-5 h-5" />,
      features: [
        '5 Projects',
        '10GB Storage',
        'Basic Analytics',
        'Email Support',
        { text: 'API Access', included: false },
        { text: 'Custom Domain', included: false },
      ],
      buttonText: 'Start Free Trial',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for growing teams',
      price: 29,
      yearlyPrice: 290,
      icon: <Star className="w-5 h-5" />,
      popular: true,
      features: [
        'Unlimited Projects',
        '100GB Storage',
        'Advanced Analytics',
        'Priority Support',
        'API Access',
        { text: 'Custom Domain', included: false },
      ],
      buttonText: 'Get Started',
      buttonVariant: 'gradient' as const,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      price: 99,
      yearlyPrice: 990,
      icon: <Crown className="w-5 h-5" />,
      features: [
        'Unlimited Everything',
        '1TB Storage',
        'Custom Analytics',
        '24/7 Support',
        'API Access',
        'Custom Domain',
      ],
      buttonText: 'Contact Sales',
    },
  ];

  const usageCode = `import { PricingTable } from 'archyra';

<PricingTable
  plans={[
    {
      id: 'basic',
      name: 'Basic',
      price: 9,
      yearlyPrice: 90,
      features: ['5 Projects', '10GB Storage'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      yearlyPrice: 290,
      popular: true,
      features: ['Unlimited Projects', '100GB Storage'],
    },
  ]}
  onSelectPlan={(plan, isYearly) => console.log(plan, isYearly)}
/>`;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="PricingCard" description="Animated pricing cards with billing toggle and feature lists">
      <div className="space-y-8">
        {/* Preview */}
        <PreviewControls
          title="Pricing Table"
          subtitle="With monthly/yearly toggle"
          gradientFrom="from-violet-500"
          gradientTo="to-purple-500"
          onColorsChange={setColors}
        >
          <div className="py-4">
            <PricingTable
              plans={plans}
              onSelectPlan={(plan, isYearly) => alert(`Selected: ${plan.name} (${isYearly ? 'Yearly' : 'Monthly'})`)}
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
