'use client';

import Link from 'next/link';
import { LogIn, ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FrameworkCodeBlock } from '@/components/docs/FrameworkCodeBlock';

export default function AuthComponentsPage() {
  const components = [
    {
      name: 'FloatingLogin',
      description: 'Animated floating login form with smooth bobbing motion, supporting local and OAuth authentication.',
      href: '/FloatingLogin',
      props: [
        { name: 'mode', type: "'light' | 'dark'", default: "'light'", description: 'Theme mode' },
        { name: 'primaryColor', type: 'string', default: "'#6366F1'", description: 'Accent color (hex)' },
        { name: 'floatingEnabled', type: 'boolean', default: 'true', description: 'Enable floating animation' },
        { name: 'floatIntensity', type: 'number', default: '5', description: 'Float intensity (1-10)' },
        { name: 'onLogin', type: '(data) => void', default: '-', description: 'Login callback with email/password' },
        { name: 'onGoogleLogin', type: '() => void', default: '-', description: 'Google OAuth callback' },
        { name: 'onAppleLogin', type: '() => void', default: '-', description: 'Apple Sign-In callback' },
      ],
      reactCode: `import { FloatingLogin } from 'archyra';

function LoginPage() {
  return (
    <FloatingLogin
      mode="dark"
      primaryColor="#6366F1"
      floatIntensity={5}
      onLogin={(data) => console.log(data)}
      onGoogleLogin={() => signInWithGoogle()}
      onAppleLogin={() => signInWithApple()}
    />
  );
}`,
      vanillaCode: `<!-- HTML -->
<div class="floating-login-wrapper">
  <div class="floating-login">
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
        <input type="password" placeholder="Password" class="input password-input" />
      </div>

      <button type="submit" class="submit-btn">Sign in</button>
    </form>

    <div class="divider"><span>or</span></div>

    <div class="oauth-buttons">
      <button class="oauth-btn google-btn">Continue with Google</button>
      <button class="oauth-btn apple-btn">Continue with Apple</button>
    </div>
  </div>
</div>

<!-- CSS -->
<style>
.floating-login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.floating-login {
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  75% { transform: translateY(-10px) rotate(-1deg); }
}

.floating-login.dark {
  background: #111827;
  color: white;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
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
  font-size: 1rem;
  outline: none;
}

.input:focus {
  border-color: #6366F1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #6366F1;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #d1d5db;
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

.google-btn {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.apple-btn {
  background: #000;
  border: none;
  color: white;
}
</style>

<!-- JavaScript -->
<script>
class FloatingLogin {
  constructor(element, options = {}) {
    this.element = element;
    this.form = element.querySelector('.login-form');
    this.submitBtn = element.querySelector('.submit-btn');

    if (options.mode === 'dark') element.classList.add('dark');
    if (options.primaryColor) {
      this.submitBtn.style.backgroundColor = options.primaryColor;
    }

    this.form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = element.querySelector('input[type="email"]').value;
      const password = element.querySelector('.password-input').value;
      options.onLogin?.({ email, password });
    });
  }
}

// Usage:
const login = new FloatingLogin(document.querySelector('.floating-login'), {
  mode: 'light',
  onLogin: (data) => console.log('Login:', data)
});
</script>`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
            <LogIn className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-green-500/10 text-green-600">Authentication</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Authentication Components
        </h1>
        <p className="text-xl text-muted-foreground">
          Beautiful login and authentication forms with smooth animations and OAuth support.
        </p>
      </div>

      {/* Components */}
      <div className="space-y-16">
        {components.map((component, index) => (
          <div key={component.name} className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{component.name}</h2>
                <p className="text-muted-foreground mt-1">{component.description}</p>
              </div>
              <Link href={component.href}>
                <Button variant="outline" size="sm" className="gap-2">
                  Live Demo
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </Link>
            </div>

            <Tabs defaultValue="usage" className="w-full">
              <TabsList>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="props">Props</TabsTrigger>
              </TabsList>
              <TabsContent value="usage" className="mt-4">
                <FrameworkCodeBlock
                  reactCode={component.reactCode}
                  vanillaCode={component.vanillaCode}
                  id={`${component.name}-usage`}
                />
              </TabsContent>
              <TabsContent value="props" className="mt-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prop</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Default</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {component.props.map((prop) => (
                        <TableRow key={prop.name}>
                          <TableCell className="font-mono text-sm">{prop.name}</TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">{prop.type}</TableCell>
                          <TableCell className="font-mono text-sm">{prop.default}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{prop.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
            </Tabs>

            {index < components.length - 1 && <hr className="border-border" />}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="border-t mt-12 pt-8">
        <div className="flex justify-between">
          <Link href="/docs/components/creative">
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Creative Components
            </Button>
          </Link>
          <Link href="/docs/components/chat">
            <Button variant="outline" className="gap-2">
              Chat Components
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
