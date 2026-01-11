/**
 * SidebarNav Component
 *
 * Unified sidebar navigation for component gallery.
 * Used by Dashboard and DashboardLayout.
 */

'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home, Search, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import {
  components,
  categories,
  getComponentsByCategory,
  ComponentMeta,
} from '@/lib/component-registry';

interface SidebarNavProps {
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentComponent?: string;
  onComponentSelect?: (comp: ComponentMeta) => void;
}

export function SidebarNav({
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  currentComponent,
  onComponentSelect,
}: SidebarNavProps) {
  const router = useRouter();

  const handleComponentClick = (comp: ComponentMeta) => {
    if (onComponentSelect) {
      onComponentSelect(comp);
    } else {
      router.push(`/${comp.name}?from=${comp.category}`);
    }
  };

  const shouldExpandCategory = (categoryId: string) => {
    if (filterCategory === categoryId) return true;
    if (currentComponent) {
      const categoryComponents = getComponentsByCategory(categoryId);
      return categoryComponents.some(c => c.name === currentComponent);
    }
    return false;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-4 pt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-muted/50"
          />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 pb-4">
          {/* Overview */}
          <Link href="/components">
            <Button
              variant={!currentComponent && filterCategory === 'all' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-3"
              onClick={() => setFilterCategory('all')}
            >
              <Home className="w-4 h-4" />
              Overview
            </Button>
          </Link>

          <Separator className="my-4" />

          {/* Categories */}
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Categories
          </p>

          {categories.slice(1).map((category) => {
            const categoryComponents = getComponentsByCategory(category.id);
            const Icon = category.icon;
            const hasActiveComponent = currentComponent && categoryComponents.some(c => c.name === currentComponent);
            const isExpanded = shouldExpandCategory(category.id);

            return (
              <div key={category.id} className="space-y-1">
                <Button
                  variant={isExpanded ? 'secondary' : 'ghost'}
                  className="w-full justify-between"
                  onClick={() => setFilterCategory(isExpanded && !hasActiveComponent ? 'all' : category.id)}
                >
                  <span className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-md ${category.color} flex items-center justify-center`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    {category.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {categoryComponents.length}
                    </Badge>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </Button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 pl-4 border-l space-y-1 py-1">
                        {categoryComponents.map((comp) => {
                          const CompIcon = comp.icon;
                          const isActive = currentComponent === comp.name;
                          return (
                            <Button
                              key={comp.id}
                              variant={isActive ? 'secondary' : 'ghost'}
                              size="sm"
                              className={`w-full justify-between ${
                                isActive
                                  ? 'bg-violet-500/10 text-violet-600'
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                              onClick={() => handleComponentClick(comp)}
                            >
                              <span className="flex items-center gap-2">
                                <CompIcon className="w-3.5 h-3.5" />
                                {comp.name}
                              </span>
                              {!isActive && <ExternalLink className="w-3 h-3 opacity-50" />}
                            </Button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border/40 dark:border-border/20">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{components.length} components</span>
          <Badge variant="secondary" className="text-xs">v2.0.0</Badge>
        </div>
      </div>
    </div>
  );
}
