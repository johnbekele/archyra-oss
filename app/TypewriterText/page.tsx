'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import TypewriterText, { TypewriterTextGradient, TypewriterTextMultiline } from '../../TypewriterText';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function TypewriterTextPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [deletingSpeed, setDeletingSpeed] = useState(50);
  const [showCursor, setShowCursor] = useState(true);
  const [loop, setLoop] = useState(true);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const words = ['Build amazing UIs', 'Create stunning animations', 'Ship faster'];

  const reactCode = `import { TypewriterText, TypewriterTextGradient } from 'archyra';

// Basic typewriter
<TypewriterText
  words={['Build amazing UIs', 'Create stunning animations', 'Ship faster']}
  typingSpeed={${typingSpeed}}
  deletingSpeed={${deletingSpeed}}
  showCursor={${showCursor}}
  loop={${loop}}
  className="text-4xl font-bold"
/>

// With gradient text
<TypewriterTextGradient
  words={['Hello', 'World']}
  gradientColors={['#6366f1', '#a855f7', '#ec4899']}
  className="text-4xl font-bold"
/>`;

  const vanillaCode = `<!-- HTML -->
<span id="typewriter" class="typewriter-text"></span>
<span class="cursor">|</span>

<!-- CSS -->
<style>
.typewriter-text {
  font-size: 2.5rem;
  font-weight: bold;
}

.cursor {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
</style>

<!-- JavaScript -->
<script>
const words = ['Build amazing UIs', 'Create stunning animations', 'Ship faster'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = words[wordIndex];
  const display = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  document.getElementById('typewriter').textContent = display;

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(type, isDeleting ? ${deletingSpeed} : ${typingSpeed});
}
type();
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="TypewriterText" description="Animated typewriter text effect">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Typing Speed: {typingSpeed}ms</h3>
            <input
              type="range"
              min="30"
              max="200"
              value={typingSpeed}
              onChange={(e) => setTypingSpeed(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Fast</span>
              <span>Slow</span>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Deleting Speed: {deletingSpeed}ms</h3>
            <input
              type="range"
              min="20"
              max="100"
              value={deletingSpeed}
              onChange={(e) => setDeletingSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCursor}
                  onChange={(e) => setShowCursor(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Show cursor</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={loop}
                  onChange={(e) => setLoop(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Loop animation</span>
              </label>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Basic Typewriter</h2>
              <p className="text-rose-100 text-sm">Classic typewriter effect with cursor</p>
            </div>
            <div className="p-8 min-h-[200px] flex items-center justify-center bg-muted/30">
              <TypewriterText
                key={`${typingSpeed}-${deletingSpeed}-${showCursor}-${loop}`}
                words={words}
                typingSpeed={typingSpeed}
                deletingSpeed={deletingSpeed}
                showCursor={showCursor}
                loop={loop}
                className="text-3xl md:text-4xl font-bold text-foreground"
              />
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Gradient Typewriter</h2>
              <p className="text-violet-100 text-sm">With animated gradient text</p>
            </div>
            <div className="p-8 min-h-[200px] flex items-center justify-center bg-zinc-950">
              <TypewriterTextGradient
                words={['Welcome to Archyra', 'Beautiful Animations', 'Ship Faster']}
                typingSpeed={80}
                deletingSpeed={40}
                gradientColors={['#6366f1', '#a855f7', '#ec4899']}
                className="text-3xl md:text-4xl font-bold"
              />
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Multiline Typewriter</h2>
              <p className="text-emerald-100 text-sm">Reveal multiple lines sequentially</p>
            </div>
            <div className="p-8 min-h-[200px] flex items-center justify-center bg-muted/30">
              <TypewriterTextMultiline
                lines={[
                  'const archyra = require("archyra");',
                  'const { TypewriterText } = archyra;',
                  '// Build something amazing!'
                ]}
                typingSpeed={30}
                lineDelay={500}
                className="font-mono text-sm md:text-base"
                lineClassName="text-emerald-600 dark:text-emerald-400"
              />
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
