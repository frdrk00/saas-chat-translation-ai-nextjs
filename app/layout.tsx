import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { ClientProviders } from '@/components/providers/client-providers'
import { FirebaseAuthProvider } from '@/components/providers/firebase-auth-provider'
import { SubscriptionProvider } from '@/components/providers/subscription-provider'

export const metadata: Metadata = {
  title: 'SaaS Translation Chat',
  description: 'SaaS Translation Chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />

                {children}
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  )
}
