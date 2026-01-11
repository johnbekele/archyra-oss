'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import ChatMessage, { ChatConversation, ChatInput } from '../../ChatMessage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

interface Message {
  id: string;
  user: { name: string; isOnline?: boolean };
  message: string;
  variant: 'sender' | 'receiver';
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export default function ChatMessagePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [framework, setFramework] = useState<Framework>('react');
  const [color, setColor] = useState<'blue' | 'green' | 'purple' | 'gray' | 'gradient'>('blue');
  const [showAvatar, setShowAvatar] = useState(true);
  const [showName, setShowName] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: { name: 'Alice', isOnline: true }, message: 'Hey! Have you seen the new animations?', variant: 'receiver', timestamp: '2:30 PM' },
    { id: '2', user: { name: 'You' }, message: 'Yes! They look amazing!', variant: 'sender', timestamp: '2:31 PM', status: 'read' },
    { id: '3', user: { name: 'Alice', isOnline: true }, message: 'I love the chat bubble animations especially', variant: 'receiver', timestamp: '2:32 PM' },
  ]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSend = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      user: { name: 'You' },
      message,
      variant: 'sender',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    setMessages([...messages, newMessage]);
  };

  const reactCode = `import ChatMessage, { ChatConversation, ChatInput } from 'archyra';

<ChatMessage
  user={{ name: 'Alice', isOnline: true }}
  message="Hello there!"
  variant="receiver"
  timestamp="2:30 PM"
  color="${color}"
/>

<ChatConversation messages={messages} />
<ChatInput onSend={(msg) => console.log(msg)} />`;

  const vanillaCode = `<!-- HTML -->
<div class="chat-container">
  <div class="chat-message receiver">
    <div class="avatar">
      <img src="avatar.jpg" alt="Alice" />
      <span class="online-status"></span>
    </div>
    <div class="message-content">
      <span class="user-name">Alice</span>
      <div class="bubble ${color}">
        <p>Hello there!</p>
        <span class="timestamp">2:30 PM</span>
      </div>
    </div>
  </div>

  <div class="chat-message sender">
    <div class="message-content">
      <div class="bubble ${color}">
        <p>Hi! How are you?</p>
        <div class="meta">
          <span class="timestamp">2:31 PM</span>
          <span class="status read">✓✓</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="chat-input">
  <input type="text" placeholder="Type a message..." />
  <button class="send-btn">Send</button>
</div>

<!-- CSS -->
<style>
.chat-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.chat-message {
  display: flex;
  gap: 8px;
  animation: slideIn 0.3s ease-out;
}

.chat-message.sender {
  flex-direction: row-reverse;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.avatar {
  position: relative;
  width: 40px;
  height: 40px;
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.online-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #22c55e;
  border: 2px solid white;
  border-radius: 50%;
}

.message-content {
  max-width: 70%;
}

.user-name {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  display: block;
}

.bubble {
  padding: 12px 16px;
  border-radius: 16px;
  background: #f3f4f6;
}

.bubble.blue { background: #3b82f6; color: white; }
.bubble.green { background: #22c55e; color: white; }
.bubble.purple { background: #a855f7; color: white; }
.bubble.gradient { background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; }

.sender .bubble {
  border-bottom-right-radius: 4px;
}

.receiver .bubble {
  border-bottom-left-radius: 4px;
}

.bubble .meta {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
  margin-top: 4px;
}

.timestamp {
  font-size: 10px;
  opacity: 0.7;
}

.status.read { color: #93c5fd; }

.chat-input {
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
}

.chat-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
}

.send-btn {
  padding: 12px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="ChatMessage" description="Complete chat message component">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Color</h3>
            <div className="flex flex-wrap gap-2">
              {(['blue', 'green', 'purple', 'gray', 'gradient'] as const).map((c) => (
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

          <div className="bg-card rounded-xl border p-5 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold">Show Avatar</span>
              <div className="relative">
                <input type="checkbox" checked={showAvatar} onChange={(e) => setShowAvatar(e.target.checked)} className="sr-only" />
                <div className={`w-11 h-6 rounded-full transition-colors ${showAvatar ? 'bg-pink-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${showAvatar ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`} />
                </div>
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold">Show Name</span>
              <div className="relative">
                <input type="checkbox" checked={showName} onChange={(e) => setShowName(e.target.checked)} className="sr-only" />
                <div className={`w-11 h-6 rounded-full transition-colors ${showName ? 'bg-pink-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${showName ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`} />
                </div>
              </div>
            </label>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Smooth entrance animations</li>
              <li>• Avatar with online status</li>
              <li>• Message status indicators</li>
              <li>• Grouped messages</li>
              <li>• System messages</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-pink-100 text-sm">Interactive chat conversation</p>
            </div>
            <div className="flex flex-col h-[450px]">
              <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
                <ChatMessage user={{ name: 'System' }} message="Chat started" type="system" />
                <ChatConversation
                  messages={messages.map(m => ({ ...m, color, showAvatar, showName }))}
                />
              </div>
              <div className="p-4 border-t bg-card">
                <ChatInput onSend={handleSend} placeholder="Type a message..." />
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
