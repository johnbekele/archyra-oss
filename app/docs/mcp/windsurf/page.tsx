'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Terminal, FolderOpen, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function WindsurfSetupPage() {
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
        <Badge className="mb-4 bg-green-500/10 text-green-600">
          Windsurf
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Windsurf Setup
        </h1>
        <p className="text-xl text-muted-foreground">
          Configure MCP for Codeium's Windsurf IDE to enable AI-assisted component management.
        </p>
      </div>

      {/* Quick Setup */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-green-500" />
          Automatic Setup (Recommended)
        </h2>
        <p className="text-muted-foreground mb-6">
          Run this single command to automatically configure Windsurf:
        </p>
        <CodeBlock code="npx archyra init --client windsurf" id="auto-setup" />

        <Alert className="mt-4 border-green-500/50 bg-green-500/5">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>What this does</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Creates the MCP configuration file at <code>~/.codeium/windsurf/mcp_config.json</code></li>
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
                Locate your configuration file
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Windsurf stores its MCP configuration at:
              </p>
              <Tabs defaultValue="mac" className="w-full">
                <TabsList>
                  <TabsTrigger value="mac">macOS</TabsTrigger>
                  <TabsTrigger value="linux">Linux</TabsTrigger>
                  <TabsTrigger value="windows">Windows</TabsTrigger>
                </TabsList>
                <TabsContent value="mac" className="mt-4">
                  <CodeBlock code="~/.codeium/windsurf/mcp_config.json" id="path-mac" />
                </TabsContent>
                <TabsContent value="linux" className="mt-4">
                  <CodeBlock code="~/.codeium/windsurf/mcp_config.json" id="path-linux" />
                </TabsContent>
                <TabsContent value="windows" className="mt-4">
                  <CodeBlock code="%USERPROFILE%\.codeium\windsurf\mcp_config.json" id="path-win" />
                </TabsContent>
              </Tabs>
              <p className="text-xs text-muted-foreground mt-3">
                If the directory doesn't exist, create it first.
              </p>
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
                Create directory if needed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                If the directory doesn't exist, create it:
              </p>
              <Tabs defaultValue="mac" className="w-full">
                <TabsList>
                  <TabsTrigger value="mac">macOS/Linux</TabsTrigger>
                  <TabsTrigger value="windows">Windows</TabsTrigger>
                </TabsList>
                <TabsContent value="mac" className="mt-4">
                  <CodeBlock code="mkdir -p ~/.codeium/windsurf" id="mkdir-mac" />
                </TabsContent>
                <TabsContent value="windows" className="mt-4">
                  <CodeBlock code="mkdir %USERPROFILE%\.codeium\windsurf" id="mkdir-win" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">4</span>
                Restart Windsurf
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Close and reopen Windsurf to load the new MCP configuration.
                    The server will start automatically when Windsurf launches.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Verify Setup */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
          Verify Setup
        </h2>
        <p className="text-muted-foreground mb-6">
          After restarting Windsurf, open the AI chat (Cascade) and try these prompts:
        </p>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[
                'List all archyra components',
                'What UI components are available?',
                'Add the DataProcessing component to my project',
              ].map((prompt, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    You
                  </div>
                  <p className="text-sm">"{prompt}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground mt-4">
          If Cascade responds with component information, your setup is complete!
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
              problem: 'MCP server not connecting',
              solution: 'Verify the mcp_config.json file exists at ~/.codeium/windsurf/mcp_config.json and contains valid JSON.',
            },
            {
              problem: 'Cascade doesn\'t recognize MCP tools',
              solution: 'Make sure you fully restarted Windsurf after adding the configuration (not just reloaded the window).',
            },
            {
              problem: 'npx command fails',
              solution: 'Ensure Node.js 18+ is installed and in your PATH. Run: node --version to check.',
            },
            {
              problem: 'Directory doesn\'t exist',
              solution: 'Create the directory manually: mkdir -p ~/.codeium/windsurf',
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
