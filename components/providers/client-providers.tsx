'use client'

import { SessionProvider } from 'next-auth/react'

export const ClientProviders = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <SessionProvider>{children}</SessionProvider>
}
