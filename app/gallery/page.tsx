'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Layers, Cloud, GitBranch, ArrowRight, Sparkles,
  Code2, Server, Lock, Zap
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { components } from '@/lib/component-registry';

const sections = [
  {
    id: 'ui',
    title: 'UI Components',
    description: 'Production-ready React components with animations. Loading indicators, chat interfaces, auth forms, and more.',
    icon: Layers,
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-500/10',
    textColor: 'text-violet-600',
    href: '/gallery/ui',
    stats: `${components.length}+ Components`,
    features: ['Framer Motion animations', 'TypeScript support', 'Dark mode ready', 'Vanilla HTML/CSS alternatives'],
    badge: null,
  },
  {
    id: 'iac',
    title: 'IaC Templates',
    description: 'Pre-built infrastructure templates for AWS. Deploy static websites, APIs, serverless apps, and more.',
    icon: Cloud,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-600',
    href: '/gallery/iac',
    stats: '6 Categories',
    features: ['Terraform code', 'Pulumi TypeScript', 'Architecture diagrams', 'Cost estimates'],
    badge: null,
  },
  {
    id: 'designer',
    title: 'Architecture Designer',
    description: 'Drag-and-drop AWS architecture builder. Connect services visually and generate IaC code automatically.',
    icon: GitBranch,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-600',
    href: '/gallery/designer',
    stats: '15 AWS Services',
    features: ['Visual canvas', 'Real-time code generation', 'Save & share designs', 'Export diagrams'],
    badge: 'New',
    requiresAuth: true,
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-emerald-500/5 to-orange-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4 bg-gradient-to-r from-violet-500/10 via-emerald-500/10 to-orange-500/10 text-foreground border-0">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Coding Toolkit Gallery
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-violet-600 via-emerald-500 to-orange-500 bg-clip-text text-transparent">
                build faster
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              UI components, infrastructure templates, and visual architecture design tools.
              All accessible through MCP for AI-assisted development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={section.href}>
                    <Card className="group h-full cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-violet-500/50 overflow-hidden">
                      {/* Gradient Header */}
                      <div className={`bg-gradient-to-r ${section.color} p-6`}>
                        <div className="flex items-center justify-between">
                          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          {section.badge && (
                            <Badge className="bg-white/20 text-white border-0">
                              {section.badge}
                            </Badge>
                          )}
                          {section.requiresAuth && (
                            <div className="flex items-center gap-1 text-white/80 text-xs">
                              <Lock className="w-3 h-3" />
                              <span>Auth required</span>
                            </div>
                          )}
                        </div>
                        <h2 className="text-2xl font-bold text-white mt-4">
                          {section.title}
                        </h2>
                        <p className="text-white/80 text-sm mt-1">
                          {section.stats}
                        </p>
                      </div>

                      <CardContent className="p-6">
                        <p className="text-muted-foreground mb-4">
                          {section.description}
                        </p>

                        <ul className="space-y-2 mb-6">
                          {section.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <div className={`w-1.5 h-1.5 rounded-full ${section.bgColor.replace('/10', '')}`} />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${section.textColor}`}>
                            Explore {section.title}
                          </span>
                          <ArrowRight className={`w-4 h-4 ${section.textColor} group-hover:translate-x-1 transition-transform`} />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Built for AI-assisted development
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All resources are accessible via MCP server, enabling Claude, Cursor, and Windsurf
              to help you build production-ready applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mb-2">
                  <Code2 className="w-6 h-6 text-violet-600" />
                </div>
                <CardTitle className="text-lg">Copy-Paste Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every component and template includes complete source code.
                  Copy directly into your project or let AI do it for you.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2">
                  <Server className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-lg">MCP Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect your AI coding assistant to browse, search, and add
                  resources directly through natural conversation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Production Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All code follows best practices with TypeScript, responsive design,
                  dark mode support, and accessibility in mind.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Set up the MCP server and start building with AI assistance,
            or browse the gallery manually.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/docs/mcp">
              <Button size="lg" className="gap-2">
                <Server className="w-4 h-4" />
                Setup MCP Server
              </Button>
            </Link>
            <Link href="/gallery/ui">
              <Button size="lg" variant="outline" className="gap-2">
                <Layers className="w-4 h-4" />
                Browse UI Components
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
