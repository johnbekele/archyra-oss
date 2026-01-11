/**
 * AI Animation Framework - Component Gallery Dashboard
 *
 * Professional component gallery built with shadcn/ui.
 * Browse and explore all available animation components.
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, Menu, Search, ExternalLink, BookOpen, Code2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { TooltipProvider } from '@/components/ui/tooltip';

import { SidebarNav } from '@/components/navigation/SidebarNav';
import {
  components,
  categories,
  getCategoryById,
  ComponentMeta,
} from '@/lib/component-registry';

function DashboardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Read category from URL on mount
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && categories.some(c => c.id === category)) {
      setFilterCategory(category);
    }
  }, [searchParams]);

  const handleComponentSelect = (component: ComponentMeta) => {
    router.push(`/${component.name}?from=${component.category}`);
  };

  const filteredComponents = components.filter(c => {
    const matchesCategory = filterCategory === 'all' || c.category === filterCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryInfo = (categoryId: string) => {
    return getCategoryById(categoryId) || categories[0];
  };

  return (
    <TooltipProvider>
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:left-0 lg:z-40 lg:block lg:w-72 lg:border-r lg:border-border/40 dark:lg:border-border/20 lg:bg-card lg:overflow-y-auto">
          <SidebarNav
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onComponentSelect={handleComponentSelect}
          />
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
                <SidebarNav
                  filterCategory={filterCategory}
                  setFilterCategory={setFilterCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onComponentSelect={handleComponentSelect}
                />
              </SheetContent>
            </Sheet>
            <span className="text-sm font-semibold">Component Gallery</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-72">
          {/* Content */}
          <main className="p-4 lg:p-8">
            {/* Hero Section */}
            <div className="mb-8">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border p-8 lg:p-12">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                <div className="relative">
                  <Badge className="mb-4 bg-violet-500/10 text-violet-600 hover:bg-violet-500/20">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI-Powered Animations
                  </Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                    Build stunning AI experiences
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mb-6">
                    {components.length} production-ready animation components designed for AI interfaces.
                    Copy, customize, and create beautiful loading states, progress indicators, and creative animations.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/docs/getting-started">
                      <Button className="gap-2">
                        <Code2 className="w-4 h-4" />
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/docs">
                      <Button variant="outline" className="gap-2">
                        <BookOpen className="w-4 h-4" />
                        Documentation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = filterCategory === cat.id;
                return (
                  <Button
                    key={cat.id}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    className="gap-2"
                    onClick={() => setFilterCategory(cat.id)}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                    {cat.id !== 'all' && (
                      <Badge variant={isActive ? 'secondary' : 'outline'} className="ml-1 text-xs">
                        {components.filter(c => c.category === cat.id).length}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Component Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredComponents.map((component) => {
                const Icon = component.icon;
                const categoryInfo = getCategoryInfo(component.category);

                return (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className="cursor-pointer group hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 hover:border-violet-500/50"
                      onClick={() => handleComponentSelect(component)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-xl ${categoryInfo.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {component.category}
                            </Badge>
                            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="text-lg mb-2 group-hover:text-violet-600 transition-colors">
                          {component.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {component.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredComponents.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No components found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setFilterCategory('all');
                }}>
                  Clear filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <DashboardInner />
    </Suspense>
  );
}
