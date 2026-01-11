'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, BookOpen, Layers, Cpu, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface NavItem {
  title: string;
  href: string;
  icon?: any;
  badge?: string;
  items?: NavItem[];
}

const docsNavigation: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
    icon: BookOpen,
    items: [
      { title: 'Introduction', href: '/docs/getting-started' },
      { title: 'Installation', href: '/docs/installation' },
    ],
  },
  {
    title: 'MCP Server',
    href: '/docs/mcp',
    icon: Cpu,
    items: [
      { title: 'Overview', href: '/docs/mcp' },
      { title: 'Claude Code', href: '/docs/mcp/claude' },
      { title: 'Cursor', href: '/docs/mcp/cursor' },
      { title: 'Windsurf', href: '/docs/mcp/windsurf' },
      { title: 'CLI Reference', href: '/docs/mcp/cli' },
    ],
  },
  {
    title: 'Components',
    href: '/docs/components',
    icon: Layers,
    items: [
      { title: 'Loading', href: '/docs/components/loading', badge: '5' },
      { title: 'Processing', href: '/docs/components/processing', badge: '2' },
      { title: 'Creative', href: '/docs/components/creative', badge: '2' },
      { title: 'Authentication', href: '/docs/components/auth', badge: '1' },
      { title: 'Chat', href: '/docs/components/chat', badge: '3' },
      { title: 'E-commerce', href: '/docs/components/ecommerce', badge: '5' },
    ],
  },
];

function DocsSidebar() {
  const pathname = usePathname();

  // Initialize open state - sections are open if current path matches
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    docsNavigation.forEach((section) => {
      state[section.href] = pathname.startsWith(section.href);
    });
    return state;
  });

  const toggleSection = (href: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {/* Documentation Navigation */}
          {docsNavigation.map((section) => {
            const Icon = section.icon;
            const isActive = pathname.startsWith(section.href);
            const isOpen = openSections[section.href] ?? false;

            return (
              <Collapsible
                key={section.href}
                open={isOpen}
                onOpenChange={() => toggleSection(section.href)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`w-full justify-between text-sm font-medium ${
                      isActive
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    size="sm"
                  >
                    <span className="flex items-center gap-2">
                      {Icon && <Icon className="w-4 h-4" />}
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 pt-1 space-y-1">
                  {section.items?.map((item) => {
                    const isItemActive = pathname === item.href;
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isItemActive ? 'secondary' : 'ghost'}
                          className={`w-full justify-between text-sm ${
                            isItemActive
                              ? 'bg-violet-500/10 text-violet-600 font-medium'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                          size="sm"
                        >
                          {item.title}
                          {item.badge && (
                            <Badge variant="outline" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Button>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border/40 dark:border-border/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>v2.0.0</span>
          <Badge variant="secondary" className="text-xs">MIT License</Badge>
        </div>
      </div>
    </div>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:left-0 lg:z-40 lg:block lg:w-72 lg:border-r lg:border-border/40 dark:lg:border-border/20 lg:bg-card lg:overflow-y-auto">
        <DocsSidebar />
      </aside>

      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/40 dark:border-border/20">
        <div className="flex items-center gap-4 px-4 h-12">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <DocsSidebar />
            </SheetContent>
          </Sheet>
          <Badge variant="outline" className="text-xs">Documentation</Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
