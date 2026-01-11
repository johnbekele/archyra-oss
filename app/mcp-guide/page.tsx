'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Copy, Check, Terminal, BookOpen, Zap, Code2, Home,
  Package, Cpu, Blocks, ChevronRight, ExternalLink, Sparkles,
  FileCode, Settings, CheckCircle2, AlertCircle, Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function DocumentationPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ code, id, language = 'bash' }: { code: string; id: string; language?: string }) => (
    <div className="relative group">
      <pre className="bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto text-sm font-mono">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 h-8 text-zinc-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => copyToClipboard(code, id)}
      >
        {copied === id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  );

  const components = [
    {
      name: 'AiCreating',
      description: 'Multi-stage AI creation animation with thinking, writing, and building phases',
      props: [
        { name: 'isLoading', type: 'boolean', required: true, description: 'Controls animation state' },
        { name: 'onComplete', type: '() => void', required: false, description: 'Callback when animation completes' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'full'", required: false, description: 'Component size preset' },
      ],
      usage: `import { AiCreating } from 'archyra';

function MyComponent() {
  const [loading, setLoading] = useState(true);

  return (
    <AiCreating
      isLoading={loading}
      size="md"
      onComplete={() => console.log('Done!')}
    />
  );
}`,
    },
    {
      name: 'AiCreating2',
      description: 'Full-screen brain animation with rotating rings and floating particles',
      props: [
        { name: 'isLoading', type: 'boolean', required: true, description: 'Controls animation state' },
        { name: 'message', type: 'string', required: false, description: 'Primary message text' },
        { name: 'subMessage', type: 'string', required: false, description: 'Secondary message text' },
        { name: 'primaryColor', type: 'string', required: false, description: 'Primary accent color (hex)' },
        { name: 'backgroundColor', type: 'string', required: false, description: 'Background color (hex)' },
        { name: 'textColor', type: 'string', required: false, description: 'Text color (hex)' },
        { name: 'contained', type: 'boolean', required: false, description: 'Contained mode vs full-screen' },
        { name: 'statusMessages', type: 'Array<{icon, text}>', required: false, description: 'Custom status messages' },
      ],
      usage: `import { AiCreating2 } from 'archyra';

function MyComponent() {
  return (
    <AiCreating2
      isLoading={true}
      message="Processing your request"
      subMessage="This may take a moment"
      primaryColor="#8B5CF6"
      contained={true}
    />
  );
}`,
    },
    {
      name: 'LoadingDots',
      description: 'Simple bouncing dots animation for minimal loading states',
      props: [
        { name: 'color', type: 'string', required: false, description: 'Dot color' },
        { name: 'size', type: 'number', required: false, description: 'Dot size in pixels' },
      ],
      usage: `import { LoadingDots } from 'archyra';

function MyComponent() {
  return <LoadingDots color="#8B5CF6" size={8} />;
}`,
    },
    {
      name: 'PulseCircle',
      description: 'Circular progress with expanding pulse rings',
      props: [
        { name: 'progress', type: 'number', required: false, description: 'Progress percentage (0-100)' },
        { name: 'size', type: 'number', required: false, description: 'Circle size in pixels' },
        { name: 'color', type: 'string', required: false, description: 'Primary color' },
      ],
      usage: `import { PulseCircle } from 'archyra';

function MyComponent() {
  return <PulseCircle progress={75} size={120} />;
}`,
    },
    {
      name: 'CodeTyping',
      description: 'Realistic code typing effect with syntax highlighting',
      props: [
        { name: 'code', type: 'string', required: true, description: 'Code to type' },
        { name: 'language', type: 'string', required: false, description: 'Programming language' },
        { name: 'speed', type: 'number', required: false, description: 'Typing speed (ms per char)' },
      ],
      usage: `import { CodeTyping } from 'archyra';

function MyComponent() {
  return (
    <CodeTyping
      code="const greeting = 'Hello, World!';"
      language="javascript"
      speed={50}
    />
  );
}`,
    },
    {
      name: 'DataProcessing',
      description: 'Data pipeline visualization with flowing cards',
      props: [
        { name: 'stages', type: 'string[]', required: false, description: 'Pipeline stage names' },
        { name: 'currentStage', type: 'number', required: false, description: 'Active stage index' },
      ],
      usage: `import { DataProcessing } from 'archyra';

function MyComponent() {
  return (
    <DataProcessing
      stages={['Input', 'Process', 'Output']}
      currentStage={1}
    />
  );
}`,
    },
    {
      name: 'FloatingLogin',
      description: 'Animated floating login form with OAuth support',
      props: [
        { name: 'onSubmit', type: '(data) => void', required: true, description: 'Form submission handler' },
        { name: 'onOAuthClick', type: '(provider) => void', required: false, description: 'OAuth button handler' },
        { name: 'providers', type: 'string[]', required: false, description: 'OAuth providers to show' },
      ],
      usage: `import { FloatingLogin } from 'archyra';

function MyComponent() {
  return (
    <FloatingLogin
      onSubmit={(data) => console.log(data)}
      onOAuthClick={(provider) => console.log(provider)}
      providers={['google', 'github']}
    />
  );
}`,
    },
  ];

  const mcpTools = [
    {
      name: 'list_components',
      description: 'List all available animation components with filtering options',
      params: [
        { name: 'category', type: 'string', required: false, description: 'Filter by: all, loading, processing, creative, auth' },
      ],
      example: '"List all animation components"',
    },
    {
      name: 'get_component',
      description: 'Get detailed information about a specific component including full source code',
      params: [
        { name: 'name', type: 'string', required: true, description: 'Component name (e.g., "LoadingDots")' },
      ],
      example: '"Show me details about PulseCircle"',
    },
    {
      name: 'add_component',
      description: 'Get the source code and setup instructions to add a component to your project',
      params: [
        { name: 'name', type: 'string', required: true, description: 'Component name to add' },
        { name: 'directory', type: 'string', required: false, description: 'Target directory (default: components)' },
      ],
      example: '"Add LoadingDots to my components folder"',
    },
    {
      name: 'get_install_command',
      description: 'Get the npm install command for a component\'s dependencies',
      params: [
        { name: 'name', type: 'string', required: true, description: 'Component name' },
      ],
      example: '"What dependencies does FloatingLogin need?"',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Gallery
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Documentation</h1>
                  <p className="text-xs text-muted-foreground">Archyra</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden sm:flex">v2.0.0</Badge>
              <a href="https://www.npmjs.com/package/archyra" target="_blank" rel="noopener">
                <Button variant="outline" size="sm" className="gap-2">
                  <Package className="w-4 h-4" />
                  npm
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border p-8 lg:p-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <Badge className="mb-4 bg-violet-500/10 text-violet-600">
                <Sparkles className="w-3 h-3 mr-1" />
                Production Ready
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Archyra
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mb-6">
                Beautiful, production-ready animation components for AI interfaces.
                Use directly in React or integrate with Claude via MCP.
              </p>
              <div className="flex flex-wrap gap-4">
                <CodeBlock
                  code="npm install archyra"
                  id="hero-install"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-2 hover:border-violet-500/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-violet-500 flex items-center justify-center mb-3">
                <Blocks className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">React Components</CardTitle>
              <CardDescription>
                Import and use components directly in your React/Next.js projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`import { AiCreating } from 'archyra';
import 'archyra/styles.css';

<AiCreating isLoading={true} />`}
                id="quick-react"
                language="tsx"
              />
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-500/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center mb-3">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">MCP Integration</CardTitle>
              <CardDescription>
                One command setup for Claude, Cursor, or Windsurf
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <CodeBlock
                code="npx archyra init"
                id="quick-mcp"
                language="bash"
              />
              <p className="text-xs text-muted-foreground">
                Supports: Claude Code, Cursor, Windsurf
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="react" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="react" className="gap-2">
              <Code2 className="w-4 h-4" />
              React Usage
            </TabsTrigger>
            <TabsTrigger value="mcp" className="gap-2">
              <Terminal className="w-4 h-4" />
              MCP Setup
            </TabsTrigger>
          </TabsList>

          {/* React Usage Tab */}
          <TabsContent value="react" className="space-y-8">
            {/* Installation */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                Installation
              </h2>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                      Install the package
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code="npm install archyra" id="install-1" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                      Install peer dependencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code="npm install framer-motion lucide-react" id="install-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">3</span>
                      Import styles (required)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`// In your app's entry point (e.g., _app.tsx, layout.tsx)
import 'archyra/styles.css';`}
                      id="install-3"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Components Reference */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Blocks className="w-4 h-4 text-white" />
                </div>
                Components Reference
              </h2>

              <div className="space-y-6">
                {components.map((comp) => (
                  <Card key={comp.name} id={comp.name.toLowerCase()}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-mono text-violet-600">{comp.name}</CardTitle>
                        <Link href={`/${comp.name}`}>
                          <Button variant="outline" size="sm" className="gap-2">
                            Live Demo
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                      <CardDescription>{comp.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Props Table */}
                      <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Props
                        </h4>
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-muted/50">
                              <tr>
                                <th className="text-left p-3 font-medium">Prop</th>
                                <th className="text-left p-3 font-medium">Type</th>
                                <th className="text-left p-3 font-medium hidden sm:table-cell">Required</th>
                                <th className="text-left p-3 font-medium hidden md:table-cell">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {comp.props.map((prop) => (
                                <tr key={prop.name}>
                                  <td className="p-3 font-mono text-violet-600">{prop.name}</td>
                                  <td className="p-3 font-mono text-xs text-muted-foreground">{prop.type}</td>
                                  <td className="p-3 hidden sm:table-cell">
                                    {prop.required ? (
                                      <Badge variant="default" className="text-xs">Required</Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-xs">Optional</Badge>
                                    )}
                                  </td>
                                  <td className="p-3 text-muted-foreground hidden md:table-cell">{prop.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Usage Example */}
                      <div>
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <FileCode className="w-4 h-4" />
                          Usage Example
                        </h4>
                        <CodeBlock code={comp.usage} id={`usage-${comp.name}`} language="tsx" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* TypeScript */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <FileCode className="w-4 h-4 text-white" />
                </div>
                TypeScript Support
              </h2>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    All components include full TypeScript definitions. Import types directly:
                  </p>
                  <CodeBlock
                    code={`import type {
  AiCreatingProps,
  AiCreating2Props
} from 'archyra';

// Types are automatically inferred
const config: AiCreating2Props = {
  isLoading: true,
  message: 'Processing...',
  primaryColor: '#8B5CF6'
};`}
                    id="typescript"
                    language="tsx"
                  />
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* MCP Tab */}
          <TabsContent value="mcp" className="space-y-8">
            {/* What is MCP */}
            <section>
              <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">What is MCP?</h3>
                      <p className="text-muted-foreground">
                        <strong>Model Context Protocol (MCP)</strong> allows AI assistants like Claude to interact with external tools.
                        With our MCP server, you can ask Claude to browse components, get source code, and add animations
                        to your project through natural conversation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Quick Setup */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                Quick Setup (Recommended)
              </h2>

              <Card className="border-2 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-lg">One Command Setup</CardTitle>
                  <CardDescription>
                    Run a single command to configure MCP for your AI coding tool
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Claude Code</p>
                      <CodeBlock code="npx archyra init --client claude" id="quick-claude" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Cursor</p>
                      <CodeBlock code="npx archyra init --client cursor" id="quick-cursor" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Windsurf</p>
                      <CodeBlock code="npx archyra init --client windsurf" id="quick-windsurf" />
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">Or use interactive mode:</p>
                    <CodeBlock code="npx archyra init" id="quick-interactive" />
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/20 mt-4">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm">After running, restart your AI tool to load the MCP server!</span>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Manual Setup */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-500 flex items-center justify-center">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                Manual Setup
              </h2>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  If you prefer manual configuration, add this to your MCP config file:
                </p>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Claude Code (~/.mcp.json or ~/.claude/claude_desktop_config.json)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`{
  "mcpServers": {
    "archyra": {
      "command": "npx",
      "args": ["-y", "archyra@latest", "serve"]
    }
  }
}`}
                      id="manual-claude"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Cursor (.cursor/mcp.json)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock
                      code={`{
  "mcpServers": {
    "archyra": {
      "command": "npx",
      "args": ["-y", "archyra@latest", "serve"]
    }
  }
}`}
                      id="manual-cursor"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Available Tools */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-white" />
                </div>
                Available MCP Tools
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {mcpTools.map((tool) => (
                  <Card key={tool.name}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-mono text-purple-600">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Parameters</p>
                        <div className="space-y-1">
                          {tool.params.map((param) => (
                            <div key={param.name} className="flex items-center gap-2 text-sm">
                              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{param.name}</code>
                              {param.required && <Badge variant="default" className="text-xs h-5">Required</Badge>}
                              <span className="text-muted-foreground text-xs">{param.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Ask Claude</p>
                        <p className="text-sm italic text-green-600">{tool.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Usage Examples */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                Example Prompts
              </h2>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      'List all animation components',
                      'Show me loading animation options',
                      'Add the LoadingDots component to my project',
                      'Get the source code for AiCreating2',
                      'What dependencies does FloatingLogin need?',
                      'Add PulseCircle to src/components/ui',
                    ].map((prompt, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          You
                        </div>
                        <p className="text-sm">"{prompt}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Troubleshooting */}
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                Troubleshooting
              </h2>

              <div className="space-y-3">
                {[
                  { problem: 'MCP server not connecting', solution: 'Make sure you restarted your AI tool after running the init command' },
                  { problem: 'Config file not created', solution: 'Run: npx archyra init --client <your-tool>' },
                  { problem: 'Tools not showing up', solution: 'Check that the config was added correctly by running: npx archyra --help' },
                  { problem: 'npx command fails', solution: 'Make sure you have Node.js 18+ installed and npm is up to date' },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardContent className="py-4">
                      <div className="flex items-start gap-4">
                        <Badge variant="destructive" className="shrink-0">Problem</Badge>
                        <div className="flex-1">
                          <p className="font-medium mb-1">{item.problem}</p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-green-600">Solution:</span> {item.solution}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CLI Reference */}
            <section>
              <h2 className="text-2xl font-bold mb-6">CLI Reference</h2>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Show help</p>
                    <CodeBlock code="npx archyra --help" id="cli-help" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Interactive setup</p>
                    <CodeBlock code="npx archyra init" id="cli-init" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Direct setup for specific client</p>
                    <CodeBlock code="npx archyra init --client <claude|cursor|windsurf>" id="cli-client" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Start MCP server manually (for testing)</p>
                    <CodeBlock code="npx archyra serve" id="cli-serve" />
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Archyra - Production-ready animation components</p>
            <div className="flex items-center gap-4">
              <a href="https://www.npmjs.com/package/archyra" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">
                npm
              </a>
              <a href="https://github.com" target="_blank" rel="noopener" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <Link href="/" className="hover:text-foreground transition-colors">
                Gallery
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
