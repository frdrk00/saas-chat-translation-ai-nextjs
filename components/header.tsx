import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { MessagesSquareIcon } from 'lucide-react'

import { DarkModeToggle } from '@/components/dark-mode-toggle'
import { Logo } from '@/components/logo'
import { UserButton } from '@/components/user-button'

export const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />

        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Language Select */}

          {session ? (
            <>
              <Link href="/chat" prefetch={false}>
                <MessagesSquareIcon className="text-black dark:text-white" />
              </Link>
            </>
          ) : (
            <Link href="/pricing">Pricing</Link>
          )}

          <DarkModeToggle />

          <UserButton session={session} />
        </div>
      </nav>

      {/* Upgrade Banner */}
    </header>
  )
}
