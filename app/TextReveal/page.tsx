'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function TextRevealPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { TextReveal, TextRevealGradient, TextRevealLine } from 'archyra';

// Basic scroll-based text reveal
<TextReveal
  text="Build beautiful interfaces with animated components"
  revealBy="word"
  scrollHeight={3}
  className="text-4xl font-bold"
/>

// With gradient effect
<TextRevealGradient
  text="Welcome to the future of web design"
  gradientColors={['#6366f1', '#a855f7', '#ec4899']}
  className="text-5xl font-bold"
/>

// Line by line reveal
<TextRevealLine
  lines={[
    "First line appears",
    "Then the second line",
    "And finally the third"
  ]}
  scrollHeightPerLine={0.5}
  lineClassName="text-2xl"
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="text-reveal-container">
  <div class="text-reveal-sticky">
    <p class="reveal-text">
      <span class="reveal-word">Build</span>
      <span class="reveal-word">beautiful</span>
      <span class="reveal-word">interfaces</span>
      <span class="reveal-word">with</span>
      <span class="reveal-word">animated</span>
      <span class="reveal-word">components</span>
    </p>
  </div>
</div>

<!-- CSS -->
<style>
.text-reveal-container {
  height: 300vh; /* Scroll distance */
}

.text-reveal-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reveal-text {
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25em;
}

.reveal-word {
  opacity: 0.15;
  filter: blur(4px);
  transition: all 0.3s;
}

.reveal-word.revealed {
  opacity: 1;
  filter: blur(0);
}
</style>

<!-- JavaScript -->
<script>
const container = document.querySelector('.text-reveal-container');
const words = document.querySelectorAll('.reveal-word');

function updateReveal() {
  const rect = container.getBoundingClientRect();
  const scrollProgress = -rect.top / (rect.height - window.innerHeight);

  words.forEach((word, i) => {
    const start = i / words.length;
    const end = start + 0.3;
    const progress = (scrollProgress - start) / (end - start);

    if (progress >= 1) {
      word.classList.add('revealed');
    } else {
      word.classList.remove('revealed');
    }
  });
}

window.addEventListener('scroll', updateReveal);
updateReveal();
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="TextReveal" description="Scroll-based text reveal animation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">About TextReveal</h3>
            <p className="text-sm text-muted-foreground mb-4">
              TextReveal creates stunning scroll-based text animations. As users scroll,
              words or characters progressively fade in and become sharp.
            </p>
            <p className="text-sm text-muted-foreground">
              Perfect for hero sections, storytelling pages, and landing pages
              where you want to create an immersive reading experience.
            </p>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>- Reveal by word or character</li>
              <li>- Configurable scroll distance</li>
              <li>- Blur and opacity animations</li>
              <li>- Gradient text variants</li>
              <li>- Line-by-line reveal option</li>
              <li>- Reduced motion support</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Props</h3>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <code className="text-xs bg-muted px-1 rounded">text</code>
                <span className="text-muted-foreground">string</span>
              </div>
              <div className="flex justify-between">
                <code className="text-xs bg-muted px-1 rounded">revealBy</code>
                <span className="text-muted-foreground">&quot;word&quot; | &quot;character&quot;</span>
              </div>
              <div className="flex justify-between">
                <code className="text-xs bg-muted px-1 rounded">scrollHeight</code>
                <span className="text-muted-foreground">number (vh multiplier)</span>
              </div>
              <div className="flex justify-between">
                <code className="text-xs bg-muted px-1 rounded">blurAmount</code>
                <span className="text-muted-foreground">number (px)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Scroll-Based Animation</h2>
              <p className="text-rose-100 text-sm">This component requires scroll interaction</p>
            </div>
            <div className="p-6 bg-muted/30">
              <div className="bg-zinc-950 rounded-lg p-8 text-center">
                <p className="text-2xl font-bold text-white mb-4">
                  TextReveal requires scrolling to work
                </p>
                <p className="text-zinc-400 text-sm mb-6">
                  The component uses scroll position to animate text. View the full-page demo
                  or add it to a page with sufficient scroll height.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300">
                  <span>Scroll to reveal text progressively</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Static Preview</h2>
              <p className="text-violet-100 text-sm">How the text looks at different reveal stages</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">0% scrolled (blurred)</p>
                <p className="text-2xl font-bold text-foreground/15 blur-[2px]">
                  Build beautiful interfaces
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">50% scrolled (partial)</p>
                <p className="text-2xl font-bold">
                  <span className="text-foreground">Build beautiful</span>
                  <span className="text-foreground/30 blur-[1px]"> interfaces</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">100% scrolled (revealed)</p>
                <p className="text-2xl font-bold text-foreground">
                  Build beautiful interfaces
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Gradient Variant</h2>
              <p className="text-emerald-100 text-sm">Text reveals with gradient colors</p>
            </div>
            <div className="p-6 bg-zinc-950 text-center">
              <p
                className="text-3xl font-bold"
                style={{
                  backgroundImage: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Welcome to the future
              </p>
              <p className="text-zinc-500 text-sm mt-4">
                TextRevealGradient adds colorful gradient to revealed text
              </p>
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
