'use client';

import { ReactNode } from 'react';
// import AuthGuard from '@/components/auth/AuthGuard';

interface DesignerLayoutProps {
  children: ReactNode;
}

export default function DesignerLayout({ children }: DesignerLayoutProps) {
  // TODO: Re-enable auth after OAuth credentials are configured
  // return <AuthGuard>{children}</AuthGuard>;
  return <>{children}</>;
}
