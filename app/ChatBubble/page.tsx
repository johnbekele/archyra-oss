'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import ChatBubble, { ChatBubbleWithReactions } from '../../ChatBubble';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function ChatBubblePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [variant, setVariant] = useState<'sender' | 'receiver'>('sender');
  const [color, setColor] = useState<'blue' | 'green' | 'purple' | 'gray' | 'gradient'>('blue');
  const [status, setStatus] = useState<'sending' | 'sent' | 'delivered' | 'read'>('read');
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const reactCode = `import ChatBubble from 'archyra';

<ChatBubble
  message="Hello! How are you?"
  variant="${variant}"
  color="${color}"
  timestamp="2:30 PM"
  status="${status}"
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="chat-bubble-container ${variant}">
  <div class="chat-bubble ${color}">
    <p class="message">Hello! How are you?</p>
    <div class="meta">
      <span class="timestamp">2:30 PM</span>
      ${variant === 'sender' ? `<span class="status ${status}">✓✓</span>` : ''}
    </div>
  </div>
</div>

<!-- CSS -->
<style>
.chat-bubble-container {
  display: flex;
  margin-bottom: 8px;
  animation: bubbleIn 0.3s ease-out;
}

.chat-bubble-container.sender { justify-content: flex-end; }
.chat-bubble-container.receiver { justify-content: flex-start; }

@keyframes bubbleIn {
  from { opacity: 0; transform: scale(0.8) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.chat-bubble {
  max-width: 80%;
  padding: 10px 16px;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.chat-bubble-container.sender .chat-bubble {
  border-bottom-right-radius: 4px;
}

.chat-bubble-container.receiver .chat-bubble {
  border-bottom-left-radius: 4px;
  background: #f3f4f6;
  color: #1f2937;
}

.chat-bubble.blue { background: #3b82f6; color: white; }
.chat-bubble.green { background: #22c55e; color: white; }
.chat-bubble.purple { background: #a855f7; color: white; }
.chat-bubble.gray { background: #6b7280; color: white; }
.chat-bubble.gradient {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  color: white;
}

.chat-bubble .message {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

.chat-bubble .meta {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
  justify-content: flex-end;
}

.chat-bubble .timestamp {
  font-size: 10px;
  opacity: 0.7;
}

.chat-bubble .status { font-size: 12px; opacity: 0.7; }
.chat-bubble .status.read { color: #93c5fd; }
.chat-bubble .status.delivered { color: rgba(255,255,255,0.7); }
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="ChatBubble" description="Animated message bubble">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Variant</h3>
            <div className="flex gap-2">
              {(['sender', 'receiver'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    variant === v
                      ? 'bg-pink-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
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
              {(['blue', 'green', 'purple', 'gray', 'gradient'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    color === c
                      ? 'bg-pink-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Status</h3>
            <div className="flex flex-wrap gap-2">
              {(['sending', 'sent', 'delivered', 'read'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    status === s
                      ? 'bg-pink-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-pink-100 text-sm">Animated chat bubbles</p>
            </div>
            <div className="p-8 space-y-6 bg-muted/30 min-h-[300px]">
              <ChatBubble
                key={`${variant}-${color}-${status}`}
                message="Hey! This is a sample message to show how the chat bubble looks."
                variant={variant}
                color={color}
                timestamp="2:30 PM"
                status={variant === 'sender' ? status : undefined}
              />

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">With Reactions</h4>
                <ChatBubbleWithReactions
                  message="I love this animation library!"
                  variant="receiver"
                  color={color}
                  timestamp="2:31 PM"
                  reactions={[
                    { emoji: '❤️', count: 5 },
                    { emoji: '🔥', count: 3 },
                  ]}
                />
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Conversation</h4>
                <div className="space-y-2">
                  <ChatBubble message="Hi there! 👋" variant="receiver" color={color} delay={0} />
                  <ChatBubble message="Hello! How can I help you today?" variant="sender" color={color} timestamp="2:32 PM" status="read" delay={0.1} />
                  <ChatBubble message="I'm looking for some nice animations!" variant="receiver" color={color} delay={0.2} />
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
