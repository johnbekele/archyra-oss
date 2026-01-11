'use client';

import { ReactNode } from 'react';

interface GalleryLayoutProps {
  children: ReactNode;
}

export default function GalleryLayout({ children }: GalleryLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
