'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PreviewControls, { ColorConfig } from '../../components/PreviewControls';
import { AnimatedInput, AnimatedTextarea, AnimatedSelect, AnimatedToggle, AnimatedCheckbox, AnimatedRadioGroup, AnimatedTagsInput } from '../../AnimatedForm';

export default function AnimatedFormDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [toggleValue, setToggleValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [tags, setTags] = useState<string[]>(['react', 'nextjs']);
  const [colors, setColors] = useState<ColorConfig>({
    primary: '#10b981',
    accent: '#34d399',
    background: '#ffffff',
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const usageCode = `import { AnimatedInput, AnimatedSelect, AnimatedToggle } from 'archyra';

<AnimatedInput
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  icon={<Mail />}
/>

<AnimatedSelect
  label="Country"
  value={country}
  onChange={setCountry}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
  ]}
/>

<AnimatedToggle
  label="Enable notifications"
  checked={notifications}
  onChange={setNotifications}
/>`;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="AnimatedForm" description="Beautiful animated form components with floating labels">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Components</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>- AnimatedInput</li>
              <li>- AnimatedTextarea</li>
              <li>- AnimatedSelect</li>
              <li>- AnimatedToggle</li>
              <li>- AnimatedCheckbox</li>
              <li>- AnimatedRadioGroup</li>
              <li>- AnimatedTagsInput</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>- Floating label animation</li>
              <li>- Error & success states</li>
              <li>- Password visibility toggle</li>
              <li>- Character counter</li>
              <li>- Multiple variants</li>
              <li>- Icon support</li>
              <li>- Dark mode support</li>
              <li>- Custom color themes</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <PreviewControls
            title="Form Components"
            subtitle="Interactive form component demos"
            gradientFrom="from-emerald-500"
            gradientTo="to-teal-500"
            onColorsChange={setColors}
          >
            <div className="p-2 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <AnimatedInput
                  label="Full Name"
                  value={inputValue}
                  onChange={setInputValue}
                />
                <AnimatedInput
                  label="Email Address"
                  type="email"
                  value={emailValue}
                  onChange={setEmailValue}
                />
              </div>

              <AnimatedTextarea
                label="Message"
                value={textareaValue}
                onChange={setTextareaValue}
                showCount
                maxLength={500}
              />

              <AnimatedSelect
                label="Select Option"
                value={selectValue}
                onChange={setSelectValue}
                options={[
                  { value: 'opt1', label: 'Option 1' },
                  { value: 'opt2', label: 'Option 2' },
                  { value: 'opt3', label: 'Option 3' },
                ]}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <AnimatedToggle
                  label="Enable notifications"
                  checked={toggleValue}
                  onChange={setToggleValue}
                />
                <AnimatedCheckbox
                  label="I agree to the terms"
                  checked={checkboxValue}
                  onChange={setCheckboxValue}
                />
              </div>

              <AnimatedRadioGroup
                name="plan"
                label="Choose a plan"
                options={[
                  { value: 'basic', label: 'Basic', description: 'For individuals' },
                  { value: 'pro', label: 'Pro', description: 'For teams' },
                  { value: 'enterprise', label: 'Enterprise', description: 'For large orgs' },
                ]}
                value={radioValue}
                onChange={setRadioValue}
              />

              <AnimatedTagsInput
                label="Skills"
                value={tags}
                onChange={setTags}
                placeholder="Add a skill..."
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
