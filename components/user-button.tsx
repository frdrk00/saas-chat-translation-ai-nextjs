'use client'

import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { StarIcon } from 'lucide-react'

import { useSubscriptionStore } from '@/store/store'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/user-avatar'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/loading-spinner'
import { ManageAccountButton } from '@/components/manage-account-button'

interface UserButtonProps {
  session: Session | null
}

export const UserButton = ({ session }: UserButtonProps) => {
  const subscription = useSubscriptionStore((state) => state.subscription)

  if (!session)
    return (
      <Button variant="outline" onClick={() => signIn()}>
        Sign In
      </Button>
    )

  return (
    session && (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar name={session.user?.name} image={session.user?.image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {subscription === undefined && (
            <DropdownMenuItem className="flex justify-center">
              <LoadingSpinner />
            </DropdownMenuItem>
          )}

          {subscription?.role === 'pro' && (
            <>
              <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse">
                <StarIcon fill="#E935C1" />
                <p>PRO</p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <ManageAccountButton />
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem
            onClick={() => signOut()}
            className="cursor-pointer"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  )
}
