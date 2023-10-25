import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'

import { ThemeProvider } from '@/components/theme-provider'
import { ClientProviders } from '@/components/providers/client-providers'

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClientProviders>
  )
}
