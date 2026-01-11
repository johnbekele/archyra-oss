import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import AuthProvider from '@/components/providers/AuthProvider'
import Navbar from '@/components/Navbar'
import SupportChatBot from '@/components/SupportChatBot'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Archyra - React Animation Components',
  description: 'Beautiful production-ready animation components for React and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="pt-16">
              {children}
            </main>
            <SupportChatBot />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
