'use client';

import Link from 'next/link';
import { MessageCircle, ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FrameworkCodeBlock } from '@/components/docs/FrameworkCodeBlock';

export default function ChatComponentsPage() {
  const components = [
    {
      name: 'ChatBubble',
      description: 'Animated chat message bubble with smooth entrance animations. Supports sender/receiver variants and message status.',
      href: '/ChatBubble',
      props: [
        { name: 'message', type: 'string', default: '-', description: 'Message content' },
        { name: 'variant', type: "'sender' | 'receiver'", default: "'receiver'", description: 'Bubble alignment' },
        { name: 'status', type: "'sending' | 'sent' | 'delivered' | 'read'", default: '-', description: 'Message status' },
        { name: 'timestamp', type: 'string', default: '-', description: 'Message timestamp' },
        { name: 'color', type: "'blue' | 'green' | 'purple' | 'gray'", default: "'blue'", description: 'Bubble color' },
      ],
      reactCode: `import { ChatBubble } from 'archyra';

<ChatBubble
  message="Hello! How can I help you today?"
  variant="receiver"
  timestamp="10:30 AM"
/>

<ChatBubble
  message="I need help with my project"
  variant="sender"
  status="read"
  timestamp="10:31 AM"
  color="blue"
/>`,
      vanillaCode: `<!-- HTML -->
<div class="chat-container">
  <!-- Sender message -->
  <div class="chat-bubble-container sender">
    <div class="chat-bubble blue">
      <p class="message">Hello! How are you?</p>
      <div class="meta">
        <span class="timestamp">2:30 PM</span>
        <span class="status read">✓✓</span>
      </div>
    </div>
  </div>

  <!-- Receiver message -->
  <div class="chat-bubble-container receiver">
    <div class="chat-bubble">
      <p class="message">I'm doing great, thanks!</p>
      <div class="meta">
        <span class="timestamp">2:31 PM</span>
      </div>
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
  opacity: 0.6;
}

.chat-bubble .status.read { color: #93c5fd; }
</style>`,
    },
    {
      name: 'ChatTyping',
      description: 'Animated typing indicator with bouncing dots. Multiple animation variants for showing typing status.',
      href: '/ChatTyping',
      props: [
        { name: 'variant', type: "'dots' | 'pulse' | 'wave'", default: "'dots'", description: 'Animation style' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Indicator size' },
        { name: 'color', type: 'string', default: "'#6B7280'", description: 'Dot color' },
        { name: 'showAvatar', type: 'boolean', default: 'false', description: 'Show user avatar' },
        { name: 'username', type: 'string', default: '-', description: 'Username to display' },
      ],
      reactCode: `import { ChatTyping } from 'archyra';

// Simple typing indicator
<ChatTyping />

// With avatar and username
<ChatTyping
  showAvatar
  username="AI Assistant"
  variant="dots"
/>

// Different variants
<ChatTyping variant="pulse" />
<ChatTyping variant="wave" size="lg" />`,
      vanillaCode: `<!-- HTML -->
<div class="chat-typing">
  <div class="typing-avatar">A</div>
  <div class="typing-bubble">
    <div class="typing-dots">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
  <span class="typing-text">Alice is typing...</span>
</div>

<!-- CSS -->
<style>
.chat-typing {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.typing-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
}

.typing-bubble {
  background: #f3f4f6;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  padding: 12px 16px;
}

.typing-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.typing-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  animation: bounce 0.6s ease-in-out infinite;
}

.typing-dots .dot:nth-child(2) { animation-delay: 0.15s; }
.typing-dots .dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* Pulse variant */
.typing-dots.pulse .dot {
  animation: pulse 1s ease-in-out infinite;
}
.typing-dots.pulse .dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dots.pulse .dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 1; }
}

.typing-text {
  font-size: 12px;
  color: #9ca3af;
  font-style: italic;
}
</style>`,
    },
    {
      name: 'ChatMessage',
      description: 'Complete chat message component with avatar, name, bubble, and animations. Supports text and image messages.',
      href: '/ChatMessage',
      props: [
        { name: 'message', type: 'string', default: '-', description: 'Message content' },
        { name: 'sender', type: '{ name: string; avatar?: string }', default: '-', description: 'Sender information' },
        { name: 'isOwn', type: 'boolean', default: 'false', description: 'Is message from current user' },
        { name: 'timestamp', type: 'string', default: '-', description: 'Message timestamp' },
        { name: 'type', type: "'text' | 'image' | 'system'", default: "'text'", description: 'Message type' },
      ],
      reactCode: `import { ChatMessage, ChatConversation, ChatInput } from 'archyra';

// Single message
<ChatMessage
  message="Hello! How are you?"
  sender={{ name: "AI Assistant", avatar: "/ai-avatar.png" }}
  timestamp="10:30 AM"
/>

// Full conversation
<ChatConversation>
  <ChatMessage
    message="Hi there!"
    sender={{ name: "User" }}
    isOwn
    timestamp="10:29 AM"
  />
  <ChatMessage
    message="Hello! I'm here to help."
    sender={{ name: "AI", avatar: "/ai.png" }}
    timestamp="10:30 AM"
  />
</ChatConversation>`,
      vanillaCode: `<!-- HTML -->
<div class="chat-conversation">
  <!-- Message with avatar -->
  <div class="chat-message">
    <div class="avatar">
      <img src="/avatar.png" alt="User" />
    </div>
    <div class="message-content">
      <div class="message-header">
        <span class="username">AI Assistant</span>
        <span class="timestamp">10:30 AM</span>
      </div>
      <div class="message-bubble">
        Hello! How can I help you today?
      </div>
    </div>
  </div>

  <!-- Own message -->
  <div class="chat-message own">
    <div class="message-content">
      <div class="message-header">
        <span class="timestamp">10:31 AM</span>
      </div>
      <div class="message-bubble">
        I need help with my project
      </div>
    </div>
  </div>
</div>

<!-- CSS -->
<style>
.chat-conversation {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.chat-message {
  display: flex;
  gap: 12px;
  animation: messageIn 0.3s ease-out;
}

.chat-message.own {
  flex-direction: row-reverse;
}

@keyframes messageIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.chat-message .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e5e7eb;
  overflow: hidden;
  flex-shrink: 0;
}

.chat-message .avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  max-width: 70%;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.chat-message.own .message-header {
  justify-content: flex-end;
}

.username {
  font-weight: 600;
  font-size: 14px;
  color: #374151;
}

.timestamp {
  font-size: 12px;
  color: #9ca3af;
}

.message-bubble {
  background: #f3f4f6;
  padding: 12px 16px;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
}

.chat-message.own .message-bubble {
  background: #3b82f6;
  color: white;
  border-radius: 16px;
  border-bottom-right-radius: 4px;
}
</style>`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-pink-500/10 text-pink-600">Chat</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Chat Components
        </h1>
        <p className="text-xl text-muted-foreground">
          Production-ready chat UI components for AI assistants, messaging interfaces, and conversational applications.
        </p>
      </div>

      {/* Components */}
      <div className="space-y-16">
        {components.map((component, index) => (
          <div key={component.name} className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{component.name}</h2>
                <p className="text-muted-foreground mt-1">{component.description}</p>
              </div>
              <Link href={component.href}>
                <Button variant="outline" size="sm" className="gap-2">
                  Live Demo
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </Link>
            </div>

            <Tabs defaultValue="usage" className="w-full">
              <TabsList>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="props">Props</TabsTrigger>
              </TabsList>
              <TabsContent value="usage" className="mt-4">
                <FrameworkCodeBlock
                  reactCode={component.reactCode}
                  vanillaCode={component.vanillaCode}
                  id={`${component.name}-usage`}
                />
              </TabsContent>
              <TabsContent value="props" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prop</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {component.props.map((prop) => (
                        <TableRow key={prop.name}>
                          <TableCell className="font-mono text-sm">{prop.name}</TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">{prop.type}</TableCell>
                          <TableCell className="font-mono text-sm">{prop.default}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{prop.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
            </Tabs>

            {index < components.length - 1 && <hr className="border-border" />}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="border-t mt-12 pt-8">
        <div className="flex justify-between">
          <Link href="/docs/components/auth">
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Auth Components
            </Button>
          </Link>
          <Link href="/docs/components/ecommerce">
            <Button variant="outline" className="gap-2">
              E-Commerce Components
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
