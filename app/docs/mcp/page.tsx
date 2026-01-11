'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Cpu, Sparkles, ArrowRight, Zap, Terminal, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MCPOverviewPage() {
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

  const supportedTools = [
    {
      name: 'Claude Code',
      description: 'Anthropic\'s official CLI for Claude AI',
      href: '/docs/mcp/claude',
      color: 'from-orange-500 to-amber-500',
      configPath: '~/.claude/claude_desktop_config.json',
    },
    {
      name: 'Cursor',
      description: 'AI-first code editor built on VS Code',
      href: '/docs/mcp/cursor',
      color: 'from-blue-500 to-cyan-500',
      configPath: '.cursor/mcp.json',
    },
    {
      name: 'Windsurf',
      description: 'Codeium\'s AI-powered IDE',
      href: '/docs/mcp/windsurf',
      color: 'from-green-500 to-emerald-500',
      configPath: '~/.codeium/windsurf/mcp_config.json',
    },
  ];

  const mcpTools = [
    {
      name: 'list_components',
      description: 'Browse all available UI components with optional category filtering',
    },
    {
      name: 'get_component',
      description: 'Get detailed information and full source code for a specific component',
    },
    {
      name: 'add_component',
      description: 'Get instructions and source code to add a component to your project',
    },
    {
      name: 'get_install_command',
      description: 'Get the npm install command for a component\'s dependencies',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <Badge className="mb-4 bg-green-500/10 text-green-600">
          <Cpu className="w-3 h-3 mr-1" />
          MCP Server
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Model Context Protocol
        </h1>
        <p className="text-xl text-muted-foreground">
          Enable AI assistants to browse, search, and add Archyra components to your projects through natural conversation.
        </p>
      </div>

      {/* What is MCP */}
      <div className="mb-12">
        <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">What is MCP?</h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Model Context Protocol (MCP)</strong> is an open standard that allows AI assistants to interact with external tools and data sources.
                  Archyra includes a built-in MCP server that exposes our component library to AI coding assistants.
                </p>
                <p className="text-muted-foreground">
                  Once configured, you can simply ask your AI assistant to "add a loading animation" or "show me the chat components"
                  and it will use the MCP server to find and add the right components to your project.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Setup */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          Quick Setup
        </h2>
        <p className="text-muted-foreground mb-6">
          Run one command to automatically configure MCP for your AI coding tool:
        </p>
        <CodeBlock code="npx archyra init" id="quick-setup" />
        <p className="text-sm text-muted-foreground mt-3">
          This will detect your installed tools and guide you through the setup process.
        </p>
      </div>

      {/* Supported Tools */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Supported AI Tools</h2>
        <p className="text-muted-foreground mb-6">
          Click on your AI coding tool for detailed setup instructions:
        </p>
        <div className="grid gap-4">
          {supportedTools.map((tool) => (
            <Link key={tool.name} href={tool.href}>
              <Card className="group cursor-pointer hover:shadow-md transition-all hover:border-violet-500/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                        <Terminal className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-violet-600 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                        <code className="text-xs text-muted-foreground mt-1 block">{tool.configPath}</code>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 group-hover:text-violet-600 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Available MCP Tools */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Available MCP Tools
        </h2>
        <p className="text-muted-foreground mb-6">
          Once configured, your AI assistant will have access to these tools:
        </p>
        <div className="grid gap-3">
          {mcpTools.map((tool) => (
            <Card key={tool.name}>
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <code className="bg-violet-500/10 text-violet-600 px-2 py-1 rounded text-sm font-mono shrink-0">
                    {tool.name}
                  </code>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Example Prompts */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Example Prompts</h2>
        <p className="text-muted-foreground mb-6">
          After setup, try asking your AI assistant:
        </p>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[
                'List all available UI components',
                'Show me loading indicator options',
                'Add the LoadingDots component to my project',
                'Get the source code for AuthPage',
                'What dependencies does FloatingLogin need?',
                'Add PulseCircle to src/components/ui',
                'Show me ready-to-use section components',
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
      </div>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/docs/mcp/claude">
            <Card className="group cursor-pointer hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Claude Code Setup</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure MCP for Claude Code CLI
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/mcp/cli">
            <Card className="group cursor-pointer hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">CLI Reference</h3>
                    <p className="text-sm text-muted-foreground">
                      All available CLI commands
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
