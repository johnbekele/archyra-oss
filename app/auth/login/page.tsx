'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Mail, ArrowLeft, Lock, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/gallery/designer';
  const error = searchParams.get('error');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    setIsLoading(provider);
    await signIn(provider, { callbackUrl });
  };

  return (
    <Card className="border-2">
      <CardHeader className="text-center pb-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Sign in to Archyra</CardTitle>
        <CardDescription>
          Sign in to access the Architecture Designer and save your designs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error === 'OAuthSignin' && 'Error starting OAuth sign-in.'}
              {error === 'OAuthCallback' && 'Error during OAuth callback.'}
              {error === 'OAuthCreateAccount' && 'Error creating OAuth account.'}
              {error === 'Callback' && 'Error during sign-in callback.'}
              {error === 'Default' && 'An error occurred during sign-in.'}
              {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'Callback', 'Default'].includes(error) &&
                'An unexpected error occurred.'}
            </AlertDescription>
          </Alert>
        )}

        <Button
          className="w-full gap-2"
          size="lg"
          onClick={() => handleSignIn('github')}
          disabled={isLoading !== null}
        >
          {isLoading === 'github' ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Github className="w-5 h-5" />
          )}
          Continue with GitHub
        </Button>

        <Button
          variant="outline"
          className="w-full gap-2"
          size="lg"
          onClick={() => handleSignIn('google')}
          disabled={isLoading !== null}
        >
          {isLoading === 'google' ? (
            <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
          ) : (
            <Mail className="w-5 h-5" />
          )}
          Continue with Google
        </Button>

        <p className="text-xs text-center text-muted-foreground pt-4">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  );
}

export default function AuthLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-violet-500/5 to-emerald-500/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>

        <Suspense fallback={
          <Card className="border-2">
            <CardContent className="py-12 text-center">
              <div className="w-8 h-8 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mx-auto" />
            </CardContent>
          </Card>
        }>
          <LoginForm />
        </Suspense>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don&apos;t need an account?{' '}
          <Link href="/gallery/ui" className="text-violet-600 hover:underline">
            Browse UI Components
          </Link>
          {' '}or{' '}
          <Link href="/gallery/iac" className="text-emerald-600 hover:underline">
            IaC Templates
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
