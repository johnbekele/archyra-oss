'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Package } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import PreviewControls, { ColorConfig } from '../../components/PreviewControls';
import { LoginPage, SignupPage, ForgotPasswordPage } from '../../AuthPage';

export default function AuthPageDemo() {
  const [copied, setCopied] = useState<string | null>(null);
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [colors, setColors] = useState<ColorConfig>({
    primary: '#8b5cf6',
    accent: '#a78bfa',
    background: '#ffffff',
  });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const usageCode = `import { LoginPage, SignupPage, ForgotPasswordPage } from 'archyra';

// Login Page
<LoginPage
  logo={<span className="text-2xl font-bold">YourBrand</span>}
  onSubmit={(data) => console.log(data)}
  onOAuthClick={(provider) => console.log(provider)}
  oauthProviders={['google', 'github', 'apple']}
  primaryColor="${colors.primary}"
/>

// Signup Page
<SignupPage
  logo={<img src="/logo.svg" alt="Logo" />}
  onSubmit={(data) => console.log(data)}
  oauthProviders={['google', 'github']}
  primaryColor="${colors.primary}"
/>

// Forgot Password Page
<ForgotPasswordPage
  logo={<YourLogoComponent />}
  onSubmit={(email) => console.log(email)}
  primaryColor="${colors.primary}"
/>`;

  const installCode = 'npm install archyra framer-motion';

  return (
    <DashboardLayout title="AuthPage" description="Complete authentication pages with login, signup, and password reset">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">View</h3>
            <div className="space-y-2">
              {(['login', 'signup', 'forgot'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors ${
                    view === v ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {v === 'login' ? 'Login Page' : v === 'signup' ? 'Signup Page' : 'Forgot Password'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>- OAuth support (Google, GitHub, Apple)</li>
              <li>- Animated floating labels</li>
              <li>- Password strength indicator</li>
              <li>- Form validation</li>
              <li>- Loading states</li>
              <li>- Error/success messages</li>
              <li>- Dark mode support</li>
              <li>- Custom color themes</li>
              <li>- Remember me option</li>
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 space-y-6">
          <PreviewControls
            title="Preview"
            subtitle="Interactive auth page demo"
            gradientFrom="from-violet-500"
            gradientTo="to-purple-500"
            onColorsChange={setColors}
          >
            <div className="flex items-center justify-center min-h-[450px]">
              <div className="w-full max-w-md">
                {view === 'login' && (
                  <LoginPage
                    logo={<span className="text-2xl font-bold" style={{ color: colors.primary }}>Archyra</span>}
                    onSubmit={(data) => alert(`Login: ${JSON.stringify(data)}`)}
                    onGoogleAuth={() => alert('Google OAuth clicked')}
                    onGithubAuth={() => alert('GitHub OAuth clicked')}
                    switchLink="#"
                    showForgotPassword
                    onForgotPassword={() => setView('forgot')}
                    primaryColor={colors.primary}
                  />
                )}
                {view === 'signup' && (
                  <SignupPage
                    logo={<span className="text-2xl font-bold" style={{ color: colors.primary }}>Archyra</span>}
                    onSubmit={(data) => alert(`Signup: ${JSON.stringify(data)}`)}
                    onGoogleAuth={() => alert('Google OAuth clicked')}
                    onGithubAuth={() => alert('GitHub OAuth clicked')}
                    switchLink="#"
                    primaryColor={colors.primary}
                  />
                )}
                {view === 'forgot' && (
                  <ForgotPasswordPage
                    logo={<span className="text-2xl font-bold" style={{ color: colors.primary }}>Archyra</span>}
                    onSubmit={(email) => alert(`Reset email sent to: ${email}`)}
                    backLink="#"
                    primaryColor={colors.primary}
                  />
                )}
              </div>
            </div>
          </PreviewControls>

          {/* Code */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Usage</span>
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
