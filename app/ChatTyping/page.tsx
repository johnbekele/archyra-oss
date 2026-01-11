'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import ChatTyping, { ChatTypingWithText, ChatMultipleTyping } from '../../ChatTyping';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function ChatTypingPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');
  const [variant, setVariant] = useState<'dots' | 'pulse' | 'wave'>('dots');
  const [color, setColor] = useState<'gray' | 'blue' | 'green' | 'purple'>('gray');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showAvatar, setShowAvatar] = useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import ChatTyping from 'archyra';

<ChatTyping
  isTyping={true}
  variant="${variant}"
  color="${color}"
  size="${size}"
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="chat-typing ${variant} ${color} ${size}">
  <div class="typing-container">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>

<!-- CSS -->
<style>
.chat-typing {
  display: inline-flex;
  align-items: center;
  padding: 12px 16px;
  background: #f3f4f6;
  border-radius: 20px;
}

.typing-container {
  display: flex;
  gap: 4px;
}

.chat-typing .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
}

/* Colors */
.chat-typing.blue .dot { background: #3b82f6; }
.chat-typing.green .dot { background: #22c55e; }
.chat-typing.purple .dot { background: #a855f7; }

/* Sizes */
.chat-typing.sm .dot { width: 6px; height: 6px; }
.chat-typing.lg .dot { width: 10px; height: 10px; }

/* Dots variant */
.chat-typing.dots .dot {
  animation: dotBounce 1.4s ease-in-out infinite;
}
.chat-typing.dots .dot:nth-child(2) { animation-delay: 0.2s; }
.chat-typing.dots .dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

/* Pulse variant */
.chat-typing.pulse .dot {
  animation: dotPulse 1.4s ease-in-out infinite;
}
.chat-typing.pulse .dot:nth-child(2) { animation-delay: 0.2s; }
.chat-typing.pulse .dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}

/* Wave variant */
.chat-typing.wave .dot {
  animation: dotWave 1s ease-in-out infinite;
}
.chat-typing.wave .dot:nth-child(2) { animation-delay: 0.1s; }
.chat-typing.wave .dot:nth-child(3) { animation-delay: 0.2s; }

@keyframes dotWave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion';

  const sampleUsers = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
  ];

  return (
    <DashboardLayout title="ChatTyping" description="Typing indicator animation">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Variant</h3>
            <div className="flex gap-2">
              {(['dots', 'pulse', 'wave'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    variant === v ? 'bg-pink-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Color</h3>
            <div className="flex flex-wrap gap-2">
              {(['gray', 'blue', 'green', 'purple'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    color === c ? 'bg-pink-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Size</h3>
            <div className="flex gap-2">
              {(['sm', 'md', 'lg'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    size === s ? 'bg-pink-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold">Show Avatar</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showAvatar}
                  onChange={(e) => setShowAvatar(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${showAvatar ? 'bg-pink-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${showAvatar ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`} />
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-pink-100 text-sm">Animated typing indicators</p>
            </div>
            <div className="p-8 space-y-8 bg-muted/30 min-h-[300px]">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Basic Indicator</h4>
                <ChatTyping
                  key={`${variant}-${color}-${size}-${showAvatar}`}
                  variant={variant}
                  color={color}
                  size={size}
                  showAvatar={showAvatar}
                  userName="John"
                />
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">With Text Label</h4>
                <ChatTypingWithText variant={variant} color={color} size={size} text="Someone is typing..." />
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Multiple Users</h4>
                <ChatMultipleTyping users={sampleUsers} variant={variant} color={color} />
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">All Variants</h4>
                <div className="flex gap-6">
                  <div className="text-center">
                    <ChatTyping variant="dots" color={color} size="md" />
                    <p className="text-xs text-muted-foreground mt-2">Dots</p>
                  </div>
                  <div className="text-center">
                    <ChatTyping variant="pulse" color={color} size="md" />
                    <p className="text-xs text-muted-foreground mt-2">Pulse</p>
                  </div>
                  <div className="text-center">
                    <ChatTyping variant="wave" color={color} size="md" />
                    <p className="text-xs text-muted-foreground mt-2">Wave</p>
                  </div>
                </div>
              </div>
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
