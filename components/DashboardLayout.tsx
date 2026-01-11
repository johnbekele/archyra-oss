/**
 * DashboardLayout Component
 *
 * Shared layout with persistent sidebar navigation.
 * Used across all component pages for consistent UX.
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { SidebarNav } from '@/components/navigation/SidebarNav';
import {
  components,
  categories,
  getComponentByName,
} from '@/lib/component-registry';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

// Inner component that uses useSearchParams
function DashboardLayoutInner({ children, title, description }: DashboardLayoutProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get current component name from pathname
  const currentComponent = pathname === '/' ? undefined : pathname.slice(1);

  // Set category from URL or from current component
  useEffect(() => {
    const categoryFromUrl = searchParams.get('from') || searchParams.get('category');
    if (categoryFromUrl) {
      setFilterCategory(categoryFromUrl);
    } else if (currentComponent) {
      const comp = getComponentByName(currentComponent);
      if (comp) {
        setFilterCategory(comp.category);
      }
    }
  }, [searchParams, currentComponent]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:top-16 lg:bottom-0 lg:left-0 lg:z-40 lg:block lg:w-72 lg:border-r lg:border-border/40 dark:lg:border-border/20 lg:bg-card lg:overflow-y-auto">
        <SidebarNav
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentComponent={currentComponent}
        />
      </aside>

      {/* Mobile Sidebar Toggle + Page Title */}
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
                currentComponent={currentComponent}
              />
            </SheetContent>
          </Sheet>
          <div>
            <h1 className="text-sm font-semibold">{title || 'Component Gallery'}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Page Header (Desktop) */}
        {(title || description) && (
          <div className="hidden lg:block border-b border-border/40 dark:border-border/20 px-8 py-6">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}

        {/* Content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    }>
      <DashboardLayoutInner {...props} />
    </Suspense>
  );
}

// Re-export for backwards compatibility
export { components, categories } from '@/lib/component-registry';
