'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PreviewControls, { ColorConfig } from '../../components/PreviewControls';
import { ContactForm } from '../../ContactForm';

export default function ContactFormDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [variant, setVariant] = useState<'default' | 'minimal' | 'card'>('default');
  const [colors, setColors] = useState<ColorConfig>({
    primary: '#3b82f6',
    accent: '#60a5fa',
    background: '#ffffff',
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const usageCode = `import { ContactForm, ContactSection } from 'archyra';

// Simple Contact Form
<ContactForm
  onSubmit={(data) => console.log(data)}
  fields={['name', 'email', 'message']}
/>

// Full Contact Section with Info
<ContactSection
  title="Get in Touch"
  subtitle="We'd love to hear from you"
  onSubmit={(data) => console.log(data)}
  contactInfo={{
    email: 'hello@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, Country',
  }}
/>`;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="ContactForm" description="Ready-to-use contact forms with validation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Variant</h3>
            <div className="space-y-2">
              {(['default', 'minimal', 'card'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`w-full px-3 py-2 text-left text-sm rounded-lg capitalize transition-colors ${
                    variant === v ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>- Configurable fields</li>
              <li>- Form validation</li>
              <li>- Loading states</li>
              <li>- Success message</li>
              <li>- Contact info section</li>
              <li>- Dark mode support</li>
              <li>- Custom color themes</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <PreviewControls
            title="Contact Form"
            subtitle={`Variant: ${variant}`}
            gradientFrom="from-blue-500"
            gradientTo="to-cyan-500"
            onColorsChange={setColors}
          >
            <div className="p-2">
              <ContactForm
                variant={variant}
                fields={['name', 'email', 'phone', 'subject', 'message']}
                onSubmit={(data) => {
                  alert(`Form submitted: ${JSON.stringify(data, null, 2)}`);
                  return Promise.resolve();
                }}
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
      </div>
    </DashboardLayout>
  );
}
