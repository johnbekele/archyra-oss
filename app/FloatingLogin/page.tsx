'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Code2, Package, ChevronDown } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import FloatingLogin, { LoginData } from '../../FloatingLogin';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Framework = 'react' | 'vanilla';

export default function FloatingLoginPage() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [primaryColor, setPrimaryColor] = useState('#6366F1');
  const [floatIntensity, setFloatIntensity] = useState(5);
  const [floatingEnabled, setFloatingEnabled] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [lastLogin, setLastLogin] = useState<LoginData | null>(null);
  const [framework, setFramework] = useState<Framework>('react');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleLogin = (data: LoginData) => {
    console.log('Login data:', data);
    setLastLogin(data);
  };

  const colorOptions = [
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Emerald', value: '#10B981' },
    { name: 'Rose', value: '#F43F5E' },
    { name: 'Violet', value: '#8B5CF6' },
    { name: 'Cyan', value: '#06B6D4' },
  ];

  const reactCode = `import { FloatingLogin } from 'archyra';

<FloatingLogin
  mode="${mode}"
  primaryColor="${primaryColor}"
  floatIntensity={${floatIntensity}}
  floatingEnabled={${floatingEnabled}}
  onLogin={(data) => handleLogin(data)}
/>`;

  const vanillaCode = `<!-- HTML -->
<div class="floating-login ${mode}">
  <h2 class="title">Welcome back</h2>
  <form class="login-form">
    <div class="input-group">
      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
      <input type="email" placeholder="Email" class="input" />
    </div>
    <div class="input-group">
      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      <input type="password" placeholder="Password" class="input" />
    </div>
    <button type="submit" class="submit-btn" style="background: ${primaryColor}">Sign in</button>
  </form>
  <div class="divider"><span>or</span></div>
  <div class="oauth-buttons">
    <button class="oauth-btn google">Continue with Google</button>
    <button class="oauth-btn apple">Continue with Apple</button>
  </div>
</div>

<!-- CSS -->
<style>
.floating-login {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  width: 100%;
  max-width: 400px;
  animation: float 4s ease-in-out infinite;
}

.floating-login.dark {
  background: #1f2937;
  color: white;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  75% { transform: translateY(-10px) rotate(-1deg); }
}

.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group { position: relative; }

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
}

.input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
  color: #9ca3af;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.oauth-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
}

.oauth-btn.google {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.oauth-btn.apple {
  background: #000;
  color: white;
  border: none;
}
</style>`;

  const usageCode = framework === 'react' ? reactCode : vanillaCode;

  const installCode = 'npm install archyra framer-motion lucide-react';

  return (
    <DashboardLayout title="FloatingLogin" description="Animated login form">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Theme Mode</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('light')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  mode === 'light' ? 'bg-blue-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setMode('dark')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  mode === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-4">Primary Color</h3>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setPrimaryColor(color.value)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              ))}
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-2 border-dashed border-gray-300"
              />
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Float Intensity</h3>
              <span className="text-2xl font-bold text-blue-500">{floatIntensity}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={floatIntensity}
              onChange={(e) => setFloatIntensity(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="bg-card rounded-xl border p-5">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-semibold">Floating Animation</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={floatingEnabled}
                  onChange={(e) => setFloatingEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${floatingEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${floatingEnabled ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`} />
                </div>
              </div>
            </label>
          </div>

          {lastLogin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5"
            >
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Last Login</h3>
              <pre className="text-xs text-green-700 dark:text-green-300 overflow-auto">
                {JSON.stringify(lastLogin, null, 2)}
              </pre>
            </motion.div>
          )}
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <p className="text-blue-100 text-sm">Interact with the floating login form</p>
            </div>
            <div
              className="flex items-center justify-center py-12 px-4 transition-colors"
              style={{ backgroundColor: mode === 'dark' ? '#111827' : '#F3F4F6', minHeight: '550px' }}
            >
              <FloatingLogin
                mode={mode}
                primaryColor={primaryColor}
                floatIntensity={floatIntensity}
                floatingEnabled={floatingEnabled}
                onLogin={handleLogin}
                onGoogleLogin={() => alert('Google OAuth would be triggered')}
                onAppleLogin={() => alert('Apple Sign-In would be triggered')}
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
