'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PreviewControls, { ColorConfig } from '../../components/PreviewControls';
import { Footer, FooterSimple, FooterCentered } from '../../FooterSection';

export default function FooterSectionDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [variant, setVariant] = useState<'full' | 'simple' | 'centered'>('full');
  const [colors, setColors] = useState<ColorConfig>({
    primary: '#64748b',
    accent: '#94a3b8',
    background: '#ffffff',
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const footerProps = {
    logo: { text: 'Archyra' },
    description: 'Beautiful animated components for modern web applications.',
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'Changelog', href: '#' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#' },
          { label: 'Blog', href: '#' },
          { label: 'Careers', href: '#', badge: 'Hiring' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '#' },
          { label: 'Support', href: '#' },
          { label: 'API', href: '#' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'twitter' as const, href: '#' },
      { platform: 'github' as const, href: '#' },
      { platform: 'linkedin' as const, href: '#' },
    ],
    newsletter: {
      title: 'Subscribe to our newsletter',
      description: 'Get the latest updates and news.',
      onSubmit: (email: string) => alert(`Subscribed: ${email}`),
    },
    bottomLinks: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  };

  const usageCode = `import { Footer, FooterSimple, FooterCentered } from 'archyra';

// Full Footer
<Footer
  logo={{ text: 'YourBrand' }}
  description="Your company description"
  columns={[
    { title: 'Product', links: [{ label: 'Features', href: '#' }] },
    { title: 'Company', links: [{ label: 'About', href: '#' }] },
  ]}
  socialLinks={[
    { platform: 'twitter', href: '#' },
    { platform: 'github', href: '#' },
  ]}
  newsletter={{
    onSubmit: (email) => console.log(email),
  }}
/>

// Simple Footer
<FooterSimple
  logo={{ text: 'YourBrand' }}
  links={[{ label: 'Home', href: '/' }]}
  socialLinks={[{ platform: 'twitter', href: '#' }]}
/>`;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="FooterSection" description="Website footer components with multiple layouts">
      <div className="space-y-8">
        {/* Controls */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-semibold mb-3">Variant</h3>
          <div className="flex gap-2">
            {(['full', 'simple', 'centered'] as const).map((v) => (
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

        {/* Preview */}
        <PreviewControls
          title="Footer Preview"
          subtitle={`Variant: ${variant}`}
          gradientFrom="from-slate-700"
          gradientTo="to-slate-900"
          onColorsChange={setColors}
        >
          <div className="mt-4">
            {variant === 'full' && <Footer {...footerProps} />}
            {variant === 'simple' && (
              <FooterSimple
                logo={footerProps.logo}
                links={footerProps.columns[0].links}
                socialLinks={footerProps.socialLinks}
              />
            )}
            {variant === 'centered' && (
              <FooterCentered
                logo={footerProps.logo}
                description={footerProps.description}
                links={footerProps.columns[0].links}
                socialLinks={footerProps.socialLinks}
              />
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
