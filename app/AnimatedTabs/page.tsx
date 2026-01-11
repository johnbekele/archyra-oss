'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package, ChevronDown, Home, Settings, User, Bell } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import AnimatedTabs, { AnimatedTabsVertical, TabList } from '../../AnimatedTabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';
type Variant = 'default' | 'pills' | 'underline';

export default function AnimatedTabsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [variant, setVariant] = useState<Variant>('default');
  const [fullWidth, setFullWidth] = useState(false);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <Home className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Overview</h3>
          <p className="text-muted-foreground text-sm">
            Welcome to the overview tab. This content animates smoothly when switching tabs.
          </p>
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Settings</h3>
          <p className="text-muted-foreground text-sm">
            Configure your preferences here. The tab indicator slides smoothly between tabs.
          </p>
        </div>
      ),
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Profile</h3>
          <p className="text-muted-foreground text-sm">
            Manage your profile information and account settings.
          </p>
        </div>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Notifications</h3>
          <p className="text-muted-foreground text-sm">
            Control your notification preferences and alerts.
          </p>
        </div>
      ),
    },
  ];

  const reactCode = `import { AnimatedTabs, AnimatedTabsVertical, TabList } from 'archyra';

const tabs = [
  { id: 'overview', label: 'Overview', icon: <Home />, content: <Overview /> },
  { id: 'settings', label: 'Settings', icon: <Settings />, content: <Settings /> },
  { id: 'profile', label: 'Profile', icon: <User />, content: <Profile /> },
];

// Full tabs with content
<AnimatedTabs
  tabs={tabs}
  variant="${variant}"
  fullWidth={${fullWidth}}
  contentAnimation="fade"
/>

// Vertical tabs
<AnimatedTabsVertical
  tabs={tabs}
  tabWidth="200px"
/>

// Headless tab list (control content yourself)
<TabList
  tabs={[{ id: 'tab1', label: 'Tab 1' }]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="${variant}"
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="tabs-container">
  <div class="tabs-list">
    <button class="tab active" data-tab="overview">Overview</button>
    <button class="tab" data-tab="settings">Settings</button>
    <button class="tab" data-tab="profile">Profile</button>
    <div class="tab-indicator"></div>
  </div>
  <div class="tab-content" id="overview">Overview content</div>
  <div class="tab-content hidden" id="settings">Settings content</div>
  <div class="tab-content hidden" id="profile">Profile content</div>
</div>

<!-- CSS -->
<style>
.tabs-list {
  position: relative;
  display: flex;
  gap: 4px;
  background: rgba(0,0,0,0.05);
  padding: 4px;
  border-radius: 12px;
}

.tab {
  position: relative;
  z-index: 1;
  padding: 8px 16px;
  font-weight: 500;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.tab.active {
  color: #000;
}

.tab-indicator {
  position: absolute;
  height: calc(100% - 8px);
  top: 4px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-content {
  padding: 16px;
  animation: fadeIn 0.2s;
}

.tab-content.hidden {
  display: none;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

<!-- JavaScript -->
<script>
const tabs = document.querySelectorAll('.tab');
const indicator = document.querySelector('.tab-indicator');
const contents = document.querySelectorAll('.tab-content');

function updateIndicator(tab) {
  indicator.style.left = tab.offsetLeft + 'px';
  indicator.style.width = tab.offsetWidth + 'px';
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    updateIndicator(tab);

    contents.forEach(c => c.classList.add('hidden'));
    document.getElementById(tab.dataset.tab).classList.remove('hidden');
  });
});

// Initialize
updateIndicator(document.querySelector('.tab.active'));
</script>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;
  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="AnimatedTabs" description="Smooth animated tab component">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Variant</h3>
            <div className="flex flex-col gap-2">
              {(['default', 'pills', 'underline'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
                    variant === v
                      ? 'bg-violet-500 text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Options</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={fullWidth}
                onChange={(e) => setFullWidth(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm">Full width tabs</span>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Horizontal Tabs</h2>
              <p className="text-indigo-100 text-sm">Smooth sliding indicator animation</p>
            </div>
            <div className="p-6">
              <AnimatedTabs
                key={`${variant}-${fullWidth}`}
                tabs={tabs}
                variant={variant}
                fullWidth={fullWidth}
                contentAnimation="fade"
              />
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Vertical Tabs</h2>
              <p className="text-emerald-100 text-sm">Side navigation layout</p>
            </div>
            <div className="p-6">
              <AnimatedTabsVertical
                tabs={tabs.slice(0, 3)}
                tabWidth="180px"
              />
            </div>
          </div>

          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Tab List Only</h2>
              <p className="text-amber-100 text-sm">Headless tab list component</p>
            </div>
            <div className="p-6">
              <TabList
                tabs={[
                  { id: 'all', label: 'All' },
                  { id: 'active', label: 'Active' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'archived', label: 'Archived' },
                ]}
                activeTab="all"
                onTabChange={() => {}}
                variant="pills"
              />
            </div>
          </div>

          {/* Code */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Usage</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1 ml-2">
                        {framework === 'react' ? 'React' : 'Vanilla'}
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => setFramework('react')}>
                        React + Framer Motion
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFramework('vanilla')}>
                        Vanilla HTML/CSS/JS
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <button onClick={() => copyToClipboard(usageCode, 'usage')} className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors">
                  {copied === 'usage' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'usage' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-zinc-950 overflow-x-auto max-h-[300px]">
                <pre className="text-xs text-zinc-100 font-mono"><code>{usageCode}</code></pre>
              </div>
            </div>

            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Installation</span>
                </div>
                <button onClick={() => copyToClipboard(installCode, 'install')} className="flex items-center gap-1 px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors">
                  {copied === 'install' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied === 'install' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-4 bg-zinc-950">
                <pre className="text-xs text-zinc-100 font-mono"><code>{installCode}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
