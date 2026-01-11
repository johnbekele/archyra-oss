'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, Code2, BookOpen, Github, Zap, Activity,
  Terminal, MessageCircle, Copy, Check, Package, Star, Download
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Import sample animations for preview
import AiCreating2 from '../AiCreating2';
import { components, categories } from '@/lib/component-registry';

export default function LandingPage() {
  const [copied, setCopied] = useState(false);

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('npm install archyra framer-motion');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic counts from registry
  const componentCount = components.length;
  const categoryCount = categories.filter(c => c.id !== 'all').length;

  const features = [
    {
      icon: Terminal,
      title: 'MCP Server',
      description: 'Direct integration with Claude, Cursor, and Windsurf for AI-assisted development.',
      color: 'bg-violet-500',
    },
    {
      icon: Code2,
      title: 'UI Components',
      description: `${componentCount}+ production-ready React components with animations and TypeScript.`,
      color: 'bg-blue-500',
    },
    {
      icon: Sparkles,
      title: 'IaC Templates',
      description: 'Infrastructure as Code templates for AWS, GCP, and Azure deployments.',
      color: 'bg-emerald-500',
    },
    {
      icon: Activity,
      title: 'Architecture',
      description: 'Battle-tested deployment patterns and scalable architecture blueprints.',
      color: 'bg-orange-500',
    },
  ];

  const stats = [
    { value: `${componentCount}+`, label: 'Components' },
    { value: `${categoryCount}`, label: 'Categories' },
    { value: '100%', label: 'TypeScript' },
    { value: 'MIT', label: 'License' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-violet-500/10 text-violet-600 hover:bg-violet-500/20 px-4 py-1.5">
                <Terminal className="w-3.5 h-3.5 mr-2" />
                AI Coding Toolkit with MCP Server
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Build faster with{' '}
              <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                AI-powered tools
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              The complete toolkit for AI coding assistants. {componentCount}+ UI components with direct MCP server access,
              IaC templates, and deployment architecture patterns for building production-ready AI applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/docs/getting-started">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/components">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  <Code2 className="w-4 h-4" />
                  View Components
                </Button>
              </Link>
            </motion.div>

            {/* Install Command */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <div
                onClick={copyInstallCommand}
                className="inline-flex items-center gap-3 bg-zinc-950 dark:bg-zinc-900 text-zinc-100 rounded-lg px-4 py-3 cursor-pointer hover:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors"
              >
                <Terminal className="w-4 h-4 text-zinc-500" />
                <code className="text-sm">npm install archyra framer-motion</code>
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-500" />
                )}
              </div>
            </motion.div>
          </div>

          {/* Live Animation Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <div className="bg-background/80 backdrop-blur-sm border border-border/40 dark:border-border/20 rounded-2xl shadow-2xl shadow-violet-500/5 overflow-hidden">
              <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[450px] bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 text-foreground">
                <AiCreating2 isLoading={true} contained={true} textColor="inherit" />
              </div>
              <p className="text-xs text-muted-foreground text-center py-3 border-t border-border/40 dark:border-border/20 bg-background/50">AiCreating2</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/40 dark:border-border/20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-violet-600">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-500/10 text-blue-600">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything you need for AI development
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete toolkit with MCP server integration, UI components, infrastructure templates, and deployment patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg hover:shadow-violet-500/5 transition-all hover:border-violet-500/50">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/components">
              <Button variant="outline" size="lg" className="gap-2">
                Browse All Components
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* MCP Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-500/10 text-purple-600">MCP Server</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Built for AI coding assistants
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Includes a Model Context Protocol (MCP) server for seamless integration with Claude, Cursor, and Windsurf. Let AI help you build faster.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'List and search all components',
                  'Get full source code with context',
                  'TypeScript definitions included',
                  'JSDoc documentation for AI',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/docs/installation">
                <Button className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  View Setup Guide
                </Button>
              </Link>
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 text-zinc-500 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2">claude_desktop_config.json</span>
              </div>
              <pre className="text-zinc-300 overflow-x-auto">
{`{
  "mcpServers": {
    "archyra": {
      "command": "npx",
      "args": ["-y", "archyra@latest", "serve"]
    }
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Supercharge your AI workflow
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect your AI coding assistant to Archyra&apos;s MCP server and start building production-ready applications in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/docs/getting-started">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Terminal className="w-4 h-4" />
                Setup MCP Server
              </Button>
            </Link>
            <a
              href="https://github.com/johnbekele/archyra"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                <Github className="w-4 h-4" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 dark:border-border/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 via-pink-500 to-violet-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white">
                  <path d="M5 4L12 20L19 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 8C3.5 8 3.5 6 5 6C6.5 6 6.5 8 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                  <path d="M16 8C17.5 8 17.5 6 19 6C20.5 6 20.5 8 22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                </svg>
              </div>
              <span className="font-bold">
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">Archyra</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/docs" className="hover:text-foreground transition-colors">
                Documentation
              </Link>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
              <a
                href="https://github.com/johnbekele/archyra"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              MIT License
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
