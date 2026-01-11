'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Terminal, FolderOpen, RefreshCw, Info } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CursorSetupPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ code, id, language = 'bash' }: { code: string; id: string; language?: string }) => (
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

  const mcpConfig = `{
  "mcpServers": {
    "archyra": {
      "command": "npx",
      "args": ["-y", "archyra@latest", "serve"]
    }
  }
}`;

  const mcpConfigWithOthers = `{
  "mcpServers": {
    "archyra": {
      "command": "npx",
      "args": ["-y", "archyra@latest", "serve"]
    },
    "other-server": {
      "command": "...",
      "args": ["..."]
    }
  }
}`;

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
        <Badge className="mb-4 bg-blue-500/10 text-blue-600">
          Cursor
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Cursor Setup
        </h1>
        <p className="text-xl text-muted-foreground">
          Configure MCP for Cursor IDE to enable AI-assisted component management with Claude.
        </p>
      </div>

      {/* Quick Setup */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-green-500" />
          Automatic Setup (Recommended)
        </h2>
        <p className="text-muted-foreground mb-6">
          Run this single command to automatically configure Cursor:
        </p>
        <CodeBlock code="npx archyra init --client cursor" id="auto-setup" />

        <Alert className="mt-4 border-green-500/50 bg-green-500/5">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>What this does</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Creates the <code>.cursor/mcp.json</code> file in your project or home directory</li>
              <li>Adds the Archyra MCP server configuration</li>
              <li>Preserves any existing MCP servers you have configured</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>

      {/* Manual Setup */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <FolderOpen className="w-6 h-6" />
          Manual Setup
        </h2>
        <p className="text-muted-foreground mb-6">
          If you prefer to configure manually, follow these steps:
        </p>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                Choose configuration location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Cursor looks for MCP configuration in these locations:
              </p>
              <Tabs defaultValue="project" className="w-full">
                <TabsList>
                  <TabsTrigger value="project">Project-level</TabsTrigger>
                  <TabsTrigger value="global">Global</TabsTrigger>
                </TabsList>
                <TabsContent value="project" className="mt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    For project-specific configuration (recommended for teams):
                  </p>
                  <CodeBlock code=".cursor/mcp.json" id="path-project" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Create this file in your project root directory.
                  </p>
                </TabsContent>
                <TabsContent value="global" className="mt-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    For global configuration (all projects):
                  </p>
                  <Tabs defaultValue="mac" className="w-full">
                    <TabsList className="h-8">
                      <TabsTrigger value="mac" className="text-xs">macOS</TabsTrigger>
                      <TabsTrigger value="linux" className="text-xs">Linux</TabsTrigger>
                      <TabsTrigger value="windows" className="text-xs">Windows</TabsTrigger>
                    </TabsList>
                    <TabsContent value="mac" className="mt-3">
                      <CodeBlock code="~/.cursor/mcp.json" id="path-mac" />
                    </TabsContent>
                    <TabsContent value="linux" className="mt-3">
                      <CodeBlock code="~/.cursor/mcp.json" id="path-linux" />
                    </TabsContent>
                    <TabsContent value="windows" className="mt-3">
                      <CodeBlock code="%USERPROFILE%\.cursor\mcp.json" id="path-win" />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                Create the configuration file
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="new" className="w-full">
                <TabsList>
                  <TabsTrigger value="new">New Configuration</TabsTrigger>
                  <TabsTrigger value="existing">Add to Existing</TabsTrigger>
                </TabsList>
                <TabsContent value="new" className="mt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Create the file with this content:
                  </p>
                  <CodeBlock code={mcpConfig} id="config-new" language="json" />
                </TabsContent>
                <TabsContent value="existing" className="mt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    If you already have other MCP servers, add the archyra entry:
                  </p>
                  <CodeBlock code={mcpConfigWithOthers} id="config-existing" language="json" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">3</span>
                Restart Cursor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Close and reopen Cursor to load the new MCP configuration.
                    You can also use <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Cmd/Ctrl + Shift + P</kbd> and search for "Reload Window".
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enable MCP in Cursor */}
      <div className="mb-12">
        <Alert className="border-blue-500/50 bg-blue-500/5">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertTitle>Enable MCP in Cursor Settings</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="text-sm">
              Make sure MCP is enabled in Cursor:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
              <li>Open Cursor Settings (<kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Cmd/Ctrl + ,</kbd>)</li>
              <li>Search for "MCP" or navigate to Features → MCP</li>
              <li>Ensure "Enable MCP" is turned on</li>
            </ol>
          </AlertDescription>
        </Alert>
      </div>

      {/* Verify Setup */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          Verify Setup
        </h2>
        <p className="text-muted-foreground mb-6">
          After restarting Cursor, open the AI chat and try these prompts:
        </p>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[
                'List all archyra components',
                'What loading components are available?',
                'Add the PulseCircle component to my project',
              ].map((prompt, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    You
                  </div>
                  <p className="text-sm">"{prompt}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground mt-4">
          If the AI responds with component information, your setup is complete!
        </p>
      </div>

      {/* Troubleshooting */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-orange-500" />
          Troubleshooting
        </h2>
        <div className="space-y-3">
          {[
            {
              problem: 'MCP not appearing in Cursor',
              solution: 'Check that the mcp.json file is in the correct location and the JSON syntax is valid.',
            },
            {
              problem: 'AI doesn\'t know about Archyra',
              solution: 'Make sure you restarted Cursor after adding the configuration. Try "Reload Window" from the command palette.',
            },
            {
              problem: 'npx command not found',
              solution: 'Ensure Node.js is installed and in your PATH. Run: node --version to verify.',
            },
            {
              problem: 'Project-level config not working',
              solution: 'Ensure the .cursor folder is in your project root, not in a subdirectory.',
            },
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
      </div>

      {/* Next Steps */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/docs/mcp/cli">
            <Card className="group cursor-pointer hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">CLI Reference</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn all available CLI commands
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
                    <h3 className="font-semibold mb-1">Browse Components</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore all available components
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
