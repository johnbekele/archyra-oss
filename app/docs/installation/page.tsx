'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Terminal, AlertCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function InstallationPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ code, id }: { code: string; id: string }) => (
    <div className="relative">
      <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-zinc-100"
        onClick={() => copyToClipboard(code, id)}
      >
        {copied === id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );

  const tailwindConfig = `// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/archyra/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
}`;

  const nextConfig = `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['archyra'],
}

module.exports = nextConfig`;

  const mcpClaudeConfig = `{
  "mcpServers": {
    "archyra": {
      "command": "npx",
      "args": ["-y", "archyra@latest", "serve"]
    }
  }
}`;

  const mcpCursorConfig = `{
  "mcpServers": {
    "archyra": {
      "command": "npx",
      "args": ["-y", "archyra@latest", "serve"]
    }
  }
}`;

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <Badge className="mb-4 bg-violet-500/10 text-violet-600">
          Installation
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Installation
        </h1>
        <p className="text-xl text-muted-foreground">
          Get started with Archyra in minutes. Install the package directly or connect your AI coding assistant via MCP server.
        </p>
      </div>

      {/* Requirements */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Requirements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="font-medium">React 17.0.0+</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Works with React 17, 18, and 19
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="font-medium">Framer Motion 11+</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Required peer dependency for animations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Basic Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Basic Installation</h2>
        <p className="text-muted-foreground mb-6">
          Install the package and its peer dependencies using your preferred package manager.
        </p>

        <Tabs defaultValue="npm" className="w-full">
          <TabsList>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            <TabsTrigger value="bun">bun</TabsTrigger>
          </TabsList>
          <TabsContent value="npm" className="mt-4">
            <CodeBlock code="npm install archyra framer-motion" id="npm-install" />
          </TabsContent>
          <TabsContent value="yarn" className="mt-4">
            <CodeBlock code="yarn add archyra framer-motion" id="yarn-install" />
          </TabsContent>
          <TabsContent value="pnpm" className="mt-4">
            <CodeBlock code="pnpm add archyra framer-motion" id="pnpm-install" />
          </TabsContent>
          <TabsContent value="bun" className="mt-4">
            <CodeBlock code="bun add archyra framer-motion" id="bun-install" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Tailwind Configuration */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Tailwind CSS Configuration</h2>
        <p className="text-muted-foreground mb-6">
          If you're using Tailwind CSS, add the package to your content configuration to ensure styles are included.
        </p>
        <CodeBlock code={tailwindConfig} id="tailwind-config" />
      </div>

      {/* Next.js Configuration */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Next.js Configuration</h2>
        <p className="text-muted-foreground mb-6">
          For Next.js projects, you may need to add the package to transpilePackages.
        </p>
        <CodeBlock code={nextConfig} id="next-config" />

        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            This is only required if you encounter module resolution issues. Most Next.js 14+ projects work without this configuration.
          </AlertDescription>
        </Alert>
      </div>

      {/* MCP Server Setup */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">MCP Server Setup</h2>
        <p className="text-muted-foreground mb-6">
          Archyra includes a built-in MCP (Model Context Protocol) server for AI coding assistants like Claude, Cursor, and Windsurf.
        </p>

        <Tabs defaultValue="claude" className="w-full">
          <TabsList>
            <TabsTrigger value="claude">Claude Desktop</TabsTrigger>
            <TabsTrigger value="cursor">Cursor</TabsTrigger>
            <TabsTrigger value="windsurf">Windsurf</TabsTrigger>
          </TabsList>
          <TabsContent value="claude" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Add to your Claude Desktop configuration file at <code className="bg-muted px-1 py-0.5 rounded">~/.config/claude/claude_desktop_config.json</code>:
            </p>
            <CodeBlock code={mcpClaudeConfig} id="mcp-claude" />
          </TabsContent>
          <TabsContent value="cursor" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Add to your Cursor MCP configuration file at <code className="bg-muted px-1 py-0.5 rounded">~/.cursor/mcp.json</code>:
            </p>
            <CodeBlock code={mcpCursorConfig} id="mcp-cursor" />
          </TabsContent>
          <TabsContent value="windsurf" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Add to your Windsurf MCP configuration:
            </p>
            <CodeBlock code={mcpCursorConfig} id="mcp-windsurf" />
          </TabsContent>
        </Tabs>

        <Card className="mt-6 border-violet-500/50 bg-violet-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-violet-500 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">MCP Tools Available</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Once configured, your AI assistant will have access to:
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">list_components</code> - Browse all available components</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">get_component</code> - Get full component source code</li>
                  <li>• <code className="bg-muted px-1 py-0.5 rounded">search_components</code> - Search by name or category</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verify Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Verify Installation</h2>
        <p className="text-muted-foreground mb-6">
          Test that everything is working by importing a component:
        </p>
        <CodeBlock
          code={`import { LoadingDots } from 'archyra';

export default function TestComponent() {
  return <LoadingDots />;
}`}
          id="verify-install"
        />
      </div>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/docs/components/loading">
            <Card className="group cursor-pointer hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Browse Components</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore all available animation components.
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
                    <h3 className="font-semibold mb-1">Live Gallery</h3>
                    <p className="text-sm text-muted-foreground">
                      Preview components with interactive demos.
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
