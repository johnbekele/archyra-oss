'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Terminal, Package, Sparkles, Zap, ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { components } from '@/lib/component-registry';

export default function GettingStartedPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const quickStartCode = `import { LoadingDots, AiCreating, PulseCircle } from 'archyra';

function App() {
  return (
    <div>
      {/* Simple loading indicator */}
      <LoadingDots />

      {/* AI creation animation */}
      <AiCreating isCreating={true} />

      {/* Progress indicator */}
      <PulseCircle isActive={true} />
    </div>
  );
}`;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <Badge className="mb-4 bg-violet-500/10 text-violet-600">
          Getting Started
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Introduction
        </h1>
        <p className="text-xl text-muted-foreground">
          The complete toolkit for AI coding assistants. {components.length}+ UI components with direct MCP server access, IaC templates, and deployment architecture patterns.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card>
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-2">
              <Terminal className="w-5 h-5 text-violet-600" />
            </div>
            <CardTitle className="text-lg">MCP Server</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Direct integration with Claude, Cursor, and Windsurf for AI-assisted development.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg">{components.length}+ Components</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Production-ready React components with animations and TypeScript support.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
            <CardTitle className="text-lg">IaC Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Infrastructure as Code templates for AWS, GCP, and Azure deployments.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Battle-tested deployment patterns and scalable architecture blueprints.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Quick Start</h2>
        <p className="text-muted-foreground mb-6">
          Get up and running with Archyra in minutes. Install the package or connect via MCP server.
        </p>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <h3 className="font-semibold">Install the package</h3>
            </div>
            <Tabs defaultValue="npm" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="yarn">yarn</TabsTrigger>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              </TabsList>
              <TabsContent value="npm" className="mt-3">
                <div className="relative">
                  <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto">
                    <code>npm install archyra framer-motion</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-100"
                    onClick={() => copyToClipboard('npm install archyra framer-motion', 'npm')}
                  >
                    {copied === 'npm' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="yarn" className="mt-3">
                <div className="relative">
                  <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto">
                    <code>yarn add archyra framer-motion</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-100"
                    onClick={() => copyToClipboard('yarn add archyra framer-motion', 'yarn')}
                  >
                    {copied === 'yarn' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="pnpm" className="mt-3">
                <div className="relative">
                  <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto">
                    <code>pnpm add archyra framer-motion</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-100"
                    onClick={() => copyToClipboard('pnpm add archyra framer-motion', 'pnpm')}
                  >
                    {copied === 'pnpm' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <h3 className="font-semibold">Import and use components</h3>
            </div>
            <div className="relative">
              <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{quickStartCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-100"
                onClick={() => copyToClipboard(quickStartCode, 'quickstart')}
              >
                {copied === 'quickstart' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Component Categories</h2>
        <p className="text-muted-foreground mb-6">
          Browse components by category to find the perfect animation for your use case.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/docs/components/loading">
            <Card className="group cursor-pointer hover:border-yellow-500/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-yellow-500 transition-colors" />
                </div>
                <CardTitle className="text-lg mt-2">Loading</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  LoadingDots, Skeleton, Shimmer - Perfect for content loading states.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/docs/components/processing">
            <Card className="group cursor-pointer hover:border-blue-500/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </div>
                <CardTitle className="text-lg mt-2">Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  PulseCircle, DataProcessing, ProgressBar - For background tasks.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/docs/components/creative">
            <Card className="group cursor-pointer hover:border-purple-500/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-500 transition-colors" />
                </div>
                <CardTitle className="text-lg mt-2">Creative</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AiCreating, CodeTyping - AI-themed creative animations.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/docs/components/chat">
            <Card className="group cursor-pointer hover:border-pink-500/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-pink-500 transition-colors" />
                </div>
                <CardTitle className="text-lg mt-2">Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  ChatBubble, ChatTyping, ChatMessage - Chat UI animations.
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/docs/installation">
            <Card className="group cursor-pointer hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Installation Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Detailed setup instructions and configuration options.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/components">
            <Card className="group cursor-pointer hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Component Gallery</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse and preview all available components.
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
