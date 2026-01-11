'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, ArrowLeft, Terminal, Zap, Settings, Play, HelpCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CLIReferencePage() {
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

  const commands = [
    {
      command: 'npx archyra init',
      description: 'Interactive setup wizard',
      details: 'Launches an interactive prompt to select your AI coding tool and automatically configures the MCP server.',
      icon: Zap,
      color: 'text-yellow-500',
    },
    {
      command: 'npx archyra init --client <tool>',
      description: 'Direct setup for a specific tool',
      details: 'Skip the interactive prompt and directly configure for a specific tool. Valid options: claude, cursor, windsurf.',
      icon: Settings,
      color: 'text-blue-500',
    },
    {
      command: 'npx archyra serve',
      description: 'Start the MCP server manually',
      details: 'Starts the MCP server directly. Useful for testing or when running manually instead of through npx.',
      icon: Play,
      color: 'text-green-500',
    },
    {
      command: 'npx archyra --help',
      description: 'Show help information',
      details: 'Displays all available commands and options.',
      icon: HelpCircle,
      color: 'text-purple-500',
    },
  ];

  const initOptions = [
    { option: '--client <tool>', description: 'Specify the AI tool to configure', values: 'claude, cursor, windsurf' },
    { option: '--force', description: 'Overwrite existing configuration', values: 'flag' },
    { option: '--help', description: 'Show help for init command', values: 'flag' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/docs/mcp" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to MCP Overview
        </Link>
      </div>

      {/* Hero */}
      <div className="mb-12">
        <Badge className="mb-4 bg-violet-500/10 text-violet-600">
          <Terminal className="w-3 h-3 mr-1" />
          CLI Reference
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          CLI Reference
        </h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for all Archyra command-line interface commands and options.
        </p>
      </div>

      {/* Quick Reference */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Quick Reference</h2>
        <div className="grid gap-4">
          {commands.map((cmd, i) => {
            const Icon = cmd.icon;
            return (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`${cmd.color} mt-1`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <code className="bg-zinc-950 text-zinc-100 px-3 py-1.5 rounded text-sm font-mono">
                          {cmd.command}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => copyToClipboard(cmd.command, `cmd-${i}`)}
                        >
                          {copied === `cmd-${i}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                      <p className="font-medium">{cmd.description}</p>
                      <p className="text-sm text-muted-foreground">{cmd.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Init Command Details */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          <code className="text-violet-600">init</code> Command
        </h2>
        <p className="text-muted-foreground mb-6">
          The <code>init</code> command configures the MCP server for your AI coding tool.
        </p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Options</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Option</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Values</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initOptions.map((opt, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-mono text-sm">{opt.option}</TableCell>
                    <TableCell>{opt.description}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{opt.values}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <h3 className="text-lg font-semibold mb-4">Examples</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Interactive setup (recommended for first-time users):</p>
            <CodeBlock code="npx archyra init" id="ex-1" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Configure for Claude Code:</p>
            <CodeBlock code="npx archyra init --client claude" id="ex-2" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Configure for Cursor:</p>
            <CodeBlock code="npx archyra init --client cursor" id="ex-3" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Configure for Windsurf:</p>
            <CodeBlock code="npx archyra init --client windsurf" id="ex-4" />
          </div>
        </div>
      </div>

      {/* Serve Command Details */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          <code className="text-violet-600">serve</code> Command
        </h2>
        <p className="text-muted-foreground mb-6">
          The <code>serve</code> command starts the MCP server. This is typically called automatically by your AI tool,
          but can be run manually for testing.
        </p>

        <h3 className="text-lg font-semibold mb-4">Usage</h3>
        <CodeBlock code="npx archyra serve" id="serve-1" />

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> When running manually, the server communicates via stdio.
            This is mainly useful for debugging. In normal usage, your AI tool will start the server automatically.
          </p>
        </div>
      </div>

      {/* MCP Tools Reference */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">MCP Tools Reference</h2>
        <p className="text-muted-foreground mb-6">
          Once the MCP server is running, these tools are available to your AI assistant:
        </p>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-mono text-violet-600">list_components</CardTitle>
              <CardDescription>List all available UI components</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">category</TableCell>
                    <TableCell className="text-muted-foreground">string (optional)</TableCell>
                    <TableCell>Filter by category: all, loading, processing, creative, auth, chat, ecommerce</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-mono text-violet-600">get_component</CardTitle>
              <CardDescription>Get detailed information about a specific component</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">name</TableCell>
                    <TableCell className="text-muted-foreground">string (required)</TableCell>
                    <TableCell>Component name (e.g., "LoadingDots", "AiCreating2")</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-mono text-violet-600">add_component</CardTitle>
              <CardDescription>Get source code and setup instructions to add a component</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">name</TableCell>
                    <TableCell className="text-muted-foreground">string (required)</TableCell>
                    <TableCell>Component name to add</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">directory</TableCell>
                    <TableCell className="text-muted-foreground">string (optional)</TableCell>
                    <TableCell>Target directory (default: "components")</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-mono text-violet-600">get_install_command</CardTitle>
              <CardDescription>Get the npm install command for dependencies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">name</TableCell>
                    <TableCell className="text-muted-foreground">string (required)</TableCell>
                    <TableCell>Component name</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Example Prompts */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Example AI Prompts</h2>
        <p className="text-muted-foreground mb-6">
          Here are some example prompts you can use with your AI assistant:
        </p>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[
                { prompt: 'List all archyra components', tool: 'list_components' },
                { prompt: 'Show me loading indicator options', tool: 'list_components (category: loading)' },
                { prompt: 'Get the source code for AuthPage', tool: 'get_component' },
                { prompt: 'Add LoadingDots to my components folder', tool: 'add_component' },
                { prompt: 'What dependencies does FloatingLogin need?', tool: 'get_install_command' },
                { prompt: 'Show me all e-commerce components', tool: 'list_components (category: ecommerce)' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">"{item.prompt}"</p>
                  <Badge variant="outline" className="text-xs shrink-0 ml-4">{item.tool}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environment Variables */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Environment Variables</h2>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variable</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">DEBUG</TableCell>
                  <TableCell>Enable debug logging</TableCell>
                  <TableCell className="text-muted-foreground">false</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Footer Navigation */}
      <div className="border-t pt-8">
        <div className="flex justify-between">
          <Link href="/docs/mcp/windsurf" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Windsurf Setup
          </Link>
          <Link href="/components" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            Browse Components
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
