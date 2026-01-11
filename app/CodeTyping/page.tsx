'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, Play, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import CodeTyping from '../../CodeTyping';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function CodeTypingPage() {
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import { CodeTyping } from 'archyra';

<CodeTyping
  isTyping={isTyping}
  onComplete={() => setIsTyping(false)}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="code-typing">
  <div class="terminal-header">
    <div class="terminal-dots">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
  </div>
  <div class="code-content">
    <div class="code-line">
      <span class="line-number">1</span>
      <span class="code-text"></span>
      <span class="cursor"></span>
    </div>
  </div>
</div>

<!-- CSS -->
<style>
.code-typing {
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Monaco', monospace;
}

.terminal-header {
  background: #323232;
  padding: 8px 12px;
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.code-content {
  padding: 16px;
}

.code-line {
  display: flex;
  align-items: center;
}

.line-number {
  color: #6b7280;
  margin-right: 16px;
  font-size: 14px;
}

.code-text {
  color: #e5e7eb;
  font-size: 14px;
}

.cursor {
  width: 8px;
  height: 18px;
  background: #f59e0b;
  margin-left: 2px;
  animation: blink 0.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Syntax highlighting */
.keyword { color: #c678dd; }
.variable { color: #e06c75; }
.function { color: #61afef; }
.string { color: #98c379; }
</style>

<!-- JavaScript -->
<script>
class CodeTyping {
  constructor(element) {
    this.element = element;
    this.codeText = element.querySelector('.code-text');
    this.cursor = element.querySelector('.cursor');
    this.code = 'const response = await ai.generate(prompt);';
    this.index = 0;
  }

  start(onComplete) {
    this.index = 0;
    this.codeText.innerHTML = '';
    this.type(onComplete);
  }

  type(onComplete) {
    if (this.index >= this.code.length) {
      this.cursor.style.display = 'none';
      onComplete?.();
      return;
    }

    this.codeText.textContent += this.code[this.index];
    this.index++;
    setTimeout(() => this.type(onComplete), 50 + Math.random() * 50);
  }
}

// Usage:
const typing = new CodeTyping(document.querySelector('.code-typing'));
typing.start(() => console.log('Complete!'));
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="CodeTyping" description="Code typing animation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Controls</h3>
            <button
              onClick={() => setIsTyping(!isTyping)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                isTyping ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Play className="w-4 h-4" />
              {isTyping ? 'Stop Typing' : 'Start Typing'}
            </button>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-muted-foreground">
              A typewriter-style animation that simulates AI code generation. Features a terminal-style window with syntax display and progress bar.
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-green-100 text-sm">Code typing animation with terminal styling</p>
            </div>
            <div className="flex items-center justify-center p-8 bg-zinc-900" style={{ minHeight: '300px' }}>
              <CodeTyping isTyping={isTyping} onComplete={() => setIsTyping(false)} />
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
